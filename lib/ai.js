const GROQ_MODEL   = process.env.GROQ_MODEL        || 'llama3-8b-8192';
const GROQ_MAX_TOK = parseInt(process.env.GROQ_MAX_TOKENS   || '1024', 10);
const GROQ_TEMP    = parseFloat(process.env.GROQ_TEMPERATURE || '0.7');

export async function askGroq(messages) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY not configured');

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model:       GROQ_MODEL,
      messages,
      max_tokens:  GROQ_MAX_TOK,
      temperature: GROQ_TEMP,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error: ${err}`);
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content || '';
}

export function parseCommand(text) {
  if (!text || typeof text !== 'string') return [];

  const VALID = new Set([
    'ADD_TASK', 'LOG_DECISION', 'UPDATE_PHASE', 'LOG_PROJECT', 'LOG_FILE',
  ]);

  const regex = /\[CMD:(\w+)\s+([^\]]+)\]/g;
  const commands = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    const type    = match[1].trim().toUpperCase();
    const payload = match[2].trim();
    if (VALID.has(type) && payload.length > 0) {
      commands.push({ type, payload });
    }
  }

  return commands;
}

export function estimateTokens(text) {
  return Math.ceil((text || '').length / 4);
}
