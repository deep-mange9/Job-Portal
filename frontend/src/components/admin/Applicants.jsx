import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch(); 
  const {applicants} = useSelector((store)=>store.application);

  useEffect(()=>{
    const getAllApplicants = async() =>{
        try{
            const res = await axios.get(`https://job-portal-7q1a.onrender.com/api/v4/application/${params.id}/applicants` , {withCredentials : true});
            if(res?.data?.job){
                dispatch(setAllApplicants(res.data.job));
            }
        }
        catch(error){
            console.log(error);
        }
    }
    getAllApplicants();
  } , [dispatch])

  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-4'>Applicants {applicants?.applications?.length}</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants