import { supabase } from './supabase';

const KNOWLEDGE_WINDOW = parseInt(process.env.KNOWLEDGE_WINDOW || '20', 10);

export async function getKnowledgeSnapshot(sessionId) {
  const sid = sessionId || 'default';

  const { data, error } = await supabase
    .from('execution_memory')
    .select('type, value, created_at')
    .eq('session_id', sid)
    .order('created_at', { ascending: false })
    .limit(KNOWLEDGE_WINDOW);

  if (error || !data || data.length === 0) return null;

  const grouped = {
    decisions: [],
    tasks: [],
    projects: [],
    files: [],
    phases: [],
    other: [],
  };

  for (const row of data) {
    switch (row.type) {
      case 'LOG_DECISION':   grouped.decisions.push(row.value); break;
      case 'ADD_TASK':       grouped.tasks.push(row.value); break;
      case 'LOG_PROJECT':    grouped.projects.push(row.value); break;
      case 'LOG_FILE':       grouped.files.push(row.value); break;
      case 'UPDATE_PHASE':   grouped.phases.push(row.value); break;
      default:               grouped.other.push(`${row.type}: ${row.value}`);
    }
  }

  return grouped;
}

export function formatKnowledgeContext(snapshot) {
  if (!snapshot) return '';

  const sections = [];

  if (snapshot.decisions.length > 0) {
    sections.push(`القرارات المسجلة:\n${snapshot.decisions.map((d) => `• ${d}`).join('\n')}`);
  }
  if (snapshot.tasks.length > 0) {
    sections.push(`المهام النشطة:\n${snapshot.tasks.map((t) => `• ${t}`).join('\n')}`);
  }
  if (snapshot.projects.length > 0) {
    sections.push(`المشاريع:\n${snapshot.projects.map((p) => `• ${p}`).join('\n')}`);
  }
  if (snapshot.phases.length > 0) {
    sections.push(`تطور المراحل:\n${snapshot.phases.map((p) => `• ${p}`).join('\n')}`);
  }
  if (snapshot.files.length > 0) {
    sections.push(`الملفات المرصودة:\n${snapshot.files.map((f) => `• ${f}`).join('\n')}`);
  }

  if (sections.length === 0) return '';
  return `\n--- Foued Aegion Knowledge Layer ---\n${sections.join('\n\n')}\n---`;
}

export async function buildKnowledgeContext(sessionId) {
  const snapshot = await getKnowledgeSnapshot(sessionId);
  return formatKnowledgeContext(snapshot);
}
