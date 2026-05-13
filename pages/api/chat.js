// ═══════════════════════════════════════════════════════════════════
// pages/api/chat.js — AEGION CHAT ENDPOINT
// Replaces old direct Supabase → Groq flow.
// Now delegates everything to runtimeBrain.
// AEGION — UNIFIED CHAT ENDPOINT v2.0
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
const MAX_SYSTEM_CHARS  = 2000;   
const MAX_HISTORY_CHARS = 1800;   
const MAX_EXEC_CHARS    = 600;    

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, sessionId: bodySessionId, session_id } = req.body;

  // التحقق من الرسالة
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'message is required' });
  }

  const t0 = Date.now();

  try {
    // ─── STEP 1: SESSION ID HANDLING ───────────────────────────────
    const sessionId = (bodySessionId || session_id || '').trim() || 'aegion_' + Date.now();

    // ─── STEP 2: SAVE USER MESSAGE ─────────────────────────────────
    await saveMessage('user', message.trim(), sessionId);

    // ─── STEP 3: RETRIEVE ALL LAYERS IN PARALLEL ──────────────────
    const [history, execMemory, knowledgeContext] = await Promise.all([
      getTokenAwareHistory(sessionId, MAX_HISTORY_CHARS),
      getExecutionMemory(sessionId),
      buildKnowledgeContext(sessionId),
    ]);

    // ─── STEP 4: BUILD CONTEXTS ────────────────────────────────────
    const rawSystemContext = await buildSystemContext(knowledgeContext);
    const systemContext = rawSystemContext.length > MAX_SYSTEM_CHARS
      ? rawSystemContext.slice(0, MAX_SYSTEM_CHARS) + '\n[...truncated]'
      : rawSystemContext;

    const rawExec = formatExecutionContext(execMemory);
    const execContext = rawExec.length > MAX_EXEC_CHARS
      ? rawExec.slice(0, MAX_EXEC_CHARS) + '\n[...truncated]'
      : rawExec;

    const fullSystem = execContext
      ? `${systemContext}\n${execContext}`
      : systemContext;

    // ─── STEP 5: BRAIN EXECUTION (AS SEEN IN IMAGE.PNG) ────────────
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

    // ─── STEP 6: OPTIONAL GROQ CALL / LOGIC ────────────────────────
    // يمكنك تفعيل هذا الجزء إذا كنت تريد استخدام askGroq مباشرة بدلاً من runBrain فقط
    /*
    const reply = await askGroq([
      { role: 'system', content: fullSystem },
      ...history.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: message.trim() },
    ]);
    */

    // ─── STEP 7: SAVE AI RESPONSE + PRUNE ──────────────────────────
    await Promise.all([
      saveMessage('assistant', result.response, sessionId),
      pruneHistory(sessionId, 20),
    ]);

    const latencyMs = Date.now() - t0;

    // ─── STEP 8: FINAL RESPONSE ────────────────────────────────────
    return res.status(200).json({
      response: result.response,
      tokensUsed: result.tokensUsed,
      session_id: sessionId,
      latency_ms: latencyMs,
    });

  } catch (err) {
    console.error('[aegion/chat] error:', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
