import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const message = (req.body.message || req.body.prompt || "").trim();
  if (!message) return res.status(400).json({ error: "Message is required" });

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) return res.status(500).json({ error: "GROQ_API_KEY not configured" });

  const history = req.body.history || [];

  let reply = "";
  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + groqKey
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are Aurelia, an intelligent AI workspace assistant built for a founder named Foued." },
          ...history.slice(-10),
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    const groqData = await groqRes.json();
    if (!groqRes.ok) return res.status(groqRes.status).json({ error: groqData?.error?.message });
    reply = groqData?.choices?.[0]?.message?.content || "";

  } catch (err) {
    return res.status(500).json({ error: "Groq failed", message: err.message });
  }

  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim().replace(/\/$/, "");
  const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  const sessionId = req.body.session_id || "default";

  if (supabaseUrl && supabaseKey) {
    try {
      const db = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false }
      });
      await db.from("core_memory").insert({ role: "user", content: message, session_id: sessionId });
      await db.from("core_memory").insert({ role: "assistant", content: reply, session_id: sessionId });
    } catch (err) {
      console.error("[memory]", err.message);
    }
  }

  return res.status(200).json({ result: reply, response: reply, ideas: reply });
}
