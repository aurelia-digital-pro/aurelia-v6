import { createClient } from '@supabase/supabase-js';
import { askGroq } from '../../lib/ai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, session_id } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'message is required' });
  }

  try {
    // session_id: استخدم الموجود أو أنشئ جديد
    const sessionId = (session_id && session_id !== 'default')
      ? session_id.trim()
      : 'session_' + Date.now();

    // 1. حفظ رسالة المستخدم
    const { error: userErr } = await supabase
      .from('core_memory')
      .insert({ session_id: sessionId, role: 'user', content: message.trim() });

    if (userErr) {
      console.error('[ai] insert user failed:', userErr.message);
      return res.status(500).json({ error: 'Failed to save message: ' + userErr.message });
    }

    // 2. تحميل كامل تاريخ الجلسة
    const { data: history, error: histErr } = await supabase
      .from('core_memory')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (histErr) {
      console.error('[ai] fetch history failed:', histErr.message);
      return res.status(500).json({ error: 'Failed to load history: ' + histErr.message });
    }

    // 3. إرسال كامل التاريخ إلى Groq
    const reply = await askGroq(
      history.map((m) => ({ role: m.role, content: m.content }))
    );

    // 4. حفظ رد Groq
    const { error: aiErr } = await supabase
      .from('core_memory')
      .insert({ session_id: sessionId, role: 'assistant', content: reply });

    if (aiErr) {
      console.error('[ai] insert assistant failed:', aiErr.message);
      return res.status(500).json({ error: 'Failed to save reply: ' + aiErr.message });
    }

    return res.status(200).json({ reply, session_id: sessionId });

  } catch (err) {
    console.error('[ai] error:', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
