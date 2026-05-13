// ═══════════════════════════════════════════════════════════════════
// AEGION — CONSTITUTION LAYER v2.0
// Governance rules + phase context.
// Acts as the final validation frame before every AI call.
// ═══════════════════════════════════════════════════════════════════

import { supabase } from './supabase';

// ─── LOAD GOVERNANCE CONSTITUTION ────────────────────────────────────
export async function getConstitution() {
  const { data, error } = await supabase
    .from('constitution')
    .select('key, value')
    .order('key', { ascending: true });
  if (error || !data || data.length === 0) return '';
  return data.map(r => `${r.key}: ${r.value}`).join('\n');
}

// ─── LOAD ACTIVE PHASE ────────────────────────────────────────────────
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

// ─── LOAD NEXT PHASE ─────────────────────────────────────────────────
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

// ═══════════════════════════════════════════════════════════════════
// buildSystemContext
// Assembles the full system prompt:
//   Constitution → Phases → Knowledge → Command Rules
// Called once per request; runs in parallel with other fetches.
// knowledgeContext is pre-built by knowledge.js before this call.
// ═══════════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════════
// validateExecution
// Constitution enforcement gate.
// Call before any structured execution to check if action is allowed.
// Returns { allowed: boolean, reason: string }
// ═══════════════════════════════════════════════════════════════════
export async function validateExecution(commandType, payload) {
  // For now: all valid command types are allowed.
  // Extend this with real governance rules from the DB as needed.
  const ALLOWED = new Set([
    'ADD_TASK', 'LOG_DECISION', 'UPDATE_PHASE', 'LOG_PROJECT', 'LOG_FILE',
  ]);

  if (!ALLOWED.has(commandType.toUpperCase())) {
    return { allowed: false, reason: `Command type '${commandType}' is not recognized` };
  }
  if (!payload || payload.trim().length === 0) {
    return { allowed: false, reason: 'Empty payload rejected by constitution' };
  }

  return { allowed: true, reason: 'OK' };
}
