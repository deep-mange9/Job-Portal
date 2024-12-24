import { createSlice } from "@reduxjs/toolkit";
import { setFilterCompanyByText } from "./companySlice";

const jobSlice = createSlice({
    name : 'job',
    initialState : {
        allJobs : [],
        singleJob : null,
        allAdminJobs : [],
        filterJobByText : "",
        appliedJobs : [],
        searchedQuery : "",
        filter : "",
    },
    reducers : {
        setAllJobs : (state , action) =>{
            state.allJobs = action.payload;
        },
        setSingleJob : (state , action) =>{
            state.singleJob = action.payload;
        },
        setAllAdminJobs : (state , action) =>{
            state.allAdminJobs = action.payload;
        },
        setFilterJobByText : (state,action) =>{
            state.filterJobByText = action.payload;
        },
        setAppliedJobs : (state , action) => {
            state.appliedJobs = action.payload;
        },
        setSearchedQuery : (state , action) =>{
            state.searchedQuery = action.payload;
        },
        setFilter : (state , action) =>{
            state.filter = action.payload;
        }
    }
})

export const {setAllJobs , setSingleJob , setAllAdminJobs ,setFilterJobByText , setAppliedJobs , setSearchedQuery , setFilter} = jobSlice.actions;
export default jobSlice.reducer;
