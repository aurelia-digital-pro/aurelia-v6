import { askGroq, parseCommand } from '../../lib/ai';
import { buildSystemContext } from '../../lib/constitution';
import { saveMessage, getHistory, getExecutionMemory, formatExecutionContext } from '../../lib/memory';
import { supabase } from '../../lib/supabase';

const MEMORY_WINDOW = parseInt(process.env.MEMORY_WINDOW || '20', 10);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, session_id } = req.body;
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'message is required' });
  }

  try {
    const sessionId =
      session_id && session_id !== 'default' && session_id !== 'null' && session_id !== null
        ? session_id.trim()
        : 'aegion_' + Date.now();

    await saveMessage('user', message.trim(), sessionId);

    const [history, execMemory, systemContext] = await Promise.all([
      getHistory(sessionId, MEMORY_WINDOW),
      getExecutionMemory(sessionId),
      buildSystemContext(),
    ]);

    const execContext = formatExecutionContext(execMemory);
    const fullContext = execContext ? `${systemContext}\n${execContext}` : systemContext;

    const reply = await askGroq([
      { role: 'system', content: fullContext },
      ...history.map((m) => ({ role: m.role, content: m.content })),
    ]);

    const commands = parseCommand(reply);

    if (commands.length > 0) {
      await supabase.from('execution_memory').insert(
        commands.map((cmd) => ({
          type: cmd.type,
          key: cmd.type.toLowerCase(),
          value: cmd.payload,
          session_id: sessionId,
        }))
      );
    }

    await saveMessage('assistant', reply, sessionId);

    return res.status(200).json({
      reply,
      session_id: sessionId,
      memory_total: history.length + 1,
      memory_sent: history.length,
      commands,
    });
  } catch (err) {
    console.error('[ai] error:', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
