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

    if (!email.trim()) return setMessage('Please enter your email.')
    if (!isValidEmail) return setMessage('Use a real email.')
    if (!agree) return setMessage('Accept Privacy Policy.')

    try {
      setLoading(true)
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), consent: agree })
      })
      const data = await res.json()
      if (!res.ok) return setMessage(data.error || 'Error.')

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

        <header className="navbar">
          <div className="brand">Aurelia Global Library</div>

          <nav className="nav">
            <a href="#about">About</a>
            <a href="#mission">Mission</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/dmca">DMCA</Link>
          </nav>

          <Link href="/library" className="btnTop">Enter Library</Link>
        </header>

        <section className="hero">

          <div className="left">
            <p className="badge">GLOBAL KNOWLEDGE PLATFORM</p>

            <h1>
              A Trusted Gateway to <span>Global Knowledge</span>
            </h1>

            <p className="desc">
              Aurelia is building a modern digital library for books,
              research, and trusted knowledge worldwide.
            </p>

            <form onSubmit={handleSubmit} className="form">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input"
              />

              <label className="check">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={e => setAgree(e.target.checked)}
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

          <div className="right">

            <div className="card">
              <h3>🌌 NASA</h3>
              <p>Astronomy Picture</p>
              <a href="https://apod.nasa.gov/apod/astropix.html" target="_blank">
                View
              </a>
            </div>

            <div className="card">
              <h3>🌍 Global Explorer</h3>
              <iframe
                src="https://www.openstreetmap.org/export/embed.html"
                className="map"
              ></iframe>
            </div>

            <div className="card">
              <h3>📊 Data Intelligence</h3>
              <a href="https://ourworldindata.org" target="_blank">
                Explore Data
              </a>
            </div>

            <div className="card lock">
              🔒 Restricted Access
              <br />
              You cannot access the library yet.
            </div>

          </div>
        </section>

        <section id="about" className="about">
          <h2>About Aurelia</h2>
          <p>
            Aurelia aims to become a global digital knowledge hub
            connecting users with trusted public resources.
          </p>
        </section>

      </main>
    </>
  )
}
