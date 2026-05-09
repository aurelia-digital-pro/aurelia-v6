export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const message = req.body.message || req.body.prompt || "";

  if (!message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY not configured" });
  }

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are Aurelia, an intelligent AI workspace assistant." },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content || "";

    return res.status(200).json({ result: reply, response: reply });

  } catch (err) {
    return res.status(500).json({ error: "Runtime error", message: err.message });
  }
}
