import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",
    initialState : {
       loading : false, 
       user : null,
    },
    reducers : {
        // actions used to update state(data) in store
        setLoading : (state , action)=>{
            state.loading = action.payload;
        },
        setUser : (state , action)=>{
            state.user = action.payload;
        }
    }
});

export const {setLoading , setLogin ,setUser} = authSlice.actions;
export default authSlice.reducer;
