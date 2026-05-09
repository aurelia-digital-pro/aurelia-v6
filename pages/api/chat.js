import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const message = req.body.message || "test message";
  const sessionId = req.body.session_id || "debug-session";

  const debugLog = {
    supabase_url_present: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    service_role_key_present: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    groq_key_present: !!process.env.GROQ_API_KEY,
    message_received: message,
    session_id: sessionId
  };

  // ─── TEST INSERT DIRECTLY ───────────────────────────────
  const { data: insertData, error: insertError } = await supabase
    .from("core_memory")
    .insert({
      role: "user",
      content: message,
      session_id: sessionId
    })
    .select();

  if (insertError) {
    console.error("[DEBUG] Insert failed:", JSON.stringify(insertError));
    return res.status(200).json({
      debug: true,
      memory_saved: false,
      insert_error: {
        message: insertError.message,
        code: insertError.code,
        details: insertError.details,
        hint: insertError.hint
      },
      env_check: debugLog
    });
  }

  console.log("[DEBUG] Insert succeeded:", JSON.stringify(insertData));

  // ─── GROQ ───────────────────────────────────────────────
  let reply = "Memory test done. Groq not called in debug mode.";

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are Aurelia." },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 512
      })
    });

    const groqData = await groqRes.json();
    reply = groqData?.choices?.[0]?.message?.content || "No reply";

    // Insert assistant reply
    await supabase.from("core_memory").insert({
      role: "assistant",
      content: reply,
      session_id: sessionId
    });

  } catch (groqErr) {
    console.error("[DEBUG] Groq error:", groqErr.message);
  }

  return res.status(200).json({
    debug: true,
    memory_saved: true,
    inserted_row: insertData,
    result: reply,
    response: reply,
    env_check: debugLog
  });
}
