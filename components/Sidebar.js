import React from 'react';

export default function Sidebar() {
  const menu = [
    { name: 'الرئيسية', icon: '🏠', active: true },
    { name: 'المكتبة', icon: '📚' },
    { name: 'المؤلفون', icon: '👥' },
    { name: 'التصنيفات', icon: '🗂️' },
    { name: 'الأبحاث', icon: '🔍' },
  ];

  return (
    <aside className="fixed right-0 top-0 h-full w-64 bg-[#05040b] border-l border-white/5 p-6 z-50 hidden lg:block text-right">
      <div className="flex items-center justify-end gap-3 mb-12">
        <h1 className="text-xl font-bold bg-gradient-to-l from-purple-400 to-white bg-clip-text text-transparent">Aurelia</h1>
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">A</div>
      </div>
      
      <nav className="space-y-2">
        {menu.map((item, i) => (
          <div key={i} className={`flex items-center justify-end gap-4 p-3 rounded-xl cursor-pointer transition-all ${item.active? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'text-gray-500 hover:bg-white/5'}`}>
            <span>{item.name}</span>
            <span>{item.icon}</span>
          </div>
        ))}
      </nav>

      <div className="absolute bottom-10 left-6 right-6 p-4 rounded-2xl bg-gradient-to-br from-purple-900/40 to-black border border-white/10">
        <p className="text-xs text-gray-400 mb-2">تعلم من أفضل الجامعات</p>
        <p className="text-sm font-bold mb-4 text-purple-300 text-right">MIT OpenCourseWare</p>
        <button className="w-full py-2 bg-purple-600 rounded-lg text-xs font-bold">ابدأ التعلم الآن</button>
      </div>
    </aside>
  );
}
