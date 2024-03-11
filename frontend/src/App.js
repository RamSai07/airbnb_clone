import './App.css';
//importing neccesary components and function from the react-router-dom library for  routing purposes.
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import Main from "./Components/Home/Main";
import PropertyList from './Components/Home/PropertyList';
import PropertyDetails from "./Components/PropertyDetails/PropertyDetails";
import {Flip,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { currentUser } from './Store/User/user-action';
import { userActions } from './Store/User/user-slice';
import Login from './Components/User/Login';
function App() {
  const dispatch = useDispatch();
  const {errors}=useSelector((state)=>state.user);
  useEffect(()=>{
    if(errors){
      dispatch(userActions.clearError());
    }
    dispatch(currentUser());
  },[errors,dispatch]);
  //manages the  routes of our app using createBrowserRouter method which is a part of react-router-dom library
  const router =createBrowserRouter(
    //creates routes from the elements passed to it.
    createRoutesFromElements(
      
      //routes are created by passing a path as the first parameter and what component should be rendered when that path
      //exact properties ensure that route matches exactly that u gave in path
      <Route path="/" element={<Main/>} id="main" exact>
        <Route id="home" index element={<PropertyList/>} exact/> 
        <Route element={<PropertyDetails/>}
         id ="PropertyDetails"
        path="propertylist/:id"
        exact
        />
        <Route path='/login' element={<Login/>}></Route>
      </Route>
      

    )
  )
  return (
    <div className="App">
      {/* this ensure that the routing function is available throughout the application */}
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;