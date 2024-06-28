import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Signupgust from './components/auth/user/Signupgust'
import App from "./App";
import Logingust from './components/auth/user/Logingust'
import Home from './components/movie/ShowCard'
// import About from './components/About'
import Editmovie from './components/movie/Editmovie'
import Payment from'./components/movie/Payment'
import Loginadmin from './components/auth/admin/Loginadmin'
import Signupadmin from './components/auth/admin/Signupadmin'
import Addbooking from './components/movie/Addbooking'
import Bookingmovie from './components/movie/bookingmovie'
import MyBookings from './components/movie/MyBookings';

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/signupgust", element: <Signupgust /> },
    { path: "/logingust", element: <Logingust /> },
    { path: "/posts", element: <Home /> },
    // { path:"/about", element:<About />},
    { path: "/loginadmin", element: <Loginadmin /> },
    { path: "/signupadmin", element: <Signupadmin /> },
    { path: "/addbooking", element: <Addbooking /> },
    { path: '/show/:id', element: <Bookingmovie /> },
    {path:'/edit/:id',element:<Editmovie/>},
    {path:'/showpay/:id',element:<Payment/>},
    
   
 { path:"/my-bookings" ,element:<MyBookings/>} 
]);


export default router;
