// pages/index.js
// AURELIA OFFICIAL P1 FINAL
// Stage: AURELIA-P1-READY + WALLET RUNTIME

import { useMemo, useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const SESSION_KEY = 'aurelia_session_id'
const WALLET_KEY = 'aurelia_wallet'

function WalletConnect() {
  const [address, setAddress] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(WALLET_KEY) : null
    if (saved) setAddress(saved)
  }, [])

  const short = (a) => `${a.slice(0, 4)}...${a.slice(-4)}`

  const handleConnect = async () => {
    setLoading(true)
    try {
      const provider = window?.phantom?.solana
      if (!provider?.isPhantom) { window.open('https://phantom.app/', '_blank'); return }
      const res = await provider.connect()
      const addr = res.publicKey.toString()
      localStorage.setItem(WALLET_KEY, addr)
      setAddress(addr)
      const sessionId = localStorage.getItem(SESSION_KEY)
      if (sessionId) {
        await fetch('/api/wallet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wallet_address: addr, session_id: sessionId }),
        })
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleDisconnect = async () => {
    await window?.phantom?.solana?.disconnect()
    localStorage.removeItem(WALLET_KEY)
    setAddress(null)
  }

  if (address) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ padding: '8px 14px', borderRadius: 12, background: 'rgba(139,92,246,.15)', color: '#c4b5fd', fontSize: 13, fontFamily: 'monospace', border: '1px solid rgba(139,92,246,.3)' }}>
        ◎ {short(address)}
      </span>
      <button onClick={handleDisconnect} style={{ padding: '8px 12px', borderRadius: 10, background: 'rgba(255,255,255,.06)', color: '#ddd6fe', border: '1px solid rgba(255,255,255,.1)', cursor: 'pointer', fontSize: 12 }}>
        Disconnect
      </button>
    </div>
  )

  return (
    <button onClick={handleConnect} disabled={loading} style={{ padding: '10px 16px', borderRadius: 14, background: 'linear-gradient(90deg,#8b5cf6,#ec4899)', color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 700, opacity: loading ? .7 : 1 }}>
      {loading ? 'Connecting...' : '◎ Connect Wallet'}
    </button>
  )
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const blockedDomains = ['tempmail.com','10minutemail.com','guerrillamail.com','mailinator.com','yopmail.com','trashmail.com','getnada.com']

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
    if (!email.trim()) { setMessage('Please enter your email address.'); return }
    if (!isValidEmail) { setMessage('Please use a real email address. Temporary emails are not allowed.'); return }
    if (!agree) { setMessage('You must accept the Privacy Policy before continuing.'); return }
    try {
      setLoading(true)
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), consent: agree })
      })
      const data = await res.json()
      if (!res.ok) { setMessage(data.error || 'Unable to process request.'); return }
      setSuccess(true)
      setEmail('')
      setAgree(false)
      setMessage(data.message || 'Thank you. Your early access request has been received.')
    } catch { setMessage('Network error. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <>
      <Head>
        <title>Aurelia Digital Library | Future Knowledge Access</title>
        <meta name="description" content="Aurelia Digital Library is building a trusted modern gateway to open knowledge, books, learning resources, and research." />
        <meta name="keywords" content="digital library, open knowledge, learning platform, books, research, education" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="Aurelia Digital Library" />
        <meta property="og:description" content="The future of trusted digital knowledge access." />
        <meta property="og:url" content="https://aurelia-v6.vercel.app" />
        <link rel="canonical" href="https://aurelia-v6.vercel.app" />
      </Head>

      <main className="page">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />

        <header className="navbar">
          <div className="brand">Aurelia Digital Library</div>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#mission">Mission</a>
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
            <h1>The Future of<span> Global Knowledge </span>Starts Here</h1>
            <p className="lead">
              Aurelia Digital Library is building a modern, trusted, and legal platform for discovering
              public knowledge, learning resources, books, and research for users worldwide.
            </p>
            <form id="join" onSubmit={handleSubmit} className="card">
              <label className="label">Email Address</label>
              <input type="email" placeholder="you@example.com" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} className="input" />
              <label className="check">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <span>I agree to the <Link href="/privacy">Privacy Policy</Link></span>
              </label>
              <button type="submit" disabled={loading} className="btn">
                {loading ? 'Submitting...' : 'Request Early Access'}
              </button>
              <p className="notice">بإدخال بريدك، توافق على استلام تحديثات الوصول المبكر. يمكنك إلغاء الاشتراك في أي وقت.</p>
              {message && <div className={success ? 'msg ok' : 'msg err'}>{message}</div>}
            </form>
            <div className="miniStats">
              <span>Privacy First</span>
              <span>Open Knowledge Vision</span>
              <span>No Spam</span>
            </div>
          </div>

          <div className="right">
            <div className="visualWrap">
              <div className="glowOrb" />
              <svg className="bookSvg" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="pageLeft" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c4b5fd" /><stop offset="100%" stopColor="#6d28d9" />
                  </linearGradient>
                  <linearGradient id="pageRight" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f9a8d4" /><stop offset="100%" stopColor="#9d174d" />
                  </linearGradient>
                  <linearGradient id="spineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" /><stop offset="100%" stopColor="#ddd6fe" stopOpacity="0.5" />
                  </linearGradient>
                  <filter id="glow"><feGaussianBlur stdDeviation="6" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                  <filter id="softGlow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                <path d="M160 210 C140 205 60 195 30 180 L30 60 C60 75 140 85 160 90 Z" fill="url(#pageLeft)" filter="url(#glow)" opacity="0.95" />
                <line x1="55" y1="100" x2="148" y2="107" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeLinecap="round" />
                <line x1="50" y1="118" x2="145" y2="125" stroke="rgba(255,255,255,0.13)" strokeWidth="2" strokeLinecap="round" />
                <line x1="48" y1="136" x2="143" y2="143" stroke="rgba(255,255,255,0.13)" strokeWidth="2" strokeLinecap="round" />
                <line x1="46" y1="154" x2="141" y2="161" stroke="rgba(255,255,255,0.10)" strokeWidth="2" strokeLinecap="round" />
                <line x1="44" y1="172" x2="139" y2="179" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
                <path d="M160 210 C180 205 260 195 290 180 L290 60 C260 75 180 85 160 90 Z" fill="url(#pageRight)" filter="url(#glow)" opacity="0.95" />
                <line x1="172" y1="107" x2="265" y2="100" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeLinecap="round" />
                <line x1="175" y1="125" x2="270" y2="118" stroke="rgba(255,255,255,0.13)" strokeWidth="2" strokeLinecap="round" />
                <line x1="177" y1="143" x2="272" y2="136" stroke="rgba(255,255,255,0.13)" strokeWidth="2" strokeLinecap="round" />
                <line x1="179" y1="161" x2="274" y2="154" stroke="rgba(255,255,255,0.10)" strokeWidth="2" strokeLinecap="round" />
                <line x1="181" y1="179" x2="276" y2="172" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
                <path d="M160 90 C160 90 158 150 160 210 C162 150 160 90 160 90 Z" fill="url(#spineGrad)" strokeWidth="2" stroke="rgba(255,255,255,0.4)" filter="url(#softGlow)" />
                <circle className="p1" cx="80" cy="44" r="3.5" fill="#c4b5fd" opacity="0.8" filter="url(#softGlow)" />
                <circle className="p2" cx="240" cy="36" r="2.5" fill="#f9a8d4" opacity="0.8" filter="url(#softGlow)" />
                <circle className="p3" cx="140" cy="22" r="2" fill="#ddd6fe" opacity="0.7" filter="url(#softGlow)" />
                <circle className="p4" cx="200" cy="18" r="3" fill="#ec4899" opacity="0.6" filter="url(#softGlow)" />
                <circle className="p5" cx="110" cy="32" r="2" fill="#a78bfa" opacity="0.6" filter="url(#softGlow)" />
                <path d="M160 88 Q100 50 70 28
