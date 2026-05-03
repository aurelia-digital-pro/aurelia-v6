// pages/index.js
import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!consent) {
      setMessage('يجب الموافقة على استلام التحديثات')
      return
    }

    setLoading(true)
    setMessage('')

    // فلتر الايميلات المؤقتة
    const blocked = ['mailinator.com', '10minutemail.com', 'tempmail.com', 'guerrillamail.com', 'yopmail.com']
    const domain = email.split('@')[1]
    if (blocked.includes(domain)) {
      setMessage('الايميلات المؤقتة غير مسموحة')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('تم التسجيل بنجاح. تحقق من بريدك')
        setEmail('')
        setConsent(false)
      } else {
        setMessage(data.error || 'حدث خطأ. حاول مرة اخرى')
      }
    } catch (error) {
      setMessage('خطأ في الاتصال. حاول لاحقاً')
    }

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Aurelia Digital Library - The Future of Digital Knowledge</title>
        <meta name="description" content="Join early access to Aurelia Digital Library. Open knowledge, public domain books, and research for everyone." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>The Future of Digital Knowledge</h1>
          <p style={styles.subtitle}>
            مكتبة رقمية للمحتوى المفتوح والكتب العامة. انضم لقائمة الوصول المبكر
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="بريدك الالكتروني"
              required
              style={styles.input}
            />

            <label style={styles.checkbox}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                style={styles.checkboxInput}
                required
              />
              <span>
                أوافق على استلام تحديثات الوصول المبكر. يمكنك إلغاء الاشتراك في أي وقت
              </span>
            </label>

            <button type="submit" disabled={loading} style={styles.button}>
              {loading? 'جاري التسجيل...' : 'انضم للوصول المبكر'}
            </button>

            <p style={styles.legalLine}>We respect your privacy. No spam, ever.</p>

            {message && <p style={styles.message}>{message}</p>}
          </form>

          <small style={styles.consent}>
            بإدخال بريدك، توافق على استلام تحديثات الوصول المبكر. يمكنك إلغاء الاشتراك في أي وقت
            <br/>
            By submitting your email, you agree to receive early access updates. Unsubscribe anytime
          </small>
        </div>

        <footer style={styles.footer}>
          <div style={styles.legal}>
            <a href="/privacy" style={styles.link}>Privacy Policy</a> |
            <a href="/terms" style={styles.link}> Terms</a> |
            <a href="/dmca" style={styles.link}> DMCA</a>
          </div>
          <div style={styles.copy}>
            © {new Date().getFullYear()} Aurelia Digital Library. All rights reserved. | جميع الحقوق محفوظة
          </div>
        </footer>
      </main>
    </>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: '#fff',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '80px 20px',
    textAlign: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#cbd5e1',
    marginBottom: '40px',
    lineHeight: '1.6'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px'
  },
  input: {
    padding: '16px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #334155',
    background: '#1e293b',
    color: '#fff',
    outline: 'none'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    fontSize: '0.875rem',
    color: '#94a3b8',
    textAlign: 'left',
    cursor: 'pointer'
  },
  checkboxInput: {
    marginTop: '4px',
    cursor: 'pointer'
  },
  button: {
    padding: '16px',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: '#fff',
    cursor: 'pointer',
    transition: 'opacity 0.2s'
  },
  legalLine: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    marginTop: '-8px'
  },
  message: {
    marginTop: '8px',
    fontSize: '0.875rem',
    color: '#60a5fa'
  },
  consent: {
    fontSize: '0.75rem',
    color: '#64748b',
    lineHeight: '1.6'
  },
  footer: {
    padding: '32px 20px',
    borderTop: '1px solid #1e293b',
    textAlign: 'center'
  },
  legal: {
    marginBottom: '12px'
  },
  link: {
    color: '#60a5fa',
    textDecoration: 'none',
    margin: '0 8px'
  },
  copy: {
    fontSize: '0.875rem',
    color: '#64748b'
  }
}
