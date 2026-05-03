import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!consent) {
      alert("Please accept Privacy Policy first");
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list! Welcome aboard.");
        setEmail("");
        setConsent(false);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Aurelia — The Future of Learning</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Aurelia gives you unlimited access to AI-powered educational resources. Join the waitlist today."
        />
        <meta property="og:title" content="Aurelia — The Future of Learning" />
        <meta
          property="og:description"
          content="Unlimited access to AI-powered educational resources."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="page-wrapper">
        {/* ── BACKGROUND ORBS ── */}
        <div className="orb orb-1" aria-hidden="true" />
        <div className="orb orb-2" aria-hidden="true" />
        <div className="orb orb-3" aria-hidden="true" />

        {/* ── NAVBAR ── */}
        <header className="navbar">
          <div className="navbar-inner">
            <span className="logo">✦ Aurelia</span>
            <nav className="nav-links">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/dmca">DMCA</Link>
            </nav>
          </div>
        </header>

        {/* ── HERO ── */}
        <main className="main">
          <section className="hero">
            {/* Illustration */}
            <div className="illustration" aria-hidden="true">
              <div className="ill-circle" />
              <div className="ill-book">
                <div className="book-cover" />
                <div className="book-pages" />
                <div className="book-spine" />
              </div>
              <div className="ill-sparkle sp-1">✦</div>
              <div className="ill-sparkle sp-2">✦</div>
              <div className="ill-sparkle sp-3">·</div>
            </div>

            {/* Badge */}
            <div className="badge">
              <span className="badge-dot" />
              Now in Early Access
            </div>

            {/* Headline */}
            <h1 className="headline">
              The Future of
              <br />
              <span className="gradient-text">Learning is Here</span>
            </h1>

            <p className="subheadline">
              Aurelia gives you unlimited, AI-powered access to curated
              educational resources — anytime, anywhere, on any device.
            </p>

            {/* ── FORM ── */}
            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="input-row">
                <input
                  type="email"
                  className="email-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  disabled={status === "loading" || status === "success"}
                />
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={status === "loading" || status === "success"}
                  aria-label="Join the waitlist"
                >
                  {status === "loading"
                    ? "Joining…"
                    : status === "success"
                    ? "✓ Joined!"
                    : "Get Early Access"}
                </button>
              </div>

              {/* Consent checkbox */}
              <label className="consent-label">
                <input
                  type="checkbox"
                  className="consent-check"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={status === "loading" || status === "success"}
                  aria-required="true"
                />
                <span className="consent-text">
                  I agree to the{" "}
                  <Link href="/privacy" className="consent-link">
                    Privacy Policy
                  </Link>{" "}
                  and consent to receiving emails from Aurelia.
                </span>
              </label>

              {/* Status message */}
              {message && (
                <p
                  className={`form-msg ${
                    status === "success" ? "msg-success" : "msg-error"
                  }`}
                  role="alert"
                >
                  {message}
                </p>
              )}
            </form>

            <p className="form-note">
              🔒 No spam. No data selling. Unsubscribe anytime.
            </p>
          </section>

          {/* ── FEATURE CARDS ── */}
          <section className="cards-section" aria-label="Features">
            <div className="cards-grid">
              {[
                {
                  icon: "∞",
                  title: "Unlimited Access",
                  desc: "Browse thousands of curated courses, books, and resources with zero paywalls.",
                },
                {
                  icon: "◈",
                  title: "AI Powered",
                  desc: "Our AI surfaces the right content at the right time, personalised to your goals.",
                },
                {
                  icon: "◉",
                  title: "Trusted",
                  desc: "Built on public-domain and open-access materials. Transparent, ethical, and legal.",
                },
                {
                  icon: "◇",
                  title: "Future Ready",
                  desc: "Stay ahead with continuously updated content aligned to tomorrow's skills.",
                },
              ].map((card) => (
                <div className="card" key={card.title}>
                  <div className="card-icon">{card.icon}</div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-desc">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <p className="footer-brand">✦ Aurelia</p>
          <nav className="footer-links" aria-label="Legal navigation">
            <Link href="/privacy">Privacy Policy</Link>
            <span className="footer-sep" aria-hidden="true">·</span>
            <Link href="/terms">Terms of Use</Link>
            <span className="footer-sep" aria-hidden="true">·</span>
            <Link href="/dmca">DMCA</Link>
          </nav>
          <p className="footer-copy">
            © {new Date().getFullYear()} Aurelia. All rights reserved.
          </p>
        </footer>
      </div>

      {/* ── STYLES ── */}
      <style jsx>{`
        /* ─── RESET & BASE ─── */
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* ─── PAGE WRAPPER ─── */
        .page-wrapper {
          position: relative;
          min-height: 100vh;
          background: #0f0a1e;
          color: #e2e8f0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, sans-serif;
          overflow-x: hidden;
        }

        /* ─── BACKGROUND ORBS ─── */
        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .orb-1 {
          width: 500px;
          height: 500px;
          background: rgba(139, 92, 246, 0.18);
          top: -120px;
          right: -80px;
        }
        .orb-2 {
          width: 380px;
          height: 380px;
          background: rgba(236, 72, 153, 0.12);
          bottom: 5%;
          left: -100px;
        }
        .orb-3 {
          width: 280px;
          height: 280px;
          background: rgba(99, 102, 241, 0.14);
          top: 45%;
          left: 50%;
          transform: translateX(-50%);
        }

        /* ─── NAVBAR ─── */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(15, 10, 30, 0.75);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(139, 92, 246, 0.15);
        }
        .navbar-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-size: 1.3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 0.02em;
        }
        .nav-links {
          display: flex;
          gap: 28px;
        }
        .nav-links :global(a) {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        .nav-links :global(a:hover) {
          color: #c4b5fd;
        }

        /* ─── MAIN ─── */
        .main {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        /* ─── HERO ─── */
        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 80px 0 60px;
          gap: 24px;
        }

        /* ─── ILLUSTRATION ─── */
        .illustration {
          position: relative;
          width: 180px;
          height: 180px;
          margin-bottom: 8px;
        }
        .ill-circle {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
          box-shadow: 0 0 60px rgba(139, 92, 246, 0.5),
            0 0 120px rgba(139, 92, 246, 0.2);
        }
        /* Book */
        .ill-book {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%) rotate(-12deg);
          width: 72px;
          height: 90px;
        }
        .book-cover {
          position: absolute;
          inset: 0;
          background: #fff;
          border-radius: 3px 6px 6px 3px;
          box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
        }
        .book-pages {
          position: absolute;
          top: 4px;
          right: -3px;
          width: 6px;
          height: calc(100% - 8px);
          background: repeating-linear-gradient(
            to bottom,
            #e2e8f0 0px,
            #e2e8f0 2px,
            #cbd5e1 2px,
            #cbd5e1 4px
          );
          border-radius: 0 2px 2px 0;
        }
        .book-spine {
          position: absolute;
          top: 0;
          left: 0;
          width: 8px;
          height: 100%;
          background: linear-gradient(180deg, #7c3aed, #5b21b6);
          border-radius: 3px 0 0 3px;
        }
        /* Sparkles */
        .ill-sparkle {
          position: absolute;
          color: #fde68a;
          font-size: 1.1rem;
          animation: sparkle-pulse 2.5s ease-in-out infinite;
        }
        .sp-1 {
          top: 10px;
          right: 18px;
          animation-delay: 0s;
        }
        .sp-2 {
          bottom: 18px;
          left: 14px;
          animation-delay: 0.8s;
          font-size: 0.75rem;
        }
        .sp-3 {
          top: 40px;
          left: 20px;
          animation-delay: 1.6s;
          font-size: 1.5rem;
          color: #c4b5fd;
        }
        @keyframes sparkle-pulse {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        /* ─── BADGE ─── */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.35);
          color: #c4b5fd;
          font-size: 0.8rem;
          font-weight: 500;
          padding: 6px 16px;
          border-radius: 100px;
          letter-spacing: 0.04em;
        }
        .badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #8b5cf6;
          animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        /* ─── HEADLINE ─── */
        .headline {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 800;
          line-height: 1.15;
          color: #f1f5f9;
          letter-spacing: -0.02em;
        }
        .gradient-text {
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ─── SUBHEADLINE ─── */
        .subheadline {
          max-width: 560px;
          font-size: clamp(1rem, 2.2vw, 1.15rem);
          color: #94a3b8;
          line-height: 1.7;
        }

        /* ─── FORM ─── */
        .form {
          width: 100%;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .input-row {
          display: flex;
          gap: 10px;
          width: 100%;
        }
        .email-input {
          flex: 1;
          min-width: 0;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 12px;
          color: #f1f5f9;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .email-input::placeholder {
          color: #64748b;
        }
        .email-input:focus {
          border-color: #8b5cf6;
          background: rgba(139, 92, 246, 0.1);
        }
        .email-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .submit-btn {
          padding: 14px 24px;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.2s, transform 0.15s;
          letter-spacing: 0.01em;
        }
        .submit-btn:hover:not(:disabled) {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ─── CONSENT ─── */
        .consent-label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          cursor: pointer;
          text-align: left;
        }
        .consent-check {
          width: 17px;
          height: 17px;
          flex-shrink: 0;
          margin-top: 2px;
          accent-color: #8b5cf6;
          cursor: pointer;
        }
        .consent-check:disabled {
          cursor: not-allowed;
        }
        .consent-text {
          font-size: 0.82rem;
          color: #94a3b8;
          line-height: 1.5;
        }
        .consent-link {
          color: #a78bfa;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }
        .consent-link:hover {
          color: #c4b5fd;
        }

        /* ─── FORM STATUS MESSAGES ─── */
        .form-msg {
          font-size: 0.87rem;
          padding: 10px 16px;
          border-radius: 10px;
          text-align: left;
        }
        .msg-success {
          background: rgba(52, 211, 153, 0.12);
          border: 1px solid rgba(52, 211, 153, 0.3);
          color: #6ee7b7;
        }
        .msg-error {
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid rgba(248, 113, 113, 0.3);
          color: #fca5a5;
        }

        /* ─── FORM NOTE ─── */
        .form-note {
          font-size: 0.78rem;
          color: #475569;
          letter-spacing: 0.01em;
        }

        /* ─── CARDS ─── */
        .cards-section {
          margin-top: 80px;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 16px;
          padding: 28px 22px;
          transition: border-color 0.25s, background 0.25s, transform 0.2s;
        }
        .card:hover {
          border-color: rgba(139, 92, 246, 0.45);
          background: rgba(139, 92, 246, 0.07);
          transform: translateY(-3px);
        }
        .card-icon {
          font-size: 1.8rem;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 14px;
        }
        .card-title {
          font-size: 1rem;
          font-weight: 700;
          color: #e2e8f0;
          margin-bottom: 8px;
        }
        .card-desc {
          font-size: 0.83rem;
          color: #64748b;
          line-height: 1.65;
        }

        /* ─── FOOTER ─── */
        .footer {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 36px 24px 40px;
          border-top: 1px solid rgba(139, 92, 246, 0.12);
        }
        .footer-brand {
          font-size: 1.1rem;
          font-weight: 700;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 14px;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .footer-links :global(a) {
          color: #64748b;
          text-decoration: none;
          font-size: 0.83rem;
          transition: color 0.2s;
        }
        .footer-links :global(a:hover) {
          color: #a78bfa;
        }
        .footer-sep {
          color: #334155;
          font-size: 0.75rem;
        }
        .footer-copy {
          font-size: 0.76rem;
          color: #334155;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 900px) {
          .cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .hero {
            padding: 56px 0 48px;
          }
          .illustration {
            width: 140px;
            height: 140px;
          }
          .input-row {
            flex-direction: column;
          }
          .submit-btn {
            width: 100%;
            padding: 15px;
          }
          .cards-grid {
            grid-template-columns: 1fr;
          }
          .nav-links {
            gap: 16px;
          }
        }
      `}</style>
    </>
  );
}

PART 2 — pages/api/subscribe.js
jsimport { createClient } from "@supabase/supabase-js";

// ── Supabase admin client (service role — never exposed to browser) ──
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// ── Helpers ──
function isValidEmail(email) {
  // RFC 5322–inspired regex (practical subset)
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return String(forwarded).split(",")[0].trim();
  return req.socket?.remoteAddress ?? "unknown";
}

// ── Rate-limit store (in-memory, resets on cold start) ──
// For production at scale, replace with Upstash Redis.
const rateLimitMap = new Map(); // ip → { count, windowStart }
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 requests per IP per window

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
}

// ── API Handler ──
export default async function handler(req, res) {
  // 1. Method guard
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // 2. Rate limiting
  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: "Too many requests. Please wait a moment and try again.",
    });
  }

  // 3. Parse & validate body
  const { email, consent } = req.body ?? {};

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email address is required." });
  }

  const cleanEmail = email.trim().toLowerCase();

  if (!isValidEmail(cleanEmail)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid email address." });
  }

  // 4. Consent is mandatory (legal requirement — Tunisia 63-2004 + GDPR Art. 7)
  if (consent !== true) {
    return res.status(400).json({
      error:
        "Consent to the Privacy Policy is required before subscribing.",
    });
  }

  // 5. Environment variable guard
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    console.error("[subscribe] Missing Supabase environment variables.");
    return res.status(500).json({
      error: "Server configuration error. Please contact support.",
    });
  }

  // 6. Insert into Supabase
  try {
    const { error: dbError } = await supabaseAdmin
      .from("subscribers")
      .insert([
        {
          email: cleanEmail,
          consent: true, // explicit — never rely solely on client value
          created_at: new Date().toISOString(),
        },
      ]);

    if (dbError) {
      // Duplicate email → Postgres unique violation code 23505
      if (dbError.code === "23505") {
        return res.status(409).json({
          error: "This email address is already registered. Thank you!",
        });
      }

      console.error("[subscribe] Supabase insert error:", dbError);
      return res.status(500).json({
        error: "Database error. Please try again later.",
      });
    }

    // 7. Success
    return res.status(201).json({
      message:
        "You have successfully joined the Aurelia waitlist. Welcome aboard!",
    });
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    return res.status(500).json({
      error: "An unexpected error occurred. Please try again.",
    });
  }
}

