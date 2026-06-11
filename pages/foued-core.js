import dynamic from "next/dynamic";
import { useState } from "react";
import ChatBox from "../components/ChatBox";

export default function FouedCore() {
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);

  const SECRET_PASSWORD = "FOUED2026";

  const handleLogin = () => {
    if (password === SECRET_PASSWORD) {
      setAccess(true);
    } else {
      alert("Wrong Password");
    }
  };

  if (!access) {
    return (
      <div
        style={{
          background: "#000",
          color: "#fff",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial",
        }}
      >
        <h1>AURELIA PRIVATE ACCESS</h1>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px",
            marginTop: "20px",
            width: "250px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Access Core
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "60px",
        fontFamily: "Arial",
      }}
    >
      <h1>AURELIA MEMORY CORE</h1>

      <p>Founder Intelligence Space Activated.</p>

      <ChatBox />
    </div>
  );
}
