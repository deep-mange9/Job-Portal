import { setAppliedJobs } from '@/redux/jobSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();  
  useEffect(()=>{
    const getAppliedJobs = async () =>{
        try{
            const res = await axios.get("http://localhost:3000/api/v4/application/get" , {withCredentials : true});
            if(res?.data?.application){
                dispatch(setAppliedJobs(res.data.application));
            }
        }
        catch(error){
            console.log(error);
        }    
    }
    getAppliedJobs();
  } , [dispatch])
}

export default useGetAppliedJobs