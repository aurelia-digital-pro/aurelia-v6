import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    // هنا تجيب الكورسات من API أو Supabase
    setTimeout(() => {
      setCourses([])
      setLoading(false)
    }, 500)
  }, [])

  return (
    <>
      <Head>
        <title>Aurelia Library - Premium Courses & Tools</title>
        <meta name="description" content="Paid courses and premium tools for Aurelia members" />
      </Head>

      <main className="min-h-screen bg-[#05040b] text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              Aurelia Library
            </h1>
            <Link href="/" className="text-[#ddd6fe] hover:text-white">
              ← Back to Home
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-3 mb-6">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#8B5CF6]"
              />
            </div>

            {loading ? (
              <div className="col-span-3 text-center py-20 text-[#ddd6fe]">Loading courses...</div>
            ) : courses.length === 0 ? (
              <div className="col-span-3 text-center py-20">
                <h3 className="text-2xl font-bold mb-4">Premium Content Coming Soon</h3>
                <p className="text-[#ddd6fe] mb-6">Subscribe to get early access when we launch</p>
                <Link href="/#join" className="px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-xl font-bold inline-block">
                  Request Early Access
                </Link>
              </div>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3>{course.title}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  )
}
