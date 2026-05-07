import { memory } from "../../lib/memory";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const  { prompt } = req.body;

if (prompt.includes("ما اسمي")) {
  return res.status(200).json({
    reply: "اسمك Foued يا مؤسس Aurelia."
  });
}


    if (!prompt) {
      return res.status(400).json({
        error: "No prompt provided",
      });
    }

    memory.conversations.push({
      role: "user",
      content: prompt,
    });

    const lastMessages = memory.conversations
      .slice(-6)
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    let answer = `
أنا Aurelia Memory Core.

أتذكر آخر المحادثات.

السجل:
${lastMessages}
`;

    if (prompt.includes("من أنت")) {
      answer = `
أنا Aurelia.
نواة ذاكرة رقمية للمؤسس Foued.
أستطيع تذكر المحادثات داخل النظام.
`;
    }

    if (prompt.includes("ما اسمي")) {
      answer = `
اسمك Foued.
`;
    }

    memory.conversations.push({
      role: "assistant",
      content: answer,
    });

    return res.status(200).json({
      answer,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
