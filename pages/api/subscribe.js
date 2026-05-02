import { createClient } from '@supabase/supabase-js'

// نستخدم المتغيرات اللي تبدأ بـ NEXT_PUBLIC_ الموجودة في Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, source } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email: email, source: source || 'aurelia-website' }])
      .select()

    if (error) {
      console.log('Supabase Error:', error.message)
      return res.status(400).json({ error: error.message })
    }

    return res.status(200).json({ message: 'Successfully joined', data: data })

  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}
