import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet'

export default function Cart({userData}) {
  let nav=useNavigate();
 let {getLoggedUserCart,removeItem,clearCart,updateProductCount,setnumOfCartItems} = useContext(cartContext)
 const [cartDetails, setcartDetails] = useState(null)
 
   
      async function getCart()
      {
        let response=await getLoggedUserCart();
        console.log(response);
        if(response?.data?.status==='success')
        {
        
            console.log(response.data.data);
            setcartDetails(response.data.data);  
        }
        else{
      toast.error("No cart exist for this user")
          nav('/')
        }
      
        
      
        
    }
    async function deleteItem(productId)
    {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          (async ()=>{
            let response= await removeItem(productId);
          setcartDetails(response.data.data);
          setnumOfCartItems(response.data.numOfCartItems)
          })()

          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
     
      
      // console.log(response);
    }
    async function deleteCart()
    {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          (async ()=>{
            let response= await clearCart();
          setcartDetails(response.data.data);
          setnumOfCartItems(response.data.numOfCartItems)
          toast.error("No Products in the cart")
          nav('/')
          })()

          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
     
      
      // console.log(response);
    }
        
    async function updateProductQuantity(productId,count)
    {
      let response= await updateProductCount(productId,count);
      setcartDetails(response.data.data);
      toast.success("Product count updated successfuly")
      setnumOfCartItems(response.data.numOfCartItems)

      console.log(response);
    }
      

    useEffect(()=>{
        getCart();
    },[]);

  return (
    <>    
    <Helmet>
              <title>Cart</title>
            </Helmet>

  {cartDetails?

  <div className="bg-main-light p-5 my-5">
     <h3 className='text-center text-main'>Welcome,{userData.name}</h3>
    <h5>Shop Cart :</h5>
    <h6 className='text-main'>Total Cart Price :{cartDetails.totalCartPrice} EGP</h6>
    <button onClick={()=>deleteCart()} className='btn btn-outline-danger'>Clear All <i className='fa-regular  fa-trash-can'></i></button>
    {cartDetails.products.map((product)=><div key={product.product._id} className='row align-items-center  border-bottom py-2'>
      <div className="col-md-1 ">
        <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
      </div>
      <div className="col-md-9   d-flex justify-content-between ">
        <div>
        <h6>{product.product.title}</h6>
        <h6 className='text-main'>price : {product.price}</h6>
        <button onClick={()=>deleteItem(product.product._id)} className='btn btn-outline-danger'>Remove <i className='fa-regular  fa-trash-can'></i></button>
        </div>

      </div>
      <div className='col-md-2  mt-1'>
          <button  onClick={()=>updateProductQuantity(product.product._id , product.count+1)} className='btn  btn-outline-success '>+</button>
          <span className='mx-2'>{product.count}</span>
          <button  onClick={()=>updateProductQuantity(product.product._id , product.count-1)} className='btn btn-outline-success'>-</button>
         </div>
    </div>)}


    
   <div className='text-center'>
   <button className='btn bg-main my-3'>
      <Link className='text-white' to={'/checkout'}>
      checkout
      </Link>
    </button>
   </div>
  
  </div>:<Loading/>}
    
    
    </>
  )
}
