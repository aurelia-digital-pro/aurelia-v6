import { useMemo, useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const SESSION_KEY = 'aurelia_session_id'
const WALLET_KEY = 'aurelia_wallet'

// placeholder (safe for build)
const ParticleBackground = dynamic(() => Promise.resolve(() => null), {
  ssr: false,
})

function WalletConnect() {
  const [address, setAddress] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // wallet init logic here if needed
  }, [])

  if (!address) return null

  return (
    <div style={{ fontSize: 13, color: '#c4b5fd' }}>
      {address.slice(0, 6)}...{address.slice(-4)}
    </div>
  )
}

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
    const blocked = blockedDomains.some((d) => clean.endsWith('@' + d))
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
      setMessage('Please use a real email address. Temporary emails are not allowed.')
      return
    }

    if (!agree) {
      setMessage('You must accept the Privacy Policy before continuing.')
      return
    }

    try {
      setLoading(true)

      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), consent: agree }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || 'Unable to process request.')
        return
      }

      setSuccess(true)
      setEmail('')
      setAgree(false)
      setMessage(data.message || 'Thank you. Your early access request has been received.')
    } catch {
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const pathLeft = 'M160 210 C140 205 60 195 30 180 L30 60 C60 75 140 85 160 90 Z'
  const pathRight = 'M160 210 C180 205 260 195 290 180 L290 60 C260 75 180 85 160 90 Z'
  const pathSpine = 'M160 90 C160 90 158 150 160 210 C162 150 160 90 160 90 Z'
  const rayLeft = 'M160 88 Q100 50 70 28'
  const rayRight = 'M160 88 Q220 50 250 28'
  const rayCenter = 'M160 88 Q155 40 160 16'

  return (
    <>
      <Head>
        <meta name="keywords" content="digital library, open knowledge, learning platform, books, research, education" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta property="og:description" content="The future of trusted digital knowledge access." />
        <meta property="og:url" content="https://aurelia-v6.vercel.app" />
        <link rel="canonical" href="https://aurelia-v6.vercel.app" />
      </Head>

      <main className="page">

        <ParticleBackground />

        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />

        <header className="navbar">
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#mission">Mission</a>
            <Link href="/library">Library</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/dmca">DMCA</Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <WalletConnect />
            <a href="#join" className="topBtn">Early Access</a>
          </div>
        </header>

        <section className="hero">
          <div className="left">
            <div className="badge">EARLY ACCESS • PHASE ONE</div>

            <h1>
              The Future of <span>Global Knowledge</span> Starts Here
            </h1>

            <p className="lead">
              public knowledge, learning resources, books, and research for users worldwide.
            </p>

            <form id="join" onSubmit={handleSubmit} className="card">
              <label className="label">Email Address</label>

              <input
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />

              <label className="check">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span>
                  I agree to the <Link href="/privacy">Privacy Policy</Link>
                </span>
              </label>

              <button type="submit" disabled={loading} className="btn">
                {loading ? 'Submitting...' : 'Request Early Access'}
              </button>

              {message && (
                <div className={success ? 'msg ok' : 'msg err'}>
                  {message}
                </div>
              )}
            </form>
          </div>

          <div className="right">
            <svg className="bookSvg" viewBox="0 0 320 260" fill="none">
              <path d={pathLeft} fill="#6d28d9" />
              <path d={pathRight} fill="#9d174d" />
              <path d={pathSpine} fill="#ddd6fe" />

              <path d={rayLeft} stroke="#c4b5fd" fill="none" />
              <path d={rayRight} stroke="#f9a8d4" fill="none" />
              <path d={rayCenter} stroke="#ffffff" fill="none" />
            </svg>
          </div>
        </section>

      </main>
    </>
  )
}
