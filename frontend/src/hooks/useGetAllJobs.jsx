import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector((store)=>store.job);

   useEffect(()=>{
      const fetchAllJobs = async () =>{
        try{
          const res = await axios.get(`http://localhost:3000/api/v3/job/get?keyword=${searchedQuery}` , {withCredentials : true});
          if(res.data.success){
            dispatch(setAllJobs(res.data.jobs)); 
          }
        }
        catch(error){
            console.log(error);
        }
      }
      fetchAllJobs();
   },[])
}

export default useGetAllJobs