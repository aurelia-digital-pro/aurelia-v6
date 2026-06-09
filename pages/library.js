import React, { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Home, 
  Library as LibraryIcon, 
  Search, 
  Folder, 
  TrendingUp, 
  Bot,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowUpRight,
  ArrowUp
} from "lucide-react";
import { motion } from "framer-motion";

// --- Data ---
const booksData = [
  { id: 1, title: "On the Origin of Species", author: "Charles Darwin", category: "Science", year: 1859, url: "https://www.gutenberg.org/ebooks/1228" },
  { id: 2, title: "The Art of War", author: "Sun Tzu", category: "Strategy", year: "~500 BC", url: "https://www.gutenberg.org/ebooks/132" },
  { id: 3, title: "Les Misérables", author: "Victor Hugo", category: "Literature", year: 1862, url: "https://www.gutenberg.org/ebooks/135" },
  { id: 4, title: "The Prophet", author: "Kahlil Gibran", category: "Philosophy", year: 1923, url: "https://www.gutenberg.org/ebooks/58585" },
  { id: 5, title: "Principia Mathematica", author: "Isaac Newton", category: "Science", year: 1687, url: "https://archive.org/details/newtonspmathema00newtrich" },
  { id: 6, title: "The Republic", author: "Plato", category: "Philosophy", year: "~375 BC", url: "https://www.gutenberg.org/ebooks/1497" },
  { id: 7, title: "Critique of Pure Reason", author: "Immanuel Kant", category: "Philosophy", year: 1781, url: "https://www.gutenberg.org/ebooks/4280" },
  { id: 8, title: "The Wealth of Nations", author: "Adam Smith", category: "Economics", year: 1776, url: "https://www.gutenberg.org/ebooks/3300" },
  { id: 9, title: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche", category: "Philosophy", year: 1883, url: "https://www.gutenberg.org/ebooks/1998" },
  { id: 10, title: "The Interpretation of Dreams", author: "Sigmund Freud", category: "Psychology", year: 1899, url: "https://www.gutenberg.org/ebooks/150" },
  { id: 11, title: "Carthage", author: "Alfred J. Church", category: "History", year: 1886, url: "https://www.gutenberg.org/ebooks/1804" },
  { id: 12, title: "A Dictionary of the English Language", author: "Samuel Johnson", category: "Reference", year: 1755, url: "https://archive.org/details/dictionaryofengl00john" },
  { id: 13, title: "Webster's 1913 Dictionary", author: "Noah Webster", category: "Reference", year: 1913, url: "https://www.gutenberg.org/ebooks/673" },
  { id: 14, title: "The Divine Comedy", author: "Dante Alighieri", category: "Literature", year: 1320, url: "https://www.gutenberg.org/ebooks/8800" }
];

const vaultData = [
  { name: "Smithsonian 3D", license: "Public Domain", url: "https://3d.si.edu", desc: "Interactive 3D models of historical artifacts." },
  { name: "Gallica BNF", license: "CC BY", url: "https://gallica.bnf.fr", desc: "Digital library of the National Library of France." },
  { name: "arXiv", license: "Open Access", url: "https://arxiv.org", desc: "Open-access archive for scholarly articles." },
  { name: "OpenAIRE", license: "CC BY", url: "https://www.openaire.eu", desc: "European open science infrastructure." },
  { name: "Europeana", license: "CC0", url: "https://www.europeana.eu", desc: "Cultural heritage collections of Europe." },
  { name: "Data.gov", license: "Public Domain", url: "https://data.gov", desc: "U.S. government's open data portal." }
];

// --- Components ---

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, vx: number, vy: number, radius: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(80, Math.floor((canvas.width * canvas.height) / 8000));
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#D4AF37';

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212, 175, 55, ${1 - dist / 120})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 opacity-35 pointer-events-none"
    />
  );
}

const navItems = [
  { icon: Home, label: "Home", active: false },
  { icon: LibraryIcon, label: "Library", active: true },
  { icon: Search, label: "Search", active: false },
  { icon: Folder, label: "Categories", active: false },
  { icon: TrendingUp, label: "Progress", active: false },
  { icon: Bot, label: "AI Tools", active: false },
];

