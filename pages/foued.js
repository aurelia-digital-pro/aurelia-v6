import Head from 'next/head'
import MemoryCore from '../components/MemoryCore'

export default function FouedPage() {
  return (
    <>
      <Head>
        <title>Aurelia Founder Space</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div
        style={{
          minHeight: '100vh',
          background: '#000',
          color: 'white',
          padding: '60px 20px',
          fontFamily: 'serif'
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto'
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              marginBottom: '10px'
            }}
          >
            AURELIA
          </h1>

          <p
            style={{
              color: '#777',
              marginBottom: '40px',
              fontSize: '18px'
            }}
          >
            Founder Intelligence Space
          </p>

          <MemoryCore />
        </div>
      </div>
    </>
  )
}
