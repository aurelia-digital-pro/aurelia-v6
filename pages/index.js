// pages/index.js
// AURELIA OFFICIAL P1 FINAL (UPDATED SAFE)
// Stage: AURELIA-P1 → P2 READY

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
      setMessage(
        'Please use a real email address. Temporary emails are not allowed.'
      )
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
      setMessage(
        data.message ||
          'Thank you. Your early access request has been received.'
      )
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
      </Head>

      <main className="page">

        {/* NAVBAR */}
        <header className="navbar">
          <div className="brand">
            Aurelia Digital Library
          </div>

          <nav className="nav">
            <a href="#about">About</a>
            <a href="#mission">Mission</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/dmca">DMCA</Link>
          </nav>

          {/* ✅ زر المكتبة الجديد */}
          <a href="/library" className="topBtn">
            Enter Library
          </a>
        </header>

        {/* HERO */}
        <section className="hero">
          <div className="left">
            <h1>
              The Future of
              <span> Global Knowledge </span>
              Starts Here
            </h1>

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
                  <Link href="/privacy">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="btn"
              >
                {loading ? 'Submitting...' : 'Request Early Access'}
              </button>

              {message && (
                <div className={success ? 'msg ok' : 'msg err'}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </section>

      </main>
    </>
  )
}