PART 3 — pages/privacy.js
jsximport Head from "next/head";
import Link from "next/link";

export default function Privacy() {
  const lastUpdated = "2 May 2025";
  const contactEmail = "fouedsendi185@gmail.com";
  const siteUrl = "https://aurelia-v6.vercel.app";

  return (
    <>
      <Head>
        <title>Privacy Policy — Aurelia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Aurelia Privacy Policy — how we collect, use and protect your personal data under Tunisia Law 63-2004 and EU GDPR."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="page-wrapper">
        {/* ── NAVBAR ── */}
        <header className="navbar">
          <div className="navbar-inner">
            <Link href="/" className="logo">
              ✦ Aurelia
            </Link>
            <nav className="nav-links">
              <Link href="/terms">Terms</Link>
              <Link href="/dmca">DMCA</Link>
            </nav>
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main className="main">
          <div className="doc">
            <div className="doc-header">
              <h1 className="doc-title">Privacy Policy</h1>
              <p className="doc-meta">
                Last updated: <strong>{lastUpdated}</strong> &nbsp;·&nbsp;
                Effective date: <strong>{lastUpdated}</strong>
              </p>
              <p className="doc-intro">
                At <strong>Aurelia</strong> ("{siteUrl}"), we respect your
                privacy and are committed to protecting your personal data. This
                Privacy Policy describes how we collect, use, store, and
                safeguard information you provide when joining our waitlist. It
                applies to all users globally, with specific provisions for
                Tunisian residents under <strong>Organic Law No. 63-2004</strong>{" "}
                and for residents of the European Economic Area (EEA) under the{" "}
                <strong>
                  General Data Protection Regulation (EU) 2016/679 (GDPR)
                </strong>
                .
              </p>
            </div>

            {/* 1 */}
            <section className="section">
              <h2 className="sec-title">
                1. Legal Framework &amp; Applicable Law
              </h2>

              <h3 className="sec-sub">
                1.1 Tunisia — Organic Law No. 63-2004
              </h3>
              <p>
                The processing of personal data of Tunisian residents is
                governed by <strong>Organic Law No. 63-2004 of 27 July 2004</strong>{" "}
                relating to the protection of personal data ("
                <em>la loi organique n° 63-2004 du 27 juillet 2004, portant
                sur la protection des données à caractère personnel</em>
                "), enacted by the Tunisian Republic and enforced by the
                National Authority for Protection of Personal Data (
                <strong>INPDP — Instance Nationale de Protection des Données
                Personnelles</strong>
                ).
              </p>
              <p>
                Under this law, the collection of personal data requires the{" "}
                <strong>free, specific, informed, and unambiguous consent</strong>{" "}
                of the data subject (Art. 7). Data subjects have the right of
                access (Art. 10), rectification (Art. 12), and erasure (Art.
                13). We are committed to complying fully with these obligations.
              </p>
              <p>
                Pursuant to Article 17 of Law 63-2004, personal data may only
                be transferred to a third country that ensures an adequate level
                of protection. Our infrastructure (Supabase/Vercel) is
                contractually bound to appropriate safeguards.
              </p>

              <h3 className="sec-sub">1.2 European Union — GDPR</h3>
              <p>
                For users located in the European Economic Area (EEA), our
                processing activities comply with the{" "}
                <strong>
                  General Data Protection Regulation (GDPR), Regulation (EU)
                  2016/679
                </strong>
                , which became effective on 25 May 2018. Our lawful basis for
                processing your email address is your explicit{" "}
                <strong>consent (Art. 6(1)(a) GDPR)</strong>. You have the
                right to withdraw consent at any time without affecting the
                lawfulness of prior processing.
              </p>
              <p>
                Under GDPR you benefit from: the right of access (Art. 15),
                rectification (Art. 16), erasure / "right to be forgotten"
                (Art. 17), restriction of processing (Art. 18), data
                portability (Art. 20), and the right to object (Art. 21).
              </p>
            </section>

            {/* 2 */}
            <section className="section">
              <h2 className="sec-title">2. Data Controller</h2>
              <p>
                <strong>Aurelia</strong> operates the website available at{" "}
                {siteUrl}. For the purposes of applicable data protection law,
                Aurelia is the <strong>data controller</strong> responsible for
                your personal data.
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                <a href={`mailto:${contactEmail}`} className="link">
                  {contactEmail}
                </a>
              </p>
            </section>

            {/* 3 */}
            <section className="section">
              <h2 className="sec-title">3. Data We Collect</h2>
              <p>
                <strong>
                  We collect only one piece of personal data: your email
                  address.
                </strong>
              </p>
              <p>
                When you submit the waitlist form on our homepage, we collect
                and store:
              </p>
              <ul className="list">
                <li>
                  <strong>Email address</strong> — provided voluntarily by you.
                </li>
                <li>
                  <strong>Consent record</strong> — a boolean flag (
                  <code>true</code>) confirming your agreement to this Privacy
                  Policy, recorded at the moment of submission.
                </li>
                <li>
                  <strong>Timestamp</strong> — the UTC date and time of your
                  submission, stored automatically for audit purposes.
                </li>
              </ul>
              <p>
                We do <strong>not</strong> collect: your name, phone number,
                postal address, payment information, biometric data, or any
                other category of personal data. We do not use cookies for
                tracking, and we do not deploy third-party analytics scripts on
                this site.
              </p>
            </section>

            {/* 4 */}
            <section className="section">
              <h2 className="sec-title">
                4. Purpose &amp; Legal Basis for Processing
              </h2>
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Purpose</th>
                      <th>Legal Basis (GDPR)</th>
                      <th>Legal Basis (Law 63-2004)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Add you to the Aurelia early-access waitlist</td>
                      <td>Consent — Art. 6(1)(a)</td>
                      <td>Consent — Art. 7</td>
                    </tr>
                    <tr>
                      <td>
                        Send you product updates and launch announcements via
                        email
                      </td>
                      <td>Consent — Art. 6(1)(a)</td>
                      <td>Consent — Art. 7</td>
                    </tr>
                    <tr>
                      <td>Maintain an audit trail of consent for compliance</td>
                      <td>Legal obligation — Art. 6(1)(c)</td>
                      <td>Legal obligation — Art. 9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                We will never process your email address for any purpose not
                listed above without first obtaining your renewed, specific
                consent.
              </p>
            </section>

            {/* 5 */}
            <section className="section">
              <h2 className="sec-title">5. We Do Not Sell Your Data</h2>
              <p className="highlight-box">
                <strong>We do not sell, rent, lease, or trade your personal
                data — including your email address — to any third party, under
                any circumstances, for any commercial or non-commercial
                purpose.</strong>
              </p>
            </section>

            {/* 6 */}
            <section className="section">
              <h2 className="sec-title">6. Data Storage &amp; Processors</h2>
              <p>
                Your email address and consent record are stored in a
                PostgreSQL database managed by{" "}
                <strong>Supabase, Inc.</strong> (a SOC 2 Type II certified
                cloud database provider). Our web application is hosted on{" "}
                <strong>Vercel, Inc.</strong> Both providers act as{" "}
                <strong>data processors</strong> on our behalf under Data
                Processing Agreements (DPAs) that comply with GDPR Chapter V
                requirements for international transfers.
              </p>
              <p>
                Data may be stored in servers located in the United States
                and/or the European Union. In all cases, appropriate safeguards
                (Standard Contractual Clauses where applicable) are in place.
              </p>
            </section>

            {/* 7 */}
            <section className="section">
              <h2 className="sec-title">7. Data Retention</h2>
              <p>
                We retain your email address for as long as necessary to operate
                the Aurelia waitlist service, or until you request deletion,
                whichever comes first. When the service is discontinued or your
                data is no longer needed, we will securely erase it within{" "}
                <strong>30 days</strong>.
              </p>
            </section>

            {/* 8 */}
            <section className="section">
              <h2 className="sec-title">8. Your Rights</h2>
              <p>
                Regardless of your location, you have the following rights with
                respect to your personal data:
              </p>
              <ul className="list">
                <li>
                  <strong>Right of Access:</strong> You may request a copy of
                  the personal data we hold about you.
                </li>
                <li>
                  <strong>Right of Rectification:</strong> You may ask us to
                  correct inaccurate data.
                </li>
                <li>
                  <strong>Right of Erasure ("Right to be Forgotten"):</strong>{" "}
                  You may ask us to permanently delete your email address and
                  all associated records from our database.
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> You may withdraw
                  your consent at any time. Withdrawal does not affect the
                  lawfulness of processing before withdrawal.
                </li>
                <li>
                  <strong>Right to Object:</strong> You may object to the
                  processing of your data for direct marketing purposes at any
                  time.
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> You may request
                  your data in a machine-readable format (CSV/JSON).
                </li>
              </ul>
              <p>
                To exercise any of these rights, please email us at{" "}
                <a href={`mailto:${contactEmail}`} className="link">
                  {contactEmail}
                </a>
                . We will respond within <strong>30 days</strong> (or 72 hours
                for urgent erasure requests). Tunisian residents may also lodge
                a complaint with the{" "}
                <strong>
                  INPDP (Instance Nationale de Protection des Données
                  Personnelles)
                </strong>{" "}
                at <em>www.inpdp.nat.tn</em>. EEA residents may lodge a
                complaint with their local supervisory authority.
              </p>
            </section>

            {/* 9 */}
            <section className="section">
              <h2 className="sec-title">9. Security</h2>
              <p>
                We implement appropriate technical and organisational measures
                to protect your personal data against accidental or unlawful
                destruction, loss, alteration, unauthorised disclosure, or
                access. These include encrypted connections (TLS 1.3), row-level
                security policies in our database, and restricted access to
                production credentials.
              </p>
            </section>

            {/* 10 */}
            <section className="section">
              <h2 className="sec-title">10. Children's Privacy</h2>
              <p>
                Our service is not directed to persons under the age of{" "}
                <strong>18</strong>. We do not knowingly collect personal data
                from minors. If you believe we have inadvertently collected data
                from a minor, please contact us immediately and we will delete
                it.
              </p>
            </section>

            {/* 11 */}
            <section className="section">
              <h2 className="sec-title">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we
                do, we will revise the "Last updated" date at the top of this
                page. If changes are material, we will notify subscribers by
                email. Your continued use of the service after changes are
                posted constitutes acceptance of the revised policy.
              </p>
            </section>

            {/* 12 */}
            <section className="section">
              <h2 className="sec-title">12. Contact Us</h2>
              <p>
                For any questions, requests, or concerns relating to this
                Privacy Policy or our data practices, please contact:
              </p>
              <address className="contact-block">
                <strong>Aurelia — Data Controller</strong>
                <br />
                Email:{" "}
                <a href={`mailto:${contactEmail}`} className="link">
                  {contactEmail}
                </a>
                <br />
                Website: {siteUrl}
              </address>
            </section>

            <div className="doc-footer">
              <Link href="/" className="back-link">
                ← Back to Home
              </Link>
              <div className="footer-nav">
                <Link href="/terms">Terms of Use</Link>
                <span>·</span>
                <Link href="/dmca">DMCA</Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        .page-wrapper {
          min-height: 100vh;
          background: #0f0a1e;
          color: #cbd5e1;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, sans-serif;
        }
        /* ── NAVBAR ── */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(15, 10, 30, 0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(139, 92, 246, 0.15);
        }
        .navbar-inner {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 24px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar-inner :global(.logo) {
          font-size: 1.2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 24px;
        }
        .nav-links :global(a) {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        .nav-links :global(a:hover) {
          color: #c4b5fd;
        }
        /* ── MAIN / DOC ── */
        .main {
          max-width: 860px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }
        .doc {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        /* ── DOC HEADER ── */
        .doc-header {
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
          padding-bottom: 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .doc-title {
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }
        .doc-meta {
          font-size: 0.82rem;
          color: #475569;
        }
        .doc-meta strong {
          color: #64748b;
        }
        .doc-intro {
          font-size: 0.97rem;
          color: #94a3b8;
          line-height: 1.75;
          margin-top: 6px;
        }
        /* ── SECTIONS ── */
        .section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sec-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #e2e8f0;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(139, 92, 246, 0.12);
        }
        .sec-sub {
          font-size: 0.97rem;
          font-weight: 600;
          color: #c4b5fd;
          margin-top: 4px;
        }
        p {
          font-size: 0.93rem;
          line-height: 1.78;
          color: #94a3b8;
        }
        p strong {
          color: #e2e8f0;
        }
        p code {
          background: rgba(139, 92, 246, 0.15);
          color: #c4b5fd;
          padding: 1px 5px;
          border-radius: 4px;
          font-size: 0.85em;
          font-family: "Fira Code", "Courier New", monospace;
        }
        .list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-left: 0;
        }
        .list li {
          font-size: 0.93rem;
          color: #94a3b8;
          line-height: 1.7;
          padding-left: 20px;
          position: relative;
        }
        .list li::before {
          content: "▸";
          position: absolute;
          left: 0;
          color: #7c3aed;
          font-size: 0.75rem;
          top: 4px;
        }
        .list li strong {
          color: #e2e8f0;
        }
        /* ── TABLE ── */
        .table-wrap {
          overflow-x: auto;
          border-radius: 10px;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.86rem;
        }
        .data-table thead {
          background: rgba(139, 92, 246, 0.12);
        }
        .data-table th {
          color: #c4b5fd;
          font-weight: 600;
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
          white-space: nowrap;
        }
        .data-table td {
          color: #94a3b8;
          padding: 11px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          vertical-align: top;
        }
        .data-table tbody tr:last-child td {
          border-bottom: none;
        }
        .data-table tbody tr:hover td {
          background: rgba(139, 92, 246, 0.05);
        }
        /* ── HIGHLIGHT BOX ── */
        .highlight-box {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-left: 4px solid #8b5cf6;
          border-radius: 10px;
          padding: 18px 20px;
          color: #c4b5fd !important;
          font-size: 0.95rem !important;
        }
        /* ── LINKS ── */
        .link {
          color: #a78bfa;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
          word-break: break-all;
        }
        .link:hover {
          color: #c4b5fd;
        }
        /* ── ADDRESS ── */
        .contact-block {
          font-style: normal;
          font-size: 0.93rem;
          color: #94a3b8;
          line-height: 1.9;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 10px;
          padding: 16px 20px;
        }
        .contact-block strong {
          color: #e2e8f0;
        }
        /* ── DOC FOOTER ── */
        .doc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid rgba(139, 92, 246, 0.12);
          flex-wrap: wrap;
          gap: 12px;
        }
        .back-link {
          color: #8b5cf6;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: #c4b5fd;
        }
        .footer-nav {
          display: flex;
          gap: 12px;
          align-items: center;
          font-size: 0.82rem;
        }
        .footer-nav :global(a) {
          color: #475569;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-nav :global(a:hover) {
          color: #a78bfa;
        }
        .footer-nav span {
          color: #334155;
        }
        @media (max-width: 600px) {
          .doc-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}

PART 4 — pages/terms.js
jsximport Head from "next/head";
import Link from "next/link";

export default function Terms() {
  const lastUpdated = "2 May 2025";
  const contactEmail = "fouedsendi185@gmail.com";
  const siteUrl = "https://aurelia-v6.vercel.app";

  return (
    <>
      <Head>
        <title>Terms of Use — Aurelia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Aurelia Terms of Use — rules governing use of the platform. Governed by the laws of Tunisia."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="page-wrapper">
        {/* ── NAVBAR ── */}
        <header className="navbar">
          <div className="navbar-inner">
            <Link href="/" className="logo">
              ✦ Aurelia
            </Link>
            <nav className="nav-links">
              <Link href="/privacy">Privacy</Link>
              <Link href="/dmca">DMCA</Link>
            </nav>
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main className="main">
          <div className="doc">
            <div className="doc-header">
              <h1 className="doc-title">Terms of Use</h1>
              <p className="doc-meta">
                Last updated: <strong>{lastUpdated}</strong> &nbsp;·&nbsp;
                Effective date: <strong>{lastUpdated}</strong>
              </p>
              <p className="doc-intro">
                Please read these Terms of Use ("Terms") carefully before using
                the Aurelia website located at <strong>{siteUrl}</strong>{" "}
                ("Service"). By accessing or using the Service — including
                submitting your email address to the waitlist — you agree to be
                bound by these Terms. If you do not agree, please do not use the
                Service.
              </p>
            </div>

            {/* 1 */}
            <section className="section">
              <h2 className="sec-title">1. Acceptance of Terms</h2>
              <p>
                By accessing or using any part of the Service, you represent
                that you are at least <strong>18 years of age</strong> (or the
                age of legal majority in your jurisdiction) and have the legal
                capacity to enter into a binding agreement. Use of the Service by
                anyone under 18 is strictly prohibited.
              </p>
            </section>

            {/* 2 */}
            <section className="section">
              <h2 className="sec-title">
                2. Service Provided "As Is" — Educational Purposes
              </h2>
              <p>
                The Service is provided on an{" "}
                <strong>"AS IS" and "AS AVAILABLE"</strong> basis, without
                warranties of any kind, either express or implied. Aurelia
                expressly disclaims all warranties including, without limitation,
                implied warranties of merchantability, fitness for a particular
                purpose, title, and non-infringement.
              </p>
              <p>
                The Service and all content made available through it are
                intended <strong>solely for educational and informational
                purposes</strong>. Nothing on the Service constitutes
                professional advice of any kind (legal, financial, medical, or
                otherwise). You should not act or refrain from acting based on
                any content on this Service without seeking appropriate
                professional advice.
              </p>
              <p>
                Aurelia does not warrant that: (a) the Service will be
                uninterrupted, error-free, or secure; (b) any errors or defects
                will be corrected; (c) the Service or servers are free of viruses
                or harmful components; or (d) any content is accurate, complete,
                or up to date.
              </p>
            </section>

            {/* 3 */}
            <section className="section">
              <h2 className="sec-title">3. Waitlist &amp; Communications</h2>
              <p>
                By submitting your email address and checking the consent
                checkbox, you agree to receive occasional email communications
                from Aurelia relating to the product launch, early access
                updates, and related announcements. You may unsubscribe at any
                time by contacting us at{" "}
                <a href={`mailto:${contactEmail}`} className="link">
                  {contactEmail}
                </a>
                . We will process your unsubscribe request within{" "}
                <strong>5 business days</strong>.
              </p>
            </section>

            {/* 4 */}
            <section className="section">
              <h2 className="sec-title">
                4. User Responsibility for External Links
              </h2>
              <p>
                The Service may contain hyperlinks to third-party websites,
                resources, or services that are not owned or controlled by
                Aurelia. Aurelia has no control over and assumes{" "}
                <strong>no responsibility</strong> for the content, privacy
                policies, practices, or terms of any third-party websites or
                services. You expressly acknowledge and agree that Aurelia shall
                not be responsible or liable, directly or indirectly, for any
                damage or loss caused or alleged to be caused by or in connection
                with the use of, or reliance upon, any such third-party content,
                goods, or services available on or through any such external
                websites or resources.
              </p>
              <p>
                We strongly advise you to read the terms and conditions and
                privacy policies of any third-party websites you visit. Links to
                external websites do not imply endorsement by Aurelia.
              </p>
            </section>

            {/* 5 */}
            <section className="section">
              <h2 className="sec-title">5. Intellectual Property</h2>
              <p>
                All original content on the Service, including but not limited
                to text, design, graphics, logos, and the selection and
                arrangement thereof, is owned by or licensed to Aurelia and is
                protected under applicable copyright, trademark, and other
                intellectual property laws. You may not reproduce, distribute,
                modify, create derivative works, publicly display, or otherwise
                exploit any content from the Service without our express written
                permission, except as permitted by applicable law.
              </p>
              <p>
                Educational resources made available through the platform are
                sourced exclusively from <strong>public-domain</strong> and{" "}
                <strong>open-access</strong> repositories in accordance with our{" "}
                <Link href="/dmca" className="link">
                  DMCA Policy
                </Link>
                .
              </p>
            </section>

            {/* 6 */}
            <section className="section">
              <h2 className="sec-title">6. Prohibited Conduct</h2>
              <p>You agree not to:</p>
              <ul className="list">
                <li>
                  Use the Service for any unlawful purpose or in violation of
                  any local, national, or international law or regulation.
                </li>
                <li>
                  Attempt to gain unauthorised access to any part of the Service,
                  its servers, databases, or any connected systems.
                </li>
                <li>
                  Submit false, misleading, or fraudulent information, including
                  email addresses that do not belong to you.
                </li>
                <li>
                  Engage in any conduct that restricts or inhibits any other
                  user's use or enjoyment of the Service.
                </li>
                <li>
                  Use automated means (bots, scrapers, crawlers) to access or
                  interact with the Service without our prior written consent.
                </li>
                <li>
                  Transmit any unsolicited or unauthorised advertising or
                  promotional material.
                </li>
              </ul>
            </section>

            {/* 7 */}
            <section className="section">
              <h2 className="sec-title">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Aurelia and
                its affiliates, directors, officers, employees, agents, and
                licensors shall not be liable for any indirect, incidental,
                special, consequential, exemplary, or punitive damages —
                including but not limited to loss of profits, data, goodwill,
                or other intangible losses — arising out of or in connection
                with:
              </p>
              <ul className="list">
                <li>Your access to or use of (or inability to use) the Service.</li>
                <li>Any conduct or content of any third party on the Service.</li>
                <li>
                  Any content obtained from the Service or external links.
                </li>
                <li>
                  Unauthorised access, use, or alteration of your submissions.
                </li>
              </ul>
              <p>
                In jurisdictions that do not allow the exclusion of certain
                warranties or limitation of liability, our liability shall be
                limited to the fullest extent permitted by applicable law.
              </p>
            </section>

            {/* 8 */}
            <section className="section">
              <h2 className="sec-title">
                8. Governing Law &amp; Jurisdiction
              </h2>
              <p className="highlight-box">
                These Terms shall be governed by and construed in accordance
                with the <strong>laws of the Republic of Tunisia</strong>,
                without regard to its conflict-of-law provisions. Any dispute
                arising out of or relating to these Terms or the Service shall
                be subject to the exclusive jurisdiction of the competent courts
                of <strong>Tunis, Tunisia</strong>. If you are a consumer
                located in the European Union, you may also have rights under
                the mandatory consumer protection laws of your country of
                residence.
              </p>
            </section>

            {/* 9 */}
            <section className="section">
              <h2 className="sec-title">9. Changes to These Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. When we
                do, we will update the "Last updated" date at the top of this
                page. For material changes, we will notify registered users by
                email. Your continued use of the Service after any change
                constitutes your acceptance of the new Terms. If you do not
                agree to the modified Terms, you must stop using the Service.
              </p>
            </section>

            {/* 10 */}
            <section className="section">
              <h2 className="sec-title">10. Severability &amp; Waiver</h2>
              <p>
                If any provision of these Terms is held to be invalid or
                unenforceable, such provision shall be modified to the minimum
                extent necessary to make it enforceable, and the remaining
                provisions shall continue in full force and effect. Our failure
                to enforce any right or provision of these Terms shall not
                constitute a waiver of that right or provision.
              </p>
            </section>

            {/* 11 */}
            <section className="section">
              <h2 className="sec-title">11. Contact</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <address className="contact-block">
                <strong>Aurelia</strong>
                <br />
                Email:{" "}
                <a href={`mailto:${contactEmail}`} className="link">
                  {contactEmail}
                </a>
                <br />
                Website: {siteUrl}
              </address>
            </section>

            <div className="doc-footer">
              <Link href="/" className="back-link">
                ← Back to Home
              </Link>
              <div className="footer-nav">
                <Link href="/privacy">Privacy Policy</Link>
                <span>·</span>
                <Link href="/dmca">DMCA</Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        .page-wrapper {
          min-height: 100vh;
          background: #0f0a1e;
          color: #cbd5e1;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, sans-serif;
        }
        /* ── NAVBAR ── */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(15, 10, 30, 0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(139, 92, 246, 0.15);
        }
        .navbar-inner {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 24px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar-inner :global(.logo) {
          font-size: 1.2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 24px;
        }
        .nav-links :global(a) {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        .nav-links :global(a:hover) {
          color: #c4b5fd;
        }
        /* ── MAIN ── */
        .main {
          max-width: 860px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }
        .doc {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        /* ── DOC HEADER ── */
        .doc-header {
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
          padding-bottom: 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .doc-title {
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }
        .doc-meta {
          font-size: 0.82rem;
          color: #475569;
        }
        .doc-meta strong {
          color: #64748b;
        }
        .doc-intro {
          font-size: 0.97rem;
          color: #94a3b8;
          line-height: 1.75;
          margin-top: 6px;
        }
        /* ── SECTIONS ── */
        .section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sec-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #e2e8f0;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(139, 92, 246, 0.12);
        }
        p {
          font-size: 0.93rem;
          line-height: 1.78;
          color: #94a3b8;
        }
        p strong {
          color: #e2e8f0;
        }
        .list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-left: 0;
        }
        .list li {
          font-size: 0.93rem;
          color: #94a3b8;
          line-height: 1.7;
          padding-left: 20px;
          position: relative;
        }
        .list li::before {
          content: "▸";
          position: absolute;
          left: 0;
          color: #7c3aed;
          font-size: 0.75rem;
          top: 4px;
        }
        .list li strong {
          color: #e2e8f0;
        }
        /* ── HIGHLIGHT BOX ── */
        .highlight-box {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-left: 4px solid #8b5cf6;
          border-radius: 10px;
          padding: 18px 20px;
          color: #c4b5fd !important;
          font-size: 0.95rem !important;
        }
        /* ── LINKS ── */
        .link {
          color: #a78bfa;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
          word-break: break-all;
        }
        .link:hover {
          color: #c4b5fd;
        }
        /* ── ADDRESS ── */
        .contact-block {
          font-style: normal;
          font-size: 0.93rem;
          color: #94a3b8;
          line-height: 1.9;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 10px;
          padding: 16px 20px;
        }
        .contact-block strong {
          color: #e2e8f0;
        }
        /* ── DOC FOOTER ── */
        .doc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid rgba(139, 92, 246, 0.12);
          flex-wrap: wrap;
          gap: 12px;
        }
        .back-link {
          color: #8b5cf6;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: #c4b5fd;
        }
        .footer-nav {
          display: flex;
          gap: 12px;
          align-items: center;
          font-size: 0.82rem;
        }
        .footer-nav :global(a) {
          color: #475569;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-nav :global(a:hover) {
          color: #a78bfa;
        }
        .footer-nav span {
          color: #334155;
        }
        @media (max-width: 600px) {
          .doc-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}

PART 5 — pages/dmca.js
jsximport Head from "next/head";
import Link from "next/link";

export default function DMCA() {
  const lastUpdated = "2 May 2025";
  const contactEmail = "fouedsendi185@gmail.com";
  const siteUrl = "https://aurelia-v6.vercel.app";

  return (
    <>
      <Head>
        <title>DMCA &amp; Copyright Policy — Aurelia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Aurelia DMCA and Copyright Policy — we use only public-domain and open-access content. Learn how to submit a takedown notice."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="page-wrapper">
        {/* ── NAVBAR ── */}
        <header className="navbar">
          <div className="navbar-inner">
            <Link href="/" className="logo">
              ✦ Aurelia
            </Link>
            <nav className="nav-links">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </nav>
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main className="main">
          <div className="doc">
            <div className="doc-header">
              <h1 className="doc-title">DMCA &amp; Copyright Policy</h1>
              <p className="doc-meta">
                Last updated: <strong>{lastUpdated}</strong> &nbsp;·&nbsp;
                Effective date: <strong>{lastUpdated}</strong>
              </p>
              <p className="doc-intro">
                Aurelia ("{siteUrl}") respects the intellectual property rights
                of others and expects its users to do the same. This page
                explains our content sourcing philosophy, our commitment to
                public-domain and open-access materials, and the process for
                submitting a copyright takedown notice under the{" "}
                <strong>
                  Digital Millennium Copyright Act (DMCA), 17 U.S.C. § 512
                </strong>
                , and equivalent international copyright frameworks.
              </p>
            </div>

            {/* 1 */}
            <section className="section">
              <h2 className="sec-title">
                1. Our Content Sourcing Commitment
              </h2>
              <p className="highlight-box">
                <strong>
                  Aurelia uses only Public Domain and Open-Access content.
                </strong>{" "}
                We do not reproduce, host, or distribute any material that is
                under active copyright protection without an explicit, documented
                licence permitting such use.
              </p>
              <p>
                All educational resources made available through the Aurelia
                platform are sourced exclusively from:
              </p>
              <ul className="list">
                <li>
                  <strong>Public Domain works</strong> — materials for which
                  copyright has expired, been forfeited, or waived (e.g., works
                  published before 1928 in the United States, works released
                  under CC0 1.0 Universal).
                </li>
                <li>
                  <strong>Open-Access publications</strong> — peer-reviewed
                  articles, books, and datasets published under licences such as
                  Creative Commons Attribution (CC BY), CC BY-SA, CC BY-NC, or
                  equivalent open licences that expressly permit reproduction
                  and redistribution.
                </li>
                <li>
                  <strong>Explicitly licensed materials</strong> — content for
                  which Aurelia holds a valid written licence from the rights
                  holder.
                </li>
              </ul>
              <p>
                Despite our best efforts, errors can occur. If you believe that
                any material on our platform infringes your copyright, please
                follow the notice procedure described in Section 3 below, and we
                will investigate promptly.
              </p>
            </section>

            {/* 2 */}
            <section className="section">
              <h2 className="sec-title">
                2. Designated Copyright Agent &amp; Contact
              </h2>
              <p>
                Aurelia's designated agent for receiving notices of claimed
                copyright infringement is:
              </p>
              <address className="contact-block">
                <strong>Aurelia — Copyright Agent</strong>
                <br />
                Email:{" "}
                <a href={`mailto:${contactEmail}`} className="link">
                  {contactEmail}
                </a>
                <br />
                Website: {siteUrl}
                <br />
                <br />
                <strong>Response Time: 48 hours</strong> (business days) from
                receipt of a complete, valid takedown notice.
              </address>
              <p>
                <strong>
                  We are committed to responding to all valid DMCA takedown
                  notices within 48 hours of receipt.
                </strong>{" "}
                Upon receipt of a valid notice, we will expeditiously remove or
                disable access to the allegedly infringing material and notify
                the user who posted it.
              </p>
            </section>

            {/* 3 */}
            <section className="section">
              <h2 className="sec-title">
                3. Submitting a DMCA Takedown Notice
              </h2>
              <p>
                To submit a valid DMCA takedown notice, you must send a written
                communication to our designated agent (email above) that
                includes <strong>all</strong> of the following elements, as
                required by 17 U.S.C. § 512(c)(3):
              </p>
              <ul className="list">
                <li>
                  <strong>Identification of the copyrighted work:</strong> A
                  description of the copyrighted work you claim has been
                  infringed, or a representative list if multiple works are
                  covered by a single notification.
                </li>
                <li>
                  <strong>Identification of the infringing material:</strong>{" "}
                  Sufficient information to locate the allegedly infringing
                  material on our Service — including the specific URL(s).
                </li>
                <li>
                  <strong>Your contact information:</strong> Your full legal
                  name, mailing address, telephone number, and email address.
                </li>
                <li>
                  <strong>Good-faith statement:</strong> A statement that you
                  have a good-faith belief that use of the material in the
                  manner complained of is not authorised by the copyright owner,
                  its agent, or the law.
                </li>
                <li>
                  <strong>Accuracy statement:</strong> A statement that the
                  information in the notification is accurate, and under penalty
                  of perjury, that you are authorised to act on behalf of the
                  owner of an exclusive right that is allegedly infringed.
                </li>
                <li>
                  <strong>Electronic or physical signature:</strong> A signature
                  (physical or electronic) of the person authorised to act on
                  behalf of the copyright owner.
                </li>
              </ul>
              <div className="warning-box">
                <strong>⚠ Warning:</strong> Submitting a false or fraudulent
                DMCA notice may result in civil and/or criminal liability under
                17 U.S.C. § 512(f) and applicable laws. Please ensure your
                claim is made in good faith and is accurate.
              </div>
            </section>

            {/* 4 */}
            <section className="section">
              <h2 className="sec-title">4. Counter-Notification Procedure</h2>
              <p>
                If material you uploaded or shared has been removed in response
                to a DMCA notice and you believe the removal was erroneous or
                the result of misidentification, you may submit a
                counter-notification to our designated agent containing the
                following:
              </p>
              <ul className="list">
                <li>
                  Your physical or electronic signature.
                </li>
                <li>
                  Identification of the material removed and the location where
                  it appeared before removal.
                </li>
                <li>
                  A statement under penalty of perjury that you have a
                  good-faith belief that the material was removed as a result of
                  mistake or misidentification.
                </li>
                <li>
                  Your name, address, and telephone number, and a statement
                  that you consent to the jurisdiction of the Federal District
                  Court for the judicial district in which your address is
                  located (or Tunis, Tunisia if you are located outside the
                  United States).
                </li>
              </ul>
              <p>
                Upon receipt of a valid counter-notification, we will forward it
                to the original complainant. If the complainant does not file a
                court action within <strong>10–14 business days</strong>, we may
                restore the removed material at our discretion.
              </p>
            </section>

            {/* 5 */}
            <section className="section">
              <h2 className="sec-title">5. Repeat Infringer Policy</h2>
              <p>
                In accordance with 17 U.S.C. § 512(i), Aurelia will, in
                appropriate circumstances, terminate accounts of users who are
                repeat infringers of intellectual property rights.
              </p>
            </section>

            {/* 6 */}
            <section className="section">
              <h2 className="sec-title">
                6. Modifications to This Policy
              </h2>
              <p>
                Aurelia reserves the right to modify this DMCA &amp; Copyright
                Policy at any time. Changes will be reflected by updating the
                "Last updated" date above. Continued use of the Service following
                any modification constitutes your acceptance of the revised
                policy.
              </p>
            </section>

            {/* 7 */}
            <section className="section">
              <h2 className="sec-title">7. Contact Summary</h2>
              <div className="summary-grid">
                <div className="summary-card">
                  <div className="sc-icon">📧</div>
                  <div className="sc-label">Email</div>
                  <a href={`mailto:${contactEmail}`} className="link sc-value">
                    {contactEmail}
                  </a>
                </div>
                <div className="summary-card">
                  <div className="sc-icon">⏱</div>
                  <div className="sc-label">Response Time</div>
                  <div className="sc-value">48 hours</div>
                </div>
                <div className="summary-card">
                  <div className="sc-icon">📚</div>
                  <div className="sc-label">Content Policy</div>
                  <div className="sc-value">Public Domain &amp; Open Access only</div>
                </div>
              </div>
            </section>

            <div className="doc-footer">
              <Link href="/" className="back-link">
                ← Back to Home
              </Link>
              <div className="footer-nav">
                <Link href="/privacy">Privacy Policy</Link>
                <span>·</span>
                <Link href="/terms">Terms of Use</Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        .page-wrapper {
          min-height: 100vh;
          background: #0f0a1e;
          color: #cbd5e1;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, sans-serif;
        }
        /* ── NAVBAR ── */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(15, 10, 30, 0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(139, 92, 246, 0.15);
        }
        .navbar-inner {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 24px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar-inner :global(.logo) {
          font-size: 1.2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 24px;
        }
        .nav-links :global(a) {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        .nav-links :global(a:hover) {
          color: #c4b5fd;
        }
        /* ── MAIN ── */
        .main {
          max-width: 860px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }
        .doc {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        /* ── DOC HEADER ── */
        .doc-header {
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
          padding-bottom: 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .doc-title {
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }
        .doc-meta {
          font-size: 0.82rem;
          color: #475569;
        }
        .doc-meta strong {
          color: #64748b;
        }
        .doc-intro {
          font-size: 0.97rem;
          color: #94a3b8;
          line-height: 1.75;
          margin-top: 6px;
        }
        /* ── SECTIONS ── */
        .section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sec-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #e2e8f0;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(139, 92, 246, 0.12);
        }
        p {
          font-size: 0.93rem;
          line-height: 1.78;
          color: #94a3b8;
        }
        p strong {
          color: #e2e8f0;
        }
        .list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-left: 0;
        }
        .list li {
          font-size: 0.93rem;
          color: #94a3b8;
          line-height: 1.7;
          padding-left: 20px;
          position: relative;
        }
        .list li::before {
          content: "▸";
          position: absolute;
          left: 0;
          color: #7c3aed;
          font-size: 0.75rem;
          top: 4px;
        }
        .list li strong {
          color: #e2e8f0;
        }
        /* ── BOXES ── */
        .highlight-box {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-left: 4px solid #8b5cf6;
          border-radius: 10px;
          padding: 18px 20px;
          color: #c4b5fd !important;
          font-size: 0.95rem !important;
        }
        .warning-box {
          background: rgba(251, 191, 36, 0.07);
          border: 1px solid rgba(251, 191, 36, 0.25);
          border-left: 4px solid #f59e0b;
          border-radius: 10px;
          padding: 16px 20px;
          color: #fcd34d;
          font-size: 0.88rem;
          line-height: 1.65;
        }
        /* ── LINKS ── */
        .link {
          color: #a78bfa;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
          word-break: break-all;
        }
        .link:hover {
          color: #c4b5fd;
        }
        /* ── ADDRESS ── */
        .contact-block {
          font-style: normal;
          font-size: 0.93rem;
          color: #94a3b8;
          line-height: 1.9;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 10px;
          padding: 16px 20px;
        }
        .contact-block strong {
          color: #e2e8f0;
        }
        /* ── SUMMARY GRID ── */
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .summary-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 12px;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: center;
          text-align: center;
        }
        .sc-icon {
          font-size: 1.5rem;
          margin-bottom: 4px;
        }
        .sc-label {
          font-size: 0.75rem;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
        }
        .sc-value {
          font-size: 0.88rem;
          color: #c4b5fd;
          font-weight: 500;
        }
        /* ── DOC FOOTER ── */
        .doc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid rgba(139, 92, 246, 0.12);
          flex-wrap: wrap;
          gap: 12px;
        }
        .back-link {
          color: #8b5cf6;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: #c4b5fd;
        }
        .footer-nav {
          display: flex;
          gap: 12px;
          align-items: center;
          font-size: 0.82rem;
        }
        .footer-nav :global(a) {
          color: #475569;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-nav :global(a:hover) {
          color: #a78bfa;
        }
        .footer-nav span {
          color: #334155;
        }
        @media (max-width: 640px) {
          .summary-grid {
            grid-template-columns: 1fr;
          }
          .doc-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
