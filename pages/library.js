// pages/library.js
// Knowledge Dashboard UI System - Aurelia v6
// Preserves canvas animation, search functionality, AI tools, all existing data
// Implements Sidebar + Main Content + Right Stats Panel with glassmorphism and gold accent (#D4AF37)

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Library() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const canvasRef = useRef(null);

  // Canvas knowledge network animation (preserved exactly)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationId;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(80, Math.floor(width * height / 8000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1.5,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      // draw particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.fill();
        // move
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });
      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Mock data (ready for Supabase)
  const featuredBooks = [
    { id: 1, title: 'On the Origin of Species', author: 'Charles Darwin', cover: '/covers/darwin.jpg', year: 1859 },
    { id: 2, title: 'The Art of War', author: 'Sun Tzu', cover: '/covers/suntzu.jpg', year: 500 },
    { id: 3, title: 'Popular Scientific Lectures', author: 'Ernst Mach', cover: '/covers/mach.jpg', year: 1895 },
    { id: 4, title: 'The Interpretation of Dreams', author: 'Sigmund Freud', cover: '/covers/freud.jpg', year: 1899 },
  ];

  const latestAdditions = [
    { id: 5, title: 'Critique of Pure Reason', author: 'Immanuel Kant', added: '2025-04-01' },
    { id: 6, title: 'The Wealth of Nations', author: 'Adam Smith', added: '2025-03-28' },
    { id: 7, title: 'Thus Spoke Zarathustra', author: 'Friedrich Nietzsche', added: '2025-03-25' },
  ];

  const publicDomain = [
    { id: 8, title: 'The Republic', author: 'Plato' },
    { id: 9, title: 'The Iliad', author: 'Homer' },
    { id: 10, title: 'The Divine Comedy', author: 'Dante Alighieri' },
  ];

  const categories = [
    'الفلسفة', 'التاريخ', 'العلوم', 'الأدب', 'القانون', 'التكنولوجيا', 'علم النفس', 'الاقتصاد'
  ];

  const readingProgress = {
    weeklyGoal: 72,
    currentStreak: 16,
    totalHours: 124,
  };

  // Sidebar navigation items
  const navItems = [
    { name: 'الرئيسية', icon: '🏠', id: 'home' },
    { name: 'المكتبة', icon: '📚', id: 'library' },
    { name: 'التصنيفات', icon: '🏷️', id: 'categories' },
    { name: 'التقدم', icon: '📊', id: 'progress' },
    { name: 'أدوات الذكاء', icon: '🤖', id: 'ai' },
  ];

  return (
    <>
      <Head>
        <title>المكتبة | Aurelia – منصة معرفية احترافية</title>
        <meta name="description" content="مكتبة أوريليا الرقمية – آلاف الكتب والمصادر من الملكية العامة والمرخصة، مع أدوات ذكاء اصطناعي للتعلم العميق." />
      </Head>

      <div className="relative min-h-screen bg-gradient-to-br from-[#03070f] via-[#050b14] to-[#0d1527] text-white font-sans overflow-x-hidden">
        {/* Canvas background layer */}
        <canvas ref={canvasRef} className="fixed inset-0 w-full h-full opacity-35 pointer-events-none" style={{ zIndex: 0 }} />

        {/* Layout container */}
        <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
          
          {/* ========== LEFT SIDEBAR ========== */}
          <aside className={`${sidebarCollapsed ? 'w-20' : 'w-72'} shrink-0 transition-all duration-300 bg-[#03070f]/85 backdrop-blur-xl border-l border-white/10 p-5 flex flex-col gap-6`}>
            <div className="flex justify-between items-center mb-6">
              <div className={`${sidebarCollapsed ? 'hidden' : 'block'} font-['Syncopate'] text-xl font-extrabold tracking-widest bg-gradient-to-r from-[#D4AF37] to-white bg-clip-text text-transparent`}>
                AURELIA
              </div>
              <button 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)} 
                className="p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition duration-200"
              >
                {sidebarCollapsed ? '→' : '←'}
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#D4AF37]/10 border border-transparent hover:border-[#D4AF37]/20 cursor-pointer transition-all group">
                  <span className="text-xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">{item.icon}</span>
                  <span className={`${sidebarCollapsed ? 'hidden' : 'inline'} font-medium group-hover:text-[#D4AF37] transition-colors`}>{item.name}</span>
                </div>
              ))}
            </nav>
            <div className="mt-auto pt-8 text-center text-xs text-gray-500">
              {!sidebarCollapsed && <div className="font-['Syncopate']">© {new Date().getFullYear()}<br/>AURELIA V6</div>}
            </div>
          </aside>

          {/* ========== MAIN CONTENT ========== */}
          <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            {/* Hero Header */}
            <div className="mb-12 text-center relative py-8 px-4 bg-white/[0.02] border border-white/[0.05] rounded-3xl backdrop-blur-md overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
              <h1 className="text-3xl md:text-5xl font-extrabold font-['Syncopate'] bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent tracking-wide">
                مكتبة أوريليا
              </h1>
              <p className="text-gray-300 mt-3 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                منصة المعرفة المتكاملة – مصادر موثقة، أدوات ذكاء اصطناعي، وتجربة تعلم خالية من الإعلانات
              </p>
              {/* Preserved State Search */}
              <div className="mt-8 max-w-xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ابحث عن كتب، مؤلفين، أو مواضيع..."
                    className="w-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl py-3.5 px-6 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition duration-300 shadow-lg text-right"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Books */}
            <section className="mb-12">
              <div className="flex items-center gap-3 border-r-4 border-[#D4AF37] pr-4 mb-8">
                <h2 className="text-2xl font-extrabold tracking-wide">الكتب المميزة</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredBooks.map((book) => (
                  <div key={book.id} className="group bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-300 hover:-translate-y-1">
                    <div className="w-full h-44 bg-gradient-to-br from-gray-900 via-slate-850 to-black rounded-xl mb-4 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300 border border-white/5 shadow-inner">
                      📖
                    </div>
                    <h3 className="font-bold text-lg mt-2 line-clamp-1 group-hover:text-[#D4AF37] transition-colors">{book.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{book.author}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                      <span className="text-xs text-gray-500">عام النشر</span>
                      <span className="text-xs font-semibold bg-[#D4AF37]/10 text-[#D4AF37] px-2.5 py-0.5 rounded-full">{book.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Split Grid for Additions & Public Domain */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 border-r-4 border-[#D4AF37] pr-4 mb-6">
                  <h2 className="text-xl font-bold">أحدث الإضافات</h2>
                </div>
                <div className="space-y-4">
                  {latestAdditions.map((book) => (
                    <div key={book.id} className="bg-white/[0.03] rounded-2xl p-4 flex justify-between items-center hover:bg-white/[0.06] transition-all border border-transparent hover:border-[#D4AF37]/20">
                      <div>
                        <p className="font-semibold group-hover:text-[#D4AF37]">{book.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{book.author}</p>
                      </div>
                      <span className="text-xs bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full">{new Date(book.added).toLocaleDateString('ar-EG')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 border-r-4 border-[#D4AF37] pr-4 mb-6">
                  <h2 className="text-xl font-bold">الملكية العامة</h2>
                </div>
                <div className="space-y-4">
                  {publicDomain.map((book) => (
                    <div key={book.id} className="bg-white/[0.03] rounded-2xl p-4 flex justify-between items-center hover:bg-white/[0.06] transition-all border border-transparent hover:border-[#D4AF37]/20">
                      <div>
                        <p className="font-semibold">{book.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{book.author}</p>
                      </div>
                      <span className="inline-block text-[10px] tracking-wider uppercase font-extrabold bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">ملكية عامة</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cognitive Categories */}
            <section className="mb-12">
              <div className="flex items-center gap-3 border-r-4 border-[#D4AF37] pr-4 mb-6">
                <h2 className="text-xl font-bold">التصنيفات المعرفية</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <span key={cat} className="px-5 py-2.5 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl text-sm font-medium hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/40 cursor-pointer transition duration-200">
                    {cat}
                  </span>
                ))}
              </div>
            </section>

            {/* AI Tools Section - Exact Copy Preserved */}
            <section className="mb-16">
              <div className="flex items-center gap-3 border-r-4 border-[#D4AF37] pr-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold">أدوات ذكاء اصطناعي</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { icon: '📄', name: 'تلخيص ذكي', desc: 'استخلص الأفكار الرئيسية من أي كتاب أو مقالة' },
                  { icon: '💬', name: 'شرح المفاهيم', desc: 'تبسيط النصوص المعقدة بأمثلة واقعية' },
                  { icon: '🌐', name: 'ترجمة فورية', desc: 'ترجمة نصوص كاملة مع الحفاظ على السياق' },
                  { icon: '💡', name: 'استخراج الأفكار', desc: 'احصل على قائمة بالنقاط الجوهرية والمفاهيم الأساسية' },
                ].map((tool) => (
                  <div key={tool.name} className="bg-white/[0.02] backdrop-blur-md rounded-2xl p-6 text-center border border-white/10 hover:border-[#D4AF37]/50 transition duration-300 group hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">{tool.icon}</div>
                    <h3 className="font-bold text-lg group-hover:text-[#D4AF37] transition-colors">{tool.name}</h3>
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* ========== RIGHT STATS PANEL ========== */}
          <aside className="w-full lg:w-80 shrink-0 p-6 md:p-8 bg-[#03070f]/80 backdrop-blur-xl border-r border-white/10 flex flex-col gap-6">
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-gray-900/60 to-black/80 rounded-3xl p-6 border border-[#D4AF37]/20 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none"></div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
                  <span className="text-[#D4AF37]">📈</span> تقدمك في القراءة
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs mb-2 text-gray-400">
                      <span>الهدف الأسبوعي</span>
                      <span className="text-[#D4AF37] font-bold">{readingProgress.weeklyGoal}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-[#D4AF37] h-2.5 rounded-full" style={{ width: `${readingProgress.weeklyGoal}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-sm text-gray-400">سلسلة القراءة</span>
                    <span className="text-xl font-bold text-[#D4AF37]">{readingProgress.currentStreak} يوم</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">إجمالي ساعات التعلم</span>
                    <span className="text-xl font-bold text-[#D4AF37]">{readingProgress.totalHours} ساعة</span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 text-center text-xs text-gray-500">
                  <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-1.5"></span>
                  آخر نشاط: اليوم
                </div>
              </div>
              
              <div className="mt-6 text-center text-xs text-gray-500 bg-white/[0.01] border border-white/[0.05] rounded-2xl p-4">
                <p>✨ أسبوعك القادم على بعد 28% فقط</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10 py-6 text-center text-gray-400 text-xs bg-black/60 backdrop-blur-md">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 text-gray-400">
              <span className="flex items-center gap-1.5">✅ 100% محتويات قانونية</span>
              <span className="flex items-center gap-1.5">🔒 تحترم حقوق النشر</span>
              <span className="flex items-center gap-1.5">🛡️ مصادر موثقة</span>
            </div>
            <p className="text-gray-500">© {new Date().getFullYear()} Aurelia – منصة معرفية مهنية. جميع المحتويات من الملكية العامة أو مرخصة قانونياً.</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;650;800&family=Syncopate:wght@400;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background: #03070f;
          margin: 0;
          padding: 0;
        }
        h1, h2, .font-syncopate {
          font-family: 'Syncopate', sans-serif;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}