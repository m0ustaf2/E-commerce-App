import React, { useEffect, useState } from 'react'
import {Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';
import { ToastContainer } from 'react-toastify';
import ProductDetailes from './Components/ProductDetailes/ProductDetailes';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Profile from './Components/Profile/Profile';
import CartContextProvider from './Context/CartContext';
import CheckOut from './Components/CheckOut/CheckOut';
import { Offline } from 'react-detect-offline';
import Disconnected from './Components/Disconnected/Disconnected';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';


export default function App() {

  const [userData, setUserData] = useState(null);
  function saveUserData()
  {
  let encodedToken=localStorage.getItem('userToken');
  let decodedToken=jwtDecode(encodedToken);
  setUserData(decodedToken);
  // console.log(decodedToken);
  }
  let logout=()=>{
    localStorage.removeItem('userToken');
    setUserData(null)
    return <Navigate to='/login'/>
   
  }
  useEffect(() => {
    if(localStorage.getItem('userToken') !== null && userData== null)
    {
      saveUserData();
    }
  }, [])

const Routes=createBrowserRouter([
  {path:'',element:<Layout setUserData={setUserData}  userData={userData} logout={logout}/>,children:[
    {index:true,element:<ProtectedRoute userData={userData}> <Home/> </ProtectedRoute>},
    {path:'register',element:<Register/>},
    {path:'forget-password',element:<ForgetPassword/>},
    {path:'reset-password',element:<ResetPassword/>},
    {path:'brands',element: <ProtectedRoute userData={userData}> <Brands/> </ProtectedRoute>},
    {path:'profile',element: <ProtectedRoute userData={userData}> <Profile userData={userData}/> </ProtectedRoute>},
    {path:'brandproducts/:id',element: <ProtectedRoute userData={userData}> <BrandProducts/> </ProtectedRoute>},
    {path:'checkout',element:<ProtectedRoute userData={userData}><CheckOut/></ProtectedRoute>},
    {path:'cart',element: <ProtectedRoute userData={userData}> <Cart userData={userData}/> </ProtectedRoute>},
    {path:'login',element:<Login saveUserData={saveUserData}/>},
    {path:'product-details/:id',element: <ProtectedRoute userData={userData}> <ProductDetailes/> </ProtectedRoute>},

    {path:'*' , element:<Notfound/>}
  ]}
])


  return (
    <>
     {/* <Offline><Disconnected/></Offline> */}

    <ToastContainer theme='colored'
    style={{ marginTop:50 }}/>
    <CartContextProvider>
      <Toaster
     toastOptions={{
      style: {
        background: '#363636',
        color: '#fff',
        marginTop:50
      },
    }}
      />
      <RouterProvider router={Routes}/>
    </CartContextProvider>
    </>
  )
}
