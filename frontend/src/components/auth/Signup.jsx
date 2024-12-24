import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar.jsx'
import { Label } from '../ui/label.jsx'
import { Input } from '../ui/input.jsx'
import { RadioGroup} from '../ui/radio-group.jsx'
import { Button } from '../ui/button.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice.js'
import { Loader2 } from 'lucide-react'

const Signup = () => {

  const [input , setInput] = useState({
    fullName : "",
    email : "",
    phoneNumber : "",
    password : "",
    role : "",
    file : "",
  });

  const {loading , user} = useSelector(store => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandeler = (e)=>{
    setInput({...input , [e.target.name] : e.target.value})
  }

  const changeFileHandeler = (e)=>{
    setInput({...input , file : e.target.files?.[0]})
  }

  useEffect(()=>{
    if(user){
       navigate("/");
    }
  } , [])

  const submitHandeler = async (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName" , input.fullName);
    formData.append("email" , input.email);
    formData.append("phoneNumber" , input.phoneNumber);
    formData.append("password" , input.password);
    formData.append("role" , input.role);
    if(input.file){
      formData.append("file" , input.file);
    }
    try{
      dispatch(setLoading(true));
      const result = await axios.post(`http://localhost:3000/api/v1/user/register` , formData , {
        headers :{
          "Content-Type" : "multipart/form-data"
        },
        withCredentials : true,
      });
      if(result.data.success){
        toast.success(result.data.message);
        navigate("/login");
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      dispatch(setLoading(false));
    }
  }



  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center m-auto max-w-7xl'>
        <form onSubmit={submitHandeler} className='w-1/2 border border-gray-400 rounded-md p-4 m-10'>
          <h1 className='font-bold text-2xl mb-5'>Sign Up</h1>
          <div className='my-2'>
            <Label>Full Name</Label>
            <Input type="text" placeholder="Enter Full Name" value ={input.fullName}  name = "fullName" onChange={changeEventHandeler}/>
          </div>

          <div className='my-2'>
            <Label>Email</Label>
            <Input type="email" placeholder="Enter Email" value={input.email} name="email" onChange={changeEventHandeler}/>
          </div>

          <div className='my-2'>
            <Label>Phone Number</Label>
            <Input type="text" placeholder="Enter Phone Number" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandeler}/>
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter Password" value={input.password} name="password" onChange={changeEventHandeler}/>
          </div>
          <div className='flex items-center justify-between'>
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked = {input.role === 'student'}
                onChange = {changeEventHandeler}
                className="cursor-pointer"
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked = {input.role === 'recruiter'}
                onChange = {changeEventHandeler}
                className="cursor-pointer"
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
          <div className='flex items-center gap-2'>
            <Label>Profile</Label>
            <Input
              type="file"
              accept="image/*"
              onChange = {changeFileHandeler}
              className="cursor-pointer"
            />
          </div>
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className='animate-spin mr-2 h-4 w-4'/>Please Wait</Button> : <Button type="submit" className="w-full my-4">Signup</Button>
          }
          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-400 hover:text-blue-900'>Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Signup