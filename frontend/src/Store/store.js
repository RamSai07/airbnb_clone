import {configureStore} from "@reduxjs/toolkit";
import propertySlice from "./Property/property-slice";
import propertyDetailsSlice from "./PropertyDetails/propertyDetails-slics";

const store = configureStore({
    reducer:{
        properties:propertySlice.reducer,
        propertydetails:propertyDetailsSlice.reducer,
    },
});


export default store;