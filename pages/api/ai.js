// pages/api/ai.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // تهيئة Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseKey);

  // مفتاح Gemini السيادي
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'System Error: GEMINI_API_KEY is not defined in Vercel settings.' });
  }

  try {
    // الاتصال بـ Gemini باستخدام نموذج 1.5-flash المستقر
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // هنا تكمن الحقيقة: سيخبرك النظام لماذا فشل (هل المفتاح خطأ؟ أم المنطقة محظورة؟)
      console.error('Gemini Failure Details:', data);
      return res.status(response.status).json({ 
        error: `Gemini API Error: ${data.error?.message || 'Unknown Failure'}`,
        status: response.status 
      });
    }

    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

    // حفظ في سجل القرارات (Aurelia Ledger)
    try {
      await supabase
        .from('decision_ledger')
        .insert([{ prompt, answer }]);
    } catch (dbError) {
      console.error('Supabase logging failed, but AI answer was generated.');
    }

    return res.status(200).json({ success: true, answer });

  } catch (error) {
    console.error('Critical Server Error:', error);
    return res.status(500).json({ error: `Server Crash: ${error.message}` });
  }
}
