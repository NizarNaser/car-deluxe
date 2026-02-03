'use client'

import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Tag } from 'lucide-react'

const BlogItem = ({ name, description, category, image, id }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className='w-full max-w-[350px] group'
    >
      <div className='relative h-full glass rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_20px_40px_rgba(220,38,38,0.15)] flex flex-col'>

        {/* Image Container */}
        <div className='relative h-56 overflow-hidden'>
          <Link href={`/blogs/${id}`}>
            <Image
              src={image || '/default.jpeg'}
              alt={name}
              fill
              className='object-cover transition-transform duration-700 group-hover:scale-110'
            />
          </Link>

          {/* Category Badge */}
          <div className='absolute top-4 left-4 z-20'>
            <span className='flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg'>
              <Tag size={12} />
              {category}
            </span>
          </div>

          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60' />
        </div>

        {/* Content */}
        <div className='p-6 flex flex-col flex-grow'>
          <h5 className='text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-1'>
            {name}
          </h5>

          <div
            className='text-sm text-gray-400 mb-6 line-clamp-3 leading-relaxed'
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <div className='mt-auto pt-4 border-t border-white/5 flex items-center justify-between'>
            <Link
              href={`/blogs/${id}`}
              className='flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors group/link'
            >
              <span>Detais ansehen</span>
              <ArrowRight size={16} className='transition-transform group-hover/link:translate-x-1' />
            </Link>

            <span className='text-xs text-gray-500 uppercase tracking-widest'>Verfügbar</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BlogItem
