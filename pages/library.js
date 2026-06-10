```javascript
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
       const p = particles[i];
       p.x += p.vx;
       p.y += p.vy;

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
   { name: "Collections", icon: Folder, active: false },
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

 const handleAITool = (toolName) => {
   console.log(`${toolName} selected`);
 };

 return (
   <div className="min-h-screen bg-gradient-to-br from-[#0A0A1A] to-[#1A0A2E] text-white">
     <ParticleBackground />
     <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

     <main
       ref={mainRef}
       onScroll={handleScroll}
       className="relative z-10 transition-all duration-300 overflow-y-auto h-screen"
       style={{ marginLeft: isSidebarOpen? '256px' : '80px' }}
     >
       <div className="max-w-7xl mx-auto p-8 space-y-12">

         <motion.section
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="pt-8"
         >
           <div className="bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#8B5CF6]/20 to-[#EC4899]/20 rounded-full blur-3xl" />
             <div className="relative z-10">
               <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                 Aurelia Digital Library
               </h1>
               <p className="text-[#9CA3AF] text-lg max-w-2xl">
                 Access curated knowledge from humanity's greatest works. Research, analyze, and explore across science, philosophy, literature, and history.
               </p>
             </div>
           </div>
         </motion.section>

         <motion.section
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
         >
           <div className="flex items-center gap-3 mb-6">
             <Globe className="w-6 h-6 text-[#D4AF37]" />
             <h2 className="text-2xl font-semibold">Live Knowledge</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-6">
               <div className="text-3xl font-bold text-[#D4AF37] mb-2">{booksData.length}</div>
               <div className="text-[#9CA3AF]">Primary Sources</div>
             </div>
             <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-6">
               <div className="text-3xl font-bold text-[#8B5CF6] mb-2">{vaultData.length}</div>
               <div className="text-[#9CA3AF]">Data Vaults</div>
             </div>
             <div className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-6">
               <div className="text-3xl font-bold text-[#EC4899] mb-2">{categories.length - 1}</div>
               <div className="text-[#9CA3AF]">Categories</div>
             </div>
           </div>
         </motion.section>

         <motion.section
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
         >
           <div className="flex items-center gap-3 mb-6">
             <Database className="w-6 h-6 text-[#8B5CF6]" />
             <h2 className="text-2xl font-semibold">Knowledge Vault</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {vaultData.map((vault, idx) => (
               <a
                 key={idx}
                 href={vault.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-[#8B5CF6]/50 transition-all"
               >
                 <div className="flex items-start justify-between mb-3">
                   <h3 className="text-lg font-semibold text-white group-hover:text-[#8B5CF6] transition-colors">
                     {vault.name}
                   </h3>
                   <ArrowUpRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#8B5CF6] transition-colors" />
                 </div>
                 <p className="text-[#9CA3AF] text-sm mb-3">{vault.desc}</p>
                 <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs rounded-full border border-[#D4AF37]/20">
                   {vault.license}
                 </span>
               </a>
             ))}
           </div>
         </motion.section>

         <motion.section
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
         >
           <div className="flex items-center gap-3 mb-6">
             <LibraryIcon className="w-6 h-6 text-[#EC4899]" />
             <h2 className="text-2xl font-semibold">Book Library</h2>
           </div>

           <div className="mb-6 flex flex-col md:flex-row gap-4">
             <div className="flex-1 relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
               <input
                 type="text"
                 placeholder="Search by title, author, or category..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
               />
             </div>
           </div>

           <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                   activeCategory === cat
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white'
                     : 'bg-black/30 backdrop-blur-xl border border-white/10 text-[#9CA3AF] hover:border-[#8B5CF6]/30 hover:text-white'
                 }`}
               >
                 {cat}
               </button>
             ))}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {filteredBooks.map((book) => (
               <a
                 key={book.id}
                 href={book.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-[#EC4899]/50 transition-all"
               >
                 <div className="flex items-start justify-between mb-3">
                   <BookOpen className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                   <span className="text-xs text-[#9CA3AF]">{book.year}</span>
                 </div>
                 <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#EC4899] transition-colors line-clamp-2">
                   {book.title}
                 </h3>
                 <p className="text-[#9CA3AF] text-sm mb-3">{book.author}</p>
                 <span className="inline-block px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs rounded-full border border-[#8B5CF6]/20">
                   {book.category}
                 </span>
               </a>
             ))}
           </div>
         </motion.section>

         <motion.section
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
         >
           <div className="flex items-center gap-3 mb-6">
             <Bot className="w-6 h-6 text-[#D4AF37]" />
             <h2 className="text-2xl font-semibold">AI Tools Panel</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {aiTools.map((tool) => (
               <button
                 key={tool.name}
                 onClick={() => handleAITool(tool.name)}
                 className="bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-[#D4AF37]/50 transition-all text-left group"
               >
                 <tool.icon className="w-8 h-8 text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform" />
                 <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
                 <p className="text-[#9CA3AF] text-sm">{tool.desc}</p>
               </button>
             ))}
           </div>
         </motion.section>

       </div>
     </main>

     {showScrollTop && (
       <motion.button
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale: 1 }}
         onClick={scrollToTop}
         className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-full shadow-lg hover:shadow-[#8B5CF6]/50 transition-all"
       >
         <ArrowUp className="w-6 h-6 text-white" />
       </motion.button>
     )}
   </div>
 );
}
```
