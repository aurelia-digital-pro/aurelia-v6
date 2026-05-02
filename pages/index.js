// pages/index.js
import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (res.ok) {
        setDone(true)
        setEmail('')
      } else {
        alert('صار خطأ. حاول مرة ثانية')
      }
    } catch (err) {
      alert('مشكلة في الاتصال')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Aurelia Digital Library</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="page">
        <section className="hero">
          <nav className="nav">
            <div className="logo">Aurelia</div>
            <button className="navBtn">Request Access</button>
          </nav>

          <div className="heroGrid">
            <div className="left">
              <span className="badge">
                Building The Future of Knowledge
              </span>
              <h1>
                Where Science
                <br />
                Meets Evolution
              </h1>
              <p>
                Open digital library powered by legal global sources,
                future education systems, and intelligent reading tools.
              </p>

              <form onSubmit={submitForm} className="form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                  {loading ? 'Loading...' : 'Request Early Access'}
                </button>
              </form>

              {done && <small className="success">Successfully joined. We'll be in touch!</small>}
            </div>

            <div className="right">
              <div className="core">
                <div className="ring ring1"></div>
                <div className="ring ring2"></div>
                <div className="ring ring3"></div>
                <div className="cube">A</div>
                <span className="dot d1"></span>
                <span className="dot d2"></span>
                <span className="dot d3"></span>
                <span className="dot d4"></span>
              </div>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="card">
            <h3>Freedom of Knowledge</h3>
            <p>Millions of open books and research papers.</p>
          </div>
          <div className="card">
            <h3>AI Native Core</h3>
            <p>Smart summaries, recommendations and analytics.</p>
          </div>
          <div className="card">
            <h3>Built for Generations</h3>
            <p>Modern infrastructure for schools and readers.</p>
          </div>
        </section>

        <section className="stack">
          <span>Next.js</span>
          <span>Tailwind</span>
          <span>Supabase</span>
          <span>Stripe</span>
          <span>Vercel</span>
        </section>
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #0F0A1E;
          color: #fff;
          padding: 30px;
          font-family: Inter, sans-serif;
        }
        .hero {
          border: 1px solid rgba(255, 255, 255, .08);
          border-radius: 28px;
          padding: 28px;
          background:
            radial-gradient(circle at top right, #8B5CF633, transparent 35%),
            radial-gradient(circle at bottom left, #EC489933, transparent 30%),
            #0B0717;
          box-shadow: 0 0 60px rgba(139, 92, 246, .18);
        }
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .logo {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: .5px;
        }
        .navBtn {
          border: none;
          color: #fff;
          padding: 12px 18px;
          border-radius: 14px;
          background: linear-gradient(90deg, #8B5CF6, #EC4899);
          cursor: pointer;
        }
        .heroGrid {
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 20px;
          align-items: center;
        }
        .badge {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          background: #ffffff10;
          border: 1px solid #ffffff12;
          margin-bottom: 18px;
          font-size: 13px;
        }
        h1 {
          font-size: 68px;
          line-height: 1.02;
          margin: 0 0 16px;
        }
        p {
          color: #cfcbe6;
          max-width: 560px;
          font-size: 18px;
          line-height: 1.7;
        }
        .form {
          margin-top: 28px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        input {
          flex: 1;
          min-width: 240px;
          padding: 16px;
          border-radius: 14px;
          border: 1px solid #ffffff10;
          background: #ffffff08;
          color: #fff;
          outline: none;
        }
        button {
          padding: 16px 24px;
          border: none;
          border-radius: 14px;
          color: #fff;
          cursor: pointer;
          background: linear-gradient(90deg, #8B5CF6, #EC4899);
        }
        button:disabled {
          opacity: .6;
          cursor: not-allowed;
        }
        .success {
          display: block;
          margin-top: 14px;
          color: #7CFFB2;
        }
        .core {
          position: relative;
          height: 520px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cube {
          width: 140px;
          height: 140px;
          border-radius: 22px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 72px;
          font-weight: 900;
          background: linear-gradient(145deg, #8B5CF6, #5B21B6);
          box-shadow:
            0 0 40px rgba(139, 92, 246, .6),
            0 0 90px rgba(236, 72, 153, .25);
          z-index: 2;
        }
        .ring {
          position: absolute;
          border: 1px solid rgba(139, 92, 246, .4);
          border-radius: 50%;
        }
        .ring1 { width: 340px; height: 340px; }
        .ring2 { width: 430px; height: 430px; }
        .ring3 { width: 520px; height: 520px; }
        .dot {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #EC4899;
          box-shadow: 0 0 18px #EC4899;
        }
        .d1 { top: 90px; left: 120px; }
        .d2 { top: 140px; right: 110px; }
        .d3 { bottom: 120px; left: 150px; }
        .d4 { bottom: 160px; right: 130px; }
        .features {
          margin-top: 26px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .card {
          padding: 24px;
          border-radius: 22px;
          background: #ffffff06;
          border: 1px solid #ffffff08;
          backdrop-filter: blur(18px);
        }
        .card h3 {
          margin: 0 0 10px;
          font-size: 22px;
        }
        .card p {
          margin: 0;
          font-size: 15px;
        }
        .stack {
          margin-top: 24px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .stack span {
          padding: 12px 16px;
          border-radius: 14px;
          background: #ffffff06;
          border: 1px solid #ffffff08;
        }
        @media(max-width: 980px) {
          .heroGrid {
            grid-template-columns: 1fr;
          }
          h1 {
            font-size: 48px;
          }
          .features {
            grid-template-columns: 1fr;
          }
          .core {
            height: 420px;
          }
        }
      `}</style>
    </>
  )
}
