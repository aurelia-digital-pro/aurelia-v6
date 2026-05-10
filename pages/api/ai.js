import { createClient } from '@supabase/supabase-js';
import { askGroq, parseCommand } from '../../lib/ai';
import { buildSystemContext } from '../../lib/constitution';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const MEMORY_WINDOW = parseInt(process.env.MEMORY_WINDOW || '6', 10);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, session_id } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'message is required' });
  }

  try {
    const sessionId = (session_id && session_id !== 'default')
      ? session_id.trim()
      : 'session_' + Date.now();

    // 1. حفظ رسالة المستخدم
    const { error: userErr } = await supabase
      .from('core_memory')
      .insert({ session_id: sessionId, role: 'user', content: message.trim() });

    if (userErr) return res.status(500).json({ error: userErr.message });

    // 2. استرجاع التاريخ
    const { data: history, error: histErr } = await supabase
      .from('core_memory')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (histErr) return res.status(500).json({ error: histErr.message });

    // 3. System Context من Supabase
    const systemContext = await buildSystemContext();

    // 4. Rolling Window
    const recentHistory = history.slice(-MEMORY_WINDOW);

    // 5. استدعاء Groq
    const reply = await askGroq([
      { role: 'system', content: systemContext },
      ...recentHistory.map((m) => ({ role: m.role, content: m.content })),
    ]);

    // 6. استخراج الأوامر
    const commands = parseCommand(reply);

    // 7. حفظ الأوامر في execution_memory
    if (commands.length > 0) {
      const rows = commands.map((cmd) => ({
        type: cmd.type,
        key: cmd.type.toLowerCase(),
        value: cmd.payload,
        session_id: sessionId,
      }));
      await supabase.from('execution_memory').insert(rows);
    }

    // 8. حفظ رد Aurelia
    const { error: aiErr } = await supabase
      .from('core_memory')
      .insert({ session_id: sessionId, role: 'assistant', content: reply });

    if (aiErr) return res.status(500).json({ error: aiErr.message });

    return res.status(200).json({
      reply,
      session_id: sessionId,
      memory_total: history.length + 1,
      memory_sent: recentHistory.length,
      commands,
    });

  } catch (err) {
    console.error('[ai] error:', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
