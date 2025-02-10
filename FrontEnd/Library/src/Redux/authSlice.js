import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    name:'',
    email:'',
    token:'',
    refreshToken:'',
    id : null
}

const authSlicer = createSlice({
    name:'auth',
    initialState:INITIAL_STATE,
    reducers:{
        login:(state,action)=>{
            state.name=action.payload.user.first_name;
            state.email=action.payload.user.email;
            state.token=action.payload.tokens.access;
            state.refreshToken=action.payload.tokens.refresh;
            state.id = action.payload.user.id
        },
        logout : (state,action)=>{
            state.name=null;
            state.email=null;
            state.token=null;
            state.refreshToken=null;
            state.id = null
        },
         
    }
})

export const{login,logout} = authSlicer.actions;
export default authSlicer.reducer;