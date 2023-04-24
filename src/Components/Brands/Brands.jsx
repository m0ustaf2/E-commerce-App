import React, { useEffect, useState } from 'react'
import axios from "axios";
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Brands() {
    const [isloading, setisLoading] = useState(false)
    const [brands, setbrands] = useState([])

  async function getBrands()
  {
   try {
    setisLoading(true)
    let{data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
    setbrands(data.data);
    setisLoading(false)
    console.log(brands);
   } catch (error) {
    console.log("Error",error);
   }
  }

  useEffect(() => {
  
    getBrands();
     
    }, [])
  return (
    <>
    <Helmet>
              <title>Brands</title>
            </Helmet>
       {!isloading?  <div className="row   align-items-center">
            <div className="col-md-3">
                <div className="title">
                    <h3 className='text-main fw-bold'>Our Brands</h3>
                    <p className='text-muted'> You can see our brands and each brand include the products in it</p>
                </div>
            </div>
            {brands.map((brand)=>
            <div key={brand._id} className="col-md-3 mt-5">
               <Link to={`/brandproducts/${brand._id}`}>
               <div className='brand mx-2 rounded-5 p-3'>
               <img src={brand.image} className='w-100' alt={brand.name} />
                <h4 className='text-center text-main ' >{brand.name}</h4>
               </div>
               </Link>
            </div>)}
            
            </div> :<Loading/>}  
    </>
  )
}
