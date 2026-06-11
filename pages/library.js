'use client';

import React, { useState, useEffect, useRef } from "react";
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
  ArrowUp,
  Globe,
  Database,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";

const booksData = [
  { id: 1, title: "On the Origin of Species", author: "Charles Darwin", category: "Science", year: 1859, url: "https://www.gutenberg.org/ebooks/1228" },
  { id: 2, title: "The Art of War", author: "Sun Tzu", category: "Strategy", year: "∼500 BC", url: "https://www.gutenberg.org/ebooks/132" },
  { id: 3, title: "Les Misérables", author: "Victor Hugo", category: "Literature", year: 1862, url: "https://www.gutenberg.org/ebooks/135" },
  { id: 4, title: "The Prophet", author: "Kahlil Gibran", category: "Philosophy", year: 1923, url: "https://www.gutenberg.org/ebooks/58585" },
  { id: 5, title: "Principia Mathematica", author: "Isaac Newton", category: "Science", year: 1687, url: "https://archive.org/details/newtonspmathema00newtrich" },
  { id: 6, title: "The Republic", author: "Plato", category: "Philosophy", year: "∼375 BC", url: "https://www.gutenberg.org/ebooks/1497" },
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

const aiTools = [
  { name: "Summarize", icon: FileText, desc: "Condense long texts into key insights." },
  { name: "Analyze", icon: TrendingUp, desc: "Extract patterns and relationships." },
  { name: "Research", icon: Search, desc: "Cross-reference multiple sources." },
  { name: "Query", icon: Bot, desc: "Ask questions to the knowledge base." }
];

function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    let animationFrameId;

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

      for (let i = 0; i < particles.length; i++) {
        const p = particles;
        p.x += p.vx;
        p.y += p.vy;[i]

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
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
    <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-35 pointer-events-none" />
  );
}

function Sidebar({ isOpen, setIsOpen }) {
  const navItems = [
    { name: "Home", icon: Home, active: false },
    { name: "Library", icon: LibraryIcon, active: true },
    { name: "Search", icon: Search, active: false },
    { name: "Collections", icon: Folder, active: false }
  ];

  return (
    <motion.aside
      initial={{ width: isOpen? 256 : 80 }}
      animate={{ width: isOpen? 256 : 80 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen bg-black/30 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col"
    >
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <BookOpen className="w-6 h-6 text-[#D4AF37]" />
            <span className="text-white font-semibold text-lg">Aurelia</span>
          </motion.div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {isOpen? <ChevronLeft className="w-5 h-5 text-white" /> : <ChevronRight className="w-5 h-5 text-white" />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              item.active
               ? 'bg-gradient-to-r from-[#8B5CF6]/20 to-[#EC4899]/20 text-white border border-[#8B5CF6]/30'
                : 'text-[#9CA3AF] hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="font-medium">{item.name}</span>}
          </button>
        ))}
      </nav>
    </motion.aside>
  );
}

export default function Library() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const mainRef = useRef(null);

  const categories = ["All",...Array.from(new Set(booksData.map(b => b.category)))];

  const filteredBooks = booksData.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || book.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleScroll = (e) => {
    setShowScrollTop(e.currentTarget.scrollTop > 300);
  };

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white relative overflow-hidden">
      <ParticleBackground />

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main
        ref={mainRef}
        onScroll={handleScroll}
        className={`relative z-10 transition-all duration-300 h-screen overflow-y-auto ${
          isSidebarOpen? 'ml-[256px]' : 'ml-[80px]'
        }`}
      >
        <div className="max-w-7xl mx-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">
              Aurelia Knowledge Library
            </h1>
            <p className="text-[#9CA3AF] text-lg">
              Explore curated open-access knowledge from verified sources worldwide
            </p>
          </motion.div>

          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search books, authors, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#8B5CF6]/50 focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all"
              />
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === category
                   ? 'bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white'
                    : 'bg-white/5 text-[#9CA3AF] hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#D4AF37]" />
              Classic Literature & Reference
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <motion.a
                  key={book.id}
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-[#8B5CF6]/50 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-[#9CA3AF]">{book.author}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#8B5CF6] transition-colors flex-shrink-0 ml-2" />
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded-md">
                      {book.category}
                    </span>
                    <span className="text-[#9CA3AF]">{book.year}</span>
                  </div>
                </motion.a>
              ))}
            </div>
            {filteredBooks.length === 0 && (
              <div className="text-center py-12 text-[#9CA3AF]">
                No books found matching your search criteria.
              </div>
            )}
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Database className="w-6 h-6 text-[#D4AF37]" />
              Open Knowledge Vault
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vaultData.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-[#EC4899]/50 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-white group-hover:text-[#EC4899] transition-colors">
                      {item.name}
                    </h3>
                    <Globe className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#EC4899] transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-sm text-[#9CA3AF] mb-3">{item.desc}</p>
                  <span className="inline-block px-2 py-1 bg-[#EC4899]/20 text-[#EC4899] text-xs rounded-md">
                    {item.license}
                  </span>
                </motion.a>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Bot className="w-6 h-6 text-[#D4AF37]" />
              AI Research Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiTools.map((tool) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <tool.icon className="w-8 h-8 text-[#D4AF37] mb-3" />
                  <h3 className="font-semibold text-white mb-2">{tool.name}</h3>
                  <p className="text-sm text-[#9CA3AF]">{tool.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
              Live Knowledge Embeds
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-4">NASA Astronomy Picture of the Day</h3>
                <div className="aspect-video bg-black/20 rounded-lg overflow-hidden">
                  <iframe
                    src="https://apod.nasa.gov/apod/astropix.html"
                    className="w-full h-full"
                    title="NASA APOD"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-4">OpenStreetMap</h3>
                <div className="aspect-video bg-black/20 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-0.5,51.3,0.5,51.7&layer=mapnik"
                    className="w-full h-full"
                    title="OpenStreetMap"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          <footer className="border-t border-white/10 pt-8 pb-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9CA3AF]">
              <div>
                <p>All content sourced from open-access and public domain repositories.</p>
                <p className="mt-1">Email-only subscription model. GDPR + Tunisian compliance.</p>
              </div>
              <div className="flex items-center gap-4">
                <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </motion.button>
      )}
    </div>
  );
}
