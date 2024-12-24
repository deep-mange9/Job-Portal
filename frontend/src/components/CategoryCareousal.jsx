import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
    "Full Stack Developer",
    "Frontend Developer",
    "Software Developer",
    "Data Science",
    "Graphic Designer",
]

const CategoryCareousal = () => {
   
   const navigate = useNavigate();
   const dispatch = useDispatch();
   
   const queryHandeler = (query) =>{
     
    dispatch(setSearchedQuery(query));
    navigate("/browse");

   }

  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-20">
            <CarouselContent>
                {
                    category.map((cat) => (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <Button onClick = {()=>{queryHandeler(cat)}} className="rounded-full" variant="outline">
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    </div>
  )
}

export default CategoryCareousal