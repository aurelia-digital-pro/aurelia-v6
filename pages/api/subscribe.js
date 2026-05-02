import { createClient } from '@supabase/supabase-js'

// ناخذ المفاتيح من Vercel - نفس الاسم بالضبط
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  // نقبل POST فقط
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email } = req.body

    // نتأكد الإيميل موجود
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // ندخل الإيميل في جدول subscribers
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email: email }])

    if (error) {
      // لو الإيميل مكرر أو فيه مشكلة
      return res.status(400).json({ error: error.message })
    }

    // نجح كل شي
    return res.status(200).json({ message: 'تم الاشتراك بنجاح', data: data })

  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}
