export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, message, type, context } = req.body;
  const userMessage = prompt || message || `Type: ${type}. Context: ${context}`;

  if (!userMessage) {
    return res.status(400).json({ error: "No message provided" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  const MODEL = "gemini-2.0-flash";
  const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  const body = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: userMessage
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048
    }
  });

  try {
    const geminiRes = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      return res.status(geminiRes.status).json({
        error: data?.error?.message || "Gemini API error",
        code: data?.error?.code,
        status: data?.error?.status
      });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return res.status(200).json({ result: text, response: text, ideas: text });

  } catch (err) {
    return res.status(500).json({ error: "Runtime error", message: err.message });
  }
}
