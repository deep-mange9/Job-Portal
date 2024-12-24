import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar.jsx";
import FilterCard from "./FilterCard.jsx";
import Job from "./Job.jsx";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const {allJobs , filter} = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [filterJobs , setFilterJobs] = useState(allJobs);


  useEffect(()=>{
    if(filter){
      const filteredJobs = allJobs && allJobs.filter((job)=>{
        return job?.title?.toLowerCase()?.includes(filter?.toLowerCase()) ||
               job?.description?.toLowerCase()?.includes(filter?.toLowerCase()) ||
               job?.location?.toLowerCase()?.includes(filter?.toLowerCase()) 
     })
     setFilterJobs(filteredJobs);
    }
    else{
      setFilterJobs(allJobs);
    }
  } , [allJobs , filter])

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>No Jobs Availaible</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5]">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job}/>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
