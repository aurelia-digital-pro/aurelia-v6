import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { email, consent } = req.body

    if (!consent) {
      return res.status(400).json({ error: 'Consent is required. Please accept Privacy Policy.' })
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address.' })
    }

    const cleanEmail = email.trim().toLowerCase()

    const { error } = await supabase
      .from('subscribers')
      .insert([{ 
        email: cleanEmail, 
        consent: true,
        consent_timestamp: new Date().toISOString(),
        ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        user_agent: req.headers['user-agent']
      }])

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'This email is already on the waitlist.' })
      }
      return res.status(500).json({ error: 'Database error. Please try again.' })
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Welcome aboard! You are on the Aurelia waitlist.' 
    })

  } catch (err) {
    return res.status(500).json({ error: 'Server error. Please try again.' })
  }
}
