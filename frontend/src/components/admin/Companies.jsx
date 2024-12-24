import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable.jsx'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setFilterCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllCompanies();
  const [input , setInput] = useState("");

  useEffect(() =>{
    dispatch(setFilterCompanyByText(input));
  } , [input])

  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
          <Input onChange = {(e)=>{setInput(e.target.value)}} value = {input} className='w-fit' placeholder='Filter By Company Name'/>
          <Button onClick={()=>{navigate('/admin/companies/create')}}>Add Company</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies