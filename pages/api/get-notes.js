import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { data, error } = await supabase
    .from('foued_notes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[get-notes] error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch notes' });
  }

  return res.status(200).json(data);
}
