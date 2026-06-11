import dynamic from "next/dynamic";
import { useMemo, useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const SESSION_KEY = 'aurelia_session_id'
const WALLET_KEY = 'aurelia_wallet'

function WalletConnect() {
  const [address, setAddress] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
const ParticleBackground = dynamic(() => Promise.resolve(() => null), { ssr: false });

export default function Home() {
  const [email, setEmail] = useState('')
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const blockedDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 'yopmail.com', 'trashmail.com', 'getnada.com']

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
        body: JSON.stringify({ email: email.trim(), consent: agree }),
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
            <div className="badge">EARLY ACCESS &bull; PHASE ONE</div>
            <h1>The Future of<span> Global Knowledge </span>Starts Here</h1>
            <p className="lead">
              public knowledge, learning resources, books, and research for users worldwide.
            </p>
            <form id="join" onSubmit={handleSubmit} className="card">
              <label className="label">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
              <label className="check">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <span>I agree to the <Link href="/privacy">Privacy Policy</Link></span>
              </label>
              <button type="submit" disabled={loading} className="btn">
                {loading ? 'Submitting...' : 'Request Early Access'}
              </button>
              <p className="notice">
                {'\u0628\u0625\u062f\u062e\u0627\u0644 \u0628\u0631\u064a\u062f\u0643\u060c \u062a\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 \u0627\u0633\u062a\u0644\u0627\u0645 \u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0627\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0645\u0628\u0643\u0631. \u064a\u0645\u0643\u0646\u0643 \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643 \u0641\u064a \u0623\u064a \u0648\u0642\u062a.'}
              </p>
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
                    <stop offset="0%" stopColor="#c4b5fd" />
                    <stop offset="100%" stopColor="#6d28d9" />
                  </linearGradient>
                  <linearGradient id="pageRight" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f9a8d4" />
                    <stop offset="100%" stopColor="#9d174d" />
                  </linearGradient>
                  <linearGradient id="spineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ddd6fe" stopOpacity="0.5" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="softGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                <path d={pathLeft} fill="url(#pageLeft)" filter="url(#glow)" opacity="0.95" />
                <line x1="55" y1="100" x2="148" y2="107" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeLinecap="round" />
                <line x1="50" y1="118" x2="145" y2="125" stroke="rgba(255,255,255,0.13)" strokeWidth="2" strokeLinecap="round" />
                <line x1="48" y1="136" x2="143" y2="143" stroke="rgba(255,255,255,0.13)" strokeWidth="2" strokeLinecap="round" />
                <line x1="46" y1="154" x2="141" y2="161" stroke="rgba(255,255,255,0.10)" strokeWidth="2" strokeLinecap="round" />
                <line x1="44" y1="172" x2="139" y2="179" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />

                <path d={pathRight} fill="url(#pageRight)" filter="url(#glow)" opacity="0.95" />
                <line x1="172" y1="107" x2="265" y2="100" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeLinecap="round" />
                <line x1="175" y1="125" x2="270" y2="118" stroke="rgba(255,255,255,0.13)" strokeWidth="2" strokeLinecap="round" />
                <line x1="177" y1="143" x2="272" y2="136" stroke="rgba(255,255,255,0.13)" strokeWidth="2" strokeLinecap="round" />
                <line x1="179" y1="161" x2="274" y2="154" stroke="rgba(255,255,255,0.10)" strokeWidth="2" strokeLinecap="round" />
                <line x1="181" y1="179" x2="276" y2="172" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />

                <path d={pathSpine} fill="url(#spineGrad)" strokeWidth="2" stroke="rgba(255,255,255,0.4)" filter="url(#softGlow)" />

                <circle className="p1" cx="80" cy="44" r="3.5" fill="#c4b5fd" opacity="0.8" filter="url(#softGlow)" />
                <circle className="p2" cx="240" cy="36" r="2.5" fill="#f9a8d4" opacity="0.8" filter="url(#softGlow)" />
                <circle className="p3" cx="140" cy="22" r="2" fill="#ddd6fe" opacity="0.7" filter="url(#softGlow)" />
                <circle className="p4" cx="200" cy="18" r="3" fill="#ec4899" opacity="0.6" filter="url(#softGlow)" />
                <circle className="p5" cx="110" cy="32" r="2" fill="#a78bfa" opacity="0.6" filter="url(#softGlow)" />

                <path d={rayLeft} stroke="rgba(196,181,253,0.22)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d={rayRight} stroke="rgba(249,168,212,0.22)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d={rayCenter} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
              <div className="bookLabel">Knowledge &middot; Growth &middot; Discovery</div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <h2>About Aurelia</h2>
          <p>
            public knowledge sources, educational materials, and open resources. We believe learning
            should be more organized, modern, and globally accessible.
          </p>
        </section>

        <section id="mission" className="grid">
          <div className="box">
            <h3>Trusted Sources</h3>
            <p>Built around open access, public domain, and educational resources.</p>
          </div>
          <div className="box">
            <h3>Modern Experience</h3>
            <p>Clean design, fast access, and user-first usability.</p>
          </div>
          <div className="box">
            <h3>Long-Term Vision</h3>
            <p>A future global destination for learning and discovery.</p>
          </div>
        </section>

        <footer className="footer">
          <div className="footLinks">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/dmca">DMCA</Link>
          </div>
          <div>fouedsendi185@gmail.com</div>
        </footer>
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(139,92,246,.18), transparent 35%),
            radial-gradient(circle at top right, rgba(236,72,153,.14), transparent 35%),
            linear-gradient(180deg, #05040b 0%, #090613 55%, #05040b 100%);
          color: white;
          font-family: Inter, Arial, sans-serif;
          overflow: hidden;
          position: relative;
          padding: 0 22px 40px;
        }
        .orb { position: absolute; border-radius: 999px; filter: blur(80px); opacity: .55; }
        .orb1 { width: 260px; height: 260px; background: #8b5cf6; top: 40px; left: -80px; }
        .orb2 { width: 300px; height: 300px; background: #ec4899; right: -90px; top: 220px; }
        .orb3 { width: 240px; height: 240px; background: #7c3aed; left: 35%; bottom: -60px; }
        .navbar {
          max-width: 1240px; margin: 0 auto; min-height: 84px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 18px; position: relative; z-index: 2;
        }
        .brand {
          font-size: 24px; font-weight: 800; letter-spacing: .3px;
          background: linear-gradient(90deg, #fff, #c4b5fd);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .nav { display: flex; gap: 20px; flex-wrap: wrap; }
        .nav a, .footLinks a { color: #ddd6fe; text-decoration: none; font-size: 14px; }
        .nav a:hover, .footLinks a:hover { color: white; }
        .topBtn {
          text-decoration: none; color: white; font-size: 14px; font-weight: 700;
          padding: 12px 16px; border-radius: 14px;
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
        }
        .hero {
          max-width: 1240px; margin: 10px auto 0; min-height: 76vh;
          display: grid; grid-template-columns: 1.08fr .92fr;
          gap: 30px; align-items: center; position: relative; z-index: 2;
        }
        .badge {
          display: inline-block; padding: 8px 12px; border-radius: 999px;
          font-size: 12px; letter-spacing: 1px; color: #c4b5fd;
          border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03);
        }
        h1 { margin: 18px 0 0; font-size: 62px; line-height: 1.03; letter-spacing: -2px; max-width: 700px; }
        h1 span { color: #ec4899; }
        .lead { margin-top: 18px; color: #ddd6fe; font-size: 18px; line-height: 1.8; max-width: 640px; }
        .card {
          margin-top: 28px; max-width: 520px; padding: 24px; border-radius: 22px;
          background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
          backdrop-filter: blur(12px);
        }
        .label { display: block; margin-bottom: 10px; font-size: 14px; }
        .input {
          width: 100%; padding: 16px; border-radius: 14px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03);
          color: white; outline: none; font-size: 16px;
        }
        .input:focus { border-color: #8b5cf6; }
        .check { display: flex; gap: 10px; margin-top: 16px; align-items: flex-start; font-size: 14px; color: #ddd6fe; }
        .check a { color: #ec4899; text-decoration: none; }
        .btn {
          width: 100%; margin-top: 18px; padding: 15px; border: 0; border-radius: 14px;
          color: white; font-weight: 800; cursor: pointer;
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
        }
        .btn:disabled { opacity: .7; cursor: not-allowed; }
        .notice { margin-top: 14px; font-size: 13px; line-height: 1.6; color: #94a3b8; text-align: center; }
        .msg { margin-top: 14px; padding: 12px; border-radius: 12px; font-size: 14px; }
        .ok  { background: rgba(34,197,94,.12);  border: 1px solid rgba(34,197,94,.25); }
        .err { background: rgba(239,68,68,.12);  border: 1px solid rgba(239,68,68,.25); }
        .miniStats { margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap; }
        .miniStats span { font-size: 12px; padding: 8px 10px; border-radius: 999px; background: rgba(255,255,255,.04); color: #d8d5e5; }
        .right { position: relative; min-height: 520px; display: flex; align-items: center; justify-content: center; }
        .visualWrap { position: relative; display: flex; flex-direction: column; align-items: center; animation: floatBook 5s ease-in-out infinite; }
        @keyframes floatBook { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
        .glowOrb {
          position: absolute; width: 280px; height: 180px; border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(139,92,246,.35) 0%, rgba(236,72,153,.18) 55%, transparent 75%);
          filter: blur(32px); top: 40px; left: 50%; transform: translateX(-50%); z-index: 0;
        }
        .bookSvg {
          position: relative; z-index: 1; width: 300px; height: auto;
          filter: drop-shadow(0 0 28px rgba(139,92,246,.5)) drop-shadow(0 0 60px rgba(236,72,153,.2));
        }
        .bookSvg .p1 { animation: floatP 3.8s ease-in-out infinite; }
        .bookSvg .p2 { animation: floatP 4.5s ease-in-out infinite 0.6s; }
        .bookSvg .p3 { animation: floatP 3.2s ease-in-out infinite 1.1s; }
        .bookSvg .p4 { animation: floatP 5s   ease-in-out infinite 0.3s; }
        .bookSvg .p5 { animation: floatP 4s   ease-in-out infinite 1.8s; }
        @keyframes floatP { 0%, 100% { transform: translateY(0px); opacity: 0.8; } 50% { transform: translateY(-8px); opacity: 0.4; } }
        .bookLabel { position: relative; z-index: 1; margin-top: 22px; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #a78bfa; opacity: 0.7; }
        .section { max-width: 920px; margin: 80px auto 0; text-align: center; }
        .section h2 { font-size: 42px; margin-bottom: 18px; }
        .section p  { color: #ddd6fe; line-height: 1.9; font-size: 18px; }
        .grid { max-width: 1240px; margin: 50px auto 0; display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
        .box { padding: 24px; border-radius: 22px; background: rgba(255,255,255,.035); border: 1px solid rgba(255,255,255,.08); }
        .box h3 { margin: 0 0 10px; font-size: 18px; }
        .box p  { margin: 0; color: #ddd6fe; line-height: 1.8; font-size: 14px; }
        .footer {
          max-width: 1240px; margin: 40px auto 0; padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,.08);
          display: flex; justify-content: space-between; gap: 18px; flex-wrap: wrap;
          color: #cfc9df; font-size: 14px;
        }
        .footLinks { display: flex; gap: 16px; flex-wrap: wrap; }
        @media (max-width: 1100px) {
          .hero { grid-template-columns: 1fr; }
          .right { order: -1; }
          .grid { grid-template-columns: 1fr 1fr; }
          h1 { font-size: 50px; }
        }
        @media (max-width: 700px) {
          .navbar { flex-direction: column; padding-top: 18px; }
          .nav { justify-content: center; }
          h1 { font-size: 38px; }
          .lead { font-size: 16px; }
          .grid { grid-template-columns: 1fr; }
          .footer { flex-direction: column; align-items: flex-start; }
          .right { min-height: 360px; }
          .bookSvg { width: 230px; }
        }
      `}</style>
    </>
  )
}
