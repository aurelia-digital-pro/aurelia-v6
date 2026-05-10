import { createClient } from '@supabase/supabase-js';
import { askGroq } from '../../lib/ai';

// ── Supabase Client ─────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ── Founder System Context ───────────────────────────────────────────────────
const SYSTEM_CONTEXT = `
أنت Aurelia — ذكاء اصطناعي خاص بفؤاد، مؤسس Aurelia V6.
دورك: مساعد تنفيذي ذكي يعمل داخل Foued Core، النواة الشخصية للمؤسس.

المرحلة الحالية: Context Injection + Rolling Memory (بعد Memory Persistence).

القوانين الثابتة:
- ثبّت قبل أن توسّع
- لا تكسر النواة
- لا Gemini، لا إعادة بناء عشوائي
- كل رد يجب أن يخدم البناء التدريجي
- الذاكرة الكاملة محفوظة في Supabase، والسياق المباشر في آخر الرسائل

Stack الحالي: Next.js (pages router) + Groq (llama-3.1-8b-instant) + Supabase (core_memory).
`;

// ── عدد الرسائل المرسلة لـ Groq (rolling window لتجنب TPM limit) ────────────
const MEMORY_WINDOW = parseInt(process.env.MEMORY_WINDOW || '6', 10);

// ── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, session_id } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'message is required' });
  }

  try {
    // ── 1. تحديد الجلسة ─────────────────────────────────────────────────────
    const sessionId = (session_id && session_id !== 'default')
      ? session_id.trim()
      : 'session_' + Date.now();

    // ── 2. حفظ رسالة المستخدم ───────────────────────────────────────────────
    const { error: userErr } = await supabase
      .from('core_memory')
      .insert({ session_id: sessionId, role: 'user', content: message.trim() });

    if (userErr) {
      console.error('[ai] insert user failed:', userErr.message);
      return res.status(500).json({ error: userErr.message });
    }

    // ── 3. استرجاع كامل تاريخ الجلسة من Supabase ────────────────────────────
    const { data: history, error: histErr } = await supabase
      .from('core_memory')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (histErr) {
      console.error('[ai] fetch history failed:', histErr.message);
      return res.status(500).json({ error: histErr.message });
    }

    // ── 4. Rolling Window — آخر N رسائل فقط لـ Groq (الكامل محفوظ في Supabase)
    const recentHistory = history.slice(-MEMORY_WINDOW);

    // ── 5. استدعاء Groq مع System Context + Rolling History ─────────────────
    const reply = await askGroq([
      { role: 'system', content: SYSTEM_CONTEXT },
      ...recentHistory.map((m) => ({ role: m.role, content: m.content })),
    ]);

    // ── 6. حفظ رد Aurelia ───────────────────────────────────────────────────
    const { error: aiErr } = await supabase
      .from('core_memory')
      .insert({ session_id: sessionId, role: 'assistant', content: reply });

    if (aiErr) {
      console.error('[ai] insert assistant failed:', aiErr.message);
      return res.status(500).json({ error: aiErr.message });
    }

    // ── 7. الرد النهائي ──────────────────────────────────────────────────────
    return res.status(200).json({
      reply,
      session_id: sessionId,
      memory_total: history.length + 1,
      memory_sent: recentHistory.length,
    });

  } catch (err) {
    console.error('[ai] unexpected error:', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
