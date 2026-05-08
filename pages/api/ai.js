import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { prompt, constitution } = req.body;

    // فحص المفاتيح قبل البدء
    if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY مفقود في إعدادات Vercel");
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error("رابط Supabase مفقود");

    // طلب Gemini
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
    if (!response.ok) throw new Error(`Gemini API Error: ${data.error?.message}`);

    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    // محاولة التخزين مع معالجة خطأ قاعدة البيانات بشكل منفصل
    const { error: dbError } = await supabase
      .from("decision_ledger")
      .insert([{ prompt, answer }]);

    if (dbError) {
       console.error("Supabase Error:", dbError.message);
       // سنعيد الرد حتى لو فشل التخزين لنعرف أن الذكاء الاصطناعي يعمل
       return res.status(200).json({ answer: answer, db_status: "Database error: " + dbError.message });
    }

    return res.status(200).json({ answer });

  } catch (error) {
    // هذا السطر سيجعل رسالة الخطأ تظهر لك في الشاشة بدلاً من Internal Server Error غامضة
    return res.status(500).json({ error: error.message });
  }
}
