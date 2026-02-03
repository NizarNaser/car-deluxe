'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Car, Phone, Settings, UserCircle, LogIn, LogOut, Shield } from 'lucide-react';
import Image from 'next/image';
import logo from '@/Assets/logo.png';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-2 shadow-2xl' : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative flex items-center group">
          <Image
            src={logo}
            width={120}
            height={40}
            alt="Logo"
            priority
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <span className="ml-3 text-xl font-black tracking-tighter text-white group-hover:text-primary transition-colors hidden sm:block">
            AUTO-DELUXE
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center font-medium">
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
          >
            <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" />
            <span>Leistungen</span>
          </button>

          <button
            onClick={() => document.getElementById('autos')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
          >
            <Car size={18} className="group-hover:translate-x-1 transition-transform" />
            <span>Autos</span>
          </button>

          <button
            onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <Phone size={18} />
            <span>Kontakt</span>
          </button>

          <div className="h-6 w-[1px] bg-white/10 mx-2" />

          {/* Auth Section */}
          {session ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full ring-1 ring-white/10">
                <UserCircle size={18} className="text-primary" />
                <span className="text-sm font-semibold text-white">{session.user?.name}</span>
              </div>

              <div className="flex gap-2">
                {session?.user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="p-2 bg-primary hover:bg-primary-dark text-white rounded-full transition shadow-lg shadow-red-600/20"
                    title="Admin Panel"
                  >
                    <Shield size={18} />
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="p-2 glass hover:bg-red-600/20 text-white rounded-full transition border border-white/10"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition shadow-lg shadow-red-600/20 flex items-center gap-2"
            >
              <LogIn size={18} />
              <span>Login</span>
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/90 backdrop-blur-xl z-[60] md:hidden transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="flex flex-col h-full p-8 pt-24 space-y-8">
          <button
            className="absolute top-6 right-6 p-2 text-white"
            onClick={toggleMenu}
          >
            <X size={32} />
          </button>

          <nav className="flex flex-col space-y-4">
            <button
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
              }}
              className="text-4xl font-bold text-white flex items-center gap-4 py-4"
            >
              <Settings size={32} /> Leistungen
            </button>

            <button
              onClick={() => {
                document.getElementById('autos')?.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
              }}
              className="text-4xl font-bold text-white flex items-center gap-4 py-4"
            >
              <Car size={32} /> Autos
            </button>

            <button
              onClick={() => {
                document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false);
              }}
              className="text-4xl font-bold text-white flex items-center gap-4 py-4"
            >
              <Phone size={32} /> Kontakt
            </button>
          </nav>

          <div className="flex-grow" />

          {session ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 glass rounded-2xl">
                <UserCircle size={40} className="text-primary" />
                <span className="text-2xl font-bold text-white">{session.user?.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {session?.user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 bg-primary text-white p-4 rounded-xl font-bold"
                  >
                    <Shield size={24} /> Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="flex items-center justify-center gap-2 glass text-white p-4 rounded-xl font-bold"
                >
                  <LogOut size={24} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="w-full py-6 bg-primary text-white text-2xl font-bold rounded-2xl flex items-center justify-center gap-4 shadow-2xl shadow-red-600/40"
            >
              <LogIn size={32} /> Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
