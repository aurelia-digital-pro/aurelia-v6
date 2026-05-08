// pages/api/ai.js

import { createClient } from '@supabase/supabase-js';

// =========================
// إعداد Supabase
// =========================

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// =========================
// API Handler
// =========================

export default async function handler(req, res) {

  // السماح فقط بـ POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  try {

    // =========================
    // استقبال البرومبت
    // =========================

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "No prompt provided"
      });
    }

    // =========================
    // قراءة الدستور
    // =========================

    const {
      data: constitutionData,
      error: constitutionError
    } = await supabase
      .from('master_registry')
      .select('content')
      .eq('type', 'constitution')
      .single();

    if (constitutionError) {
      console.error("CONSTITUTION ERROR:", constitutionError);
    }

    const constitution =
      constitutionData?.content ||
      "You are Aurelia Core. Honest. Responsible. Helpful.";

    // =========================
    // إرسال الطلب إلى OpenAI
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

    // =========================
    // قراءة رد OpenAI
    // =========================

    const aiData = await openaiResponse.json();

    console.log("OPENAI RESPONSE:", aiData);

    // =========================
    // التحقق من الأخطاء
    // =========================

    if (aiData.error) {

      console.error("OPENAI ERROR:", aiData.error);

      return res.status(500).json({
        success: false,
        status: "OPENAI_ERROR",
        error: aiData.error.message
      });
    }

    // =========================
    // استخراج الرد
    // =========================

    const answer =
      aiData?.choices?.[0]?.message?.content ||
      "Aurelia online but no response generated.";

    // =========================
    // حفظ القرار
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
      console.error("DECISION LEDGER ERROR:", insertError);
    }

    // =========================
    // الرد النهائي
    // =========================

    return res.status(200).json({
      success: true,
      status: "AURELIA_CORE_ONLINE",
      answer: answer
    });

  } catch (error) {

    console.error("AURELIA CORE ERROR:", error);

    return res.status(500).json({
      success: false,
      status: "AURELIA_CORE_FAILURE",
      error: error.message
    });
  }
}
