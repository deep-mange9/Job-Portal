import { setAllAdminJobs } from '@/redux/jobSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const getAllAdminJobs = async() =>{
       try{
         const res = await axios.get("http://localhost:3000/api/v3/job/getadminjobs" , {withCredentials : true});
         if(res?.data?.success){
            dispatch(setAllAdminJobs(res.data.jobs));
         }
       }
       catch(error){
         console.log(error);
       } 
    }
    getAllAdminJobs();
  } , [dispatch]);
}

export default useGetAllAdminJobs