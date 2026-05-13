// ═══════════════════════════════════════════════════════════════════
// pages/api/chat.js — AEGION CHAT ENDPOINT
// Replaces old direct Supabase → Groq flow.
// Now delegates everything to runtimeBrain.
// AEGION — UNIFIED CHAT ENDPOINT v2.0
// Single entry point for all AI interaction.
//
// Unified data flow:
//   Request → Memory → Knowledge → Constitution → AI → Commands → Save → Response
//
// IMPORTANT: Token budget is enforced at memory retrieval.
// Never sends full history — only token-aware window.
// ═══════════════════════════════════════════════════════════════════
import { runBrain } from '../../lib/runtimeBrain';
import { constitution } from '../../lib/constitution';
import { askGroq, parseCommand, estimateTokens } from '../../lib/ai';
import { buildSystemContext, validateExecution } from '../../lib/constitution';
import { buildKnowledgeContext } from '../../lib/knowledge';
import {
  saveMessage,
  getTokenAwareHistory,
  getExecutionMemory,
  formatExecutionContext,
  saveExecutionMemory,
  pruneHistory,
} from '../../lib/memory';
// ─── HARD LIMITS ─────────────────────────────────────────────────────
const MAX_SYSTEM_CHARS  = 2000;   // Cap system prompt characters
const MAX_HISTORY_CHARS = 1800;   // Cap conversation history characters
const MAX_EXEC_CHARS    = 600;    // Cap execution memory characters
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { message, sessionId } = req.body;
  if (!message || typeof message !== 'string' || !message.trim()) {
  const { message, session_id } = req.body;
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'message is required' });
  }
  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId is required' });
  const t0 = Date.now();
  try {
    // ─── SESSION ID ────────────────────────────────────────────────
    const sessionId =
      session_id && session_id !== 'default' && session_id !== 'null' && session_id !== null
        ? session_id.trim()
        : 'aegion_' + Date.now();
    // ─── STEP 1: SAVE USER MESSAGE ─────────────────────────────────
    await saveMessage('user', message.trim(), sessionId);
    // ─── STEP 2: RETRIEVE ALL LAYERS IN PARALLEL ──────────────────
    // Each layer has its own character cap — no layer can blow the budget alone.
    const [history, execMemory, knowledgeContext] = await Promise.all([
      getTokenAwareHistory(sessionId, MAX_HISTORY_CHARS),
      getExecutionMemory(sessionId),
      buildKnowledgeContext(sessionId),
    ]);
    // ─── STEP 3: BUILD SYSTEM CONTEXT (CONSTITUTION LAYER) ─────────
    const rawSystemContext = await buildSystemContext(knowledgeContext);
    // Hard-cap system context to prevent constitution bloat
    const systemContext = rawSystemContext.length > MAX_SYSTEM_CHARS
      ? rawSystemContext.slice(0, MAX_SYSTEM_CHARS) + '\n[...truncated]'
      : rawSystemContext;
    // ─── STEP 4: BUILD EXECUTION CONTEXT (CAPPED) ─────────────────
    const rawExec = formatExecutionContext(execMemory);
    const execContext = rawExec.length > MAX_EXEC_CHARS
      ? rawExec.slice(0, MAX_EXEC_CHARS) + '\n[...truncated]'
      : rawExec;
    const fullSystem = execContext
      ? `${systemContext}\n${execContext}`
      : systemContext;
    // ─── STEP 5: ESTIMATE TOTAL TOKENS BEFORE CALL ─────────────────
    const systemTokens  = estimateTokens(fullSystem);
    const historyTokens = history.reduce((a, m) => a + estimateTokens(m.content), 0);
    const inputTokens   = estimateTokens(message);
    const totalEstimate = systemTokens + historyTokens + inputTokens;
    console.log(`[aegion/chat] tokens estimate: system=${systemTokens} history=${historyTokens} input=${inputTokens} total=${totalEstimate}`);
    // ─── STEP 6: CALL GROQ VIA AI LAYER ───────────────────────────
    const reply = await askGroq([
      { role: 'system', content: fullSystem },
      ...history.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: message.trim() },
    ]);
    // ─── STEP 7: PARSE + VALIDATE COMMANDS ────────────────────────
    const rawCommands = parseCommand(reply);
    const validCommands = [];
    for (const cmd of rawCommands) {
      const { allowed, reason } = await validateExecution(cmd.type, cmd.payload);
      if (allowed) {
        validCommands.push(cmd);
      } else {
        console.warn(`[aegion/chat] command rejected: ${cmd.type} — ${reason}`);
      }
    }
    // ─── STEP 8: PERSIST COMMANDS TO EXECUTION MEMORY ─────────────
    if (validCommands.length > 0) {
      await Promise.all(
        validCommands.map(cmd =>
          saveExecutionMemory(sessionId, cmd.type, cmd.type.toLowerCase(), cmd.payload)
        )
      );
    }
    // ─── STEP 9: SAVE AI RESPONSE + PRUNE IN PARALLEL ─────────────
    await Promise.all([
      saveMessage('assistant', reply, sessionId),
      pruneHistory(sessionId, 20),
    ]);
    const latencyMs = Date.now() - t0;
    console.log(`[aegion/chat] done in ${latencyMs}ms | commands=${validCommands.length}`);
    // ─── STEP 10: RESPOND ──────────────────────────────────────────
    return res.status(200).json({
      reply,
      session_id:   sessionId,
      memory_sent:  history.length,
      commands:     validCommands,
      tokens_estimate: totalEstimate,
      latency_ms:   latencyMs,
    });
  } catch (err) {
    console.error('[aegion/chat] error:', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
  const result = await runBrain({
    userInput: message.trim(),
    sessionId,
    constitution: constitution || null,
  });
  if (!result.success) {
    return res.status(500).json({
      error: result.error || 'Runtime brain failed',
      response: null,
    });
  }
  return res.status(200).json({
    response: result.response,
    tokensUsed: result.tokensUsed,
  });
}
