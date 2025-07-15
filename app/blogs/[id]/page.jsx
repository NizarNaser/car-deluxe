'use client';

import { assets } from '@/Assets/assets';
import { FaInstagram } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import Footer from '@/Components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession, signIn } from 'next-auth/react';
const Page = ({ params }) => {
  const { id } = React.use(params);
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
      // حدد الصورة الرئيسية أول صورة تلقائيًا
      setActiveImg(car.data.image || car.data.images?.[0] || null);
      setShow(true);
      // Fetch comments from API
      const res = await fetch(`/api/comments?postId=${id}`);
      const commentsData = await res.json();
      setComments(commentsData);

      // Check localStorage for rating
      if (session?.user?.email) {
        const resRating = await fetch(`/api/ratings?postId=${id}&email=${session.user.email}`);
      
        if (!resRating.ok) {
          console.warn('Failed to fetch rating:', resRating.status);
          setRating(0);
        } else {
          const text = await resRating.text();
          try {
            const ratingData = text ? JSON.parse(text) : {};
            setRating(ratingData?.rating || 0);
          } catch (error) {
            console.error('Error parsing rating JSON:', error);
            setRating(0);
          }
        }
      
        localStorage.setItem(`rating-${id}`, Date.now().toString());
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if ( id) {
      fetchBlogData();
      setTimeout(() => setShow(true), 100);
    }
  }, [ id]);

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

    const lastRated = localStorage.getItem(`rating-${id}`);
 /*   if (lastRated && Date.now() - Number(lastRated) < 10 * 24 * 60 * 60 * 1000) {
      alert('You can only rate once every 10 days');
      return;
    }*/

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
      localStorage.setItem(`rating-${id}`, Date.now().toString());
    }
  };
  return (data ? (
    <div className={`transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
        <div className="flex items-center justify-start gap-2">
          <Link href="/" className="text-xl font-bold text-gray-800">
            <Image src={assets.logo} width={120} height={40} alt="Logo" priority />
          </Link>
          <Link href="/" className="text-xl font-bold text-gray-800">
            <h1 className='text-xl font-bold text-black hover:text-red-600 cursor-pointer'>AUTO-DELUXE</h1>
          </Link>
        </div>
        <div className='text-center my-24'>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] m-auto'>{data?.name}</h1>
        </div>
      </div>

      <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        {/* الصورة الكبيرة */}
        {activeImg && (
          <Image className='border-4 border-white rounded-md' src={activeImg} alt="Main Image" width={1280} height={720} />
        )}

        {/* الصور المصغرة */}
        <div className='flex gap-2 mt-4 overflow-x-auto'>
          {[data.image, ...(data?.images || [])]
            .filter(img => img) // ← هذا يتأكد أن الصورة ليست null أو فارغة
            .map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`thumb-${i}`}
                width={100}
                height={60}
                className={`cursor-pointer border ${activeImg === img ? 'border-black' : 'border-transparent'} rounded`}
                onClick={() => setActiveImg(img)}
              />
            ))}
        </div>


        {/* نص المقال */}
        <h1 className='my-8 text-[26px] font-semibold'>Introduction:</h1>
        <div className='blog-content' dangerouslySetInnerHTML={{ __html: decodeHtml(data.description) }}></div>


        {/* التقييم */}
        <div className='mt-10'>
          <p className='text-lg font-semibold mb-2'>Rate this article:</p>
          <div className='flex items-center gap-1'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                ★
              </span>
              

            ))}
          </div>
        </div>

        {/* التعليقات */}
        <div className='mt-10'>
          <p className='text-lg font-semibold mb-2'>Comments</p>
          <div className='mb-4'>
            <textarea
              className='w-full border border-gray-400 p-2 rounded'
              rows={3}
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              className='mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800'
            >
              Add Comment
            </button>
          </div>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className='border-b border-gray-300 py-2'>
                <p className='text-sm text-gray-800 font-medium'>{comment.userEmail}</p>
                <p className='text-sm'>{comment.comment}</p>
              </div>
            ))
          ) : (
            <p className='text-sm text-gray-500'>No comments yet.</p>
          )}

        </div>

        {/* روابط المشاركة */}
        <div className='my-24'>
          <p className='text-black font-semibold my-4'>Share this article on social media</p>
          <div className='flex gap-4'>
            <a href="https://www.facebook.com/profile.php?id=61560404041826" target="_blank">
              <AiOutlineFacebook className="text-5xl" />
            </a>
            <a href="https://instagram.com/deluxe.auto.de" target="_blank">
              <FaInstagram className="text-5xl" />
            </a>
            <a href="https://home.mobile.de/NASERMAZENUNDSAIEDMOKHAMEDRAIEDGBR" target="_blank">
              <Image src={assets.Mobile_de} alt="Mobile-de" className="w-10 h-10 mt-1" />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : <h1 className='text-center py-20 text-xl'>Loading...</h1>);
};

export default Page;
