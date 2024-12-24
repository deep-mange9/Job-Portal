import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { useDispatch } from 'react-redux'
import { setFilterJobByText } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const AdminJobs = () => {
  const [input , setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useGetAllAdminJobs();

  useEffect(()=>{
    dispatch(setFilterJobByText(input));
  } , [input])

  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
          <Input onChange = {(e)=>{setInput(e.target.value)}} value = {input} className='w-fit' placeholder='Filter By Name,Role'/>
          <Button onClick = {()=>navigate('/admin/jobs/create')}>Post New Job</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  )
}

export default AdminJobs