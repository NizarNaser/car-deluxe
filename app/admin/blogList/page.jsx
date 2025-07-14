'use client'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    const res = await axios.get("/api/cars");
    setCars(res.data);
  }

const handleDelete = async (mongoId) => {
 const res = await axios.delete('/api/cars',{
  params: {
    id:mongoId
  }
 })
 toast.success(res.data.msg);
 fetchCars();
}

  useEffect(() => {
    fetchCars();
  }, [])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scroll-hide'>
        <table className='w-full text-sm  text-gray-500 dark:text-gray-400'>
          <thead className='text-sm  uppercase bg-gray-50 text-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='py-3 px-6 hidden sm:block'>
                Auther name
              </th>
              <th scope='col' className='py-3 px-6'>
                Blog Title
              </th>
              <th scope='col' className='py-3 px-6'>
                Date
              </th>
              <th scope='col' className='py-3 px-6'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cars.map((item, index) => (
              <BlogTableItem key={index} mongoId={item._id} name={item.name} description={item.description} category={item.category?.name}  date={item.date} image={item.images[0]} handleDelete={handleDelete}/>
            ))}
           
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
