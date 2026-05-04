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

  // 6 كتب مرتبة تسلسل حضاري: شرق → غرب → فلسفة → استراتيجية → أدب → شعر
  const books = [
    {
      title: 'مقدمة ابن خلدون',
      titleEn: 'Muqaddimah of Ibn Khaldun',
      author: 'عبد الرحمن بن خلدون',
      year: '1377',
      desc: 'أساس علم الاجتماع والتاريخ. أعظم كتاب عربي في الحضارة',
      descEn: 'Foundation of sociology and history. Greatest Arabic work on civilization',
      link: 'https://archive.org/details/muqaddimah',
      source: 'Harvard University',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Muqaddimah_Ibn_Khaldun_1st_page.jpg/440px-Muqaddimah_Ibn_Khaldun_1st_page.jpg'
    },
    {
      title: 'Carthage',
      titleEn: 'Carthage: The Story of the City',
      author: 'Alfred J. Church',
      year: '1888',
      desc: 'تاريخ قرطاج العظيمة وحروب حنبعل. تراث شمال أفريقيا الخالد',
      descEn: 'History of great Carthage and Hannibal. Immortal North African heritage',
      link: 'https://archive.org/details/carthagestoryoft00churrich',
      source: 'Internet Archive',
      cover: 'https://archive.org/services/img/carthagestoryoft00churrich'
    },
    {
      title: 'Webster’s 1913 Dictionary',
      titleEn: 'Webster\'s 1913 Dictionary',
      author: 'Noah Webster',
      year: '1913',
      desc: 'قاموس إنجليزي كلاسيكي كامل. كنز للمدارس والشركات والباحثين',
      descEn: 'Complete classical English dictionary. Treasure for schools, companies, researchers',
      link: 'https://www.gutenberg.org/ebooks/673',
      source: 'Project Gutenberg',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Webster%27s_New_International_Dictionary_1913.jpg/440px-Webster%27s_New_International_Dictionary_1913.jpg'
    },
    {
      title: 'فن الحرب',
      titleEn: 'The Art of War',
      author: 'Sun Tzu',
      year: '5th Century BC',
      desc: 'أقدم كتاب استراتيجية عسكرية وإدارية. دستور القادة عبر التاريخ',
      descEn: 'Oldest military and management strategy. Constitution of leaders through history',
      link: 'https://www.gutenberg.org/ebooks/132',
      source: 'Project Gutenberg',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Sunzi_bingfa.jpg/440px-Sunzi_bingfa.jpg'
    },
    {
      title: 'البؤساء',
      titleEn: 'Les Misérables',
      author: 'Victor Hugo',
      year: '1862',
      desc: 'ملحمة إنسانية عن العدالة والرحمة. أعظم رواية فرنسية على الإطلاق',
      descEn: 'Human epic of justice and mercy. Greatest French novel ever',
      link: 'https://www.gutenberg.org/ebooks/135',
      source: 'Project Gutenberg',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Les_miserables_Cover.jpg/440px-Les_miserables_Cover.jpg'
    },
    {
      title: 'النبي',
      titleEn: 'The Prophet',
      author: 'Khalil Gibran',
      year: '1923',
      desc: 'شعر فلسفي عالمي يربط الشرق بالغرب. حكمة خالدة في الحب والحياة',
      descEn: 'Universal philosophical poetry bridging East and West. Timeless wisdom on love and life',
      link: 'https://www.gutenberg.org/ebooks/58585',
      source: 'Project Gutenberg',
      cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/The_Prophet_%281923%29_cover.jpg/440px-The_Prophet_%281923%29_cover.jpg'
    }
  ]

  return (
    <>
      <Head>
        <title>Aurelia - The Royal Opening Collection | المجموعة الملكية الافتتاحية</title>
        <meta name="description" content="Aurelia Royal Opening: 6 timeless Public Domain masterpieces from Ibn Khaldun to Webster's Dictionary. | 6 روائع خالدة من ابن خلدون إلى قاموس وبستر" />
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

        {/* العنوان الملكي الترحيبي العالمي */}
        <section style={styles.hero}>
          <h1 style={styles.title}>The Royal Opening of Aurelia</h1>
          <h2 style={styles.titleAr}>الافتتاح الملكي لمكتبة أوريليا</h2>
          <p style={styles.subtitle}>
            Six Timeless Masterpieces. From Civilization to Language. Public Domain for All Humanity
            <br />
            ست روائع خالدة. من الحضارة إلى اللغة. ملكية عامة لكل البشرية
          </p>
        </section>

        {/* 6 كتب في الأعلى مرتبة */}
        <section style={styles.booksSection}>
          <div style={styles.booksContainer}>
            <div style={styles.noticeBox}>
              <p style={styles.notice}>
                All works published before 1929. Public Domain. No hosting. Direct links to official sources only.
                <br />
                جميع الأعمال منشورة قبل 1929. ملكية عامة. لا نستضيف الملفات. روابط مباشرة للمصادر الرسمية فقط
              </p>
            </div>

            <div style={styles.booksGrid}>
              {books.map((book, index) => (
                <div key={index} style={styles.bookCard}>
                  <div style={styles.bookNumber}>{index + 1}</div>
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
                    Open Source | فتح المصدر
                  </a>
                  <small style={styles.bookSource}>Source: {book.source}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم القاموس الخاص - Webster */}
        <section style={styles.dictionarySection}>
          <div style={styles.dictionaryContainer}>
            <h2 style={styles.dictionaryTitle}>The Aurelia Classic Dictionary</h2>
            <h3 style={styles.dictionaryTitleAr}>قاموس أوريليا الكلاسيكي</h3>
            <p style={styles.dictionaryDesc}>
              Webster's 1913 Public Domain Edition. Explore timeless English definitions, language history, and classical vocabulary.
              <br />
              نسخة وبستر 1913 للملكية العامة. استكشف تعاريف الإنجليزية الخالدة وتاريخ اللغة والمفردات الكلاسيكية
            </p>
            <a
              href="https://www.gutenberg.org/ebooks/673"
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={styles.dictionaryButton}
            >
              Open Dictionary | فتح القاموس
            </a>
            <p style={styles.dictionaryNote}>
              For schools, companies, researchers, and writers | للمدارس والشركات والباحثين والكتّاب
            </p>
          </div>
        </section>

        {/* الايميل في الوسط */}
        <section style={styles.emailSection}>
          <div style={styles.emailContainer}>
            <h2 style={styles.emailTitle}>Join The Royal Archive</h2>
            <h3 style={styles.emailTitleAr}>انضم للأرشيف الملكي</h3>
            <p style={styles.emailDesc}>
              Get early access to new collections, dictionaries, and research tools
              <br />
              احصل على وصول مبكر للمجموعات والقواميس وأدوات البحث الجديدة
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
                {loading? 'Submitting... | جاري التسجيل...' : 'Enter The Archive | ادخل الأرشيف'}
              </button>

              {message && <p style={styles.message}>{message}</p>}
            </form>
          </div>
        </section>

        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <p style={styles.footerText}>
              © {new Date().getFullYear()} Aurelia Digital Library. Public Domain Knowledge for Humanity.
              <br />
              © {new Date().getFullYear()} مكتبة أوريليا الرقمية. المعرفة العامة للبشرية
            </p>
            <p style={styles.footerLegal}>
              DMCA Compliant | Section 512 | All works pre-1929 PD | Contact: digital.aurelia.2026@gmail.com
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
    background: 'linear-gradient(180deg, #0a0f1e 0%, #0f172a 100%)',
    color: '#fff',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    borderBottom: '1px solid #1e293b',
    background: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(12px)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  headerInner: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '18px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '1.6rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  },
  nav: {
    display: 'flex',
    gap: '28px'
  },
  link: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'color 0.2s'
  },
  hero: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '100px 20px 60px 20px',
    textAlign: 'center'
  },
  title: {
    fontSize: '4rem',
    fontWeight: '900',
    marginBottom: '12px',
    background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1.1',
    letterSpacing: '-0.02em'
  },
  titleAr: {
    fontSize: '2.8rem',
    fontWeight: '800',
    marginBottom: '28px',
    color: '#e2e8f0'
  },
  subtitle: {
    fontSize: '1.3rem',
    color: '#94a3b8',
    lineHeight: '1.9',
    maxWidth: '800px',
    margin: '0 auto'
  },
  booksSection: {
    padding: '60px 20px 40px 20px'
  },
  booksContainer: {
    maxWidth: '1500px',
    margin: '0 auto'
  },
  noticeBox: {
    maxWidth: '1000px',
    margin: '0 auto 50px auto',
    padding: '24px',
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderRadius: '16px',
    textAlign: 'center'
  },
  notice: {
    fontSize: '0.95rem',
    color: '#cbd5e1',
    lineHeight: '1.9',
    margin: 0
  },
  booksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px'
  },
  bookCard: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid #334155',
    borderRadius: '20px',
    padding: '28px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    position: 'relative'
  },
  bookNumber: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '0.9rem'
  },
  bookCover: {
    width: '100%',
    height: '340px',
    objectFit: 'cover',
    borderRadius: '14px',
    marginBottom: '20px',
    border: '1px solid #475569',
    boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
  },
  bookTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '6px',
    color: '#f1f5f9'
  },
  bookTitleEn: {
    fontSize: '0.9rem',
    color: '#60a5fa',
    marginBottom: '10px',
    fontWeight: '500'
  },
  bookAuthor: {
    fontSize: '0.85rem',
    color: '#cbd5e1',
    marginBottom: '14px'
  },
  bookDesc: {
    fontSize: '0.92rem',
    color: '#94a3b8',
    lineHeight: '1.7',
    marginBottom: '10px',
    flex: 1
  },
  bookDescEn: {
    fontSize: '0.82rem',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '18px',
    fontStyle: 'italic'
  },
  bookButton: {
    display: 'inline-block',
    padding: '13px 22px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: '#fff',
    borderRadius: '12px',
    textDecoration: 'none',
    fontSize: '0.92rem',
    fontWeight: '700',
    marginBottom: '14px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
  },
  bookSource: {
    fontSize: '0.72rem',
    color: '#475569'
  },
  dictionarySection: {
    padding: '80px 20px',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    borderTop: '1px solid #334155',
    borderBottom: '1px solid #334155',
    margin: '60px 0'
  },
  dictionaryContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center'
  },
  dictionaryTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '12px',
    background: 'linear-gradient(135deg, #f472b6 0%, #a78bfa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  dictionaryTitleAr: {
    fontSize: '2.2rem',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#e2e8f0'
  },
  dictionaryDesc: {
    fontSize: '1.15rem',
    color: '#94a3b8',
    lineHeight: '1.9',
    marginBottom: '32px'
  },
  dictionaryButton: {
    display: 'inline-block',
    padding: '18px 40px',
    background: 'linear-gradient(135deg, #f472b6 0%, #8b5cf6 100%)',
    color: '#fff',
    borderRadius: '14px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '20px',
    transition: 'transform 0.2s',
    boxShadow: '0 6px 25px rgba(244, 114, 182, 0.4)'
  },
  dictionaryNote: {
    fontSize: '0.9rem',
    color: '#64748b'
  },
  emailSection: {
    padding: '90px 20px',
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  emailContainer: {
    maxWidth: '650px',
    margin: '0 auto',
    textAlign: 'center'
  },
  emailTitle: {
    fontSize: '2.8rem',
    fontWeight: '800',
    marginBottom: '10px',
    color: '#f1f5f9'
  },
  emailTitleAr: {
    fontSize: '2.2rem',
    fontWeight: '700',
    marginBottom: '18px',
    color: '#cbd5e1'
  },
  emailDesc: {
    fontSize: '1.15rem',
    color: '#94a3b8',
    marginBottom: '45px',
    lineHeight: '1.9'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  input: {
    padding: '20px',
    fontSize: '1.05rem',
    borderRadius: '14px',
    border: '2px solid #334155',
    background: '#0f172a',
    color: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    fontSize: '0.88rem',
    color: '#94a3b8',
    textAlign: 'left',
    cursor: 'pointer',
    lineHeight: '1.7'
  },
  checkboxInput: {
    marginTop: '4px',
    cursor: 'pointer',
    width: '20px',
    height: '20px'
  },
  button: {
    padding: '20px',
    fontSize: '1.15rem',
    fontWeight: '800',
    borderRadius: '14px',
    border: 'none',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #f472b6 100%)',
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 6px 25px rgba(59, 130, 246, 0.5)'
  },
  message: {
    marginTop: '14px',
    fontSize: '0.95rem',
    color: '#60a5fa',
    fontWeight: '600'
  },
  footer: {
    padding: '50px 20px',
    background: '#0a0f1e',
    borderTop: '1px solid #1e293b'
  },
  footerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center'
  },
  footerText: {
    fontSize: '0.9rem',
    color: '#64748b',
    lineHeight: '1.9',
    marginBottom: '14px'
  },
  footerLegal: {
    fontSize: '0.82rem',
    color: '#475569'
  }
}
