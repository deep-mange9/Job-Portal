import React, { useEffect, useState } from 'react'
import {Table , TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const AdminJobsTable = () => {
   
  const {allAdminJobs , filterJobByText} = useSelector((store)=>store.job); 
  const [filterAdminJobs , setFilterAdminJobs] = useState(allAdminJobs); 
  const navigate = useNavigate();
  
  useEffect(()=>{
    const filteredJobs =  allAdminJobs.length > 0 && allAdminJobs.filter((job)=>{
        if(!filterJobByText){
            return true;
        }
        return job?.title?.toLowerCase().includes(filterJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(filterJobByText.toLowerCase());
     })
     setFilterAdminJobs(filteredJobs);
  } , [allAdminJobs , filterJobByText])
  



  return (
    <div className='mt-3'>
        <Table>
            <TableCaption>A List Of Your Created Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className = 'text-right'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {
                   filterAdminJobs && filterAdminJobs?.map((job)=>
                    <TableRow>
                        <TableCell>
                            {job?.company?.name}    
                        </TableCell>
                            
                        <TableCell>
                            {job?.title}    
                        </TableCell>

                        <TableCell>
                            23-12-24  
                        </TableCell>

                        <TableCell className='text-right cursor-pointer'>
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal/>
                                </PopoverTrigger>
                                <PopoverContent className='w-32'>
                                    <div className='flex items-center gap-2 cursor-pointer w-fit'>
                                        <Edit2 className='w-4'/>
                                        <span>Edit</span>
                                    </div>
                                    <div onClick={()=>{navigate(`/admin/jobs/${job?._id}/applicants`)}} className='flex items-center gap-2 cursor-pointer w-fit'>
                                        <Eye className='w-4'/>
                                        <span>Applicants</span>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TableCell>

                    </TableRow>                
                  ) 
                }

            </TableBody>
        </Table>
    </div>
  )
}

export default AdminJobsTable