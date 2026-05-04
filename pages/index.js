// pages/index.js - AURELIA P6 OFFICIAL FINAL
// DO NOT EDIT - النسخة الرسمية النهائية
import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const books = [
    {
      title: 'مقدمة ابن خلدون',
      author: 'ابن خلدون',
      year: '1377',
      img: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Muqaddimah_Ibn_Khaldun_1st_page.jpg',
      link: 'https://archive.org/details/muqaddimah'
    },
    {
      title: 'Carthage',
      author: 'R. Bosworth Smith',
      year: '1878',
      img: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Dido_Building_Carthage.jpg',
      link: 'https://www.gutenberg.org/ebooks/72903'
    },
    {
      title: 'The Art of War',
      author: 'Sun Tzu',
      year: 'BC',
      img: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Sunzi_bingfa.jpg',
      link: 'https://www.gutenberg.org/ebooks/132'
    },
    {
      title: 'Les Misérables',
      author: 'Victor Hugo',
      year: '1862',
      img: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Les_miserables_Cover.jpg',
      link: 'https://www.gutenberg.org/ebooks/135'
    },
    {
      title: 'The Prophet',
      author: 'Khalil Gibran',
      year: '1923',
      img: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/The_Prophet_%281923%29_cover.jpg',
      link: 'https://www.gutenberg.org/ebooks/58585'
    },
    {
      title: 'Webster Dictionary',
      author: 'Noah Webster',
      year: '1913',
      img: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Webster%27s_New_International_Dictionary_1913.jpg',
      link: 'https://www.gutenberg.org/ebooks/673'
    }
  ]

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setMsg('تم التسجيل بنجاح | Registered Successfully')
      setEmail('')
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
          <p>مكتبة رقمية عالمية للمحتوى المفتوح والكتب العامة</p>
          <form onSubmit={submit} className="form">
            <input
              type="email"
              required
              placeholder="بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">
              {loading ? 'Loading...' : 'انضم للوصول المبكر'}
            </button>
            {msg && <div className="msg">{msg}</div>}
          </form>
        </section>

        <section className="books">
          <h2>كتب الافتتاح</h2>
          <div className="grid">
            {books.map((b, i) => (
              <div className="card" key={i}>
                <div className="num">{i + 1}</div>
                <img src={b.img} alt={b.title} loading="lazy" />
                <h3>{b.title}</h3>
                <p>{b.author}</p>
                <small>{b.year}</small>
                <a href={b.link} target="_blank" rel="noopener noreferrer nofollow">
                  قراءة وتحميل
                </a>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <div>AURELIA DIGITAL LIBRARY</div>
          <p>Public Domain • DMCA Compliant • External Sources Only</p>
        </footer>
      </main>

      <style jsx>{`
        .page { background: linear-gradient(180deg, #020617, #0f172a); min-height: 100vh; color: white; font-family: Arial; }
        .nav { display: flex; justify-content: center; padding: 22px 30px; border-bottom: 1px solid #1e293b; }
        .logo { font-size: 28px; font-weight: bold; background: linear-gradient(90deg, #60a5fa, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero { max-width: 850px; margin: auto; text-align: center; padding: 80px 20px; }
        .hero h1 { font-size: 58px; line-height: 1.1; margin-bottom: 20px; background: linear-gradient(90deg, #60a5fa, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero p { color: #cbd5e1; font-size: 20px; margin-bottom: 35px; }
        .form { max-width: 600px; margin: auto; }
        input { width: 100%; padding: 18px; border-radius: 12px; border: 1px solid #334155; background: #0f172a; color: white; margin-bottom: 15px; }
        button { width: 100%; padding: 18px; border: none; border-radius: 12px; background: linear-gradient(90deg, #2563eb, #9333ea); color: white; font-size: 18px; font-weight: bold; cursor: pointer; }
        .msg { margin-top: 15px; color: #38bdf8; }
        .books { padding: 50px 20px; max-width: 1400px; margin: auto; }
        .books h2 { text-align: center; font-size: 42px; margin-bottom: 35px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 25px; }
        .card { background: #0f172a; border: 1px solid #1e293b; padding: 18px; border-radius: 18px; text-align: center; position: relative; }
        .num { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(90deg, #2563eb, #9333ea); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .card img { width: 100%; height: 320px; object-fit: cover; border-radius: 14px; margin-bottom: 15px; }
        .card h3 { margin: 10px 0 8px; }
        .card p { color: #cbd5e1; margin: 0; }
        .card small { display: block; margin: 8px 0 14px; color: #94a3b8; }
        .card a { display: block; padding: 12px; background: linear-gradient(90deg, #2563eb, #9333ea); border-radius: 12px; color: white; text-decoration: none; font-weight: bold; }
        .footer { text-align: center; padding: 50px 20px; color: #94a3b8; border-top: 1px solid #1e293b; margin-top: 50px; }
        @media (max-width: 768px) { .hero h1 { font-size: 38px; } }
      `}</style>
    </>
  )
}
