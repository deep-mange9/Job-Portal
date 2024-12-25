import React  from 'react'
import Navbar from '../shared/Navbar.jsx'
import { Label } from '../ui/label.jsx'
import { Input } from '../ui/input.jsx'
import { RadioGroup} from '../ui/radio-group.jsx'
import { Button } from '../ui/button.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useState , useEffect} from 'react'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading , setUser} from '@/redux/authSlice.js'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const [input , setInput] = useState({
    email : "",
    password : "",
    role : "",
  });

  const {loading , user} = useSelector(store => store.auth);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  useEffect(()=>{
    if(user){
      navigate('/');
    }
  } , [])

  const changeEventHandeler = (e) =>{
    setInput({...input , [e.target.name] : e.target.value})
  }

  const submitHandeler = async(e) =>{
    e.preventDefault();
    try{
       dispatch(setLoading(true));
      const result = await axios.post(`https://job-portal-7q1a.onrender.com/api/v1/user/login` , input , {
        headers :{
          "Content-Type" : "application/json"
        },
        withCredentials : true,
      });
      if(result.data.success){
        dispatch(setUser(result.data.user));
        navigate("/");
        toast.success(result.data.message);
      }
    }
    catch(error){
      console.log(error);
      toast(error.response.data.message)
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
          <h1 className='font-bold text-2xl mb-5'>Login</h1>
          

          <div className='my-2'>
            <Label>Email</Label>
            <Input type="email" placeholder="Enter Email" value={input.email} name="email" onChange={changeEventHandeler}/>
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
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button> : <Button type="submit" className="w-full my-4">Login</Button>
          }
          <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-400 hover:text-blue-900'>Signup</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login