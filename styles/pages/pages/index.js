import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Head>
        <title>Aurelia V6</title>
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Aurelia V6
        </h1>
        
        <p className="text-xl text-gray-400 mb-8">
          واجهة فاخرة. ذكاء خارق. جاهزة للانطلاق
        </p>

        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:scale-105 transition-transform">
          ابدأ الآن
        </button>
      </main>
    </div>
  )
}
