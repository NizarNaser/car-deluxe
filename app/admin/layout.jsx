'use client';
import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import { useSession } from 'next-auth/react';
import Providers from "../providers";

export default function AdminLayout({ children }) {
    const { data: session } = useSession();
    return (
        <>
            <div className="flex">
                <ToastContainer theme="dark" />
                <Sidebar />
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-gray-700 text-white">
                        <h3 className="font-medium">Admin Panel</h3>
                        <Image
                            src={session?.user?.image || assets.profile_icon}
                            alt="profile_icon"
                            width={40}
                            height={40}
                            className="hidden sm:block w-[130px] sm:w-auto rounded-full"
                        />

                    </div>
                    <Providers>
                        {children}
                    </Providers>



                </div>
            </div>



        </>
    );
}