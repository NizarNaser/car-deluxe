'use client';

import { assets } from '@/Assets/assets';
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp, FaTelegram, FaLinkedin } from "react-icons/fa";
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession, signIn } from 'next-auth/react';
import { use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, MessageSquare, Share2, ArrowLeft, Link as LinkIcon } from 'lucide-react';

const Page = (props) => {
  const { id } = use(props.params);
  const { data: session } = useSession();

  const [data, setData] = useState(null);
  const [activeImg, setActiveImg] = useState(null);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchBlogData = async () => {
    try {
      const car = await axios.get(`/api/cars`, {
        params: { id }
      });
      setData(car.data);
      setActiveImg(car.data.image || car.data.images?.[0] || null);
      setShow(true);

      const res = await fetch(`/api/comments?postId=${id}`);
      const commentsData = await res.json();
      setComments(commentsData);

      if (session?.user?.email) {
        const resRating = await fetch(`/api/ratings?postId=${id}&email=${session.user.email}`);
        if (resRating.ok) {
          const text = await resRating.text();
          const ratingData = text ? JSON.parse(text) : {};
          setRating(ratingData?.rating || 0);
        } else {
          setRating(0);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogData();
    }
  }, [id, session]);

  const handleAddComment = async () => {
    if (!session) {
      alert('Please sign in to comment');
      signIn();
      return;
    }

    if (!newComment.trim()) return;

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId: id,
        comment: newComment,
        userEmail: session.user.email
      })
    });

    const added = await res.json();
    setComments([...comments, added]);
    setNewComment('');
  };

  const handleRating = async (star) => {
    if (!session) {
      alert('Please sign in to rate');
      signIn();
      return;
    }

    const res = await fetch('/api/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId: id,
        rating: star,
        userEmail: session.user.email
      })
    });

    if (res.ok) {
      setRating(star);
    }
  };

  if (!data) return (
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      <Header />

      {/* Hero Header Wrapper */}
      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/#autos"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            <span>Zurück zur Übersicht</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-block px-4 py-1.5 glass rounded-full text-xs font-bold uppercase tracking-widest text-primary">
              {data.category?.name || "Fahrzeug"}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
              {data.name}
            </h1>
          </motion.div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Side: Images & Description */}
          <div className="lg:col-span-2 space-y-12">

            {/* Gallery Section */}
            <div className="space-y-6">
              <motion.div
                layoutId="main-image"
                className="relative aspect-video glass rounded-[2.5rem] overflow-hidden border border-white/10"
              >
                <Image
                  src={activeImg || '/default.jpeg'}
                  alt={data.name}
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>

              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {[data.image, ...(data?.images || [])]
                  .filter(img => img)
                  .map((img, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveImg(img)}
                      className={`relative flex-shrink-0 w-32 aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${activeImg === img ? 'border-primary ring-4 ring-primary/20' : 'border-white/5'
                        }`}
                    >
                      <Image src={img} alt={`Car image ${i}`} fill className="object-cover" />
                    </motion.div>
                  ))
                }
              </div>
            </div>

            {/* Content Section */}
            <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-primary rounded-full" />
                Fahrzeugbeschreibung
              </h2>
              <div className="blog-content prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white" dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
          </div>

          {/* Right Side: Quick Info, Rating & Comments */}
          <div className="space-y-8">

            {/* Rating Box */}
            <div className="glass p-8 rounded-[2.5rem] border border-white/10">
              <h3 className="text-lg font-extrabold uppercase tracking-widest text-primary mb-6">Bewertung</h3>
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className="transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      size={28}
                      className={`${star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'} transition-colors`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-400">Geben Sie diesem Fahrzeug eine Bewertung.</p>
            </div>

            {/* Interaction / Share */}
            <div className="glass p-8 rounded-[2.5rem] border border-white/10">
              <h3 className="text-lg font-extrabold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                <Share2 size={18} /> Teilen
              </h3>
              <div className="flex flex-wrap gap-4">
                {/* Facebook Share */}
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all text-xl text-gray-300"
                  title="Facebook"
                >
                  <FaFacebookF />
                </button>

                {/* WhatsApp Share */}
                <button
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Schauen Sie sich dieses Auto an: ${window.location.href}`)}`, '_blank')}
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all text-xl text-gray-300"
                  title="WhatsApp"
                >
                  <FaWhatsapp />
                </button>

                {/* Telegram Share */}
                <button
                  onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(data.name)}`, '_blank')}
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-[#0088cc] hover:text-white transition-all text-xl text-gray-300"
                  title="Telegram"
                >
                  <FaTelegram />
                </button>

                {/* LinkedIn Share */}
                <button
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all text-xl text-gray-300"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </button>

                {/* Instagram (Copy Link workaround) */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link kopiert! Sie können ihn jetzt auf Instagram teilen.');
                  }}
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all text-xl text-gray-300"
                  title="Instagram (Link kopieren)"
                >
                  <FaInstagram />
                </button>

                {/* TikTok (Copy Link workaround) */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link kopiert! Sie können ihn jetzt auf TikTok teilen.');
                  }}
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-black hover:text-white transition-all text-xl text-gray-300"
                  title="TikTok (Link kopieren)"
                >
                  <FaTiktok />
                </button>

                {/* Copy Link */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link kopiert!');
                  }}
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/20 hover:text-white transition-all text-xl text-gray-300"
                  title="Link kopieren"
                >
                  <LinkIcon />
                </button>
              </div>
            </div>

            {/* Comments Box */}
            <div className="glass p-8 rounded-[2.5rem] border border-white/10 flex flex-col h-fit">
              <h3 className="text-lg font-extrabold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                <MessageSquare size={18} /> Kommentare
              </h3>

              <div className="space-y-6 max-h-[400px] overflow-y-auto mb-8 pr-2 scrollbar-hide">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={index}
                      className="bg-white/5 p-4 rounded-2xl border border-white/5"
                    >
                      <p className="text-xs font-bold text-gray-400 mb-1 truncate">{comment.userEmail}</p>
                      <p className="text-[14px] text-gray-200">{comment.comment}</p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">Noch keine Kommentare.</p>
                )}
              </div>

              <div className="relative">
                <textarea
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 pr-12 text-sm outline-none focus:border-primary transition-all resize-none"
                  rows={2}
                  placeholder="Hinterlassen Sie eine Nachricht..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  onClick={handleAddComment}
                  className="absolute right-3 bottom-3 p-2 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
