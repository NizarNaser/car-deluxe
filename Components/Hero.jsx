'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '@/Assets/assets';
import { FaCarSide, FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      aria-label="Hero Section"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Next.js Optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Luxury car background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full py-20">
        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium tracking-wide">
            <FaCarSide className="text-primary animate-pulse" />
            <span className="uppercase tracking-widest text-gray-300">Premuim Quality Cars</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            An- und Verkauf von <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 text-glow">
              Gebrauchtwagen
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-xl leading-relaxed">
            Entdecken Sie unsere große Auswahl an hochwertigen Gebrauchtwagen zu attraktiven Preisen. Bei uns erhalten Sie Qualität und Vertrauen in jedem Fahrzeug.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => document.getElementById('autos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-red-600/20"
            >
              Unsere Autos
            </button>
            <button
              onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 glass hover:bg-white/10 text-white font-bold rounded-lg transition-all border border-white/20"
            >
              Kontaktieren
            </button>
          </div>

          <div className="flex items-center gap-6 pt-8">
            <a href="https://facebook.com/profile.php?id=61560404041826" target="_blank" className="text-2xl text-gray-400 hover:text-white transition-colors">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com/deluxe.auto.de" target="_blank" className="text-2xl text-gray-400 hover:text-white transition-colors">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@deluxe.auto.de" target="_blank" className="text-2xl text-gray-400 hover:text-white transition-colors">
              <FaTiktok />
            </a>
            <a href="https://home.mobile.de/NASERMAZENUNDSAIEDMOKHAMEDRAIEDGBR#ses" target="_blank" className="h-8 w-auto grayscale contrast-125 opacity-60 hover:opacity-100 hover:grayscale-0 transition-all flex items-center">
              <Image
                src={assets.Mobile_de}
                alt="Mobile-de"
                width={100}
                height={30}
                className="object-contain h-6"
              />
            </a>
          </div>
        </motion.div>

        {/* Floating Car Feature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden md:flex justify-center relative"
        >
          <div className="relative w-full max-w-[600px] aspect-[4/3] animate-float">
            <Image
              src={assets.hero_banner}
              alt="Featured Car"
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(220,38,38,0.3)]"
              sizes="50vw"
              priority
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-600/10 blur-[120px] rounded-full animate-pulse-slow" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 opacity-50">
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
