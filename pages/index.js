import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setStatus('Success! Check your email')
        setEmail('')
      } else {
        setStatus('Error: ' + data.error)
      }
    } catch (error) {
      setStatus('Connection error')
    }
    
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>AURELIA v6</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at top, #1a1a2e, #0a0a1a)',
        color: 'white',
        fontFamily: 'Inter, sans-serif',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background effects */}
        <div style={{
          position: 'absolute',
          top: '20%', left: '10%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)',
          filter: 'blur(60px)'
        }}></div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          
          <div style={{ textAlign: 'center', paddingTop: '80px' }}>
            <p style={{ fontSize: '14px', opacity: 0.6, letterSpacing: '2px' }}>
              Building The Future of Knowledge
            </p>
            
            <h1 style={{ 
              fontSize: '64px', 
              fontWeight: 700,
              margin: '20px 0',
              background: 'linear-gradient(90deg, #fff, #a78bfa, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1
            }}>
              Where Science <br/> Meets Evolution
            </h1>
            
            <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '50px', maxWidth: '600px', margin: '0 auto 50px' }}>
              Open digital library powered by legal global sources, future education
              systems, and intelligent reading tools.
            </p>

            <form onSubmit={handleSubmit} style={{ 
              display: 'flex', 
              gap: '12px', 
              justifyContent: 'center',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  padding: '16px 32px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  opacity: loading ? 0.7 : 1,
                  boxShadow: '0 0 20px rgba(168,85,247,0.4)'
                }}
              >
                {loading ? '...' : 'Request Early Access'}
              </button>
            </form>
            
            {status && <p style={{ marginTop: '20px', fontSize: '16px', opacity: 0.9 }}>{status}</p>}
          </div>

          {/* الكروت اللي تحت */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px', 
            marginTop: '100px' 
          }}>
            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Freedom of Knowledge</h3>
              <p style={{ opacity: 0.7 }}>Millions of open books and research papers from verified legal sources.</p>
            </div>
            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>AI Native Core</h3>
              <p style={{ opacity: 0.7 }}>Smart summaries, recommendations and analytics for deep learning.</p>
            </div>
            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Built for Generations</h3>
              <p style={{ opacity: 0.7 }}>Modern infrastructure for schools, researchers and lifelong readers.</p>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
