import './App.css';
//importing neccesary components and function from the react-router-dom library for  routing purposes.
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import Main from "./Components/Home/Main";
function App() {
  //manages the  routes of our app using createBrowserRouter method which is a part of react-router-dom library
  const router =createBrowserRouter(
    //creates routes from the elements passed to it.
    createRoutesFromElements(
      
      //routes are created by passing a path as the first parameter and what component should be rendered when that path
      //exact properties ensure that route matches exactly that u gave in path
      <Route path="/" element={<Main/>} exact/> 
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
