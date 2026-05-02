// pages/api/subscribe.js
export default async function handler(req, res) {
  // نقبل POST فقط
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email } = req.body

    // تحقق بسيط من الايميل
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    // مؤقتاً: نطبع الايميل في سجلات Vercel
    // الخطوة الجاية نربطه مع Supabase للحفظ الدائم
    console.log('New subscriber:', email)

    // نجاح
    return res.status(200).json({ message: 'Subscribed successfully' })

  } catch (error) {
    console.error('Subscribe error:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
