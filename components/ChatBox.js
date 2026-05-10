import { useState } from "react";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, session_id: sessionId }),
      });

      const data = await res.json();

      if (data.session_id) setSessionId(data.session_id);

      const reply = data.reply || data.result || data.error || "No response";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: "sans-serif" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {messages.length === 0 && (
          <p style={{ color: "#666", textAlign: "center", marginTop: "2rem" }}>Aurelia is ready.</p>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "80%", padding: "0.6rem 1rem", borderRadius: "1rem", background: m.role === "user" ? "#6366f1" : "#1e1e2e", color: "#fff", lineHeight: "1.5", whiteSpace: "pre-wrap" }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ color: "#888", fontStyle: "italic", paddingLeft: "0.5rem" }}>Aurelia is thinking...</div>}
      </div>
      <div style={{ display: "flex", gap: "0.5rem", padding: "1rem", borderTop: "1px solid #222" }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey} placeholder="Message Aurelia..." disabled={loading}
          style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "0.5rem", border: "1px solid #333", background: "#111", color: "#fff", fontSize: "1rem", outline: "none" }} />
        <button onClick={send} disabled={loading}
          style={{ padding: "0.75rem 1.5rem", borderRadius: "0.5rem", background: loading ? "#444" : "#6366f1", color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer", fontSize: "1rem", fontWeight: "600" }}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
