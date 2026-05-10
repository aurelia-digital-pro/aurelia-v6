import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

export async function buildSystemContext() {
  const [constitution, activePhase, nextPhase] = await Promise.all([
    getConstitution(),
    getActivePhase(),
    getNextPhase(),
  ]);

  return `
${constitution}

المرحلة الحالية: ${activePhase}
المرحلة التالية: ${nextPhase}

نظام الأوامر التنفيذية — استخدم هذه الصيغة داخل ردك عند الحاجة:
[CMD:ADD_TASK مهمة جديدة]
[CMD:LOG_DECISION قرار مهم]
[CMD:UPDATE_PHASE اسم المرحلة]
[CMD:LOG_PROJECT اسم المشروع]
[CMD:LOG_FILE مسار/الملف.js]
`.trim();
