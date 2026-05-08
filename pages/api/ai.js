import { createClient } from '@supabase/supabase-js';

// إعداد Supabase باستخدام الأسماء الموجودة في صورتك بالضبط
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt, constitution } = req.body;

  try {
    console.log("--- Connecting to Gemini API ---");

    // استخدام مفتاح Gemini الموجود في صورتك
    const GEMINI_KEY = process.env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `${constitution}\n\nUser Question: ${prompt}` }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini Error Details:", data);
      throw new Error(data.error?.message || "Gemini API Error");
    }

    // استخراج الرد من هيكلية Gemini
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

    console.log("AI Answer Generated.");

    // التخزين في Supabase بنفس أسماء الأعمدة السابقة
    const { error: dbError } = await supabase
      .from("decision_ledger")
      .insert([
        {
          prompt: prompt,
          answer: answer,
          created_at: new Date().toISOString()
        }
      ]);

    if (dbError) console.error("Database Log Error:", dbError);

    return res.status(200).json({ answer });

  } catch (error) {
    console.error("Critical Failure:", error.message);
    return res.status(500).json({ 
      error: "Internal Server Error", 
      details: error.message 
    });
  }
}
