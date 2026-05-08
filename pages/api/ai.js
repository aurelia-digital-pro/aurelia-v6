import { createClient } from '@supabase/supabase-js';

// إعداد Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // يفضل استخدام Service Role للحفظ في الـ Ledger
);

export default async function handler(req, res) {
  // 1. السماح فقط بطلبات POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt, constitution } = req.body;

  // 2. التحقق من المدخلات
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  console.log("--- Starting AI Generation for Aurelia ---");

  try {
    // 3. طلب OpenAI API
    const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: constitution || "You are Aurelia AI." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    const aiData = await openAiResponse.json();

    // فحص إذا كان هناك خطأ من طرف OpenAI
    if (!openAiResponse.ok) {
      console.error("OpenAI Error:", aiData);
      throw new Error(aiData.error?.message || "Failed to fetch from OpenAI");
    }

    const answer = aiData.choices?.[0]?.message?.content;

    if (!answer) {
      throw new Error("No answer generated from AI model.");
    }

    console.log("AI Response received successfully.");

    // 4. تخزين البيانات في Supabase (decision_ledger)
    const { error: supabaseError } = await supabase
      .from("decision_ledger")
      .insert([
        {
          prompt: prompt,
          answer: answer,
          created_at: new Date().toISOString()
        }
      ]);

    if (supabaseError) {
      console.error("Supabase Storage Error:", supabaseError);
      // لا نعطل الرد للمستخدم إذا فشل التخزين، لكن نسجله
    } else {
      console.log("Data saved to decision_ledger.");
    }

    // 5. إرجاع الرد النهائي للواجهة
    return res.status(200).json({
      success: true,
      answer: answer
    });

  } catch (error) {
    console.error("CRITICAL ERROR in /api/ai:", error.message);
    
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message
    });
  }
}
