'use client'
import SubsTableItem from '@/Components/AdminComponents/SubsTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const res = await axios.get("/api/email");
      if (Array.isArray(res.data)) {
        setEmails(res.data);
      } else {
        toast.error("خطأ في البيانات المستلمة");
      }
    } catch (err) {
      toast.error("فشل في تحميل الاشتراكات");
      console.error(err);
    }
  }
  const deleteEmail = async (mongoId) => {
    try {
      const res = await axios.delete('/api/email', {
        params: { id: mongoId }
      });
  
      if (res.data.success) {
        toast.success(res.data.msg);
        fetchEmails();
      } else {
        toast.error("فشل في حذف البريد");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء حذف البريد");
    }
  };
  

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Subscriptions</h1>
      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th className='py-3 px-6'>Email Subscription</th>
              <th className='hidden sm:block py-3 px-6'>Date</th>
              <th className='py-3 px-6'>Action</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <SubsTableItem
                key={email._id}
                mongoId={email._id}
                email={email.email}
                date={email.date}
                deleteEmail={deleteEmail}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page;
