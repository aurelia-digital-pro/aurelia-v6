import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!consent) {
      setStatus('يجب الموافقة على سياسة الخصوصية أولاً')
      return
    }
    setLoading(true)
    setStatus('')
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent: true })
      })
      
      const data = await res.json()
      if (res.ok) {
        setStatus('تم الاشتراك بنجاح ✓')
        setEmail('')
        setConsent(false)
      } else {
        setStatus(data.error || 'حدث خطأ. حاول مرة أخرى')
      }
    } catch (err) {
      setStatus('فشل الاتصال. تحقق من الانترنت')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-2">Aurelia V6</h1>
        <p className="text-gray-400 text-center mb-8">انضم لقائمة الانتظار واحصل على وصول مبكر</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="بريدك الإلكتروني"
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          
          <label className="flex items-start gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4"
            />
            <span>
              أوافق على <a href="/privacy" className="text-blue-400 underline">سياسة الخصوصية</a> واستلام رسائل حول Aurelia V6 حسب القانون 63-2004
            </span>
          </label>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 py-3 rounded-lg font-semibold transition"
          >
            {loading ? 'جاري الإرسال...' : 'انضم الآن'}
          </button>
          
          {status && (
            <p className={`text-center text-sm ${status.includes('نجاح') ? 'text-green-400' : 'text-red-400'}`}>
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
