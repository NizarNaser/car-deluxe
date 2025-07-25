'use client'
import {assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogItem = ({name, description, category, image,id}) => {
  return (
  
    <div className='max-w-[330px] h-auto sm:max-w-[300px] bg-white border border-red-400 hover:shadow-[-7px_7px_0px_#fd5452]  '>
       <Link href={`/blogs/${id}`}>
       <Image
  src={image || '/default.jpeg'} // استخدم صورة افتراضية إن كانت الصورة غير متوفرة
  alt="blog"
  width={400}
  height={400}
  className='border-b border-black'
/>
        </Link>
        <p className='ml-4 mt-5 px-1 inline-block bg-red-400 text-white text-sm'>{category}</p>
        <div className='p-5'>
            <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{name}</h5>
            <p className='mb-3 text-sm tracking-tight text-gray-700' dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}></p>
            <Link  href={`/blogs/${id}`} className='inline-flex items-center py-2 font-semibold text-center'>
                Read more <Image src={assets.arrow} alt="arrow" className='ml-2' width={12} height={12} />
            </Link>
        </div>
    </div>

  )
}

export default BlogItem
