import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  try {
    const { email } = req.body
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      return res.status(400).json({ error: 'Connection error' })
    }
    
    const { error } = await supabase
      .from('subscribers')
      .insert([{ 
        email: email.toLowerCase(), 
        consent: true,
        created_at: new Date().toISOString()
      }])
    
    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Already subscribed' })
      }
      return res.status(500).json({ error: 'Connection error' })
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'You have been added successfully.' 
    })
    
  } catch (err) {
    return res.status(500).json({ error: 'Connection error' })
  }
}
