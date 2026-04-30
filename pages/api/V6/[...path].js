import { supabaseAdmin } from '../../../lib/supabaseAdmin'

export default async function handler(req, res) {
  const { data, error } = await supabaseAdmin.from('documents').select('*').limit(10)
  if (error) return res.status(500).json({ error: error.message })
  res.status(200).json({ library: "Aurelia Memory Engine V6", data })
}