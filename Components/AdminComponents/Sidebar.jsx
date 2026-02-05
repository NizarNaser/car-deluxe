import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <div className='flex flex-col bg-slate-100 text-black'>
            <div className='px-2 sm:pl-14 py-3 border border-black'>
                <Link href="/">
                    <Image
                        src={assets.logo}
                        alt="Logo"
                        width={120}
                        height={40}
                        priority
                        className='w-[130px] sm:w-auto'
                    />
                </Link>
            </div>
            <div className='w-28 sm:w-80 h-[calc(100vh-62px)] relative py-12 border border-black'>
                <div className='w-[50%] sm:w-[80%] absolute right-0'>
                    <Link href={'/admin/addProduct'} className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
                        <Image src={assets.add_icon} alt="addProduct" width={28} className='w-[130px] sm:w-auto' />
                        <p className="hidden sm:block text-xl font-bold">Add Car</p>
                    </Link>
                    <Link href={'/admin/blogList'} className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
                        <Image src={assets.blog_icon} alt="addProduct" width={28} className='w-[130px] sm:w-auto' />
                        <p className="hidden sm:block text-xl font-bold">Cars List</p>
                    </Link>
                    <Link href={'/admin/comments'} className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
                        <Image src={assets.blog_icon} alt="comments" width={28} className='w-[130px] sm:w-auto' />
                        <p className="hidden sm:block text-xl font-bold">Comments</p>
                    </Link>
                    <Link href={'/admin/subscriptions'} className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
                        <Image src={assets.email_icon} alt="addProduct" width={28} className='w-[130px] sm:w-auto' />
                        <p className="hidden sm:block text-xl font-bold">Subscriptions</p>
                    </Link>
                    <p className='mt-5  items-center justify-center text-xl font-bold m-4 border-t border-black hidden sm:block'></p>

                </div>

            </div>

        </div>
    )
}

export default Sidebar
