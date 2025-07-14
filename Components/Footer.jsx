'use client';
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/Assets/assets';
import { FaInstagram } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import { motion } from 'framer-motion';
export default function Footer() {
  const logo_icon = {
    src: assets.logo,
    width: 128,
    height: 63,
    alt: 'Logo',
  };
  const [email, setEmail] = useState('');
 const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('email', email);

    const response = await axios.post('/api/email', formData);

    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail('');
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    toast.error(response.data.msg);
    console.error(error);
  }
}
  return (
    <footer id='footer' className="relative bg-gray-900 text-white pt-16 ">
      {/* قسم الأعلى */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">

        {/* شعار ونص */}
        <div>
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Link href="/" className="inline-block mb-4">
           
             <Image
                    src={logo_icon.src}
                    width={logo_icon.width}
                    height={logo_icon.height}
                    alt={logo_icon.alt}
                    className="h-auto"
                  /> 
          </Link>
          </motion.div>
          <p className="text-gray-300 text-sm">
            Entdecken Sie unsere große Auswahl an hochwertigen Gebrauchtwagen zu attraktiven Preisen.
            Bei uns erhalten Sie Qualität und Vertrauen in jedem Fahrzeug.
          </p>

          <div className="flex gap-4 mt-4">
            <a href="https://www.facebook.com/profile.php?id=61560404041826" target="_blank" rel="noopener noreferrer">
            <AiOutlineFacebook className="text-5xl"/>
            </a>
            <a href="https://instagram.com/deluxe.auto.de" target="_blank" rel="noopener noreferrer">
            <FaInstagram  className="text-5xl"/>
            </a>
            <a href="https://home.mobile.de/NASERMAZENUNDSAIEDMOKHAMEDRAIEDGBR#ses" target="_blank" rel="noopener noreferrer">
              <Image src={assets.Mobile_de} alt="Mobile-de" className="w-10 h-10 mt-1"/>
            </a>
          </div>
        </div>

        {/* مواعيد العمل */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Öffnungszeiten</h3>
          <div className="text-sm text-gray-300 space-y-2">
            <div>
              <p>Montag – Freitag</p>
              <span>9.00 – 18.00</span>
            </div>
            <div>
              <p>Samstag</p>
              <span>9.00 – 16.00</span>
            </div>
          </div>
        </div>

        {/* معلومات التواصل */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
          <ul className="text-sm text-gray-300 space-y-3">
            <li>
              <a href="tel:+4915140144530" className="hover:text-red-500 transition">
                📞 +49 1514 0144 530
              </a>
            </li>
            <li>
              <a href="mailto:DELUXE_AUTOMOBILE@ICLOUD.COM" className="hover:text-red-500 transition">
                📧 DELUXE_AUTOMOBILE@ICLOUD.COM
              </a>
            </li>
            <li>
              <span>📍 Leipziger Straße 323, Kassel, Germany 34123</span>
            </li>
            <li>  <form onSubmit={onSubmitHandler} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 m-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]'>
    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email' className='pl-4 outline-none' />
    <button type='submit' className='border-1 border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white hover:cursor-pointer'>Subscribe</button>
  </form></li>
          </ul>
        </div>
      </div>

      {/* زر العودة للأعلى */}
      <button
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  className="fixed bottom-4 right-4 p-3 w-14 h-14 cursor-pointer bg-red-500 text-white rounded-full shadow-md hover:bg-red-800 transition"
>
  ↑
</button>


      {/* أشكال الزينة */}
     
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-0">
        <Image
          src={assets.footer_shape_3}
          alt="shape"
          width={637}
          height={173}
          className="w-full opacity-20"
        />
      </div>
     
         
      {/* قسم الحقوق */}
      <div className="bg-black/90 mt-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 text-center md:text-left">
            &copy; <a href="https://nizar-portfolio-gamma.vercel.app/" target='_blank'>https://nizar-portfolio-gamma.vercel.app/</a>. All Rights Reserved.
          </p>
          <div className="flex gap-4 opacity-20">
            <Image src={assets.footer_shape_2} alt="shape" width={200} height={100} />
            <Image src={assets.footer_shape_1} alt="Red Car" width={200} height={150} />
          </div>
        </div>
      </div>
    </footer>
  );
}

