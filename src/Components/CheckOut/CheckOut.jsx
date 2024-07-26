import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";

export default function CheckOut() {
  let { onlinePayment, cartId } = useContext(cartContext);
  const [isloading, setisloading] = useState(false);

  async function handleSubmit(values) {
    setisloading(false);
    let response = await onlinePayment(cartId, values);
    if (response?.data?.status === "success") {
      setisloading(true);
      window.location.href = response.data.session.url;
    }
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Helmet>
        <title>CheckOut</title>
      </Helmet>
      <div className="w-50 py-5 my-5 mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">address details :</label>
          <input
            required
            type="text"
            className="form-control mb-3"
            value={formik.values.details}
            onChange={formik.handleChange}
            name="details"
            id="details"
          />

          <label htmlFor="phone">phone :</label>
          <input
            required
            type="tel"
            className="form-control mb-3"
            value={formik.values.phone}
            onChange={formik.handleChange}
            name="phone"
            id="phone"
          />

          <label htmlFor="city">city :</label>
          <input
            required
            type="text"
            className="form-control mb-3"
            value={formik.values.city}
            onChange={formik.handleChange}
            name="city"
            id="city"
          />

          <button
            disabled={!(formik.isValid && formik.dirty && !isloading)}
            type="submit"
            className="btn w-100 bg-main text-white"
          >
            {!isloading ? "Pay" : <i className="fas fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </>
  );
}
