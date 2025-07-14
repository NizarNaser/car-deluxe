'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { assets } from '@/Assets/assets';
import Image from 'next/image';
import logo from '@/Assets/logo.png';
import { useSession, signIn, signOut } from 'next-auth/react';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header id='header' className="bg-gray-700 shadow-md fixed top-0 left-0 right-0 z-50 " >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center justify-center gap-2">
          <Link href="/" className="text-xl font-bold text-gray-800">
            <Image src={logo} width={120} height={40} alt="Logo" priority />

          </Link>
          <Link href="/" className="text-xl font-bold text-gray-800">
            <h1 className='text-xl font-bold text-purple-100 hover:text-red-600 cursor-pointer'>AUTO-DELUXE</h1>
          </Link>
        </div>
        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          <h2 onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-purple-100 hover:text-red-600 transition cursor-pointer">Leistungen</h2>
          <h2 onClick={() => document.getElementById('autos')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-purple-100 hover:text-red-600 transition cursor-pointer">Autos</h2>
          <h2 onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-purple-100 hover:text-red-600 cursor-pointer">Kontaktieren</h2>

          {/* Login Button */}
          {session ? (
            <>
              <h2 className='text-xl font-bold text-red-400 hover:text-red-600'>{session?.user?.name}</h2>
              <button
                onClick={() => signOut()}

                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition hover:cursor-pointer"
              >
                LogOut
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}

              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition hover:cursor-pointer"
            >
              Login
            </button>
          )


          }
                {session?.user?.role === 'admin' && (
                            <a
                            href="/admin"
                
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                          >
                            Admin Panel
                           
                          </a>

      )}

        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>



      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200 px-4 py-4">
          <Link href="/services" className="block py-2 text-gray-700">Unsere Leistungen</Link>
          <Link href="/contact" className="block py-2 text-gray-700">Kontaktieren Sie uns</Link>
          <Link
            href="/login"
            className="block mt-2 bg-red-600 text-white text-center px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};


export default Header
