// ═══════════════════════════════════════════════════════════════════
// AEGION — MEMORY LAYER v2.0
// Single source of truth for all memory read/write operations.
// Tables: core_memory (conversation) + execution_memory (commands)
// ═══════════════════════════════════════════════════════════════════

import { supabase } from './supabase';

// ─── ENVIRONMENT CONFIG ──────────────────────────────────────────────
const MEMORY_WINDOW    = parseInt(process.env.MEMORY_WINDOW     || '30', 10);
const EXEC_WINDOW      = parseInt(process.env.EXEC_MEMORY_WINDOW || '10', 10);
const TOKEN_BUDGET     = parseInt(process.env.MEMORY_TOKEN_CAP  || '1800', 10); // chars budget for history

// ═══════════════════════════════════════════════════════════════════
// CONVERSATION MEMORY — core_memory table
// ═══════════════════════════════════════════════════════════════════

// Save a single message turn
export async function saveMessage(role, content, sessionId) {
  const sid = sessionId || 'default';
  const { error } = await supabase
    .from('core_memory')
    .insert({ role, content, session_id: sid });
  if (error) console.error('[memory] saveMessage failed:', error.message);
}

// Get raw history (for backwards compatibility)
export async function getHistory(sessionId, limit = MEMORY_WINDOW) {
  const sid = sessionId || 'default';
  const { data, error } = await supabase
    .from('core_memory')
    .select('role, content')
    .eq('session_id', sid)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) { console.error('[memory] getHistory failed:', error.message); return []; }
  return (data || []).reverse();
}

// ─── TOKEN-AWARE HISTORY ─────────────────────────────────────────────
// Retrieves the most recent messages that fit within a character budget.
// This prevents context explosion without changing the table structure.
export async function getTokenAwareHistory(sessionId, charBudget = TOKEN_BUDGET) {
  const sid = sessionId || 'default';

  // Fetch recent messages (most recent first for budget calculation)
  const { data, error } = await supabase
    .from('core_memory')
    .select('role, content')
    .eq('session_id', sid)
    .order('created_at', { ascending: false })
    .limit(MEMORY_WINDOW);

  if (error) { console.error('[memory] getTokenAwareHistory failed:', error.message); return []; }
  if (!data || data.length === 0) return [];

  // Walk newest → oldest, accumulate until budget is full
  let used = 0;
  const selected = [];
  for (const row of data) {
    const cost = (row.content || '').length;
    if (used + cost > charBudget) break;
    selected.unshift(row); // Maintain chronological order
    used += cost;
  }

  return selected;
}

// ─── PRUNE OLD MESSAGES ───────────────────────────────────────────────
// Keeps only the most recent `keep` messages per session
export async function pruneHistory(sessionId, keep = 20) {
  const sid = sessionId || 'default';
  const { data } = await supabase
    .from('core_memory')
    .select('id')
    .eq('session_id', sid)
    .order('created_at', { ascending: false })
    .limit(100);

  if (!data || data.length <= keep) return;
  const toDelete = data.slice(keep).map(r => r.id);
  await supabase.from('core_memory').delete().in('id', toDelete);
}

// ═══════════════════════════════════════════════════════════════════
// EXECUTION MEMORY — execution_memory table
// Stores commands, decisions, tasks, projects, phases.
// ═══════════════════════════════════════════════════════════════════

export async function getExecutionMemory(sessionId) {
  const sid = sessionId || 'default';
  const { data, error } = await supabase
    .from('execution_memory')
    .select('type, key, value, created_at')
    .eq('session_id', sid)
    .order('created_at', { ascending: false })
    .limit(EXEC_WINDOW);
  if (error) { console.error('[memory] getExecutionMemory failed:', error.message); return []; }
  return (data || []).reverse();
}

export async function saveExecutionMemory(sessionId, type, key, value) {
  const { error } = await supabase.from('execution_memory').insert({
    session_id: sessionId || 'default',
    type: type.toUpperCase(),
    key: key || type.toLowerCase(),
    value,
  });
  if (error) console.error('[memory] saveExecutionMemory failed:', error.message);
}

export async function getRecentDecisions(sessionId) {
  const sid = sessionId || 'default';
  const { data, error } = await supabase
    .from('execution_memory')
    .select('value, created_at')
    .eq('session_id', sid)
    .eq('type', 'LOG_DECISION')
    .order('created_at', { ascending: false })
    .limit(5);
  if (error) return [];
  return (data || []).reverse();
}

export async function getRecentTasks(sessionId) {
  const sid = sessionId || 'default';
  const { data, error } = await supabase
    .from('execution_memory')
    .select('value, created_at')
    .eq('session_id', sid)
    .eq('type', 'ADD_TASK')
    .order('created_at', { ascending: false })
    .limit(5);
  if (error) return [];
  return (data || []).reverse();
}

// ─── FORMAT EXECUTION CONTEXT FOR PROMPT ─────────────────────────────
export function formatExecutionContext(execMemory) {
  if (!execMemory || execMemory.length === 0) return '';
  const lines = execMemory.map(r => `[${r.type}] ${r.value}`);
  return `\nالذاكرة التنفيذية:\n${lines.join('\n')}`;
}

// ═══════════════════════════════════════════════════════════════════
// EMAIL IDENTITY MEMORY
// Emails are system-level identity signals, not just feature data.
// Written to execution_memory so the AI can reference them in context.
// ═══════════════════════════════════════════════════════════════════

export async function saveEmailIdentity(email, sessionId = 'system') {
  await saveExecutionMemory(
    sessionId,
    'USER_IDENTITY',
    'email',
    `Subscribed user: ${email}`
  );
}
