import { memory } from "../../lib/memory";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { prompt } = req.body;

    memory.push({
      role: "user",
      content: prompt,
    });

    const answer = `
Aurelia Memory Active.

I remember:
${memory.map((m) => `${m.role}: ${m.content}`).join("\n")}
`;

    memory.push({
      role: "assistant",
      content: answer,
    });

    return res.status(200).json({
      answer,
    });
  } catch (error) {
    return res.status(500).json({
      error: "AI server error",
    });
  }
}
