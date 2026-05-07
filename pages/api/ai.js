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

    const lastMessages = memory
      .slice(-6)
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    let answer = `
أنا Aurelia Memory Core.
أتذكر المحادثة الأخيرة.

السجل:
${lastMessages}
`;

    if (prompt.includes("من أنت")) {
      answer = `
أنا Aurelia.
نواة ذاكرة رقمية للمؤسس Foued.
أستطيع حفظ المحادثات وتذكرها داخل النظام.
`;
    }

    if (prompt.includes("ما اسمي")) {
      const userMemory = memory.find(
        (m) =>
          m.role === "user" &&
          m.content.includes("اسمي")
      );

      if (userMemory) {
        answer = `
أتذكر أنك قلت:
${userMemory.content}
`;
      }
    }

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
