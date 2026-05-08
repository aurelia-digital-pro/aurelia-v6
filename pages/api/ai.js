import { createClient } from '@supabase/supabase-js';

// الربط بالمفاتيح التي أضفتها في Vercel
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const  { prompt } = req.body;

if (prompt.includes("ما اسمي")) {
  return res.status(200).json({
    reply: "اسمك Foued يا مؤسس Aurelia."
  });
}


    // 1. قراءة الدستور من الجدول الجديد (master_registry)
    const { data: constitution } = await supabase
      .from('master_registry')
      .select('content')
      .eq('type', 'constitution')
      .single();

    // 2. إرسال الطلب للمحرك (GPT-4) مع حقن الدستور
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: `أنت Aurelia Core. دستورك: ${constitution?.content}. المؤسس: فؤاد السندي. مسموح لك بتطوير الكود واقتراح تحسينات لحماية السيادة الرقمية.` },
          { role: "user", content: prompt }
        ]
      })
    });

    const aiData = await response.json();
    const answer = aiData.choices[0].message.content;

    // 3. حفظ القرار في سجل النمو (decision_ledger) ليتطور النظام
    await supabase.from('decision_ledger').insert([
      { prompt: prompt, answer: answer }
    ]);

    return res.status(200).json({ answer });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Aurelia Core Fault" });
  }
}
