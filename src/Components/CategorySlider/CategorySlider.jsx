import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function CategorySlider() {
 const [categories, setCategories] = useState([])
 const getAllCategories = async ()=>{
  try {
    let {data}= await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/categories`)
//   console.log(data.data);
  setCategories(data.data)
  } catch (error) {
    console.log("Error",error);
  }
 }

 useEffect(() => {
    getAllCategories()
  
  }, [])
  
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay:true,
    arrows:false
  };
  return (
    <>
    <div className="my-5">
      <h3>Shop Popular Categories</h3>
   <Slider {...settings} autoplaySpeed={3000}>
     {categories.map((item)=>{
    return  <div key={item._id}>
    <img  src={item.image} height={200} className='w-100 slid2' alt={item.name} />
    <h6 className='ctg text-main'>{item.name}</h6>
  </div>
     })}
    </Slider>
   </div>
    </>
  )
}
