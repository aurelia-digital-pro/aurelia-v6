import Head from 'next/head';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ msg: '', type: '' });

  const books = [
    { title: "مقدمة ابن خلدون", auth: "ابن خلدون", link: "https://archive.org/details/WAQ15143" },
    { title: "The Art of War", auth: "Sun Tzu", link: "https://www.gutenberg.org/ebooks/132" },
    { title: "The Prophet", auth: "Kahlil Gibran", link: "https://www.gutenberg.org/ebooks/58585" },
    { title: "Les Misérables", auth: "Victor Hugo", link: "https://www.gutenberg.org/ebooks/135" },
    { title: "Principia Mathematica", auth: "Isaac Newton", link: "https://archive.org/details/principiamathem02newt" }
  ];

  const subscribe = async (e) => {
    e.preventDefault();
    setStatus({ msg: 'جاري الإرسال...', type: 'ok' });
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, consent: true })
    });
    const data = await res.json();
    setStatus({ msg: data.message || data.error, type: res.ok? 'ok' : 'err' });
    if(res.ok) setEmail('');
  };

  return (
    <div className="bg-[#05040b] min-h-screen text-white flex flex-row-reverse font-sans">
      <Head>
        <title>Aurelia Digital Library | Future Knowledge Access</title>
        <link rel="canonical" href="https://aurelia-v6.vercel.app" />
      </Head>

      <Sidebar />

      <main className="flex-1 lg:mr-64 p-4 lg:p-10">
        <header className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
          <div className="flex gap-4 items-center">
            <button className="bg-purple-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-purple-700 transition-all">إنشاء حساب</button>
            <span className="text-gray-400 cursor-pointer">EN</span>
          </div>
          <div className="relative w-1/3">
            <input type="text" placeholder="ابحث عن كتاب، مؤلف، موضوع..." className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-10 text-right focus:border-purple-500 outline-none transition-all" />
          </div>
        </header>

        <section className="relative rounded-[2.5rem] overflow-hidden mb-12 border border-white/10 bg-gradient-to-l from-purple-900/20 to-black p-12 text-right">
          <div className="relative z-10">
            <h2 className="text-5xl font-black mb-4 leading-tight">حيث يلتقي <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">العلم بالتطور</span></h2>
            <p className="text-gray-400 mb-8 max-w-md ml-auto">مكتبة رقمية مفتوحة تجمع ملايين الكتب والأبحاث من أفضل المصادر الأكاديمية العالمية.</p>
            
            <form onSubmit={subscribe} className="flex flex-col items-end gap-4">
              <input 
                type="email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="بريدك للوصول المبكر..." 
                required
                className="bg-white/5 border border-white/10 rounded-xl p-4 w-80 text-right outline-none focus:border-purple-500"
              />
              <button type="submit" className="bg-purple-600 px-10 py-3 rounded-xl font-bold shadow-lg shadow-purple-500/20">استكشف المكتبة</button>
              {status.msg && <p className={`text-xs ${status.type === 'ok'? 'text-green-400' : 'text-red-400'}`}>{status.msg}</p>}
            </form>
          </div>
        </section>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
             <button className="text-purple-400 text-sm hover:underline">عرض الكل</button>
             <h3 className="text-2xl font-bold border-r-4 border-purple-600 pr-4">أروع الكتب الخالدة</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {books.map((b,i)=>(
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-[#111] rounded-2xl border border-white/10 mb-4 overflow-hidden relative group-hover:border-purple-500/50 transition-all">
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
                      <a href={b.link} target="_blank" className="w-full py-2 bg-purple-600 rounded-lg text-xs text-center font-bold">قراءة الآن</a>
                   </div>
                   <div className="h-full w-full flex items-center justify-center text-gray-800 italic text-[10px] p-4 text-center">{b.title}</div>
                </div>
                <h4 className="text-sm font-bold text-right truncate">{h4>{b.title}</h4>
                <p className="text-[10px] text-gray-500 text-right uppercase tracking-widest">{b.auth}</p>
              </div>
            ))}
          </div>
        </div>

        <footer className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 gap-4 uppercase tracking-tighter">
           <p>© 2026 Aurelia Digital Library. All rights reserved.</p>
           <div className="flex gap-6">
             <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
             <a href="/terms" className="hover:text-white transition-colors">Terms</a>
             <a href="/dmca" className="hover:text-white transition-colors">DMCA</a>
           </div>
           <p className="font-bold">Contact: fouedsendi185@gmail.com</p>
        </footer>
      </main>
    </div>
  );
}
