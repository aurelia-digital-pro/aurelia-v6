// ═══════════════════════════════════════════════════════════════════
// AEGION — AI LAYER v2.0
// Groq execution + command parsing.
// All calls go through here — no direct Groq fetch outside this file.
// ═══════════════════════════════════════════════════════════════════

const GROQ_MODEL = process.env.GROQ_MODEL || "llama3-8b-8192";
const GROQ_MAX_TOK = parseInt(process.env.GROQ_MAX_TOKENS || "1024", 10);
const GROQ_TEMP = parseFloat(process.env.GROQ_TEMPERATURE || "0.7");

// ═══════════════════════════════════════════════════════════════════
// askGroq
// Sends a prepared messages array to Groq.
// messages = [{ role: 'system', content }, { role: 'user', content }, ...]
// ═══════════════════════════════════════════════════════════════════
export async function askGroq(messages) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not configured");

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      max_tokens: GROQ_MAX_TOK,
      temperature: GROQ_TEMP,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error: ${err}`);
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content || "";
}

// ═══════════════════════════════════════════════════════════════════
// parseCommand
// Extracts [CMD:TYPE payload] directives from AI response text.
// Commands are the ONLY mechanism for structured AI actions.
// ═══════════════════════════════════════════════════════════════════
const VALID_COMMANDS = new Set([
  "ADD_TASK",
  "LOG_DECISION",
  "UPDATE_PHASE",
  "LOG_PROJECT",
  "LOG_FILE",
]);

export function parseCommand(text) {
  if (!text || typeof text !== "string") return [];

  const regex = /\[CMD:(\w+)\s+([^\]]+)\]/g;
  const commands = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    const type = match[1].trim().toUpperCase();
    const payload = match[2].trim();
    if (VALID_COMMANDS.has(type) && payload.length > 0) {
      commands.push({ type, payload });
    }
  }

  return commands;
}

// ═══════════════════════════════════════════════════════════════════
// estimateTokens
// Lightweight char-based token estimate (~4 chars per token).
// Used by chat.js to guard against context overflow.
// ═══════════════════════════════════════════════════════════════════
export function estimateTokens(text) {
  return Math.ceil((text || "").length / 4);
}
