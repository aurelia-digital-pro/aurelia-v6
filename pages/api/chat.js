import { buildSystemContext, validateExecution } from '../../lib/constitution';
import {
  saveMessage,
  getTokenAwareHistory,
  getExecutionMemory,
  saveExecutionMemory,
  formatExecutionContext,
  pruneHistory,
} from '../../lib/memory';
import { askGroq, parseCommand, estimateTokens } from '../../lib/ai';
import { buildKnowledgeContext } from '../../lib/knowledge';

const MAX_SYSTEM_CHARS  = 2000;
const MAX_HISTORY_CHARS = 1800;
const MAX_EXEC_CHARS    = 600;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, session_id } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message is required' });
  }

  const t0 = Date.now();

  try {
    const sessionId =
      session_id && session_id !== 'default' && session_id !== 'null' && session_id !== null
        ? String(session_id).trim()
        : 'aegion_' + Date.now();

    await saveMessage('user', message.trim(), sessionId);

    const [history, execMemory, knowledgeContext] = await Promise.all([
      getTokenAwareHistory(sessionId, MAX_HISTORY_CHARS),
      getExecutionMemory(sessionId),
      buildKnowledgeContext(sessionId),
    ]);

    const rawSystem = await buildSystemContext(knowledgeContext);
    const systemContext = rawSystem.length > MAX_SYSTEM_CHARS
      ? rawSystem.slice(0, MAX_SYSTEM_CHARS) + '\n[...]'
      : rawSystem;

    const rawExec = formatExecutionContext(execMemory);
    const execContext = rawExec.length > MAX_EXEC_CHARS
      ? rawExec.slice(0, MAX_EXEC_CHARS) + '\n[...]'
      : rawExec;

    const fullSystem = execContext ? `${systemContext}\n${execContext}` : systemContext;

    const tokensEstimate =
      estimateTokens(fullSystem) +
      history.reduce((a, m) => a + estimateTokens(m.content), 0) +
      estimateTokens(message);

    const reply = await askGroq([
      { role: 'system', content: fullSystem },
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: message.trim() },
    ]);

    const rawCommands = parseCommand(reply);
    const validCommands = [];
    for (const cmd of rawCommands) {
      const { allowed } = await validateExecution(cmd.type, cmd.payload);
      if (allowed) validCommands.push(cmd);
    }

    await Promise.all([
      ...validCommands.map((cmd) =>
        saveExecutionMemory(sessionId, cmd.type, cmd.type.toLowerCase(), cmd.payload)
      ),
      saveMessage('assistant', reply, sessionId),
      pruneHistory(sessionId, 20),
    ]);

    return res.status(200).json({
      reply,
      session_id:      sessionId,
      memory_sent:     history.length,
      commands:        validCommands,
      tokens_estimate: tokensEstimate,
      latency_ms:      Date.now() - t0,
    });

  } catch (err) {
    console.error('[api/chat]', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
