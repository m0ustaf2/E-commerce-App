import React from 'react'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthStore';

export default function ProtectedRoute({children}) {
  let {userData}=useContext(AuthContext)
  if((userData == null) && (localStorage.getItem('userToken')==null)){
    return <Navigate to='/login'/>;
   }else{
    return children;
   }
}
