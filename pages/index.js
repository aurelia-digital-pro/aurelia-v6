// pages/index.js - AURELIA-P1-CLEAN - متوافقة مع الدستور
import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [consent, setConsent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!consent) {
      setMsg('يجب الموافقة على استلام التحديثات')
      return
    }
    setLoading(true)
    setMsg('')
    // هنا تحط كود Supabase لاحقاً
    setTimeout(() => {
      setMsg('تم التسجيل بنجاح | Registered Successfully')
      setEmail('')
      setConsent(false)
      setLoading(false)
    }, 1200)
  }

  return (
    <>
      <Head>
        <title>Aurelia Digital Library</title>
        <meta name="description" content="Aurelia Global Digital Library for Public Domain Books" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="page">
        <header className="nav">
          <div className="logo">AURELIA</div>
        </header>

        <section className="hero">
          <h1>The Future of Digital Knowledge</h1>
          <p>مكتبة رقمية للمحتوى المفتوح والكتب العامة. انضم لقائمة الوصول المبكر</p>

          <form onSubmit={submit} className="form">
            <input
              type="email"
              required
              placeholder="بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="checkbox">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>أوافق على استلام تحديثات الوصول المبكر. يمكنك إلغاء الاشتراك في أي وقت</span>
            </label>

            <button type="submit" disabled={loading}>
              {loading? 'جاري التسجيل...' : 'انضم للوصول المبكر'}
            </button>
            {msg && <div className="msg">{msg}</div>}
          </form>

          <p className="legal">
            بإدخال بريدك، توافق على استلام تحديثات الوصول المبكر. يمكنك إلغاء الاشتراك في أي وقت
            <br />
            By submitting your email, you agree to receive early access updates. Unsubscribe anytime
          </p>
        </section>

        <footer className="footer">
          <div>
            <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms</a> | <a href="/dmca">DMCA</a>
          </div>
          <p>© 2026 Aurelia Digital Library. All rights reserved.</p>
        </footer>
      </main>

      <style jsx>{`
       .page { background: linear-gradient(180deg, #020617, #0f172a); min-height: 100vh; color: white; font-family: Arial, sans-serif; }
       .nav { display: flex; justify-content: center; padding: 22px 30px; border-bottom: 1px solid #1e293b; }
       .logo { font-size: 28px; font-weight: bold; background: linear-gradient(90deg, #60a5fa, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
       .hero { max-width: 650px; margin: auto; text-align: center; padding: 120px 20px 80px; }
       .hero h1 { font-size: 58px; line-height: 1.1; margin-bottom: 20px; background: linear-gradient(90deg, #60a5fa, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
       .hero p { color: #cbd5e1; font-size: 20px; margin-bottom: 40px; }
       .form { max-width: 500px; margin: auto; }
        input[type="email"] { width: 100%; padding: 18px; border-radius: 12px; border: 1px solid #334155; background: #0f172a; color: white; margin-bottom: 15px; font-size: 16px; }
       .checkbox { display: flex; align-items: start; gap: 10px; text-align: left; margin-bottom: 20px; color: #cbd5e1; font-size: 14px; }
       .checkbox input { width: auto; margin-top: 3px; }
        button { width: 100%; padding: 18px; border: none; border-radius: 12px; background: linear-gradient(90deg, #2563eb, #9333ea); color: white; font-size: 18px; font-weight: bold; cursor: pointer; }
        button:disabled { opacity: 0.6; cursor: not-allowed; }
       .msg { margin-top: 15px; color: #38bdf8; font-weight: bold; }
       .legal { margin-top: 25px; color: #94a3b8; font-size: 13px; line-height: 1.6; }
       .footer { text-align: center; padding: 50px 20px; color: #94a3b8; border-top: 1px solid #1e293b; margin-top: 80px; }
       .footer a { color: #60a5fa; text-decoration: none; margin: 0 10px; }
        @media (max-width: 768px) {.hero h1 { font-size: 38px; }.hero { padding: 80px 20px; } }
      `}</style>
    </>
  )
}
