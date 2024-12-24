import React from 'react'
import { Button } from './ui/button'
import { Bookmark, Icon } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) =>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const td = currentTime - createdAt;
    return Math.floor(td/(1000*24*60*60));
  }
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) == 0 ? 'today' : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant='outline' className='rounded-full' size='icon'><Bookmark/></Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button variant='outline' className='p-6' size='icon'>
          <Avatar>
            <AvatarImage src={job?.company?.logo}/>
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>{job?.location}</p>
        </div>
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

      <div className='flex items-center gap-4 mt-4'>
        <Button variant='outline' onClick={()=>navigate(`/description/${job?._id}`)}>Details</Button>
        <Button className='bg-[#7209b7]'>Save For Later</Button>
      </div>

    </div>
  )
}

export default Job