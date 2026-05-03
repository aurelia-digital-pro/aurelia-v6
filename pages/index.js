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
      setMessage('يجب الموافقة على الشروط أولاً')
      return
    }
    
    setLoading(true)
    setMessage('')
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      
      if (data.success) {
        setMessage('تم التسجيل! شيك ايميلك قريباً')
        setEmail('')
        setConsent(false)
      } else {
        setMessage(data.error || 'صار خطأ. جرب مرة ثانية')
      }
    } catch (error) {
      setMessage('صار خطأ في الاتصال')
    }
    
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Aurelia Digital Library - الوصول المبكر</title>
        <meta name="description" content="مكتبتك الرقمية الذكية" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
              Aurelia Digital Library
            </h1>
            <p className="text-gray-600 text-center mb-6">
              مكتبتك الرقمية الذكية. انضم للوصول المبكر
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ايميلك للوصول المبكر"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Checkbox القانوني - هذا اللي طلبه الناقد */}
              <label className="flex items-start gap-2 text-sm text-gray-600 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-1 accent-blue-600"
                />
                <span>
                  بإدخال بريدك، توافق على <a href="/terms" className="underline hover:text-blue-600">الشروط</a> و 
                  <a href="/privacy" className="underline hover:text-blue-600"> سياسة الخصوصية</a>. 
                  وتوافق على استلام تحديثات الوصول المبكر. يمكنك إلغاء الاشتراك في أي وقت.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'جاري التسجيل...' : 'اشترك الآن'}
              </button>

              {/* سطر الطمأنة القانوني */}
              <p className="text-xs text-gray-500 mt-3 text-center">
                We respect your privacy. No spam.
              </p>
            </form>

            {message && (
              <p className={`mt-4 text-center text-sm ${message.includes('تم') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </div>
        </main>

        {/* Footer القانوني - لا تشيله */}
        <footer className="py-6 text-center text-sm text-gray-500 border-t bg-white">
          <a href="/privacy" className="hover:underline">Privacy Policy</a> 
          <span className="mx-2">|</span>
          <a href="/terms" className="hover:underline">Terms</a> 
          <span className="mx-2">|</span>
          <a href="/dmca" className="hover:underline">DMCA</a>
          <p className="mt-2">© 2026 Aurelia Digital Library</p>
        </footer>
      </div>
    </>
  )
}
