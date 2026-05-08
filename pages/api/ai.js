export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { prompt, message, type, context } = req.body;
  const userMessage = prompt || message || ("Type: " + type + ". Context: " + (context || ""));
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
        "Authorization": "Bearer " + apiKey
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
        error: data.error ? data.error.message : "Groq API error"
      });
    }
    const text = data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : "";
    return res.status(200).json({
      result: text,
      response: text,
      ideas: text
    });
  } catch (err) {
    return res.status(500).json({
      error: "Runtime error",
      message: err.message
    });
  }
}
