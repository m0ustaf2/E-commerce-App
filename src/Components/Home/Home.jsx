import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";

export default function Home() {
  let { addToCart, setnumOfCartItems } = useContext(cartContext);

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === "success") {
      setnumOfCartItems(response?.data?.numOfCartItems);
      toast.success(response?.data?.message, { duration: 1000 });
    } else {
      toast.error("Error", { duration: 2000 });
    }
  }

const getProducts=()=>{
 return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
}

let {data,isLoading}=useQuery("AllProducts",getProducts)
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <MainSlider />
          <CategorySlider />
          <div className="row">
            {data?.data?.data.map((product) => (<div key={product._id} className="col-md-2">
                <div className="product cursor-pointer px-2 py-3">
                  <Link to={`/product-details/` + product._id}>
                    <img
                      className="w-100"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <span className="text-main fw-bold font-sm">
                      {product.category.name}
                    </span>
                    <h3 className="h6 fw-bolder">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">
                        {product.priceAfterDiscount ? (
                          <>
                            <span className="text-decoration-line-through">
                              {product.price}
                            </span>
                            <span className="ms-3">
                              {product.priceAfterDiscount}
                            </span>
                          </>
                        ) : (
                          <span>{product.price}</span>
                        )}
                        EGP
                      </span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => addProduct(product._id)}
                    className="btn bg-main text-white w-100"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
