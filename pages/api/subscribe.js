import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Email required' })

  const { count } = await supabase.from('subscribers').select('*', { count: 'exact', head: true })
  let tier = 'Golden Origin'
  if (count >= 1000 && count < 5000) tier = 'Silver Pioneer'
  if (count >= 5000) tier = 'Public Explorer'

  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email, tier }])
    .select('id, explorer_number, tier')
    .single()

  if (error) return res.status(400).json({ error: error.message })
  return res.status(200).json(data)
}
