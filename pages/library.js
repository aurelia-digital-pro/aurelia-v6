export default function Library() {
  const books = [
    {
      title: "مقدمة ابن خلدون",
      desc: "كتاب تأسيسي في علم الاجتماع والتاريخ",
      source: "Public Domain",
      url: "https://archive.org"
    },
    {
      title: "فن الحرب - سون تزو",
      desc: "استراتيجية وفكر عسكري كلاسيكي",
      source: "Public Domain",
      url: "https://archive.org"
    },
    {
      title: "النبي - جبران خليل جبران",
      desc: "نصوص فلسفية أدبية عن الحياة",
      source: "Public Domain",
      url: "https://archive.org"
    },
    {
      title: "البؤساء - فيكتور هوغو",
      desc: "رواية اجتماعية إنسانية",
      source: "Public Domain",
      url: "https://archive.org"
    },
    {
      title: "المبادئ",
      desc: "مدخل إلى التفكير العلمي والمنهجي",
      source: "Educational Resource",
      url: "https://archive.org"
    }
  ]

  return (
    <main style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <header style={styles.header}>
          <h1 style={styles.title}>Aurelia Library</h1>
          <p style={styles.subtitle}>
            Trusted Open Knowledge • Public Domain • Learning Without Barriers
          </p>
        </header>

        {/* FEATURED BOOKS */}
        <section>
          <h2 style={styles.sectionTitle}>Featured Books</h2>

          <div style={styles.grid}>
            {books.map((b, i) => (
              <div key={i} style={styles.card}>
                <h3 style={styles.bookTitle}>{b.title}</h3>
                <p style={styles.desc}>{b.desc}</p>
                <span style={styles.source}>{b.source}</span>

                <a
                  href={b.url}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.link}
                >
                  Explore Source
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* OPEN KNOWLEDGE */}
        <section style={{ marginTop: 60 }}>
          <h2 style={styles.sectionTitle}>Open Knowledge</h2>

          <ul style={styles.list}>
            <li>MIT OpenCourseWare</li>
            <li>NASA Open Data</li>
            <li>Smithsonian Open Access</li>
            <li>Internet Archive</li>
          </ul>
        </section>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <p>Built for open learning • Aurelia System</p>
        </footer>

      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#05040b",
    color: "white",
    padding: "60px 20px",
    fontFamily: "Arial"
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto"
  },
  header: {
    marginBottom: 40
  },
  title: {
    fontSize: 44,
    margin: 0,
    background: "linear-gradient(90deg,#fff,#c4b5fd)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  subtitle: {
    marginTop: 10,
    color: "#c4b5fd",
    fontSize: 16
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: "#ec4899"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 16
  },
  card: {
    padding: 18,
    borderRadius: 14,
    background: "rgba(139,92,246,0.08)",
    border: "1px solid rgba(139,92,246,0.2)"
  },
  bookTitle: {
    margin: 0,
    fontSize: 16
  },
  desc: {
    fontSize: 13,
    color: "#ddd6fe",
    marginTop: 8
  },
  source: {
    display: "block",
    marginTop: 10,
    fontSize: 11,
    color: "#a78bfa"
  },
  link: {
    display: "inline-block",
    marginTop: 12,
    color: "#ec4899",
    textDecoration: "none",
    fontSize: 13
  },
  list: {
    color: "#c4b5fd",
    lineHeight: 1.8
  },
  footer: {
    marginTop: 60,
    borderTop: "1px solid rgba(255,255,255,0.1)",
    paddingTop: 20,
    color: "#94a3b8",
    fontSize: 13,
    textAlign: "center"
  }
}