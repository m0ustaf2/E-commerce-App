import React, { useState } from 'react'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
export default function ResetPassword() {
  

    const notify = (msg,type) => {
        toast[type](msg);
      }
      let navigate=useNavigate();
      const [isloading, setisloading] = useState(false);
      
     
     async function handelLogin(values)
      {
        setisloading(true)
    let {data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , values).catch((error)=>{
       setisloading(false)
       notify('error',error.response.data.errors.msg)
       console.log(data);
     })
    console.log(data);
    if(data.token)
    {
        setisloading(true)
       notify('Password updated successfully','success')
        navigate('/login')
    }
      }
    let validationSchema=Yup.object({
      
      email:Yup.string().required('email is required').email('email is invalid'),
      newPassword:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,10}$/ , 'password should start with uppercase and at least 6 characters & special character not allowed....')
      
    })
    
      let formik=useFormik({
        initialValues:{
         
          email:'',
          newPassword:''
          
        },
        validationSchema,
        onSubmit:handelLogin
      });
    // console.log(formik);
      return (
        <>
        <Helmet>
                  <title>Reset-Password</title>
                </Helmet>
        <div className="w-75 mx-auto py-4">
          <h3>Reset New Password : </h3>
          
          
          <form onSubmit={formik.handleSubmit}>
          
           
            <label htmlFor="email">Email : </label>
            <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id='email' />
            {formik.errors.email && formik.touched.email ?<div className='alert alert-danger'>{formik.errors.email}</div>:""}
            
            <label htmlFor="newPassword">newPassword : </label>
            <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.newPassword} type="password" name='newPassword' id='newPassword' />
            {formik.errors.newPassword && formik.touched.newPassword ?<div className='alert alert-danger'>{formik.errors.newPassword}</div>:""}
               
            <button disabled={!(formik.isValid && formik.dirty && !isloading)} type='submit' className='btn bg-main text-white' >
              {!isloading?"Submit":<i className='fas fa-spinner fa-spin'></i>}
            </button>
          </form>
        </div>
        </>
        
      )
}
