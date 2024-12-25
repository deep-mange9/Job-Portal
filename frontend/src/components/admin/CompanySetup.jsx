import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    const id = params.id;
    useGetCompanyById(id);
    const navigate = useNavigate();
    const [input , setInput] = useState({
        name : '',
        description : '',
        website : '',
        location :'',
        file : null,
    })
    const [loading , setLoading] = useState(false);

    const {singleCompany} = useSelector((store)=>store.company)

    const changeEvenetHandeler = (e) =>{
        setInput({...input , [e.target.name] : e.target.value});
    }

    const changeFileHandeler = (e) =>{
        const file = e.target.files?.[0];
        setInput({...input , file})
    }

    useEffect(()=>{
       setInput({
         name : singleCompany.name || "",
         description : singleCompany.description || "",
         location : singleCompany.location || "",
         website : singleCompany.website || "",
         file : singleCompany.file || null,
       }) 
    } , [singleCompany])

    const submitHandeler = async (e) =>{
        e.preventDefault(); 
        const formData =new FormData();
        formData.append('name' , input.name);
        formData.append('description' , input.description);
        formData.append('location' , input.location);
        formData.append('website' , input.website);
        
        if(input.file){
            formData.append('file' , input.file);
        }

        try{
          setLoading(true); 
          const res = await axios.put(`https://job-portal-7q1a.onrender.com/api/v2/company/update/${id}` , formData , {
             headers : {
                "Content-Type" : 'multipart/form-data',
             },
             withCredentials : true
          });
          if(res.data.success){
            toast(res.data.message);
            navigate("/admin/companies");
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
        <div className='max-w-xl mx-auto'>
            
                <div className='flex items-center gap-5 p-8'>
                    <Button onClick = {()=>{navigate('/admin/companies')}} variant='outline' className='flex items-center gap-2 text-gray-500 font-semibold'>
                        <ArrowLeft/>
                        <span>Back</span>
                    </Button>
                    <h1 className='font-bold text-xl'>Company Setup</h1>
                </div>
                
                <form onSubmit={submitHandeler}>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <Label>Company Name</Label>
                        <Input
                            type='text'
                            name = 'name'
                            value={input.name}
                            onChange = {changeEvenetHandeler}   
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            type='text'
                            name = 'description'
                            value={input.description}
                            onChange = {changeEvenetHandeler}   
                        />
                    </div>
                    <div>
                        <Label>Website</Label>
                        <Input
                            type='text'
                            name = 'website'
                            value={input.website}
                            onChange = {changeEvenetHandeler}   
                        />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input
                            type='text'
                            name = 'location'
                            value={input.location}
                            onChange = {changeEvenetHandeler}   
                        />
                    </div>
                    <div>
                        <Label>Company Logo</Label>
                        <Input
                            type='file'
                            accept='image/*'
                            onChange = {changeFileHandeler}   
                        />
                    </div>
                </div>
                {
                    loading ? <Button className='w-full mt-8'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button> :
                    <Button className='w-full mt-8'>Update</Button>
                }
            </form>
        </div>
    </div>
  )
}

export default CompanySetup