import "./App.css";
//importing neccesary components and function from the react-router-dom library for  routing purposes.
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Main from "./Components/Home/Main";
import PropertyList from "./Components/Home/PropertyList";
import PropertyDetails from "./Components/PropertyDetails/PropertyDetails";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./Store/User/user-action";
import { userActions } from "./Store/User/user-slice";
import Login from "./Components/User/Login";
import Signup from "./Components/User/Signup";
import Profile from "./Components/User/Profile";
import EditProfile from "./Components/User/EditProfile";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
import Payment from "./Components/Payment/Payment";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
function App() {
  const stripePromise = loadStripe( "pk_test_51OtB9bSBmHfqwwbmoufPjqxhfjUy19wRTUqo68ZtESUtIQLt4UR4hhZcXzWWaV6U9iYTeufyCBH8Gjp9aTnujrm700iPoZuh7v" );
  
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.user);
  useEffect(() => {
    if (errors) {
      dispatch(userActions.clearError());
    }
    dispatch(currentUser());
  }, [errors, dispatch]);
  //manages the  routes of our app using createBrowserRouter method which is a part of react-router-dom library
  const router = createBrowserRouter(
    //creates routes from the elements passed to it.
    createRoutesFromElements(
      //routes are created by passing a path as the first parameter and what component should be rendered when that path
      //exact properties ensure that route matches exactly that u gave in path
      <Route path="/" element={<Main />} id="main" exact>
        <Route id="home" index element={<PropertyList />} exact />
        <Route
          element={<PropertyDetails />}
          id="PropertyDetails"
          path="propertylist/:id"
          exact
        />
        <Route id="login" path="/login" element={<Login />}></Route>
        <Route id="signup" path="/signup" element={<Signup />}></Route>
        <Route id="profile" path="/profile" element={<Profile />}></Route>
        <Route
          id="editprofile"
          path="/editprofile"
          element={<EditProfile />}
        ></Route>
        <Route
          id="updatepassword"
          path="/user/updatepassword"
          element={<UpdatePassword />}
        ></Route>
        <Route
          id="forgotpassword"
          path="/user/forgetpassword"
          element={<ForgotPassword />}
        ></Route>
        <Route
          id="resetpassword"
          path="/user/resetPassword/:token"
          element={<ResetPassword />}
        ></Route>
        <Route
        id="payment"
        path="payment/:propertyId"
        element={
          <Elements stripe={stripePromise}>
            <Payment/>
          </Elements>
        }>
          
        </Route>
      </Route>
    )
  );
  return (
    <div className="App">
      {/* this ensure that the routing function is available throughout the application */}
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        draggable={true}
        transition={Flip}
      />
    </div>
  );
}

export default App;
