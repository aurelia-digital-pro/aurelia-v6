// pages/api/ai.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // 1. فقط POST مسموح
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // 2. تهيئة Supabase بشكل صحيح
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    return res.status(500).json({ error: 'Server config error' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // 3. مفتاح Gemini
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error('Missing Gemini API key');
    return res.status(500).json({ error: 'Missing API key' });
  }

  try {
    // 4. الاتصال بـ Gemini - النهاية الصحيحة
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

    if (!response.ok) {
      const error = await response.text();
      console.error('Gemini error:', error);
      return res.status(500).json({ error: 'Gemini API failed' });
    }

    const data = await response.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

    // 5. حفظ في Supabase (اختياري)
    await supabase
      .from('decision_ledger')
      .insert([{ prompt, answer }]);

    return res.status(200).json({ success: true, answer });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: error.message });
  }
}
