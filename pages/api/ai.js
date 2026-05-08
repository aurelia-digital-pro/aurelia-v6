Evaluating Gemini API quota limitations (10 seconds)
المشكلة الآن واضحة تمامًا: limit: 0 يعني أن الـ API Key مرتبط بمشروع Google Cloud لا يملك quota مُفعّل لـ gemini-2.0-flash. هذا ليس مشكلة كود.

الحل الأسرع والمجاني 100%: استبدال Gemini بـ Groq

Groq: مجاني بالكامل، سريع جدًا، يعمل من تونس، لا يحتاج بطاقة بنكية.

الخطوة 1 — احصل على Groq API Key (دقيقتان):

اذهب إلى: console.groq.com → سجّل بـ Google → API Keys → Create Key

الخطوة 2 — الكود النهائي pages/api/ai.js:

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { prompt, message, type, context } = req.body;
  const userMessage = prompt || message || `Type: ${type}. Context: ${context}`;
  if (!userMessage) {
    return res.status(400).json({ error: "No message provided" });
  }
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY is not configured" });
  }
  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 2048
      })
    });
    const data = await groqRes.json();
    if (!groqRes.ok) {
      return res.status(groqRes.status).json({
        error: data?.error?.message || "Groq API error"
      });
    }
    const text = data?.choices?.[0]?.message?.content || "";
    return res.status(200).json({ result: text, response: text, ideas: text });
  } catch (err) {
    return res.status(500).json({ error: "Runtime error", message: err.message });
  }
}

الخطوة 3 — Vercel Environment Variables:

أضف متغير جديد:

GROQ_API_KEY = gsk_...الـ key من Groq Console

الخطوة 4 — Redeploy

3 دقائق وFoued Core يعمل. Groq مجاني حتى 14,400 request/يوم على llama-3.1-8b-instant.

إذا أردت البقاء مع Gemini بدلًا من ذلك:
افتح aistudio.google.com/apikey → أنشئ key جديد → استخدم موديل gemini-1.5-flash-8b (الأكثر quota في المجاني). لكن Groq أسرع وأضمن.

Next, I can update the code to try Groq first and fall back to Gemini automatically if one fails, so you never have downtime. Would you like me to do that?
