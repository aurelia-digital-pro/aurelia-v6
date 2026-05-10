import { createClient } from '@supabase/supabase-js';
import { askGroq } from '../../lib/ai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SYSTEM_CONTEXT = `
أنت Aurelia — ذكاء اصطناعي خاص بفؤاد، مؤسس Aurelia V6.
المرحلة الحالية: Context Injection (بعد Memory Persistence).
القوانين الثابتة:
- ثبّت قبل أن توسّع
- لا تكسر النواة
- لا Gemini، لا إعادة بناء
- كل رد يجب أن يخدم البناء التدريجي
Stack: Next.js + Groq + Supabase (core_memory).
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, session_id } = req.body;
  if (!message || typeof message !== 'string' || message.trim().length === 0)
    return res.status(400).json({ error: 'message is required' });

  try {
    const sessionId = (session_id && session_id !== 'default')
      ? session_id.trim()
      : 'session_' + Date.now();

    const { error: userErr } = await supabase
      .from('core_memory')
      .insert({ session_id: sessionId, role: 'user', content: message.trim() });
    if (userErr) return res.status(500).json({ error: userErr.message });

    const { data: history, error: histErr } = await supabase
      .from('core_memory').select('role, content')
      .eq('session_id', sessionId).order('created_at', { ascending: true });
    if (histErr) return res.status(500).json({ error: histErr.message });

    const reply = await askGroq([
      { role: 'system', content: SYSTEM_CONTEXT },
      ...history.map((m) => ({ role: m.role, content: m.content }))
    ]);

    const { error: aiErr } = await supabase
      .from('core_memory')
      .insert({ session_id: sessionId, role: 'assistant', content: reply });
    if (aiErr) return res.status(500).json({ error: aiErr.message });

    return res.status(200).json({ reply, session_id: sessionId });

  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
