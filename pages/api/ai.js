import { createClient } from '@supabase/supabase-js';

// إعداد عميل Supabase باستخدام المتغيرات البيئية في Vercel
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided" });
    }

    // 1. جلب "الدستور" من جدول master_registry لضمان شخصية Aurelia
    const { data: constitutionData } = await supabase
      .from('master_registry')
      .select('content')
      .eq('type', 'constitution')
      .single();

    const constitution = constitutionData?.content || "أنت Aurelia Core.";

    // 2. إرسال الطلب إلى OpenAI gpt-4-turbo
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: constitution },
          { role: "user", content: prompt }
        ]
      })
    });

    const aiData = await response.json();
    const answer = aiData.choices?.[0]?.message?.content || "لا يوجد رد.";

    // 3. النمو الذاتي: الحفظ التلقائي في جدول decision_ledger
    await supabase.from('decision_ledger').insert([
      { 
        prompt: prompt, 
        answer: answer 
      }
    ]);

    // 4. الرد النهائي للواجهة الأمامية
    return res.status(200).json({ answer: answer });

  } catch (error) {
    console.error("Aurelia Error:", error);
    return res.status(500).json({ error: "Fault: " + error.message });
  }
}
