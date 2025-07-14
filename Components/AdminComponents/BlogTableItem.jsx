'use client'
import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

const BlogTableItem = ({ mongoId,name,category,image,date ,handleDelete}) => {
  const BlogDate = new Date(date)
  const router = useRouter()

  return (
    <tr className='text-center'>
      <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>
        <Image
          src={image ? image : "/default.jpeg"}
          alt={name}
          width={40}
          height={40}
          className='rounded-full'
        />
        <p>{name ? name : 'no name'}</p>
      </th>
      <td className='px-6 py-3'>
        {category ? category : 'no category'}
      </td>
      <td className='px-6 py-3'>
        {BlogDate ? BlogDate.toDateString() : '11 Jan 2024'}
      </td>
      <td className='px-6 py-3 flex gap-2 justify-center'>
        <button
          onClick={() => router.push(`/admin/editProduct/${mongoId}`)}
          className='text-blue-600 hover:underline cursor-pointer'
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(mongoId)}
          className='text-red-600 hover:underline cursor-pointer'
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default BlogTableItem
