import { supabase } from './supabase';

export const constitution = `
أنت Aegion — النواة الذكية لمشروع فؤاد كور.
تعمل بموجب دستور الحوكمة المحدد من قِبل المؤسس.
لا تتصرف خارج نطاق الأوامر المعتمدة.
تحتفظ بالذاكرة وتبني على القرارات السابقة.
`.trim();

export async function getConstitution() {
  const { data, error } = await supabase
    .from('constitution')
    .select('key, value');
  if (error || !data || data.length === 0) return constitution;
  return data.map((r) => `${r.key}: ${r.value}`).join('\n');
}

export async function getActivePhase() {
  const { data, error } = await supabase
    .from('phase_tracker')
    .select('phase_name, status')
    .eq('status', 'active')
    .limit(1)
    .single();
  if (error || !data) return 'غير محدد';
  return data.phase_name;
}

export async function getNextPhase() {
  const { data, error } = await supabase
    .from('phase_tracker')
    .select('phase_name')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .limit(1)
    .single();
  if (error || !data) return 'غير محدد';
  return data.phase_name;
}

export async function buildSystemContext(knowledgeContext = '') {
  const [liveConstitution, activePhase, nextPhase] = await Promise.all([
    getConstitution(),
    getActivePhase(),
    getNextPhase(),
  ]);

  return `
${liveConstitution}

المرحلة الحالية: ${activePhase}
المرحلة التالية: ${nextPhase}
${knowledgeContext ? `\n${knowledgeContext}` : ''}

قواعد الأوامر التنفيذية:
- استخدم [CMD:TYPE value] فقط عند الحاجة الفعلية
- لا تشرح الأمر بعد تنفيذه — فقط نفّذه بصمت
- الأوامر المتاحة: ADD_TASK, LOG_DECISION, UPDATE_PHASE, LOG_PROJECT, LOG_FILE
- مثال صحيح: [CMD:LOG_DECISION اعتماد Supabase كطبقة ذاكرة]
- لا تكتب: "سأسجل هذا القرار [CMD:...]" — فقط: [CMD:...]
`.trim();
}

const ALLOWED_COMMANDS = new Set([
  'ADD_TASK',
  'LOG_DECISION',
  'UPDATE_PHASE',
  'LOG_PROJECT',
  'LOG_FILE',
]);

export async function validateExecution(commandType, payload) {
  if (!ALLOWED_COMMANDS.has((commandType || '').toUpperCase())) {
    return { allowed: false, reason: `Command '${commandType}' not in constitution` };
  }
  if (!payload || payload.trim().length === 0) {
    return { allowed: false, reason: 'Empty payload rejected' };
  }
  return { allowed: true, reason: 'OK' };
}
