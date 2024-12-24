import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
   const [query , setQuery] = useState("");

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const queryHandeler = ()=>{
     dispatch(setSearchedQuery(query));
     navigate("/browse");
   }

  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
            <span className='py-2 px-4 rounded-full mx-auto bg-gray-100 text-[#F83002] font-medium'>No.1 Job Hunt Website</span>
            <h1 className='text-5xl font-bold'>Search, Apply & <br/>Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <div className='flex w-[40%] shadow-lg border border-gray-200 items-center mx-auto pl-3 rounded-full gap-4'>
                <input
                    type='text'
                    placeholder='Search Your Dream Job'
                    value={query}
                    onChange={(e)=>{setQuery(e.target.value)}}
                    className='outline-none border-none w-full'
                />
                <Button onClick={queryHandeler} className='rounded-r-full bg-[#6A38C2]'>
                    <Search className='w-5 h-5'/>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default HeroSection