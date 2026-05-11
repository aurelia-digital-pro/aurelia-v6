import { supabase } from './supabase';

export async function getConstitution() {
  const { data, error } = await supabase
    .from('constitution')
    .select('key, value');
  if (error || !data) return '';
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
  const [constitution, activePhase, nextPhase] = await Promise.all([
    getConstitution(),
    getActivePhase(),
    getNextPhase(),
  ]);

  return `
${constitution}

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
