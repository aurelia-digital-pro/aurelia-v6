import { useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const isValidEmail = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  }, [email])

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    setSuccess(false)

    if (!isValidEmail) {
      setMessage('Please enter a valid email address.')
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          consent: agree
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || 'Unable to process request.')
        return
      }

      setSuccess(true)
      setEmail('')
      setAgree(false)
      setMessage(data.message || 'You have been added successfully.')
    } catch (error) {
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const floatingIcons = [
    '✦',
    '◉',
    '◆',
    '✧',
    '⬢',
    '◎'
  ]

  return (
    <>
      <Head>
        <title>Aurelia | The Future of Digital Knowledge</title>
        <meta
          name="description"
          content="Aurelia is building the future of trusted digital knowledge access."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="page">
        <div className="bg-orb orb-one" />
        <div className="bg-orb orb-two" />
        <div className="bg-orb orb-three" />

        <header className="navbar">
          <div className="brand">Aurelia</div>

          <nav className="navLinks">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/dmca">DMCA</Link>
          </nav>

          <a href="#access" className="ctaTop">
            Request Early Access
          </a>
        </header>

        <section className="hero">
          <div className="leftSide">
            <div className="tag">NEXT GENERATION PLATFORM</div>

            <h1>
              The Future of Digital
              <span> Knowledge</span>
              <br />
              is Being Built
            </h1>

            <p className="lead">
              منصة رقمية عالمية قيد الإنشاء للوصول الذكي والموثوق إلى المعرفة،
              بتجربة حديثة، قانونية، وآمنة للمستخدمين حول العالم.
            </p>

            <form id="access" onSubmit={handleSubmit} className="card formCard">
              <label className="label">Email Address</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                autoComplete="email"
              />

              <label className="checkRow">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />

                <span>
                  I agree to the{' '}
                  <Link href="/privacy">Privacy Policy</Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="submitBtn"
              >
                {loading ? 'Submitting...' : 'Request Early Access'}
              </button>

              {message && (
                <div className={success ? 'msg success' : 'msg error'}>
                  {message}
                </div>
              )}
            </form>
          </div>

          <div className="rightSide">
            <div className="visualWrap">
              <div className="globe">
                <div className="glowRing ring1" />
                <div className="glowRing ring2" />
                <div className="continent c1" />
                <div className="continent c2" />
                <div className="continent c3" />
              </div>

              <div className="book">
                <div className="pageLeft" />
                <div className="pageCenter" />
                <div className="pageRight" />
              </div>

              {floatingIcons.map((icon, i) => (
                <div key={i} className={floatIcon icon${i + 1}}>
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="features">
          <div className="featureCard">
            <h3>Unlimited Access</h3>
            <p>
              Structured discovery across expanding collections and resources.
            </p>
          </div>

          <div className="featureCard">
            <h3>AI-Powered</h3>
            <p>
              Smart assistance built to help users reach quality information.
            </p>
          </div>

          <div className="featureCard">
            <h3>Global Library</h3>
            <p>
              A borderless knowledge experience designed for worldwide reach.
            </p>
          </div>

          <div className="featureCard">
            <h3>Trusted & Legal</h3>
            <p>
              Consent-first systems, transparent policies, and compliant flows.
            </p>
          </div>

          <div className="featureCard">
            <h3>Built to Last</h3>
            <p>
              Reliable infrastructure ready for long-term growth and scale.
            </p>
          </div>
        </section>

        <footer className="footer">
          <div className="footerLeft">© {new Date().getFullYear()} Aurelia</div>

          <div className="footerLinks">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/dmca">DMCA</Link>
          </div>

          <div className="footerMail">fouedsendi185@gmail.com</div>
        </footer>
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(139, 92, 246, 0.14), transparent 35%),
            radial-gradient(circle at top right, rgba(236, 72, 153, 0.1), transparent 35%),
            linear-gradient(180deg, #06030d 0%, #090512 50%, #050308 100%);
          color: #ffffff;
          font-family: Inter, Arial, sans-serif;
          position: relative;
          overflow: hidden;
          padding: 0 24px 40px;
        }

        .bg-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(70px);
          opacity: 0.55;
          pointer-events: none;
        }

        .orb-one {
          width: 260px;
          height: 260px;
          background: #8b5cf6;
          top: 80px;
          left: -60px;
        }

        .orb-two {
          width: 300px;
          height: 300px;
          background: #ec4899;
          right: -80px;
          top: 220px;
        }

        .orb-three {
          width: 220px;
          height: 220px;
          background: #8b5cf6;
          left: 35%;
          bottom: 40px;
        }

        .navbar {
          max-width: 1250px;
          margin: 0 auto;
          height: 86px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        .brand {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: 0.6px;
          background: linear-gradient(90deg, #ffffff, #c4b5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .navLinks {
          display: flex;
          gap: 26px;
        }

        .navLinks a,
        .footerLinks a {
          color: #d8d5e5;
          text-decoration: none;
          font-size: 15px;
          transition: 0.2s ease;
        }

        .navLinks a:hover,
        .footerLinks a:hover {
          color: #ffffff;
        }

        .ctaTop {
          text-decoration: none;
          padding: 12px 18px;
          border-radius: 14px;
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          box-shadow: 0 12px 30px rgba(139, 92, 246, 0.35);
        }

        .hero {
          max-width: 1250px;
          margin: 20px auto 0;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 28px;
          align-items: center;
          min-height: 72vh;
          position: relative;
          z-index: 2;
        }

        .tag {
          display: inline-block;
          padding: 8px 12px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03);
          border-radius: 999px;
          font-size: 12px;
          letter-spacing: 1.4px;
          color: #c4b5fd;
          margin-bottom: 18px;
        }

        h1 {
          margin: 0;
          font-size: 62px;
          line-height: 1.05;
          letter-spacing: -1.8px;
          max-width: 680px;
        }

        h1 span {
          color: #ec4899;
        }

        .lead {
          margin-top: 18px;
          color: #d7d3e4;
          font-size: 18px;
          line-height: 1.8;
          max-width: 620px;
        }

        .card {
          margin-top: 28px;
          padding: 24px;
          border-radius: 22px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          max-width: 520px;
        }

        .label {
          display: block;
          margin-bottom: 10px;
          font-size: 14px;
          color: #f1eefb;
        }

        .input {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          color: white;
          outline: none;
          font-size: 16px;
        }

        .input:focus {
          border-color: #8b5cf6;
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.18);
        }

        .checkRow {
          margin-top: 16px;
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 14px;
          color: #d8d5e5;
        }

        .checkRow a {
          color: #ec4899;
          text-decoration: none;
        }

        .submitBtn {
          width: 100%;
          margin-top: 18px;
          padding: 15px;
          border: 0;
          border-radius: 14px;
          color: white;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
        }

        .submitBtn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .msg {
          margin-top: 14px;
          padding: 12px;
          border-radius: 12px;
          font-size: 14px;
        }

        .success {
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.28);
        }

        .error {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.28);
        }

        .rightSide {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .visualWrap {
          width: 520px;
          height: 520px;
          position: relative;
        }

        .globe {
          width: 280px;
          height: 280px;
          border-radius: 50%;
          position: absolute;
          top: 20px;
          left: 120px;
          background:
            radial-gradient(circle at 30% 30%, #ffffff, #c4b5fd 12%, #6d28d9 45%, #2e1065 100%);
          box-shadow:
            0 0 50px rgba(139, 92, 246, 0.55),
            0 0 110px rgba(236, 72, 153, 0.18);
        }

        .glowRing {
          position: absolute;
          inset: -14px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .ring2 {
          inset: -34px;
        }

        .continent {
          position: absolute;
          background: rgba(255,255,255,0.18);
          border-radius: 30px;
        }

        .c1 {
          width: 90px;
          height: 42px;
          top: 70px;
          left: 48px;
          transform: rotate(-18deg);
        }

        .c2 {
          width: 60px;
          height: 34px;
          top: 140px;
          right: 56px;
          transform: rotate(22deg);
        }

        .c3 {
          width: 76px;
          height: 28px;
          bottom: 72px;
          left: 92px;
        }

        .book {
          position: absolute;
          bottom: 60px;
          left: 150px;
          width: 220px;
          height: 120px;
          perspective: 900px;
        }

        .pageLeft,
        .pageRight,
        .pageCenter {
          position: absolute;
          top: 0;
          height: 100%;
          border-radius: 12px;
        }

        .pageLeft {
          left: 0;
          width: 48%;
          background: linear-gradient(180deg, #8b5cf6, #5b21b6);
          transform: rotateY(24deg);
          box-shadow: 0 20px 40px rgba(139,92,246,0.3);
        }

        .pageRight {
          right: 0;
          width: 48%;
          background: linear-gradient(180deg, #ec4899, #9d174d);
          transform: rotateY(-24deg);
          box-shadow: 0 20px 40px rgba(236,72,153,0.25);
        }

        .pageCenter {
          left: 49%;
          width: 4px;
          background: rgba(255,255,255,0.55);
        }

        .floatIcon {
          position: absolute;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          font-size: 18px;
        }

        .icon1 { top: 18px; left: 42px; }
        .icon2 { top: 72px; right: 24px; }
        .icon3 { top: 220px; left: 10px; }
        .icon4 { top: 260px; right: 8px; }
        .icon5 { bottom: 118px; left: 48px; }
        .icon6 { bottom: 34px; right: 72px; }

        .features {
          max-width: 1250px;
          margin: 40px auto 0;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          position: relative;
          z-index: 2;
        }

        .featureCard {
          padding: 22px;
          border-radius: 22px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .featureCard h3 {
          margin: 0 0 10px;
          font-size: 18px;
        }

        .featureCard p {
          margin: 0;
          color: #d8d5e5;
          line-height: 1.7;
          font-size: 14px;
        }

        .footer {
          max-width: 1250px;
          margin: 34px auto 0;
          padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
          color: #cfc9df;
          font-size: 14px;
        }

        .footerLinks {
          display: flex;
          gap: 18px;
        }

        @media (max-width: 1100px) {
          .hero {
            grid-template-columns: 1fr;
          }

          .rightSide {
            order: -1;
          }

          .features {
            grid-template-columns: repeat(2, 1fr);
          }

          h1 {
            font-size: 50px;
          }
        }

        @media (max-width: 700px) {
          .navbar {
            flex-direction: column;
            height: auto;
            gap: 14px;
            padding-top: 18px;
          }

          .navLinks {
            gap: 16px;
            flex-wrap: wrap;
            justify-content: center;
          }

          h1 {
            font-size: 38px;
          }

          .lead {
            font-size: 16px;
          }

          .visualWrap {
            width: 100%;
            height: 420px;
          }

          .globe {
            width: 220px;
            height: 220px;
            left: 50%;
            transform: translateX(-50%);
          }

          .book {
            left: 50%;
            transform: translateX(-50%);
            width: 180px;
          }

          .features {
            grid-template-columns: 1fr;
          }

          .footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  )
}
