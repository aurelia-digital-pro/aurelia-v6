import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Aurelia - Home</title>
      </Head>
      <main style={{padding: '50px', textAlign: 'center', background: '#0A0A0A', color: 'white', minHeight: '100vh'}}>
        <h1>Aurelia شغالة</h1>
        <p>الصفحة الرئيسية رجعت</p>
        <a href="/v6" style={{color: '#a855f7'}}>روح لـ V6</a>
      </main>
    </>
  )
}
