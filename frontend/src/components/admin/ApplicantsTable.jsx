import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'

const ApplicantsTable = () => {
  const applicantsStatus = ['Accepted' , 'Rejected']; 
  const {applicants} = useSelector((store)=>store.application);

  const statusHandeler = async(status , id) =>{
    try{
        const res = await axios.post(`https://job-portal-7q1a.onrender.com/api/v4/application/status/${id}/update` , {status} , {withCredentials : true});
        if(res?.data?.success){
            toast.success(res.data.message);
        }
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }
  }

  return (
    <div>
        <Table>
            <TableCaption>A List of applicants</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className = "text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    applicants && applicants?.applications?.map((application)=>{
                        return(
                            <TableRow>
                                <TableCell>{application?.applicant?.fullName}</TableCell> 
                                <TableCell>{application?.applicant?.email}</TableCell>
                                <TableCell>{application?.applicant?.phoneNumber}</TableCell> 
                                <TableCell>
                                    {
                                        application.applicant.profile.resume ? <a className='text-blue-600 cursor-pointer' target='_blank' rel="noopener noreferrer" href={application?.applicant?.profile?.resume}>{application?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span> 
                                    }
                                </TableCell> 
                                <TableCell>{application?.createdAt.split("T")[0]}</TableCell> 
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal/>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                        {
                                            applicantsStatus.map((status , index)=>{
                                            return(
                                                <div onClick={()=>{statusHandeler(status , application._id)}} key={index} className='flex items-center w-fit my-2 cursor-pointer'>
                                                    <span>{status}</span>
                                                </div>
                                            )
                                            })
                                        }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default ApplicantsTable