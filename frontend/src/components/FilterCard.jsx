import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setFilter, setSearchedQuery } from '@/redux/jobSlice'

const filterData = [

  {
     filterType : 'Location',
     array : ['Delhi NCR' , 'Bangalore' , 'Hyderabad' , 'Pune' , 'Chennai' , 'Mumbai'],
   },
   {
     filterType : 'Industry',
     array:['Frontend Developer' , 'Backend Developer' , 'Full Stack Developer' , 'Data Science' , 'Nextjs Developer'],
   },
   {
     filterType :'Salary',
     array : ['0-40k' , '41k-1lakh' , '1lakh to 5lakh'],
   }

]


const FilterCard = () => {
  const [selectedValue , setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandeler = (value) =>{
    setSelectedValue(value);
  }

  useEffect(()=>{
    dispatch(setFilter(selectedValue));
  } , [selectedValue])


  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-4'/>
      <RadioGroup value = {selectedValue} onValueChange={changeHandeler}>
      {
        filterData.map((data , index)=>(
          <div>
            <h1 className='text-lg font-bold'>{data.filterType}</h1>
            {
              data.array.map((item , idx)=>{
                const itemId = `id${index}-${idx}` 
                return(
                  <div className='flex items-center my-2 space-x-2'>
                    <RadioGroupItem value={item} id={itemId}/>
                    <Label htmlFor = {itemId}>{item}</Label>
                  </div>
                )
              })
            }
          </div>
        ))
      }
      </RadioGroup>
    </div>
  )
}

export default FilterCard