// pages/library.js
// صفحة المكتبة المتطورة - تحافظ على الهوية البصرية لمنصة أوريليا
// تم تطويرها لتعمل مع Next.js، وجاهزة للتكامل مع Supabase لاحقاً

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Library() {
  const [searchTerm, setSearchTerm] = useState('');
  const canvasRef = useRef(null);

  // رسم شبكة معرفية متحركة في منطقة البطل (Hero)
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
      // رسم وصلات بين الجسيمات القريبة
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 102, 204, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      // رسم الجسيمات
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 150, 255, ${p.alpha})`;
        ctx.fill();
        // تحريك
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

  // بيانات نموذجية (سيتم استبدالها لاحقاً بـ Supabase)
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

  // قراءة وهمية
  const readingProgress = {
    weeklyGoal: 72,
    currentStreak: 16,
    totalHours: 124,
  };

  return (
    <>
      <Head>
        <title>المكتبة | Aurelia – منصة معرفية احترافية</title>
        <meta name="description" content="مكتبة أوريليا الرقمية – آلاف الكتب والمصادر من الملكية العامة والمرخصة، مع أدوات ذكاء اصطناعي للتعلم العميق." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#03070f] to-[#050b14] text-white font-sans">
        {/* Hero section مع شبكة المعرفة المتحركة */}
        <section className="relative overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" style={{ zIndex: 0 }} />
          <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-['Syncopate',sans-serif] bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              مكتبة أوريليا
            </h1>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
              منصة المعرفة المتكاملة – مصادر موثقة، أدوات ذكاء اصطناعي، وتجربة تعلم خالية من الإعلانات
            </p>

            {/* شريط البحث */}
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث عن كتب، مؤلفين، أو مواضيع..."
                  className="w-full bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-2xl py-4 px-6 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* الكتب المميزة */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold border-r-4 border-blue-500 pr-4 mb-8">الكتب المميزة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <div key={book.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(0,102,204,0.3)] transition-all duration-300">
                <div className="w-full h-40 bg-gradient-to-br from-blue-900/40 to-purple-900/30 rounded-xl mb-3 flex items-center justify-center text-5xl">📖</div>
                <h3 className="font-bold text-lg mt-2">{book.title}</h3>
                <p className="text-gray-400 text-sm">{book.author}</p>
                <p className="text-gray-500 text-xs mt-1">{book.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* أحدث الإضافات + المجال العام */}
        <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold border-r-4 border-blue-500 pr-4 mb-6">أحدث الإضافات</h2>
            <div className="space-y-4">
              {latestAdditions.map((book) => (
                <div key={book.id} className="bg-white/5 rounded-xl p-4 flex justify-between items-center hover:bg-white/10 transition">
                  <div>
                    <p className="font-semibold">{book.title}</p>
                    <p className="text-gray-400 text-sm">{book.author}</p>
                  </div>
                  <span className="text-xs text-blue-400">{new Date(book.added).toLocaleDateString('ar-EG')}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold border-r-4 border-blue-500 pr-4 mb-6">الملكية العامة</h2>
            <div className="space-y-4">
              {publicDomain.map((book) => (
                <div key={book.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition">
                  <p className="font-semibold">{book.title}</p>
                  <p className="text-gray-400 text-sm">{book.author}</p>
                  <span className="inline-block mt-2 text-xs bg-green-900/40 text-green-300 px-2 py-0.5 rounded-full">ملكية عامة</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* تصنيفات المعرفة */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold border-r-4 border-blue-500 pr-4 mb-6">التصنيفات المعرفية</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <span key={cat} className="px-5 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm hover:bg-blue-500/20 cursor-pointer transition">
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* تقدم القراءة */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl font-bold mb-4">تقدمك في القراءة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-300 text-sm">الهدف الأسبوعي</p>
                <p className="text-3xl font-bold">{readingProgress.weeklyGoal}%</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${readingProgress.weeklyGoal}%` }}></div>
                </div>
              </div>
              <div>
                <p className="text-gray-300 text-sm">سلسلة القراءة المستمرة</p>
                <p className="text-3xl font-bold">{readingProgress.currentStreak} يوم</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">إجمالي ساعات التعلم</p>
                <p className="text-3xl font-bold">{readingProgress.totalHours}</p>
              </div>
            </div>
          </div>
        </section>

        {/* أدوات الذكاء الاصطناعي */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold border-r-4 border-blue-500 pr-4 mb-8">أدوات ذكاء اصطناعي</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '📄', name: 'تلخيص ذكي', desc: 'استخلص الأفكار الرئيسية من أي كتاب أو مقالة' },
              { icon: '💬', name: 'شرح المفاهيم', desc: 'تبسيط النصوص المعقدة بأمثلة واقعية' },
              { icon: '🌐', name: 'ترجمة فورية', desc: 'ترجمة نصوص كاملة مع الحفاظ على السياق' },
              { icon: '💡', name: 'استخراج الأفكار', desc: 'احصل على قائمة بالنقاط الجوهرية والمفاهيم الأساسية' },
            ].map((tool) => (
              <div key={tool.name} className="bg-white/5 backdrop-blur rounded-xl p-5 text-center border border-white/10 hover:border-blue-400 transition group">
                <div className="text-4xl mb-3">{tool.icon}</div>
                <h3 className="font-bold text-lg">{tool.name}</h3>
                <p className="text-gray-400 text-sm mt-2">{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* تذييل قانوني - 100% محتوى قانوني */}
        <footer className="border-t border-white/10 mt-16 py-8 text-center text-gray-400 text-sm">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6">
              <span className="flex items-center gap-1">✅ 100% محتويات قانونية</span>
              <span className="flex items-center gap-1">🔒 تحترم حقوق النشر</span>
              <span className="flex items-center gap-1">🛡️ مصادر موثقة</span>
            </div>
            <p>© {new Date().getFullYear()} Aurelia – منصة معرفية مهنية. جميع المحتويات من الملكية العامة أو مرخصة قانونياً.</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..700&family=Syncopate:wght@400;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background: #03070f;
        }
        h1, h2, .font-syncopate {
          font-family: 'Syncopate', sans-serif;
        }
      `}</style>
    </>
  );
}