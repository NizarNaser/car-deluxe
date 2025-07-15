'use client'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'

const BlogList = () => {
  const [menu, setMenu] = useState('All')
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [loading, setLoading] = useState(true) // حالة التحميل

  const fetchBlogs = async () => {
    try {
      setLoading(true) // بداية التحميل
      const response = await axios.get('/api/cars')
      const blogsData = Array.isArray(response.data) ? response.data : []
      setBlogs(blogsData)
    } catch (err) {
      console.error('Error fetching blogs:', err)
    } finally {
      setLoading(false) // انتهاء التحميل
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
    <div>
      {/* التصنيفات */}
      <div className='flex justify-center flex-wrap gap-4 my-10'>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            className={`py-1 px-4 rounded-full text-sm font-medium transition-all duration-200 hover:cursor-pointer ${
              menu === cat
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-gray-200 text-black hover:bg-red-600 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* مؤشر التحميل */}
      {loading ? (
        <div className="text-center text-lg text-gray-600 py-10">Loading...</div>
      ) : (
        // التدوينات
        <div className='flex flex-wrap justify-around gap-4 gap-y-10 mb-16 xl:mx-24'>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((item, index) => (
              <BlogItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                category={item.category?.name}
                image={item.images?.[0] || item.image}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 w-full">There are no cars in this category.</div>
          )}
        </div>
      )}
    </div>
  )
}

export default BlogList
