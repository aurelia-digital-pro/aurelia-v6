// pages/api/ai.js

import { createClient } from '@supabase/supabase-js';

// إعداد Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {

  // السماح فقط بـ POST
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { prompt } = req.body;

    // التحقق من وجود prompt
    if (!prompt) {
      return res.status(400).json({
        error: "No prompt provided"
      });
    }

    // =========================
    // 1. قراءة الدستور من Supabase
    // =========================

    const { data: constitutionData, error: constitutionError } =
      await supabase
        .from('master_registry')
        .select('content')
        .eq('type', 'constitution')
        .single();

    if (constitutionError) {
      console.error("Constitution Error:", constitutionError);
    }

    const constitution =
      constitutionData?.content ||
      "You are Aurelia Core. Honest. Responsible. Helpful.";

    // =========================
    // 2. إرسال الطلب إلى OpenAI
    // =========================

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({
          model: "gpt-4-turbo",

          messages: [
            {
              role: "system",
              content: constitution
            },
            {
              role: "user",
              content: prompt
            }
          ],

          temperature: 0.7,
          max_tokens: 700
        })
      }
    );

    const aiData = await openaiResponse.json();

    const answer =
      aiData?.choices?.[0]?.message?.content ||
      "No response generated.";

    // =========================
    // 3. حفظ القرار في الذاكرة الدائمة
    // =========================

    const { error: insertError } =
      await supabase
        .from('decision_ledger')
        .insert([
          {
            prompt: prompt,
            answer: answer
          }
        ]);

    if (insertError) {
      console.error("Decision Ledger Error:", insertError);
    }

    // =========================
    // 4. الرد النهائي
    // =========================

    return res.status(200).json({
      success: true,
      status: "AURELIA_CORE_ONLINE",
      answer: answer
    });

  } catch (error) {

    console.error("Aurelia Core Error:", error);

    return res.status(500).json({
      success: false,
      status: "AURELIA_CORE_FAILURE",
      error: error.message
    });
  }
}
