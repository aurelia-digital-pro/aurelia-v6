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
      .insert([{ email }])

    if (error) {
      setStatus('خطأ: هذا الإيميل مسجل من قبل أو فيه مشكلة')
    } else {
      setStatus('تم التسجيل بنجاح! شكراً لك')
      setEmail('')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Arial, sans-serif', padding: '20px'
    }}>
      <div style={{
        background: 'white', borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '450px', width: '100%', padding: '40px', textAlign: 'center'
      }}>
        <div style={{
          background: '#1877f2', color: 'white', width: '60px', height: '60px',
          borderRadius: '50%', display: 'flex', alignItems: 'center',
          justifyContent: 'center', margin: '0 auto 20px', fontSize: '30px', fontWeight: 'bold'
        }}>f</div>

        <h1 style={{ fontSize: '28px', margin: '0 0 10px', color: '#1c1e21' }}>
          انضم إلينا الآن
        </h1>
        <p style={{ color: '#606770', marginBottom: '30px', fontSize: '16px' }}>
          سجل بريدك الإلكتروني واحصل على آخر التحديثات
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الإلكتروني"
            required
            style={{
              width: '100%', padding: '14px 16px', fontSize: '17px',
              border: '1px solid #dddfe2', borderRadius: '6px',
              marginBottom: '15px', boxSizing: 'border-box'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px', fontSize: '20px', fontWeight: 'bold',
              color: 'white', background: loading ? '#8b9dc3' : '#1877f2',
              border: 'none', borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'جاري التسجيل...' : 'تسجيل'}
          </button>
        </form>

        {status && (
          <p style={{
            marginTop: '20px',
            color: status.includes('نجاح') ? '#31a24c' : '#f02849',
            fontWeight: '500'
          }}>
            {status}
          </p>
        )}
      </div>
    </div>
  )
}
