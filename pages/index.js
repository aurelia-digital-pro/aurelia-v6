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
      setMessage('You must agree to receive updates | يجب الموافقة على استلام التحديثات')
      return
    }

    setLoading(true)
    setMessage('')

    const blocked = ['mailinator.com', '10minutemail.com', 'tempmail.com', 'guerrillamail.com', 'yopmail.com']
    const domain = email.split('@')[1]
    if (blocked.includes(domain)) {
      setMessage('Temporary emails are not allowed | الايميلات المؤقتة غير مسموحة')
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
        setMessage('Success! Check your inbox | تم التسجيل بنجاح. تحقق من بريدك')
        setEmail('')
        setConsent(false)
      } else {
        setMessage(data.error || 'Error. Try again | حدث خطأ. حاول مرة اخرى')
      }
    } catch (error) {
      setMessage('Connection error | خطأ في الاتصال')
    }

    setLoading(false)
  }

  const books = [
    {
      title: 'مقدمة ابن خلدون',
      titleEn: 'Muqaddimah of Ibn Khaldun',
      author: 'عبد الرحمن بن خلدون',
      year: '1377',
      desc: 'أعظم كتاب في علم الاجتماع والتاريخ الإسلامي',
      descEn: 'The greatest work on sociology and Islamic history',
      link: 'https://archive.org/details/muqaddimah',
      source: 'Harvard University',
      cover: 'https://ia801600.us.archive.org/BookReader/BookReaderImages.php?zip=/2/items/muqaddimah/muqaddimah_jp2.zip&file=muqaddimah_jp2/muqaddimah_0000.jp2&id=muqaddimah&scale=2&rotate=0'
    },
    {
      title: 'Carthage',
      titleEn: 'Carthage',
      author: 'Alfred J. Church',
      year: '1888',
      desc: 'تاريخ قرطاج وحروب حنبعل. تراث شمال أفريقيا',
      descEn: 'History of Carthage and Hannibal. North African heritage',
      link: 'https://babel.hathitrust.org/cgi/pt?id=mdp.39015028150032',
      source: 'HathiTrust Digital Library',
      cover: 'https://babel.hathitrust.org/cgi/imgsrv/image?id=mdp.39015028150032;seq=7;width=300'
    },
    {
      title: 'فن الحرب',
      titleEn: 'The Art of War',
      author: 'Sun Tzu',
      year: '5th Century BC',
      desc: 'أقدم كتاب استراتيجية عسكرية وإدارية في العالم',
      descEn: 'The oldest military and management strategy book',
      link: 'https://www.loc.gov/item/2001546887/',
      source: 'Library of Congress',
      cover: 'https://tile.loc.gov/image-services/iiif/service:gdc:gdcbookcentury:artofwar00sunt_0:artofwar00sunt_0_0001/full/pct:25/0/default.jpg'
    },
    {
      title: 'البؤساء',
      titleEn: 'Les Misérables',
      author: 'Victor Hugo',
      year: '1862',
      desc: 'ملحمة البؤساء والصراع الإنساني. أشهر رواية فرنسية',
      descEn: 'Epic of human struggle. The most famous French novel',
      link: 'https://gallica.bnf.fr/ark:/12148/bpt6k374336',
      source: 'Bibliothèque nationale de France',
      cover: 'https://gallica.bnf.fr/ark:/12148/bpt6k374336/f7.thumbnail'
    },
    {
      title: 'النبي',
      titleEn: 'The Prophet',
      author: 'Khalil Gibran',
      year: '1923',
      desc: 'تأملات فلسفية وشعرية عالمية. يربط الشرق بالغرب',
      descEn: 'Universal philosophical poetry. Bridging East and West',
      link: 'https://babel.hathitrust.org/cgi/pt?id=mdp.39015014656292',
      source: 'HathiTrust Digital Library',
      cover: 'https://babel.hathitrust.org/cgi/imgsrv/image?id=mdp.39015014656292;seq=7;width=300'
    }
  ]

  return (
    <>
      <Head>
        <title>Aurelia Digital Library - Opening Collection | مجموعة الافتتاح</title>
        <meta name="description" content="Aurelia Digital Library Opening. 5 rare public domain books from Ibn Khaldun to Carthage. | مكتبة أوريليا الرقمية - 5 كتب نادرة" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={styles.main}>
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <h2 style={styles.logo}>Aurelia</h2>
            <nav style={styles.nav}>
              <a href="/privacy" style={styles.link}>Privacy</a>
              <a href="/terms" style={styles.link}>Terms</a>
              <a href="/dmca" style={styles.link}>DMCA</a>
              <a href="/about" style={styles.link}>About</a>
            </nav>
          </div>
        </header>

        <section style={styles.hero}>
          <h1 style={styles.title}>The Aurelia Opening Collection</h1>
          <h2 style={styles.titleAr}>مجموعة افتتاح مكتبة أوريليا</h2>
          <p style={styles.subtitle}>
            From Ibn Khaldun to Carthage. 5 timeless works in the Public Domain
            <br />
            من ابن خلدون إلى قرطاج. 5 أعمال خالدة في الملكية العامة
          </p>
        </section>

        <section style={styles.booksSection}>
          <div style={styles.booksContainer}>
            <div style={styles.noticeBox}>
              <p style={styles.notice}>
                All books published before 1929. Public Domain. No hosting. Direct links to official sources only.
                <br />
                جميع الكتب منشورة قبل 1929. ملكية عامة. لا نستضيف الملفات. روابط مباشرة للمصادر الرسمية فقط
              </p>
            </div>

            <div style={styles.booksGrid}>
              {books.map((book, index) => (
                <div key={index} style={styles.bookCard}>
                  <img
                    src={book.cover}
                    alt={`Cover of ${book.titleEn}`}
                    style={styles.bookCover}
                    loading="lazy"
                  />
                  <h3 style={styles.bookTitle}>{book.title}</h3>
                  <p style={styles.bookTitleEn}>{book.titleEn}</p>
                  <p style={styles.bookAuthor}>{book.author} | {book.year}</p>
                  <p style={styles.bookDesc}>{book.desc}</p>
                  <p style={styles.bookDescEn}>{book.descEn}</p>
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    style={styles.bookButton}
                  >
                    Read & Download | قراءة وتحميل
                  </a>
                  <small style={styles.bookSource}>Source: {book.source}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.emailSection}>
          <div style={styles.emailContainer}>
            <h2 style={styles.emailTitle}>Join Early Access</h2>
            <h3 style={styles.emailTitleAr}>انضم للوصول المبكر</h3>
            <p style={styles.emailDesc}>
              Get notified about new public domain collections and research
              <br />
              احصل على إشعارات بالمجموعات والأبحاث الجديدة في الملكية العامة
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com | بريدك الالكتروني"
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
                  I agree to receive early access updates. Unsubscribe anytime
                  <br />
                  أوافق على استلام تحديثات الوصول المبكر. يمكنك إلغاء الاشتراك في أي وقت
                </span>
              </label>

              <button type="submit" disabled={loading} style={styles.button}>
                {loading? 'Submitting... | جاري التسجيل...' : 'Join Now | انضم الآن'}
              </button>

              {message && <p style={styles.message}>{message}</p>}
            </form>
          </div>
        </section>

        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <p style={styles.footerText}>
              © {new Date().getFullYear()} Aurelia Digital Library. All rights reserved to the extent permitted by law.
              <br />
              © {new Date().getFullYear()} مكتبة أوريليا الرقمية. جميع الحقوق محفوظة ضمن الحدود التي يسمح بها القانون
            </p>
            <p style={styles.footerLegal}>
              DMCA Compliant | Section 512 | Contact: digital.aurelia.2026@gmail.com
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    background: '#0a0f1e',
    color: '#fff',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    borderBottom: '1px solid #1e293b',
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  headerInner: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  },
  nav: {
    display: 'flex',
    gap: '24px'
  },
  link: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s'
  },
  hero: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '80px 20px 40px 20px',
    textAlign: 'center'
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1.1'
  },
  titleAr: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#e2e8f0'
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#94a3b8',
    lineHeight: '1.8'
  },
  booksSection: {
    padding: '40px 20px 60px 20px'
  },
  booksContainer: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  noticeBox: {
    maxWidth: '900px',
    margin: '0 auto 40px auto',
    padding: '20px',
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    textAlign: 'center'
  },
  notice: {
    fontSize: '0.9rem',
    color: '#cbd5e1',
    lineHeight: '1.8',
    margin: 0
  },
  booksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '28px'
  },
  bookCard: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease'
  },
  bookCover: {
    width: '100%',
    height: '320px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '20px',
    border: '1px solid #475569',
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
  },
  bookTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '4px',
    color: '#f1f5f9'
  },
  bookTitleEn: {
    fontSize: '0.9rem',
    color: '#60a5fa',
    marginBottom: '8px'
  },
  bookAuthor: {
    fontSize: '0.85rem',
    color: '#cbd5e1',
    marginBottom: '12px'
  },
  bookDesc: {
    fontSize: '0.9rem',
    color: '#94a3b8',
    lineHeight: '1.6',
    marginBottom: '8px',
    flex: 1
  },
  bookDescEn: {
    fontSize: '0.8rem',
    color: '#64748b',
    lineHeight: '1.5',
    marginBottom: '16px',
    fontStyle: 'italic'
  },
  bookButton: {
    display: 'inline-block',
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: '#fff',
    borderRadius: '10px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '12px',
    transition: 'transform 0.2s'
  },
  bookSource: {
    fontSize: '0.7rem',
    color: '#475569'
  },
  emailSection: {
    padding: '80px 20px',
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    borderTop: '1px solid #334155',
    borderBottom: '1px solid #334155'
  },
  emailContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center'
  },
  emailTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#f1f5f9'
  },
  emailTitleAr: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#cbd5e1'
  },
  emailDesc: {
    fontSize: '1.1rem',
    color: '#94a3b8',
    marginBottom: '40px',
    lineHeight: '1.8'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  input: {
    padding: '18px',
    fontSize: '1rem',
    borderRadius: '12px',
    border: '2px solid #334155',
    background: '#0f172a',
    color: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    fontSize: '0.85rem',
    color: '#94a3b8',
    textAlign: 'left',
    cursor: 'pointer',
    lineHeight: '1.6'
  },
  checkboxInput: {
    marginTop: '4px',
    cursor: 'pointer',
    width: '18px',
    height: '18px'
  },
  button: {
    padding: '18px',
    fontSize: '1.1rem',
    fontWeight: '700',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)'
  },
  message: {
    marginTop: '12px',
    fontSize: '0.9rem',
    color: '#60a5fa',
    fontWeight: '500'
  },
  footer: {
    padding: '40px 20px',
    background: '#0a0f1e'
  },
  footerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center'
  },
  footerText: {
    fontSize: '0.85rem',
    color: '#64748b',
    lineHeight: '1.8',
    marginBottom: '12px'
  },
  footerLegal: {
    fontSize: '0.8rem',
    color: '#475569'
  }
}
