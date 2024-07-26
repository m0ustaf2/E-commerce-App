import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  const getAllCategories = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  };
  let { data } = useQuery("AllCategory", getAllCategories);
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    arrows: false,
  };
  return (
    <>
      <div className="my-5">
        <h3 className="text-main">Shop Popular Categories</h3>
        <Slider {...settings} autoplaySpeed={3000}>
          {data?.data?.data.map((item) => {
            return (
              <div key={item._id}>
                <img
                  src={item.image}
                  height={300}
                  className="w-100 slid2"
                  alt={item.name}
                />
                <h6 className="ctg text-main">{item.name}</h6>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
