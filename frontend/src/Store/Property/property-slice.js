import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
    // slice name
    name:"property",
    // initial state for property slice
    initialState:{
        properties:[],//array to store the fetched  data of all properties 
        totalProperties:0,//to store the count of all available properties in database
        searchParams:{},//object to hold search parameters like location
        error:null,
        loading:false,//loading state for the property
    },
    reducers:{
        getRequest(state){
            state.loading=true;
        },
        //action to update properties state with fetch data
        getProperties(state,action){
            state.properties= action.payload.data;
            state.totalProperties= action.payload.all_properties;
            state.loading= false;
        },
        //action to search parameters
        updateSearchParams:(state,action)=>{
            state.searchParams=
            Object.keys(action.payload).length === 0
            ? {} : {
                ...state.searchParams,
                ...action.payload,
            };
        },
        // action to update error state
        getErrors(state,action){
            state.error= action.payload;
        },
        
    },
});
export const propertyAction = propertySlice.actions;

export default propertySlice;