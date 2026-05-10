import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, session_id } = req.body;

  console.log('[ai] received', { session_id, message_length: message?.length });

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    console.warn('[ai] missing message');
    return res.status(400).json({ error: 'message is required' });
  }

  try {
    let sessionId = session_id?.trim() || null;

    // 1. التحقق من الجلسة أو إنشاء جلسة جديدة
    if (sessionId) {
      const { data: existing, error: fetchErr } = await supabase
        .from('foued_sessions')
        .select('id')
        .eq('id', sessionId)
        .limit(1);

      if (fetchErr) {
        console.error('[ai] error fetching session:', fetchErr.message);
        sessionId = null;
      } else if (!existing || existing.length === 0) {
        console.warn('[ai] session_id not found, creating new session');
        sessionId = null;
      } else {
        console.log('[ai] existing session found:', sessionId);
      }
    }

    if (!sessionId) {
      const { data: newSession, error: insertErr } = await supabase
        .from('foued_sessions')
        .insert({})
        .select('id')
        .single();

      if (insertErr || !newSession) {
        console.error('[ai] failed to create session:', insertErr?.message);
        return res.status(500).json({ error: 'Failed to create session' });
      }

      sessionId = newSession.id;
      console.log('[ai] new session created:', sessionId);
    }

    // 2. حفظ رسالة المستخدم
    const { data: userMsg, error: userMsgErr } = await supabase
      .from('foued_messages')
      .insert({ session_id: sessionId, role: 'user', content: message.trim() })
      .select('id')
      .single();

    if (userMsgErr) {
      console.error('[ai] failed to save user message:', userMsgErr.message);
      return res.status(500).json({ error: 'Failed to save user message' });
    }

    console.log('[ai] user message saved, id:', userMsg.id);

    // 3. تحميل كامل تاريخ المحادثة
    const { data: history, error: historyErr } = await supabase
      .from('foued_messages')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (historyErr) {
      console.error('[ai] failed to load history:', historyErr.message);
      return res.status(500).json({ error: 'Failed to load history' });
    }

    console.log('[ai] history loaded, messages:', history.length);

    // 4. استدعاء OpenAI
    const reply = await getAiReply(history);

    // 5. حفظ رد الـ AI
    const { data: assistantMsg, error: assistantMsgErr } = await supabase
      .from('foued_messages')
      .insert({ session_id: sessionId, role: 'assistant', content: reply })
      .select('id')
      .single();

    if (assistantMsgErr) {
      console.error('[ai] failed to save assistant reply:', assistantMsgErr.message);
      return res.status(500).json({ error: 'Failed to save assistant reply' });
    }

    console.log('[ai] assistant reply saved, id:', assistantMsg.id);

    // 6. عدد الرسائل الكلي
    const { count } = await supabase
      .from('foued_messages')
      .select('id', { count: 'exact', head: true })
      .eq('session_id', sessionId);

    console.log('[ai] completed. session:', sessionId, 'total messages:', count);

    return res.status(200).json({
      reply,
      session_id: sessionId,
      message_count: count,
    });

  } catch (err) {
    console.error('[ai] unexpected error:', err?.message || err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAiReply(history) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    const last = [...history].reverse().find(m => m.role === 'user');
    return `[No API Key] Echo: ${last?.content ?? ''}`;
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: history.map(m => ({ role: m.role, content: m.content })),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI error ${response.status}: ${text}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content ?? '';
}
