import MemoryPanel from "../components/MemoryPanel"

export default function Foued() {
  return (
    <div
      style={{
        background: "#000",
        color: "white",
        minHeight: "100vh",
        padding: "60px",
        fontFamily: "serif"
      }}
    >
      <h1
        style={{
          fontSize: "72px",
          lineHeight: "0.95"
        }}
      >
        AURELIA
        <br />
        MEMORY
        <br />
        CORE
      </h1>

      <p
        style={{
          marginTop: "30px",
          fontSize: "24px",
          maxWidth: "700px",
          color: "#ccc"
        }}
      >
        Central intelligence system for knowledge indexing and private AI memory.
      </p>

      <MemoryPanel />
    </div>
  )
}
