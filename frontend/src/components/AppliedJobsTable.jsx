import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobsTable = () => {
  const {appliedJobs} = useSelector((store)=>store.job);
  return (
    <div>
        <Table>
            <TableCaption>A List Of Your Applied Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className='text-right'>Status</TableHead>
                </TableRow>
            </TableHeader>
                <TableBody>
                    { appliedJobs.length <= 0 ? <span>No applied Jobs Till Now</span> :
                      appliedJobs.map((application,index)=>(
                        <TableRow key={index}>
                            <TableCell >{application?.createdAt?.split("T")[0]}</TableCell>
                            <TableCell >{application?.job?.title}</TableCell>
                            <TableCell >{application?.job?.company?.name}</TableCell>
                            <TableCell className='text-right'><Badge className={`${application?.status === "rejected" ? "bg-red-400" : application.status === "pending" ? "bg-gray-400" : "bg-green-400"}`}>{application?.status?.toUpperCase()}</Badge></TableCell>
                        </TableRow>
                      ))  
                    }
                </TableBody>
            
        </Table>
    </div>
  )
}

export default AppliedJobsTable