'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Car, Phone, Settings, UserCircle, LogIn, LogOut, Shield } from 'lucide-react';
import Image from 'next/image';
import logo from '@/Assets/logo.png';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header id="header" className="bg-gray-700 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo + Title */}
        <div className="flex items-center justify-center gap-2">
          <Link href="/" className="text-xl font-bold text-gray-800">
            <Image src={logo} width={120} height={40} alt="Logo" priority />
          </Link>
          <button
            onClick={() => document.getElementById('header')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-xl font-bold text-purple-100 hover:text-red-600 cursor-pointer"
          >
            AUTO-DELUXE
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-purple-100 hover:text-red-600 transition cursor-pointer flex items-center gap-1"
          >
            <Settings size={18} /> Leistungen
          </button>

          <button
            onClick={() => document.getElementById('autos')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-purple-100 hover:text-red-600 transition cursor-pointer flex items-center gap-1"
          >
            <Car size={18} /> Autos
          </button>

          <button
            onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-purple-100 hover:text-red-600 cursor-pointer flex items-center gap-1"
          >
            <Phone size={18} /> Kontaktieren
          </button>

          {/* Login/Logout + Username + Admin Panel */}
          {session ? (
            <>
              <h2 className="text-purple-100 font-bold flex items-center gap-1">
                <UserCircle size={18} /> {session.user?.name}
              </h2>
              <button
                onClick={() => signOut()}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center gap-1"
              >
                <LogOut size={18} /> Logout
              </button>

              {session?.user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center gap-1"
                >
                  <Shield size={18} /> Admin Panel
                </Link>
              )}
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center gap-1"
            >
              <LogIn size={18} /> Login
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200 px-4 py-4 space-y-2">
          <button
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 text-gray-700"
          >
            <Settings size={18} /> Unsere Leistungen
          </button>

          <button
            onClick={() => {
              document.getElementById('autos')?.scrollIntoView({ behavior: 'smooth' });
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 text-gray-700"
          >
            <Car size={18} /> Autos
          </button>

          <button
            onClick={() => {
              document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 text-gray-700"
          >
            <Phone size={18} /> Kontaktieren
          </button>

          {session ? (
            <>
              <div className="flex items-center gap-2 text-gray-800 font-semibold">
                <UserCircle size={18} /> {session.user?.name}
              </div>
              <button
                onClick={() => {
                  signOut();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 bg-red-600 text-white w-full px-4 py-2 rounded hover:bg-red-700"
              >
                <LogOut size={18} /> Logout
              </button>

              {session.user?.role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 bg-red-600 text-white w-full px-4 py-2 rounded hover:bg-red-700"
                >
                  <Shield size={18} /> Admin Panel
                </Link>
              )}
            </>
          ) : (
            <button
              onClick={() => {
                signIn();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 bg-red-600 text-white w-full px-4 py-2 rounded hover:bg-red-700"
            >
              <LogIn size={18} /> Login
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
