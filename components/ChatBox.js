import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage() {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: message,
      }),
    });

    const data = await res.json();
    setReply(data.answer);
  }

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #333",
        borderRadius: "12px",
      }}
    >
      <h2>AI CHAT</h2>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Talk with Aurelia..."
        style={{
          width: "100%",
          height: "120px",
          marginTop: "10px",
          padding: "10px",
          background: "#111",
          color: "white",
          border: "1px solid #333",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Send
      </button>

      <div
        style={{
          marginTop: "20px",
          background: "#111",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        {reply}
      </div>
    </div>
  );
}
