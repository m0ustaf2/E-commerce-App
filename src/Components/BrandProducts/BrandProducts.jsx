import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function BrandProducts() {
  let {addToCart,setnumOfCartItems} = useContext(cartContext)
  async function addProduct(productId)
  {
    let response = await addToCart(productId);
    if(response?.data?.status === 'success')
     {
    // console.log(response);

       setnumOfCartItems(response.data.numOfCartItems)
       toast.success(response.data.message,{duration:1000})
       
     }
     else{
       toast.error("Error",{duration:2000})
 
 
     }
    // console.log(response);
  }
let {id}= useParams()
// console.log(id);
  const [products, setProducts] = useState([])
  const [isloading, setisLoading] = useState(false)

  async function getBrandProduct()
   {
    try {
        setisLoading(true)
    let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`,{
        params : {'brand': id}
    })
    // console.log(data.data);
    setProducts(data.data)
   setisLoading(false)
    } catch (error) {
        console.log("Error",error);
    }

   }

   useEffect(() => {
     
    getBrandProduct()
     
   }, [])
   


  return <>
  <Helmet>
              <title>Products</title>
            </Helmet>
    {isloading?<Loading/>:  <div className="row">
      { products.length == 0?<div className='d-flex justify-content-center align-items-center vh-100'>
        <h1 className='text-main'>No Products Available in The Store Right Now!</h1>
        </div> :
      products.map((product)=> 
       <div key={product._id} className="col-md-2">
       <div className="product cursor-pointer px-2 py-3">
        <Link to={`/product-details/`+ product._id}>
        <img className='w-100' src={product.imageCover} alt={product.title} />
         <span className='text-main fw-bold font-sm'>{product.category.name}</span>
         <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
           <div className="d-flex justify-content-between">
              <span className='text-muted'>{product.priceAfterDiscount?
            <>
            <span className='text-decoration-line-through'>{product.price}</span>
            <span className='ms-3'>{product.priceAfterDiscount}</span>
            </>  : <span>{product.price}</span>
            } EGP</span>
              <span>
               <i className='fas fa-star rating-color'></i>
               {product.ratingsAverage}
              </span>
           </div>
        </Link>
        <button onClick={()=>addProduct(product._id)} className='btn bg-main text-white w-100'> Add to cart</button>
          
       </div>
       </div>)
      
      
      
    
      }
    </div>}
  
  </>
}
