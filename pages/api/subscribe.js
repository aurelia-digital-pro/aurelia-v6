import { createClient } from '@supabase/supabase-js'

// pages/api/subscribe.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email } = req.body
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    // نربط مع Supabase هنا
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    )

    const { error } = await supabase
      .from('subscribers')
      .insert({ email: email })

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ message: 'Database error' })
    }

    return res.status(200).json({ message: 'Subscribed successfully' })

  } catch (error) {
    console.error('Subscribe error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
