export async function askGroq(messages) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq error: ${err}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

export function parseCommand(reply) {
  const pattern = /\[CMD:([\w_]+)\s*(.*?)\]/g;
  const commands = [];
  let match;
  while ((match = pattern.exec(reply)) !== null) {
    commands.push({
      type: match[1].trim(),
      payload: match[2].trim(),
    });
  }
  return commands;
}
