import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";

export default function Brands() {
  const getBrands = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  };

  let { data, isLoading } = useQuery("AllBrands", getBrands);
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      {!isLoading ? (
        <div className="row   align-items-center">
          <div className="col-md-3">
            <div className="title">
              <h3 className="text-main fw-bold">Our Brands</h3>
              <p className="text-muted">
                You can see our brands and each brand include the products in it
              </p>
            </div>
          </div>
          {data?.data?.data.map((brand) => (
            <div key={brand._id} className="col-md-3 mt-5">
              <Link to={`/brandproducts/${brand._id}`}>
                <div className="brand mx-2 rounded-5 p-3">
                  <img src={brand.image} className="w-100" alt={brand.name} />
                  <h4 className="text-center text-main ">{brand.name}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
