// pages/index.js
// AURELIA P1 PRO FINAL — DO NOT BREAK EMAIL SYSTEM

import { useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const blockedDomains = [
    'tempmail.com','10minutemail.com','guerrillamail.com',
    'mailinator.com','yopmail.com','trashmail.com','getnada.com'
  ]

  const isValidEmail = useMemo(() => {
    const clean = email.trim().toLowerCase()
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)
    const blocked = blockedDomains.some(d => clean.endsWith('@' + d))
    return regex && !blocked
  }, [email])

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    setSuccess(false)

    if (!email.trim()) return setMessage('Please enter your email address.')
    if (!isValidEmail) return setMessage('Please use a real email address.')
    if (!agree) return setMessage('You must accept the Privacy Policy.')

    try {
      setLoading(true)
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), consent: agree })
      })
      const data = await res.json()
      if (!res.ok) return setMessage(data.error || 'Error occurred.')

      setSuccess(true)
      setEmail('')
      setAgree(false)
      setMessage('Access request received.')
    } catch {
      setMessage('Network error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Aurelia Global Library</title>
      </Head>

      <main className="page">

        {/* NAVBAR */}
        <header className="navbar">
          <div className="brand">Aurelia Global Library</div>

          <nav className="nav">
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/dmca">DMCA</Link>
          </nav>

          <Link href="/library" className="btnTop">
            Enter Library
          </Link>
        </header>

        {/* HERO */}
        <section className="hero">
          <div className="left">
            <h1>
              A Trusted Gateway to
              <span> Global Knowledge</span>
            </h1>

            <p className="desc">
              Aurelia is building a structured, legal, and modern digital library
              connecting users to verified knowledge, research, and global data.
            </p>

            <form onSubmit={handleSubmit} className="form">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="input"
              />

              <label className="check">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e)=>setAgree(e.target.checked)}
                />
                <span>
                  I agree to the <Link href="/privacy">Privacy Policy</Link>
                </span>
              </label>

              <button type="submit" disabled={loading} className="btnMain">
                {loading ? 'Submitting...' : 'Request Access'}
              </button>

              {message && (
                <div className={success ? 'msg ok' : 'msg err'}>
                  {message}
                </div>
              )}
            </form>
          </div>

          {/* RIGHT CARDS */}
          <div className="right">
            <div className="card">
              <h3>🌌 NASA</h3>
              <p>Astronomy Picture of the Day</p>
              <a href="https://apod.nasa.gov/apod/astropix.html" target="_blank">
                View Source
              </a>
            </div>

            <div className="card">
              <h3>🌍 Global Explorer</h3>
              <iframe
                src="https://www.openstreetmap.org/export/embed.html"
                className="map"
              />
            </div>

            <div className="card">
              <h3>📊 Data Intelligence</h3>
              <a href="https://ourworldindata.org" target="_blank">
                Explore Data
              </a>
            </div>

            <div className="card lock">
              🔒 Restricted Access
              <p>You cannot access the library yet.</p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="features">
          <div>🌐 Global Sources</div>
          <div>🔒 Privacy First</div>
          <div>⚡ Fast Access</div>
          <div>📚 Verified Knowledge</div>
        </section>

        {/* ABOUT */}
        <section id="about" className="about">
          <div>
            <h2>About Aurelia</h2>
            <p>
              Aurelia aims to become a global digital knowledge hub,
              connecting users with trusted public domain resources.
            </p>
            <Link href="/library" className="btnMain small">
              Explore Vision
            </Link>
          </div>

          <div className="planet"/>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div>© {new Date().getFullYear()} Aurelia</div>
          <div className="links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/dmca">DMCA</Link>
          </div>
        </footer>

      </main>

      <style jsx>{`
        .page{
          min-height:100vh;
          background:linear-gradient(180deg,#05040b,#0b0617);
          color:white;
          font-family:Arial;
          padding:20px;
        }

        .navbar{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:40px;
        }

        .nav{
          display:flex;
          gap:20px;
        }

        .nav a{color:#ccc;text-decoration:none}

        .btnTop{
          padding:10px 16px;
          border-radius:10px;
          background:linear-gradient(90deg,#8b5cf6,#ec4899);
          color:white;
          text-decoration:none;
        }

        .hero{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:40px;
        }

        h1{font-size:42px}
        h1 span{color:#ec4899}

        .desc{color:#cbd5f5;margin:20px 0}

        .input{
          width:100%;
          padding:12px;
          border-radius:8px;
          border:1px solid #333;
          background:#111;
          color:white;
        }

        .check{display:flex;gap:8px;margin:15px 0;color:#ccc}

        .btnMain{
          width:100%;
          padding:12px;
          border:none;
          border-radius:10px;
          background:linear-gradient(90deg,#8b5cf6,#ec4899);
          color:white;
          cursor:pointer;
        }

        .msg{margin-top:10px;padding:10px;border-radius:8px;text-align:center}
        .ok{background:#10b98133;color:#10b981}
        .err{background:#ef444433;color:#ef4444}

        .right{display:grid;gap:15px}

        .card{
          background:#111;
          padding:15px;
          border-radius:12px;
          border:1px solid #222;
        }

        .map{width:100%;height:140px;border:none}

        .lock{opacity:.7;text-align:center}

        .features{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          margin-top:60px;
          gap:20px;
          text-align:center;
        }

        .about{
          margin-top:60px;
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:40px;
          align-items:center;
        }

        .planet{
          width:200px;
          height:200px;
          border-radius:50%;
          background:radial-gradient(circle,#fff,#8b5cf6,#000);
          margin:auto;
        }

        .footer{
          margin-top:60px;
          display:flex;
          justify-content:space-between;
          border-top:1px solid #222;
          padding-top:20px;
        }

        .links{display:flex;gap:15px}

        @media(max-width:768px){
          .hero{grid-template-columns:1fr}
          .features{grid-template-columns:1fr 1fr}
          .about{grid-template-columns:1fr}
        }
      `}</style>
    </>
  )
}
