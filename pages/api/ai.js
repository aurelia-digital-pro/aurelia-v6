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

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Missing GEMINI_API_KEY in Vercel settings.' });
  }

  try {
    // الحل هنا: قمت بتغيير v1beta إلى v1 وتحديث الرابط
    const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-:generateContent?key=${GEMINI_API_KEY}`,
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
      console.error('Gemini Detail:', data);
      return res.status(response.status).json({ 
        error: data.error?.message || 'Gemini API call failed' 
      });
    }

    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI';

    // حفظ في Supabase
    try {
      await supabase.from('decision_ledger').insert([{ prompt, answer }]);
    } catch (e) {
      console.log('Logging to DB failed, but continuing...');
    }

    return res.status(200).json({ success: true, answer });

  } catch (error) {
    return res.status(500).json({ error: `Server Error: ${error.message}` });
  }
}