export default function Library() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { toast } = useToast();
  const mainRef = useRef<HTMLDivElement>(null);

  const filteredBooks = booksData.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setShowScrollTop(e.currentTarget.scrollTop > 300);
  };

  const scrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAITool = (toolName: string) => {
    toast({
      title: `${toolName} selected`,
      description: "AI tools coming soon.",
    });
  };

  return (
    <div className="relative min-h-screen bg-[#03070f] text-white flex overflow-hidden font-sans">
      <ParticleBackground />

      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-72' : 'w-20'} flex-shrink-0 transition-all duration-300 border-r border-white/10 bg-[#03070f]/80 backdrop-blur-xl z-20 flex flex-col`}
        data-testid="layout-sidebar"
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 relative">
          {isSidebarOpen && (
            <div 
              className="font-syncopate font-bold text-xl bg-gradient-to-r from-[#D4AF37] to-white bg-clip-text text-transparent truncate transition-opacity duration-300"
              data-testid="text-logo"
            >
              AURELIA
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white transition-colors absolute right-4"
            data-testid="button-toggle-sidebar"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center h-12 rounded-xl transition-all duration-200 ${
                item.active 
                  ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37]' 
                  : 'text-gray-400 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/20 border border-transparent'
              } ${isSidebarOpen ? 'px-4 justify-start' : 'justify-center'}`}
              data-testid={`nav-item-${item.label.toLowerCase()}`}
            >
              <item.icon size={20} className={isSidebarOpen ? 'mr-3' : ''} />
              {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {isSidebarOpen && (
          <div 
            className="p-6 text-xs text-gray-500 font-syncopate tracking-wider truncate border-t border-white/10 transition-opacity duration-300"
            data-testid="text-footer"
          >
            © 2026 AURELIA V6
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main 
        ref={mainRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto relative z-10 scroll-smooth"
        data-testid="layout-main"
      >
        <div className="max-w-7xl mx-auto px-6 py-12 lg:px-12 space-y-20">
          
          {/* Hero Section */}
          <section className="text-center space-y-6 pt-10" data-testid="section-hero">
            <h1 className="font-syncopate text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent inline-block">
              Aurelia Knowledge Library
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Integrated knowledge platform — verified sources, AI tools, and an ad-free learning experience
            </p>
            <div className="max-w-2xl mx-auto relative mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text"
                placeholder="Search books, authors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-white placeholder-gray-500"
                data-testid="input-search"
              />
            </div>
          </section>

          {/* Live Knowledge Section */}
          <section data-testid="section-live-knowledge">
            <h2 className="text-2xl font-syncopate mb-8 flex items-center">
              <span className="w-1 h-6 bg-[#D4AF37] mr-3 rounded-full"></span>
              Live Knowledge
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/40 transition-all" data-testid="card-live-nasa">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-200">NASA — Astronomy Picture of the Day</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-green-500/20 text-green-400 rounded border border-green-500/30">LIVE</span>
                </div>
                <div className="h-48 rounded-xl overflow-hidden border border-white/10 mb-4 bg-black/50">
                  <iframe 
                    src="https://apod.nasa.gov/apod/astropix.html" 
                    className="w-full h-full"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
                <a href="https://apod.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-sm text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1 w-max">
                  Visit source <ArrowUpRight size={14} />
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/40 transition-all" data-testid="card-live-osm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-200">OpenStreetMap — Live World Map</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-white/10 text-gray-300 rounded border border-white/20">CC BY-SA</span>
                </div>
                <div className="h-48 rounded-xl overflow-hidden border border-white/10 mb-4 bg-black/50">
                  <iframe 
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik" 
                    className="w-full h-full"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
                <a href="https://openstreetmap.org" target="_blank" rel="noopener noreferrer" className="text-sm text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1 w-max">
                  Visit source <ArrowUpRight size={14} />
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/40 transition-all" data-testid="card-live-owid">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-200">Our World in Data — Global Charts</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-white/10 text-gray-300 rounded border border-white/20">CC BY</span>
                </div>
                <div className="h-48 rounded-xl overflow-hidden border border-white/10 mb-4 bg-black/50">
                  <iframe 
                    src="https://ourworldindata.org/grapher/child-mortality" 
                    className="w-full h-full bg-white"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
                <a href="https://ourworldindata.org" target="_blank" rel="noopener noreferrer" className="text-sm text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1 w-max">
                  Visit source <ArrowUpRight size={14} />
                </a>
              </motion.div>

            </div>
          </section>

          {/* Knowledge Vault */}
          <section data-testid="section-vault">
            <h2 className="text-2xl font-syncopate mb-8 flex items-center">
              <span className="w-1 h-6 bg-[#D4AF37] mr-3 rounded-full"></span>
              Knowledge Vault
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vaultData.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  key={idx} 
                  className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/40 transition-all group flex flex-col h-full"
                  data-testid={`card-vault-${idx}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${item.license === 'Public Domain' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30' : 'bg-teal-500/10 text-teal-400 border-teal-500/20'}`}>
                      {item.license}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-6 flex-1">{item.desc}</p>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors flex items-center gap-2"
                  >
                    Visit Source <ArrowUpRight size={14} />
                  </a>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Book Library */}
          <section data-testid="section-books">
            <h2 className="text-2xl font-syncopate mb-8 flex items-center">
              <span className="w-1 h-6 bg-[#D4AF37] mr-3 rounded-full"></span>
              Book Library
            </h2>
            
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredBooks.map((book, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    key={book.id}
                    className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/40 transition-all duration-300 group flex flex-col"
                    data-testid={`card-book-${book.id}`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center mb-4 border border-white/5 group-hover:border-[#D4AF37]/30 transition-colors">
                      <BookOpen className="text-[#D4AF37]" size={24} />
                    </div>
                    <h3 className="font-bold text-lg line-clamp-1 group-hover:text-[#D4AF37] transition-colors mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{book.author}</p>
                    
                    <div className="flex items-center gap-2 mb-6 text-xs font-medium mt-auto">
                      <span className="px-2.5 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full border border-[#D4AF37]/30">{book.category}</span>
                      <span className="px-2.5 py-1 bg-white/5 text-gray-300 rounded-full border border-white/10">{book.year}</span>
                      <span className="px-2.5 py-1 bg-teal-500/10 text-teal-400 rounded-full border border-teal-500/20">Public Domain</span>
                    </div>

                    <a 
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-lg border border-white/10 flex items-center justify-center gap-2 text-sm font-medium hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all"
                      data-testid={`link-read-${book.id}`}
                    >
                      Read <ArrowUpRight size={16} />
                    </a>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm" data-testid="empty-state-books">
                <Search className="mx-auto text-gray-600 mb-4" size={48} />
                <h3 className="text-xl font-medium text-gray-300">No results found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
              </div>
            )}
          </section>

          {/* Gallica Section */}
          <section data-testid="section-gallica">
            <h2 className="text-2xl font-syncopate mb-8 flex items-center">
              <span className="w-1 h-6 bg-[#D4AF37] mr-3 rounded-full"></span>
              Gallica — BNF Archive
            </h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#03070f] to-[#D4AF37]/10 p-8 md:p-12 shadow-[0_0_40px_rgba(212,175,55,0.1)]"
              data-testid="card-gallica"
            >
              <div className="relative z-10 max-w-3xl">
                <h3 className="text-3xl font-syncopate font-bold mb-4 text-white">Bibliothèque nationale de France</h3>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Millions of digitized documents, manuscripts, maps, and images freely accessible from the French national library.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="px-4 py-2 bg-black/40 backdrop-blur border border-white/10 rounded-lg text-sm font-medium text-[#D4AF37]">
                    Millions of documents
                  </div>
                  <div className="px-4 py-2 bg-black/40 backdrop-blur border border-white/10 rounded-lg text-sm font-medium text-[#D4AF37]">
                    Free access
                  </div>
                </div>
                <a 
                  href="https://gallica.bnf.fr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-[#D4AF37] text-black font-semibold hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all gap-2"
                  data-testid="link-gallica"
                >
                  Access Gallica Archive <ArrowUpRight size={18} />
                </a>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#D4AF37]/5 to-transparent pointer-events-none" />
            </motion.div>
          </section>

          {/* AI Tools Panel */}
          <section className="pb-20" data-testid="section-ai-tools">
            <h2 className="text-2xl font-syncopate mb-8 flex items-center">
              <span className="w-1 h-6 bg-[#D4AF37] mr-3 rounded-full"></span>
              AI Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/40 transition-all flex flex-col" data-testid="card-tool-summarize">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">Summarize</h3>
                <p className="text-sm text-gray-400 mb-6">Paste text to generate a quick summary</p>
                <textarea 
                  className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] resize-none mb-4"
                  placeholder="Enter text here..."
                  data-testid="input-tool-summarize"
                ></textarea>
                <button 
                  onClick={() => handleAITool('Summarize')}
                  className="mt-auto w-full py-2.5 rounded-lg border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors font-medium text-sm"
                  data-testid="button-tool-summarize"
                >
                  Generate Summary
                </button>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/40 transition-all flex flex-col" data-testid="card-tool-translate">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">Translate</h3>
                <p className="text-sm text-gray-400 mb-6">Translate knowledge across languages</p>
                <textarea 
                  className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] resize-none mb-4"
                  placeholder="Enter text to translate..."
                  data-testid="input-tool-translate"
                ></textarea>
                <button 
                  onClick={() => handleAITool('Translate')}
                  className="mt-auto w-full py-2.5 rounded-lg border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors font-medium text-sm"
                  data-testid="button-tool-translate"
                >
                  Translate Text
                </button>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/40 transition-all flex flex-col" data-testid="card-tool-keyideas">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">Key Ideas</h3>
                <p className="text-sm text-gray-400 mb-6">Extract core concepts from any text</p>
                <textarea 
                  className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] resize-none mb-4"
                  placeholder="Enter text to extract ideas..."
                  data-testid="input-tool-keyideas"
                ></textarea>
                <button 
                  onClick={() => handleAITool('Key Ideas')}
                  className="mt-auto w-full py-2.5 rounded-lg border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors font-medium text-sm"
                  data-testid="button-tool-keyideas"
                >
                  Extract Concepts
                </button>
              </motion.div>

            </div>
          </section>

        </div>
      </main>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all duration-300 z-50 ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
        data-testid="button-scroll-top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}
