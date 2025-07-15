'use client'
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Hero from "@/Components/Hero";
import ServiceSection from "@/Components/ServiceSection";
import { ToastContainer } from "react-toastify";
import Providers from "./providers";

export default function Home() {
  return (
 <>
 
 <ToastContainer theme="dark" />

   <Header/>
 

 <Hero/>
 <ServiceSection/>
<BlogList/>
 <Footer/>
 </>
  );
}
