export async function askGroq(messages) {
  var apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  var res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: messages,
      temperature: 0.7,
      max_tokens: 2048
    })
  });

  var data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ? data.error.message : "Groq API error");
  }

  return data.choices[0].message.content || "";
}
