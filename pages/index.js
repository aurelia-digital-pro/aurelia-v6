// pages/index.js
// AURELIA OFFICIAL P1 FINAL + V2 INTERFACE
// Stage: AURELIA-P1-READY + KNOWLEDGE-PORTAL
// Purpose: Email collection + Legal Knowledge Portal
// Compatible: Next.js + Vercel

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
    return regex &&!blocked
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
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email.trim(), consent: agree})
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
    } catch (error) {
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
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

        {/* NAVBAR - قانونك القديم محفوظ */}
        <header className="navbar">
          <div className="brand">Aurelia Digital Library</div>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#knowledge">Knowledge</a>
            <a href="#mission">Mission</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/dmca">DMCA</Link>
          </nav>
          <a href="#join" className="topBtn">Early Access</a>
        </header>

        {/* HERO - فورم الإيميل القديم محفوظ 100% */}
        <section className="hero">
          <div className="left">
            <div className="badge">EARLY ACCESS • PHASE ONE</div>
            <h1>The Future of<span> Global Knowledge </span>Starts Here</h1>
            <p className="lead">
              Aurelia Digital Library is building a modern, trusted, and legal platform for discovering public knowledge, learning resources, books, and research for users worldwide.
            </p>
            <form id="join" onSubmit={handleSubmit} className="card">
              <label className="label">Email Address</label>
              <input type="email" placeholder="you@example.com" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} className="input" />
              <label className="check">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <span>I agree to the <Link href="/privacy">Privacy Policy</Link></span>
              </label>
              <button type="submit" disabled={loading} className="btn">
                {loading? 'Submitting...' : 'Request Early Access'}
              </button>
              <p className="notice">بإدخال بريدك، توافق على استلام تحديثات الوصول المبكر. يمكنك إلغاء الاشتراك في أي وقت.</p>
              {message && (<div className={success? 'msg ok' : 'msg err'}>{message}</div>)}
            </form>
            <div className="miniStats">
              <span>Privacy First</span>
              <span>Open Knowledge Vision</span>
              <span>No Spam</span>
            </div>
          </div>
          <div className="right">
            <div className="sphere" />
            <div className="ring ring1" />
            <div className="ring ring2" />
            <div className="book">
              <div className="pageL" />
              <div className="pageM" />
              <div className="pageR" />
            </div>
          </div>
        </section>

        {/* KNOWLEDGE PORTAL - الواجهة الجديدة المضافة */}
        <section id="knowledge" className="knowledgeSection">
          <h2 className="knowledgeTitle">🌟 بوابة المعرفة المفتوحة</h2>
          <p className="knowledgeSub">2.8M+ مصدر مفتوح مفهرس. كنوز العالم في مكان واحد.</p>

          <div className="knowledgeGrid">
            <div className="knowledgeBox">
              <h3>📚 كنوز الفكر الإنساني</h3>
              <p><a href="https://www.gutenberg.org/ebooks/68884" target="_blank" rel="noopener">مقدمة ابن خلدون</a></p>
              <p><a href="https://www.gutenberg.org/ebooks/132" target="_blank" rel="noopener">فن الحرب - سون تزو</a></p>
              <p><a href="https://www.gutenberg.org/ebooks/58585" target="_blank" rel="noopener">النبي - جبران خليل جبران</a></p>
              <p><a href="https://www.gutenberg.org/ebooks/135" target="_blank" rel="noopener">البؤساء - فيكتور هوغو</a></p>
              <p><a href="https://www.gutenberg.org/ebooks/28233" target="_blank" rel="noopener">المبادئ - نيوتن</a></p>
            </div>

            <div className="knowledgeBox">
              <h3>🚀 صورة اليوم من ناسا</h3>
              <p>استكشف صورة فلكية جديدة كل يوم مع شرح علمي.</p>
              <a href="https://apod.nasa.gov/apod/astropix.html" target="_blank" rel="noopener" className="knowledgeBtn">شاهد صورة اليوم</a>
              <small>المصدر: NASA APOD - Public Domain</small>
            </div>

            <div className="knowledgeBox">
              <h3>🧱 استكشف التاريخ ثلاثي الأبعاد</h3>
              <p>نماذج أثرية وعلمية تفاعلية من مؤسسة سميثسونيان.</p>
              <a href="https://3d.si.edu/cc0" target="_blank" rel="noopener" className="knowledgeBtn">ابدأ الاستكشاف</a>
              <small>المصدر: Smithsonian 3D - CC0</small>
            </div>

            <div className="knowledgeBox">
              <h3>🎓 تعلم من MIT مجاناً</h3>
              <p>كورسات حقيقية من معهد ماساتشوستس للتكنولوجيا.</p>
              <a href="https://ocw.mit.edu" target="_blank" rel="noopener" className="knowledgeBtn">ابدأ التعلم</a>
            </div>

            <div className="knowledgeBox">
              <h3>🔬 احسب أي شيء علمياً</h3>
              <p>محرك المعرفة الحسابية Wolfram Alpha.</p>
              <a href="https://www.wolframalpha.com" target="_blank" rel="noopener" className="knowledgeBtn">جرب الأداة الآن</a>
            </div>

            <div className="knowledgeBox">
              <h3>🌍 استكشف المعرفة حسب المكان</h3>
              <p>خريطة العالم المفتوحة. اكتشف المعالم والمؤسسات العلمية.</p>
              <a href="https://www.openstreetmap.org" target="_blank" rel="noopener" className="knowledgeBtn">افتح الخريطة</a>
              <small>© OpenStreetMap contributors</small>
            </div>
          </div>

          <div className="ideaBox">
            <h3>🧠 فكرة اليوم</h3>
            <p><em>"العلم يبدأ بالسؤال، لا بالإجابة."</em></p>
          </div>
        </section>

        {/* ABOUT - قسمك القديم محفوظ */}
        <section id="about" className="section">
          <h2>About Aurelia</h2>
          <p>
            Aurelia Digital Library is an early-stage initiative focused on improving access to trusted public knowledge sources, educational materials, and open resources. We believe learning should be more organized, modern, and globally accessible.
          </p>
        </section>

        {/* MISSION - قسمك القديم محفوظ */}
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

        {/* FOOTER - قانونك القديم محفوظ */}
        <footer className="footer">
          <div>© {new Date().getFullYear()} Aurelia Digital Library. All rights reserved.</div>
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
          background: radial-gradient(circle at top left, rgba(139,92,246,.18), transparent 35%), radial-gradient(circle at top right, rgba(236,72,153,.14), transparent 35%), linear-gradient(180deg, #05040b 0%, #090613 55%, #05040b 100%);
          color: white;
          font-family: Inter, Arial, sans-serif;
          overflow: hidden;
          position: relative;
          padding: 0 22px 40px;
          direction: ltr;
        }
       .orb { position: absolute; border-radius: 999px; filter: blur(80px); opacity:.55; }
       .orb1 { width: 260px; height: 260px; background: #8b5cf6; top: 40px; left: -80px; }
       .orb2 { width: 300px; height: 300px; background: #ec4899; right: -90px; top: 220px; }
       .orb3 { width: 240px; height: 240px; background: #7c3aed; left: 35%; bottom: -60px; }
       .navbar { max-width: 1240px; margin: 0 auto; min-height: 84px; display: flex; align-items: center; justify-content: space-between; gap: 18px; position: relative; z-index: 2; }
       .brand { font-size: 24px; font-weight: 800; letter-spacing:.3px; background: linear-gradient(90deg, #fff, #c4b5fd); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
       .nav { display: flex; gap: 20px; flex-wrap: wrap; }
       .nav a,.footLinks a { color: #ddd6fe; text-decoration: none; font-size: 14px; }
       .nav a:hover,.footLinks a:hover { color: white; }
       .topBtn { text-decoration: none; color: white; font-size: 14px; font-weight: 700; padding: 12px 16px; border-radius: 14px; background: linear-gradient(90deg, #8b5cf6, #ec4899); }
       .hero { max-width: 1240px; margin: 10px auto 0; min-height: 76vh; display: grid; grid-template-columns: 1.08fr.92fr; gap: 30px; align-items: center; position: relative; z-index: 2; }
       .badge { display: inline-block; padding: 8px 12px; border-radius: 999px; font-size: 12px; letter-spacing: 1px; color: #c4b5fd; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); }
        h1 { margin: 18px 0 0; font-size: 62px; line-height: 1.03; letter-spacing: -2px; max-width: 700px; }
        h1 span { color: #ec4899; }
       .lead { margin-top: 18px; color: #ddd6fe; font-size: 18px; line-height: 1.8; max-width: 640px; }
       .card { margin-top: 28px; max-width: 520px; padding: 24px; border-radius: 22px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); backdrop-filter: blur(12px); }
       .label { display: block; margin-bottom: 10px; font-size: 14px; }
       .input { width: 100%; padding: 16px; border-radius: 14px; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03); color: white; outline: none; font-size: 16px; }
       .input:focus { border-color: #8b5cf6; }
       .check { display: flex; gap: 10px; margin-top: 16px; align-items: flex-start; font-size: 14px; color: #ddd6fe; }
       .check a { color: #ec4899; text-decoration: none; }
       .btn { width: 100%; margin-top: 18px; padding: 15px; border: 0; border-radius: 14px; color: white; font-weight: 800; cursor: pointer; background: linear-gradient(90deg, #8b5cf6, #ec4899); }
       .btn:disabled { opacity:.7; cursor: not-allowed; }
       .notice { margin-top: 14px; font-size: 13px; line-height: 1.6; color: #94a3b8; text-align: center; }
       .msg { margin-top: 14px; padding: 12px; border-radius: 12px; font-size: 14px; }
       .ok { background: rgba(34,197,94,.12); border: 1px solid rgba(34,197,94,.25); }
       .err { background: rgba(239,68,68,.12); border: 1px solid rgba(239,68,68,.25); }
       .miniStats { margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap; }
       .miniStats span { font-size: 12px; padding: 8px 10px; border-radius: 999px; background: rgba(255,255,255,.04); color: #d8d5e5; }
       .right { position: relative; min-height: 520px; }
       .sphere { width: 280px; height: 280px; border-radius: 50%; position: absolute; top: 60px; left: 50%; transform: translateX(-50%); background: radial-gradient(circle at 30% 30%, #ffffff, #c4b5fd 12%, #6d28d9 45%, #2e1065 100%); box-shadow: 0 0 55px rgba(139,92,246,.45), 0 0 120px rgba(236,72,153,.15); }
       .ring { position: absolute; left: 50%; transform: translateX(-50%); border-radius: 50%; border: 1px solid rgba(255,255,255,.08); }
       .ring1 { width: 320px; height: 320px; top: 40px; }
       .ring2 { width: 380px; height: 380px; top: 10px; }
       .book { position: absolute; bottom: 70px; left: 50%; transform: translateX(-50%); width: 220px; height: 120px; }
       .pageL,.pageM,.pageR { position: absolute; top: 0; height: 100%; border-radius: 12px; }
       .pageL { left: 0; width: 48%; background: linear-gradient(180deg, #8b5cf6, #5b21b6); }
       .pageR { right: 0; width: 48%; background: linear-gradient(180deg, #ec4899, #9d174d); }
       .pageM { left: 49%; width: 4px; background: rgba(255,255,255,.6); }
       .section { max-width: 920px; margin: 80px auto 0; text-align: center; }
       .section h2 { font-size: 42px; margin-bottom: 18px; }
       .section p { color: #ddd6fe; line-height: 1.9; font-size: 18px; }
       .grid { max-width: 1240px; margin: 50px auto 0; display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
       .box { padding: 24px; border-radius: 22px; background: rgba(255,255,255,.035); border: 1px solid rgba(255,255,255,.08); }
       .box h3 { margin: 0 0 10px; font-size: 18px; }
       .box p { margin: 0; color: #ddd6fe; line-height: 1.8; font-size: 14px; }
       .footer { max-width: 1240px; margin: 40px auto 0; padding-top: 22px; border-top: 1px solid rgba(255,255,255,.08); display: flex; justify-content: space-between; gap: 18px; flex-wrap: wrap; color: #cfc9df; font-size: 14px; }
       .footLinks { display: flex; gap: 16px; flex-wrap: wrap; }

        /* Knowledge Portal Styles - الجديد فقط */
       .knowledgeSection { max-width: 1240px; margin: 80px auto 0; padding: 0 20px; text-align: center; }
       .knowledgeTitle { font-size: 42px; margin-bottom: 12px; direction: rtl; }
       .knowledgeSub { color: #ddd6fe; font-size: 18px; margin-bottom: 40px; direction: rtl; }
       .knowledgeGrid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-bottom: 40px; }
       .knowledgeBox { padding: 24px; border-radius: 22px; background: rgba(255,255,255,.035); border: 1px solid rgba(255,255,255,.08); text-align: right; direction: rtl; }
       .knowledgeBox h3 { margin: 0 0 16px; font-size: 20px; color: #ec4899; }
       .knowledgeBox p { margin: 8px 0; color: #ddd6fe; line-height: 1.8; font-size: 15px; }
       .knowledgeBox a { color: #c4b5fd; text-decoration: none; }
       .knowledgeBox a:hover { color: white; text-decoration: underline; }
       .knowledgeBtn { display: inline-block; margin-top: 12px; padding: 10px 18px; border-radius: 12px; background: linear-gradient(90deg, #8b5cf6, #ec4899); color: white; text-decoration: none; font-weight: 600; }
       .knowledgeBox small { display: block; margin-top: 8px; color: #94a3b8; font-size: 12px; }
       .ideaBox { max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 22px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); direction: rtl; }
       .ideaBox h3 { margin: 0 0 16px; font-size: 24px; color: #c4b5fd; }
       .ideaBox p { margin: 0; color: #ddd6fe; font-size: 18px; line-height: 1.8; }

        @media (max-width: 1100px) {
         .hero { grid-template-columns: 1fr; }
         .right { order: -1; }
         .grid { grid-template-columns: 1fr 1fr; }
         .knowledgeGrid { grid-template-columns: 1fr 1fr; }
          h1 { font-size: 50px; }
        }
        @media (max-width: 700px) {
         .navbar { flex-direction: column; padding-top: 18px; }
         .nav { justify-content: center; }
          h1 { font-size: 38px; }
         .lead { font-size: 16px; }
         .grid { grid-template-columns: 1fr; }
         .knowledgeGrid { grid-template-columns: 1fr; }
         .footer { flex-direction: column; align-items: flex-start; }
         .right { min-height: 420px; }
         .sphere { width: 220px; height: 220px; }
         .ring1 { width: 260px; height: 260px; }
         .ring2 { width: 310px; height: 310px; }
         .book { width: 180px; }
        }
      `}</style>
    </>
  )
}
