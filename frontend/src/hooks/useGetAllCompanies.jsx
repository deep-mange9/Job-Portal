import { setCompanies } from '@/redux/companySlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
   const dispatch = useDispatch(); 
   useEffect(()=>{
      const getAllCompanies = async () =>{
        try{
          const res = await axios.get("https://job-portal-7q1a.onrender.com/api/v2/company/get" , {withCredentials : true});
          if(res.data.success){
            dispatch(setCompanies(res.data.companies));
          }  
        }
        catch(error){
            console.log(error);
        }
      }
      getAllCompanies();
   },[dispatch])
}

export default useGetAllCompanies