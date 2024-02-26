//importing react library from  node module
//React is a special object that allows us to use React features in our code.
import React from 'react';
import {Outlet} from "react-router-dom";
//outlet is used to render the content of nested routes
import Footer from './Footer';
import Header from './Header';
const Main = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
};

export default Main;