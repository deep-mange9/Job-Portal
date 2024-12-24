import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobsCard = ({key , job}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>{navigate(`/description/${job?._id}`)}} className='p-5 rounded-md border border-gray-100 bg-white cursor-pointer shadow-xl'>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.location}</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-bold' variant='ghost'>{job?.position} Positions</Badge>
        <Badge className='font-bold text-[#F83002]' variant='ghost'>{job?.jobType}</Badge>
        <Badge variant="ghost" className='font-bold text-[#7209b7]'>{job?.salary}LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobsCard