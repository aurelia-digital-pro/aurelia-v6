import { saveMessage, getHistory } from "../../lib/memory";
import { askGroq } from "../../lib/ai";

var SYSTEM_PROMPT = "You are Aurelia, an intelligent AI workspace assistant built for a founder named Foued. Be direct, clear, and useful.";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  var message = req.body.message;
  var session_id = req.body.session_id;
  var sessionId = session_id || "default";

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    await saveMessage("user", message.trim(), sessionId);

    var history = await getHistory(sessionId, 20);

    var messages = [{ role: "system", content: SYSTEM_PROMPT }];
    for (var i = 0; i < history.length; i++) {
      messages.push({ role: history[i].role, content: history[i].content });
    }

    var reply = await askGroq(messages);

    await saveMessage("assistant", reply, sessionId);

    return res.status(200).json({ result: reply, response: reply });

  } catch (err) {
    console.error("[chat] error:", err.message);
    return res.status(500).json({ error: "Chat failed", message: err.message });
  }
}
