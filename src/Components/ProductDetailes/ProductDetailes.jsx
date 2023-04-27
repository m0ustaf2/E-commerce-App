import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import axios from 'axios';
import Loading from './../Loading/Loading';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
export default function ProductDetailes() {
 let {addToCart,setnumOfCartItems} = useContext(cartContext)
 async function addProduct(productId)
 {
   let response = await addToCart(productId);
   if(response?.data?.status === 'success')
    {
      setnumOfCartItems(response.data.numOfCartItems)
      toast.success(response.data.message,{duration:1000})
      
    }
    else{
      toast.error("Error",{duration:2000})


    }
   console.log(response);
 }
  let {id}=useParams()
  // console.log(id);
  const [productdtls, setProductDtls] = useState([])
  const [cat, setcat] = useState({})
  const [isloading, setisLoading] = useState(false)
  
 async function getProductDtls()
  {
   try {
    setisLoading(true)
    let{data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    setProductDtls(data.data);
    setcat(data.data.category)
    setisLoading(false)
 //    console.log(data.data.category);
    // console.log(data.data);
   } catch (error) {
    console.log("Error",error);
   }
  }
useEffect(() => {
  
  getProductDtls();
 
}, [])


var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay:true,
  arrows:false
};

  return (
    <>
  <Helmet>
              <title>{productdtls.title}</title>
            </Helmet>
     <div className="row mt-5">
     {isloading ?
    <Loading/>
     : 
    <>
     <div className="col-md-3 sldr">
      <Slider {...settings}  autoplay autoplaySpeed={3000}>
      {productdtls.images?.map((ele,index)=><img key={index} className='w-100' alt={productdtls.title} src={ele}/>)}
    </Slider>
      </div>
      <div className="col-md-9  d-flex justify-content-center flex-column dtl">
        <h3 className='mt-4'>{productdtls.title}</h3>
        <p className='text-muted my-2'>{productdtls.description}</p>
        <span className='me-auto'>{cat.name}</span>
        <div className="d-flex justify-content-between mt-4">
        <span className='me-auto'>{productdtls.priceAfterDiscount?
            <>
            <span className='text-decoration-line-through'>{productdtls.price}</span>
            <span className='ms-3'>{productdtls.priceAfterDiscount}</span>
            </>  : <span>{productdtls.price}</span>
            } EGP</span>
        <span className='ms-auto'>
                <i className='fas fa-star rating-color'></i>
                {productdtls.ratingsAverage}
               </span>
        </div>
        <button onClick={()=>addProduct(id)}  className='btn bg-main text-white w-100'> Add to cart</button>

      </div>
    </>}
    </div>
    
    
    
    </>
    
  )
}
