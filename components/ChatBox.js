import { useState, useEffect, useRef } from 'react';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // session_id ثابت طوال الجلسة — يُحفظ في localStorage
  const sessionId = useRef(null);
  useEffect(() => {
    let sid = localStorage.getItem('foued_session_id');
    if (!sid) {
      sid = 'foued_' + Date.now();
      localStorage.setItem('foued_session_id', sid);
    }
    sessionId.current = sid;
  }, []);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          session_id: sessionId.current,  // ← نفس الـ session_id دائماً
        }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'خطأ في الاتصال.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <div style={{ minHeight: 400, marginBottom: 16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '8px 0' }}>
            <strong>{m.role === 'user' ? 'فؤاد' : 'Aurelia'}:</strong> {m.content}
          </div>
        ))}
        {loading && <div>Aurelia تفكر...</div>}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, padding: 10, fontSize: 16 }}
          placeholder="اكتب رسالتك..."
        />
        <button onClick={sendMessage} disabled={loading} style={{ padding: '10px 20px' }}>
          إرسال
        </button>
      </div>
    </div>
  );
}  
