import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const message = (req.body.message || req.body.prompt || "").trim();
  if (!message) return res.status(400).json({ error: "Message is required" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GROQ_API_KEY not configured" });

  // ─── GROQ ────────────────────────────────────────────────
  let reply = "";
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

    const groqData = await groqRes.json();
    reply = groqData?.choices?.[0]?.message?.content || "";

  } catch (err) {
    return res.status(500).json({ error: "Groq failed", message: err.message });
  }

  // ─── SUPABASE INSERT ─────────────────────────────────────
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim().replace(/\/$/, "");
  const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

  console.log("[chat] supabase_url_set:", !!supabaseUrl);
  console.log("[chat] service_role_key_set:", !!supabaseKey);
  console.log("[chat] key_starts_eyJ:", supabaseKey.startsWith("eyJ"));

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    const sessionId = req.body.session_id || "default";

    // Insert user message
    console.log("[chat] Saving user message to core_memory...");
    const { data: d1, error: e1 } = await supabase
      .from("core_memory")
      .insert({ role: "user", content: message, session_id: sessionId })
      .select();

    console.log("[chat] user insert result:", JSON.stringify({ data: d1, error: e1 }));

    // Insert assistant reply
    console.log("[chat] Saving assistant reply to core_memory...");
    const { data: d2, error: e2 } = await supabase
      .from("core_memory")
      .insert({ role: "assistant", content: reply, session_id: sessionId })
      .select();

    console.log("[chat] assistant insert result:", JSON.stringify({ data: d2, error: e2 }));

    if (e1 || e2) {
      return res.status(200).json({
        result: reply,
        response: reply,
        memory_saved: false,
        insert_errors: {
          user_error: e1 ? { code: e1.code, message: e1.message, hint: e1.hint } : null,
          assistant_error: e2 ? { code: e2.code, message: e2.message, hint: e2.hint } : null
        }
      });
    }
  } else {
    console.log("[chat] Supabase not configured — skipping memory save");
  }

  return res.status(200).json({
    result: reply,
    response: reply,
    memory_saved: !!(supabaseUrl && supabaseKey)
  });
}
