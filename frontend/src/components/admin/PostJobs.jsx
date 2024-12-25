import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJobs = () => {
  const {companies} = useSelector((store)=>store.company);
  const navigate = useNavigate();

  const [input , setInput] = useState({
    title : "",
    description : "",
    requirements : "",
    salary : "",
    location : "",
    jobType : "",
    experienceLevel : "",
    position : 0,
    companyId : "",
  });

  const [loading , setLoading] = useState(false);

  const changeEventHandeler = (e) =>{
    setInput({...input , [e.target.name] : e.target.value});
  }

  const selectEventHandeler = (value) =>{
    const company = companies.find((company)=>company.name.toLowerCase() == value);
    setInput({...input , companyId : company._id});
  }

  const submitHandeler = async(e) =>{
    e.preventDefault();

    try{
      setLoading(true);
      const res = await axios.post("https://job-portal-7q1a.onrender.com/api/v3/job/post" , input , {
        headers : {
          "Content-Type" : "application/json"
        },
        withCredentials : true,
      });

      if(res?.data?.success){
        toast.success(res.data.message);
        navigate("/admin/jobs"); 
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center w-screen my-5'>
        <form onSubmit={submitHandeler} className='p-8 max-w-4xl border border-gray-400 shadow-lg rounded-md'>
          <div className='grid grid-cols-2 gap-2'>

            <div>
              <Label>Title</Label>
              <Input
                type='text'
                value={input.title}
                name = 'title'
                onChange = {changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type='text'
                value = {input.description}
                name="description"
                onChange = {changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                type='text'
                value = {input.requirements}
                name = "requirements"
                onChange = {changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type='text'
                value = {input.salary}
                name = "salary"
                onChange = {changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type='text'
                value = {input.location}
                name = "location"
                onChange = {changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                type='text'
                value = {input.jobType}
                name = "jobType"
                onChange = {changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Experience Level</Label>
              <Input
                type='text'
                value = {input.experienceLevel}
                name = "experienceLevel"
                onChange = {changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>No of Position</Label>
              <Input
                type='number'
                value = {input.position}
                name = "position"
                onChange = {changeEventHandeler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            
          {companies.length > 0  &&
            <Select onValueChange={selectEventHandeler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {
                    companies.map((company)=>{
                      return(
                        <SelectItem value = {company?.name?.toLowerCase()}>{company?.name}</SelectItem>
                      )
                    })
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          }
          </div>

          {loading ? <Button className='w-full my-4'><Loader2 className=' mr-2 h-4 w-4 animate-spin'/>Please Wait</Button> : <Button className='w-full my-4' type='submit'>Post new Job</Button>}

          {companies <= 0 && <p className='text-red-600 font-bold my-3 text-center text-xs'>*Please Register a company before posting job</p>}
        </form>
      </div>
    </div>
  )
}

export default PostJobs