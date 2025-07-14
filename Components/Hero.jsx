'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { assets } from '@/Assets/assets';
import { FaCarSide } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
const Hero = () => {
  const hero_bg = {
    src: '/hero.jpg',
    alt: 'hero',
    className: "h-auto w-auto",
    with: 1900,
    height: 1080,
    priority: true
  };
  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-between md:justify-between py-10 md:py-0 "
      style={{ backgroundImage: `url(${hero_bg.src})` }}
    >
      {/* خلفية شفافة للتظليل */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* المحتوى */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 w-full">
        {/* النصوص */}
        <div className="text-white md:w-1/2 text-center md:text-left space-y-4">
          <p className="flex items-center justify-center md:justify-start gap-2 text-lg md:text-xl text-gray-200">
            <span className="text-red-500 text-2xl"><FaCarSide /></span>
            Wir bieten die besten Gebrauchtwagen mit garantierter Qualität
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            An- und Verkauf von Gebrauchtwagen
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Entdecken Sie unsere große Auswahl an hochwertigen Gebrauchtwagen zu attraktiven Preisen. Bei uns erhalten Sie Qualität und Vertrauen in jedem Fahrzeug
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

        {/* صورة السيارة مع الحركة */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] aspect-[4/4]">
            <Image
              src={assets.hero_banner}
              alt="Car"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 500px, 700px"
              priority
            />
          </div>



        </motion.div>
      </div>
    </section>

  );
};

export default Hero;
