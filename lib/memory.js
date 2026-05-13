import { supabase } from './supabase';

const MEMORY_WINDOW = parseInt(process.env.MEMORY_WINDOW       || '30',   10);
const EXEC_WINDOW   = parseInt(process.env.EXEC_MEMORY_WINDOW  || '10',   10);
const TOKEN_BUDGET  = parseInt(process.env.MEMORY_TOKEN_CAP    || '1800', 10);

export async function saveMessage(role, content, sessionId) {
  const { error } = await supabase
    .from('core_memory')
    .insert({ role, content, session_id: sessionId || 'default' });
  if (error) console.error('[memory] saveMessage:', error.message);
}

export async function getHistory(sessionId, limit = MEMORY_WINDOW) {
  const { data, error } = await supabase
    .from('core_memory')
    .select('role, content')
    .eq('session_id', sessionId || 'default')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) { console.error('[memory] getHistory:', error.message); return []; }
  return (data || []).reverse();
}

export async function getTokenAwareHistory(sessionId, charBudget = TOKEN_BUDGET) {
  const { data, error } = await supabase
    .from('core_memory')
    .select('role, content')
    .eq('session_id', sessionId || 'default')
    .order('created_at', { ascending: false })
    .limit(MEMORY_WINDOW);
  if (error) { console.error('[memory] getTokenAwareHistory:', error.message); return []; }
  if (!data || data.length === 0) return [];
  let used = 0;
  const selected = [];
  for (const row of data) {
    const cost = (row.content || '').length;
    if (used + cost > charBudget) break;
    selected.unshift(row);
    used += cost;
  }
  return selected;
}

export async function pruneHistory(sessionId, keep = 20) {
  const { data } = await supabase
    .from('core_memory')
    .select('id')
    .eq('session_id', sessionId || 'default')
    .order('created_at', { ascending: false })
    .limit(200);
  if (!data || data.length <= keep) return;
  const ids = data.slice(keep).map((r) => r.id);
  await supabase.from('core_memory').delete().in('id', ids);
}

export async function getExecutionMemory(sessionId) {
  const { data, error } = await supabase
    .from('execution_memory')
    .select('type, key, value, created_at')
    .eq('session_id', sessionId || 'default')
    .order('created_at', { ascending: false })
    .limit(EXEC_WINDOW);
  if (error) { console.error('[memory] getExecutionMemory:', error.message); return []; }
  return (data || []).reverse();
}

export async function saveExecutionMemory(sessionId, type, key, value) {
  const { error } = await supabase.from('execution_memory').insert({
    session_id: sessionId || 'default',
    type:       type.toUpperCase(),
    key:        key || type.toLowerCase(),
    value,
  });
  if (error) console.error('[memory] saveExecutionMemory:', error.message);
}

export async function getRecentDecisions(sessionId) {
  const { data, error } = await supabase
    .from('execution_memory')
    .select('value, created_at')
    .eq('session_id', sessionId || 'default')
    .eq('type', 'LOG_DECISION')
    .order('created_at', { ascending: false })
    .limit(5);
  if (error) return [];
  return (data || []).reverse();
}

export async function getRecentTasks(sessionId) {
  const { data, error } = await supabase
    .from('execution_memory')
    .select('value, created_at')
    .eq('session_id', sessionId || 'default')
    .eq('type', 'ADD_TASK')
    .order('created_at', { ascending: false })
    .limit(5);
  if (error) return [];
  return (data || []).reverse();
}

export function formatExecutionContext(execMemory) {
  if (!execMemory || execMemory.length === 0) return '';
  return `\nالذاكرة التنفيذية:\n${execMemory.map((r) => `[${r.type}] ${r.value}`).join('\n')}`;
}

export async function saveEmailIdentity(email, sessionId = 'system') {
  await saveExecutionMemory(sessionId, 'USER_IDENTITY', 'email', `Subscribed user: ${email}`);
}
