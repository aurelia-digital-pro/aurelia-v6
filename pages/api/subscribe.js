import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, consent } = req.body;
  const blockedDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 'yopmail.com'];

  if (!email ||!email.includes('@')) return res.status(400).json({ error: 'البريد غير صالح' });
  
  const isBlocked = blockedDomains.some(d => email.trim().toLowerCase().endsWith(d));
  if (isBlocked) return res.status(400).json({ error: 'الإيميلات المؤقتة محظورة' });

  try {
    const { error } = await supabase
     .from('subscribers')
     .insert([{ email: email.trim(), consent, created_at: new Date() }]);

    if (error) throw error;

    return res.status(200).json({ 
      message: 'تم تسجيل وصولك المبكر بنجاح',
      contact: 'fouedsendi185@gmail.com'
    });
  } catch (error) {
    return res.status(500).json({ error: 'خطأ في قاعدة البيانات' });
  }
}
