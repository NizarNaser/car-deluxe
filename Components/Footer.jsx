'use client';

import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/Assets/assets';
import { FaInstagram, FaFacebookF, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaChevronUp, FaTiktok } from "react-icons/fa";
import { motion } from 'framer-motion';

export default function Footer() {
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
      toast.error("Subscription failed. Please try again.");
    }
  }

  return (
    <footer id='footer' className="relative bg-black text-white pt-24 pb-12 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">

          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="inline-block group">
              <Image
                src={assets.logo}
                width={150}
                height={50}
                alt="Logo"
                className="h-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              Premium Qualität und erstklassiger Service im An- und Verkauf von Gebrauchtwagen. Ihr Vertrauen ist unser Antrieb.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/profile.php?id=61560404041826" target="_blank" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary transition-all">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com/deluxe.auto.de" target="_blank" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary transition-all">
                <FaInstagram />
              </a>
              <a href="https://www.tiktok.com/@deluxe.auto.de" target="_blank" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary transition-all text-xl">
                <FaTiktok />
              </a>
              <a href="https://home.mobile.de/NASERMAZENUNDSAIEDMOKHAMEDRAIEDGBR#ses" target="_blank" className="px-3 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all">
                <Image src={assets.Mobile_de} alt="Mobile.de" width={24} height={24} className="h-4 w-auto grayscale invert" />
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest text-primary">Öffnungszeiten</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-gray-400">Mo - Fr</span>
                <span className="font-semibold">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-gray-400">Samstag</span>
                <span className="font-semibold">09:00 - 16:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Sonntag</span>
                <span className="text-primary font-bold">Geschlossen</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest text-primary">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="mt-1 text-primary"><FaMapMarkerAlt /></div>
                <span className="text-sm text-gray-400">Leipziger Str. 323, 34123 Kassel</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="text-primary"><FaPhoneAlt /></div>
                <a href="tel:+4915140144530" className="text-sm text-gray-400 hover:text-white transition">+49 151 40144530</a>
              </li>
              <li className="flex items-center gap-4">
                <div className="text-primary"><FaEnvelope /></div>
                <a href="mailto:info@auto-deluxe.de" className="text-sm text-gray-400 hover:text-white transition">info@auto-deluxe.de</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest text-primary">Newsletter</h3>
            <p className="text-sm text-gray-400">Erhalten Sie die neuesten Angebote direkt in Ihr Postfach.</p>
            <form onSubmit={onSubmitHandler} className="relative group">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="E-Mail Adresse"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-primary transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary-dark px-4 rounded-lg transition-colors font-bold text-sm"
              >
                Abonnieren
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} AUTO-DELUXE KASSEL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-xs text-gray-500 uppercase tracking-widest">
            <Link href="#" className="hover:text-primary transition">Impressum</Link>
            <Link href="#" className="hover:text-primary transition">Datenschutz</Link>
            <Link href="#" className="hover:text-primary transition">AGB</Link>
          </div>
        </div>
      </div>

      {/* Decorative shapes */}
      <div className="absolute bottom-0 right-0 w-1/3 h-64 bg-primary/10 blur-[120px] rounded-full -mr-20 -mb-20 pointer-events-none" />

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-primary transition-all z-50 border border-white/10"
      >
        <FaChevronUp />
      </button>
    </footer>
  );
}

