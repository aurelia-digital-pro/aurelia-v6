"}
```javascript
// pages/index.js
// AURELIA P1 FINAL + KNOWLEDGE UI (MERGED SAFE)

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
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(clean)
    const blocked = blockedDomains.some((d)=>clean.endsWith('@'+d))
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
      const res = await fetch('/api/subscribe',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:email.trim(),consent:agree})
      })
      const data = await res.json()
      if(!res.ok) return setMessage(data.error||'Error')

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
        <title>Aurelia Digital Library</title>
      </Head>

      <main className="page">

        {/* NAV /}
        <header className="navbar">
          <div className="brand">Aurelia</div>
          <nav className="nav">
            <a href="#books">Books</a>
            <a href="#sources">Sources</a>
            <Link href="/privacy">Privacy</Link>
          </nav>
          <a href="#join" className="topBtn">Early Access</a>
        </header>

        {/ HERO + FORM /}
        <section className="hero">
          <div>
            <h1>The Future of Knowledge</h1>

            <form onSubmit={handleSubmit} className="card" id="join">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="input"
              />

              <label className="check">
                <input type="checkbox"
                  checked={agree}
                  onChange={(e)=>setAgree(e.target.checked)}
                />
                <span>I agree to <Link href="/privacy">Privacy</Link></span>
              </label>

              <button className="btn" disabled={loading}>
                {loading?'...':'Join'}
              </button>

              {message && (
                <div className={success?'msg ok':'msg err'}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </section>

        {/ BOOKS /}
        <section id="books" className="section">
          <h2>Core Books</h2>

          <div className="grid">
            <a href="https://archive.org/details/muqaddimah_202107" target="_blank">مقدمة ابن خلدون</a>
            <a href="https://ctext.org/art-of-war" target="_blank">فن الحرب</a>
            <a href="https://www.gutenberg.org/ebooks/58585" target="_blank">النبي</a>
            <a href="https://www.gutenberg.org/ebooks/135" target="_blank">البؤساء</a>
            <a href="https://www.gutenberg.org/ebooks/28233" target="_blank">Newton Principia</a>
          </div>
        </section>

        {/ SOURCES /}
        <section id="sources" className="section">
          <h2>Trusted Sources</h2>

          <div className="grid">
            <a href="https://www.nasa.gov/" target="_blank">NASA</a>
            <a href="https://ocw.mit.edu/" target="_blank">MIT</a>
            <a href="https://www.si.edu/openaccess" target="_blank">Smithsonian</a>
            <a href="https://www.wolframalpha.com/" target="_blank">WolframAlpha</a>
          </div>
        </section>

        {/ FOOTER */}
        <footer className="footer">
          © Aurelia Digital Library
        </footer>

      </main>

      <style jsx>{        .page{background:#05040b;color:white;padding:20px}         .navbar{display:flex;justify-content:space-between}         .grid{display:grid;gap:10px}         .card{margin-top:20px}         .input{width:100%;padding:10px}         .btn{margin-top:10px}      }</style>
    </>
  )
}
`
