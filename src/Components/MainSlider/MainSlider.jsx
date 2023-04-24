import React from 'react'
import Slider from "react-slick";
import slider1 from '../../assets/images/slider-2.jpeg'
import slider2 from '../../assets/images/grocery-banner-2.jpeg'
import slider3 from '../../assets/images/grocery-banner.png'
import slider4 from '../../assets/images/slider-2.jpeg'
export default function MainSlider() {
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
   <div className="my-5">
   <Slider {...settings} autoplaySpeed={3000}>
     <img className= "w-100 slid" height={400} src={slider1} alt="slider" />
     <img className='w-100 slid' height={400} src={slider2} alt="slider" />
     <img  className='w-100 slid' height={400} src={slider3} alt="slider" />
     <img  className='w-100 slid' height={400} src={slider4} alt="slider" />
    </Slider>
   </div>
    </>
    
  )
}
