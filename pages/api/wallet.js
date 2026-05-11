import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wallet_address, session_id } = req.body;

  if (!wallet_address || !session_id) {
    return res.status(400).json({ error: 'wallet_address and session_id are required' });
  }

  try {
    // حفظ wallet داخل execution_memory مرتبط بالـ session
    const { error } = await supabase
      .from('execution_memory')
      .upsert(
        {
          type: 'WALLET_IDENTITY',
          key: 'wallet_address',
          value: wallet_address,
          session_id: session_id,
        },
        { onConflict: 'type,session_id' }
      );

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({
      success: true,
      wallet_address,
      session_id,
    });

  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
