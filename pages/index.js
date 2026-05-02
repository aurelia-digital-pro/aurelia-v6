import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// نستخدم المفتاحين السفليين فقط
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    const { error } = await supabase
      .from('subscribers')
      .insert([{ email: email }])

    if (error) {
      if (error.code === '23505') {
        setStatus('مسجل من قبل')
      } else {
        setStatus('فيه مشكلة: ' + error.message)
      }
    } else {
      setStatus('تم الاشتراك بنجاح!')
      setEmail('')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '60px 40px',
        borderRadius: '20px',
        textAlign: 'center',
        maxWidth: '500px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <h1 style={{ color: 'white', fontSize: '48px', marginBottom: '10px' }}>
          Aurelia V6
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', marginBottom: '40px' }}>
          Where Science Meets Evolution
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ادخل ايميلك"
            required
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              marginBottom: '20px',
              fontSize: '16px'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'white',
              color: '#764ba2',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {loading ? 'جاري...' : 'اشترك الآن'}
          </button>
        </form>
        
        {status && (
          <p style={{ color: 'white', marginTop: '20px', fontSize: '16px' }}>
            {status}
          </p>
        )}
      </div>
    </div>
  )
}
