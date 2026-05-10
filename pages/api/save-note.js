import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { title, content } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'title is required' });
  }

  const { data, error } = await supabase
    .from('foued_notes')
    .insert({ title: title.trim(), content: content?.trim() || '' })
    .select()
    .single();

  if (error) {
    console.error('[save-note] error:', error.message);
    return res.status(500).json({ error: 'Failed to save note' });
  }

  console.log('[save-note] saved, id:', data.id);
  return res.status(201).json(data);
}
