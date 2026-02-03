'use client'

import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter } from 'lucide-react'

const BlogList = () => {
  const [menu, setMenu] = useState('All')
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [loading, setLoading] = useState(true)

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/cars')
      const blogsData = Array.isArray(response.data) ? response.data : []
      setBlogs(blogsData)
    } catch (err) {
      console.error('Error fetching blogs:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories')
      const categoryNames = response.data.map((cat) => cat.name)
      setCategories(['All', ...categoryNames])
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  useEffect(() => {
    fetchBlogs()
    fetchCategories()
  }, [])

  const filteredBlogs = menu === 'All'
    ? blogs
    : blogs.filter((item) => item.category?.name === menu)

  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">

        {/* Filters Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 border-b border-white/5 pb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Unsere Fahrzeugauswahl</h2>
            <p className="text-gray-400">Finden Sie Ihren Traumwagen aus unserem aktuellen Sortiment</p>
          </div>

          <div className='flex items-center gap-4 flex-wrap justify-center'>
            <div className="flex items-center gap-2 text-primary mr-4">
              <Filter size={18} />
              <span className="text-sm font-bold uppercase tracking-widest">Filter:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setMenu(cat)}
                className={`py-2 px-6 rounded-xl text-sm font-bold transition-all duration-300 ${menu === cat
                    ? 'bg-primary text-white shadow-[0_10px_20px_rgba(220,38,38,0.2)]'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 font-medium animate-pulse">Lade Fahrzeuge...</p>
          </div>
        ) : (
          <motion.div
            layout
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-12'
          >
            <AnimatePresence>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((item) => (
                  <BlogItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    category={item.category?.name}
                    image={item.images?.[0] || item.image}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-40 glass rounded-3xl text-center"
                >
                  <p className="text-gray-400 text-xl">Keine Fahrzeuge in dieser Kategorie gefunden.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default BlogList
