export default function MemoryCore() {
  return (
    <div style={{
      marginTop: "40px",
      padding: "20px",
      border: "1px solid #333",
      borderRadius: "12px",
      background: "#111",
      color: "white"
    }}>
      <h2>Memory Status</h2>

      <p>✔ Core Connected</p>
      <p>✔ AI Memory Active</p>
      <p>✔ Knowledge Index Ready</p>

      <button style={{
        marginTop: "20px",
        padding: "12px 20px",
        background: "white",
        color: "black",
        border: "none",
        borderRadius: "8px"
      }}>
        Open Neural Console
      </button>
    </div>
  )
}
