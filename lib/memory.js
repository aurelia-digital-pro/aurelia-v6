import { supabase } from './supabase';

const MEMORY_WINDOW = parseInt(process.env.MEMORY_WINDOW || '20', 10);
const EXEC_WINDOW = parseInt(process.env.EXEC_MEMORY_WINDOW || '10', 10);

export async function saveMessage(role, content, sessionId) {
  const sid = sessionId || 'default';
  const { error } = await supabase
    .from('core_memory')
    .insert({ role, content, session_id: sid });
  if (error) console.error('[memory] saveMessage failed:', error.message);
}

export async function getHistory(sessionId, limit = MEMORY_WINDOW) {
  const sid = sessionId || 'default';
  const { data, error } = await supabase
    .from('core_memory')
    .select('role, content')
    .eq('session_id', sid)
    .order('created_at', { ascending: true })
    .limit(limit);
  if (error) { console.error('[memory] getHistory failed:', error.message); return []; }
  return data || [];
}

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

export function formatExecutionContext(execMemory) {
  if (!execMemory || execMemory.length === 0) return '';
  const lines = execMemory.map((r) => `[${r.type}] ${r.value}`);
  return `\nالذاكرة التنفيذية:\n${lines.join('\n')}`;
}
