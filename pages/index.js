// pages/index.js
// AURELIA P1 FINAL — ENHANCED (SAFE)
// نفس النسخة + تحسين واجهة + إزالة الـ sphere

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
    'tempmail.com',
    '10minutemail.com',
    'guerrillamail.com',
    'mailinator.com',
    'yopmail.com',
    'trashmail.com',
    'getnada.com'
  ]

  const isValidEmail = useMemo(() => {
    const clean = email.trim().toLowerCase()
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)
    const blocked = blockedDomains.some((domain) =>
      clean.endsWith('@' + domain)
    )
    return regex && !blocked
  }, [email])

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    setSuccess(false)

    if (!email.trim()) {
      setMessage('Please enter your email address.')
      return
    }

    if (!isValidEmail) {
      setMessage('Please use a real email address.')
      return
    }

    if (!agree) {
      setMessage('You must accept the Privacy Policy.')
      return
    }

    try {
      setLoading(true)

      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          consent: agree
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || 'Error occurred.')
        return
      }

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
        <title>Aurelia Global Digital Library</title>
      </Head>

      <main className="page">

        {/* NAVBAR */}
        <header className="navbar">
          <div className="brand">
            Aurelia Global Library
          </div>

          <nav className="nav">
            <a href="#about">About</a>
            <a href="#mission">Mission</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/dmca">DMCA</Link>
          </nav>

          <a href="/library" className="topBtn">
            Enter Library
          </a>
        </header>

        {/* HERO */}
        <section className="hero">

          <div className="left">
            <div className="badge">
              GLOBAL KNOWLEDGE PLATFORM
            </div>

            <h1>
              A Trusted Gateway to
              <span> Global Knowledge </span>
            </h1>

            <p className="lead">
              Aurelia is building a structured, legal, and modern
              digital library for accessing verified knowledge,
              books, and educational resources worldwide.
            </p>

            <form onSubmit={handleSubmit} className="card">

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />

              <label className="check">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) =>
                    setAgree(e.target.checked)
                  }
                />
                <span>
                  I agree to the{' '}
                  <Link href="/privacy">Privacy Policy</Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="btn"
              >
                {loading ? 'Submitting...' : 'Request Access'}
              </button>

              {message && (
                <div className={success ? 'msg ok' : 'msg err'}>
                  {message}
                </div>
              )}
            </form>
          </div>

          {/* RIGHT SIDE (تم التغيير هنا) */}
          <div className="right blocked">
            <div className="blockedBox">
              <h2>Restricted Access</h2>
              <p>You cannot access the library yet.</p>
            </div>
          </div>

        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <h2>About</h2>
          <p>
            Aurelia aims to become a global digital knowledge hub,
            connecting users with trusted educational and public
            domain resources.
          </p>
        </section>

        {/* MISSION */}
        <section id="mission" className="grid">
          <div className="box">
            <h3>Verified Sources</h3>
            <p>Only trusted and legal knowledge sources.</p>
          </div>

          <div className="box">
            <h3>Modern Access</h3>
            <p>Fast, structured and user-friendly experience.</p>
          </div>

          <div className="box">
            <h3>Global Vision</h3>
            <p>Accessible knowledge for everyone worldwide.</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div>© 2026 Aurelia Global Library</div>

          <div className="footLinks">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/dmca">DMCA</Link>
          </div>
        </footer>

      </main>

      <style jsx>{`

        .page {
          min-height: 100vh;
          background: linear-gradient(180deg,#05040b,#090613);
          color: white;
          font-family: Arial;
          padding: 20px;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand {
          font-weight: bold;
          font-size: 20px;
        }

        .nav a {
          margin: 0 10px;
          color: #ccc;
        }

        .topBtn {
          background: purple;
          padding: 10px;
          border-radius: 10px;
        }

        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-top: 40px;
        }

        .blockedBox {
          border: 1px solid #444;
          padding: 40px;
          text-align: center;
        }

      `}</style>
    </>
  )
}
