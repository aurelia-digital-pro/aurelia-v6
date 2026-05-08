import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { prompt, constitution } = req.body;

    // مخاطبة جيميناي مباشرة بالمفتاح الموجود في صورتك
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${constitution}\n\n${prompt}` }] }]
        })
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Gemini Error");

    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    // محاولة الحفظ في قاعدة البيانات
    await supabase.from("decision_ledger").insert([{ prompt, answer }]);

    return res.status(200).json({ answer });
  } catch (error) {
    // سيطبع لك الخطأ الحقيقي على الشاشة لتعرف السبب
    return res.status(500).json({ error: error.message });
  }
}
