import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar.jsx'
import HeroSection from './HeroSection.jsx'
import CategoryCareousal from './CategoryCareousal.jsx'
import LatestJobs from './LatestJobs.jsx'
import Footer from './shared/Footer.jsx'
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const {user} = useSelector((store)=>store.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role === 'recruiter'){
      navigate("/admin/companies");
    }
  } , [])
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCareousal/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home