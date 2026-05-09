import { saveMessage, getHistory } from "../../lib/memory";
import { askGroq } from "../../lib/ai";

const SYSTEM_PROMPT = `You are Aurelia, an intelligent AI workspace assistant built for a founder named Foued.
You help with projects, strategy, knowledge management, and digital workflows.
Be direct, clear, and useful. Never add unnecessary filler.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, session_id } = req.body;
  const sessionId = session_id || "default";

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // 1. حفظ رسالة المستخدم
    await saveMessage("user", message.trim(), sessionId);

    // 2. جلب تاريخ المحادثة
    const history = await getHistory(sessionId, 20);

    // 3. بناء قائمة الرسائل لـ Groq
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((h) => ({ role: h.role, content: h.content }))
    ];

    // 4. إرسال إلى Groq
    const reply = await askGroq(messages);

    // 5. حفظ رد Aurelia
    await saveMessage("assistant", reply, sessionId);

    // 6. إرجاع الرد
    return res.status(200).json({
      result: reply,
      response: reply
    });

  } catch (err) {
    console.error("Chat error:", err.message);
    return res.status(500).json({
      error: "Chat failed",
      message: err.message
    });
  }
}
