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

  // الاضافة فقط: مصفوفة الـ 5 كتب القانونية
  const books = [
    {
      title: 'مقدمة ابن خلدون',
      author: 'عبد الرحمن بن خلدون',
      year: '1377',
      desc: 'اعظم كتاب في علم الاجتماع والتاريخ الاسلامي',
      link: 'https://archive.org/details/muqaddimah',
      source: 'Islamic Heritage Project - Harvard'
    },
    {
      title: 'Carthage',
      author: 'Alfred J. Church',
      year: '1888',
      desc: 'تاريخ قرطاج وحروب حنبعل. تراث شمال افريقيا',
      link: 'https://babel.hathitrust.org/cgi/pt?id=mdp.39015028150032',
      source: 'HathiTrust Digital Library'
    },
    {
      title: 'The Art of War',
      author: 'Sun Tzu',
      year: 'قبل الميلاد',
      desc: 'اقدم كتاب استراتيجية عسكرية وادارية في العالم',
      link: 'https://www.loc.gov/item/2001546887/',
      source: 'Library of Congress'
    },
    {
      title: 'Les Misérables',
      author: 'Victor Hugo',
      year: '1862',
      desc: 'ملحمة البؤساء والصراع الانساني. اشهر رواية فرنسية',
      link: 'https://gallica.bnf.fr/ark:/12148/bpt6k374336',
      source: 'Gallica - Bibliothèque nationale de France'
    },
    {
      title: 'The Prophet',
      author: 'Khalil Gibran',
      year: '1923',
      desc: 'تأملات فلسفية وشعرية عالمية. يربط الشرق بالغرب',
      link: 'https://babel.hathitrust.org/cgi/pt?id=mdp.39015014656292',
      source: 'HathiTrust Digital Library'
    }
  ]

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
              />
              <span>
                أوافق على استلام تحديثات الوصول المبكر. يمكنك إلغاء الاشتراك في أي وقت
              </span>
            </label>

            <button type="submit" disabled={loading} style={styles.button}>
              {loading? 'جاري التسجيل...' : 'انضم للوصول المبكر'}
            </button>

            {message && <p style={styles.message}>{message}</p>}
          </form>

          <small style={styles.consent}>
            بإدخال بريدك، توافق على استلام تحديثات الوصول المبكر. يمكنك إلغاء الاشتراك في أي وقت
            <br/>
            By submitting your email, you agree to receive early access updates. Unsubscribe anytime
          </small>
        </div>

        {/* الاضافة فقط: قسم كتب الافتتاح */}
        <section style={styles.booksSection}>
          <div style={styles.booksContainer}>
            <h2 style={styles.booksTitle}>كتب الافتتاح: من التراث العالمي</h2>
            <p style={styles.booksSubtitle}>
              5 كتب نادرة قبل 1929. من ابن خلدون إلى قرطاج. كلها Public Domain
            </p>

            <div style={styles.booksGrid}>
              {books.map((book, index) => (
                <div key={index} style={styles.bookCard}>
                  <h3 style={styles.bookTitle}>{book.title}</h3>
                  <p style={styles.bookAuthor}>{book.author} - {book.year}</p>
                  <p style={styles.bookDesc}>{book.desc}</p>
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.bookButton}
                  >
                    قراءة وتحميل من المصدر الرسمي
                  </a>
                  <small style={styles.bookSource}>المصدر: {book.source}</small>
                </div>
              ))}
            </div>

            <p style={styles.legalNote}>
              جميع الكتب في الملكية العامة Public Domain قبل 1929. نحن لا نستضيف الملفات.
              الروابط توجهك مباشرة للمصادر الحكومية والجامعية الرسمية وفق DMCA Section 512
            </p>
          </div>
        </section>
        {/* نهاية الاضافة */}

        <footer style={styles.footer}>
          <div style={styles.legal}>
            <a href="/privacy" style={styles.link}>Privacy Policy</a> |
            <a href="/terms" style={styles.link}> Terms</a> |
            <a href="/dmca" style={styles.link}> DMCA</a> |
            <a href="/about" style={styles.link}> About Us</a>
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
  // الاضافة فقط: ستايلات قسم الكتب
  booksSection: {
    width: '100%',
    background: '#0f172a',
    padding: '60px 20px',
    borderTop: '1px solid #1e293b'
  },
  booksContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center'
  },
  booksTitle: {
    fontSize: '2.25rem',
    fontWeight: '700',
    marginBottom: '12px',
    color: '#f1f5f9'
  },
  booksSubtitle: {
    fontSize: '1.125rem',
    color: '#94a3b8',
    marginBottom: '48px'
  },
  booksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '40px'
  },
  bookCard: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column'
  },
  bookTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#60a5fa'
  },
  bookAuthor: {
    fontSize: '0.875rem',
    color: '#cbd5e1',
    marginBottom: '12px'
  },
  bookDesc: {
    fontSize: '0.9rem',
    color: '#94a3b8',
    lineHeight: '1.6',
    marginBottom: '20px',
    flex: 1
  },
  bookButton: {
    display: 'inline-block',
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '12px',
    transition: 'opacity 0.2s'
  },
  bookSource: {
    fontSize: '0.75rem',
    color: '#64748b'
  },
  legalNote: {
    fontSize: '0.8rem',
    color: '#64748b',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  // نهاية الاضافة
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
