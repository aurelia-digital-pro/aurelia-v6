import { createClient } from '@supabase/supabase-js';
import { askGroq } from '../../lib/ai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, session_id } = req.body;
  console.log('[ai] received', { session_id, message_length: message?.length });

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'message is required' });
  }

  try {
    let sessionId = (session_id && session_id !== 'default') ? session_id.trim() : null;

    if (sessionId) {
      const { data: existing } = await supabase
        .from('foued_sessions').select('id').eq('id', sessionId).limit(1);
      if (!existing || existing.length === 0) {
        console.warn('[ai] session not found, creating new');
        sessionId = null;
      } else {
        console.log('[ai] session found:', sessionId);
      }
    }

    if (!sessionId) {
      const { data: newSession, error: insertErr } = await supabase
        .from('foued_sessions').insert({}).select('id').single();
      if (insertErr || !newSession) {
        console.error('[ai] create session failed:', insertErr?.message);
        return res.status(500).json({ error: 'Failed to create session' });
      }
      sessionId = newSession.id;
      console.log('[ai] new session:', sessionId);
    }

    const { data: userMsg, error: userErr } = await supabase
      .from('foued_messages')
      .insert({ session_id: sessionId, role: 'user', content: message.trim() })
      .select('id').single();

    if (userErr) {
      console.error('[ai] save user message failed:', userErr.message);
      return res.status(500).json({ error: 'Failed to save message' });
    }
    console.log('[ai] user message saved:', userMsg.id);

    const { data: history, error: histErr } = await supabase
      .from('foued_messages').select('role, content')
      .eq('session_id', sessionId).order('created_at', { ascending: true });

    if (histErr) {
      console.error('[ai] load history failed:', histErr.message);
      return res.status(500).json({ error: 'Failed to load history' });
    }
    console.log('[ai] history:', history.length, 'messages');

    const reply = await askGroq(
      history.map((m) => ({ role: m.role, content: m.content }))
    );

    console.log('[ai] groq reply received');

    const { data: aiMsg, error: aiErr } = await supabase
      .from('foued_messages')
      .insert({ session_id: sessionId, role: 'assistant', content: reply })
      .select('id').single();

    if (aiErr) {
      console.error('[ai] save reply failed:', aiErr.message);
      return res.status(500).json({ error: 'Failed to save reply' });
    }
    console.log('[ai] assistant reply saved:', aiMsg.id);

    const { count } = await supabase
      .from('foued_messages').select('id', { count: 'exact', head: true })
      .eq('session_id', sessionId);

    console.log('[ai] done. session:', sessionId, 'total:', count);
    return res.status(200).json({ reply, session_id: sessionId, message_count: count });

  } catch (err) {
    console.error('[ai] unexpected error:', err?.message || err);
    return res.status(500).json({ error: 'Internal server error: ' + (err?.message || 'unknown') });
  }
}
