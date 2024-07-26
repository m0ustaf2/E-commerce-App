import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";

export default function Register() {
  const [isloading, setisloading] = useState(false);
  let navigate = useNavigate();

  const handelRegister = (values) => {
    setisloading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((data) => {
        if (data.status == 201) {
          setisloading(false);
          toast.success(data?.message||"success");
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response.status == 409) {
          setisloading(false);
          toast.error(error?.response?.data?.message || "Network Error");
        }
      });
  };

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name minlength is 3")
      .max(20, "name maxlength is 20"),
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{6,10}$/,
        "password must start with uppercase and at least 6 characters & special character not allowed...."
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Password and rePassword doesnot match"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone must be a valid number "),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handelRegister,
  });
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-75 mx-auto py-4">
        <h3>Register Now : </h3>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name : </label>
          <input
            onBlur={formik.handleBlur}
            placeholder="Enter your name"
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik?.values?.name}
            type="text"
            name="name"
            id="name"
          />
          {formik?.errors?.name && formik?.touched?.name ? (
            <div className="alert alert-danger">{formik?.errors?.name}</div>
          ) : (
            ""
          )}

          <label htmlFor="email">Email : </label>
          <input
            onBlur={formik.handleBlur}
            placeholder="Enter your email"
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik?.values?.email}
            type="email"
            name="email"
            id="email"
          />
          {formik?.errors?.email && formik?.touched?.email ? (
            <div className="alert alert-danger">{formik?.errors?.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password : </label>
          <input
            onBlur={formik.handleBlur}
            placeholder="Enter your password"
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik?.values?.password}
            type="password"
            name="password"
            id="password"
          />
          {formik?.errors?.password && formik?.touched?.password ? (
            <div className="alert alert-danger">{formik?.errors?.password}</div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">RePassword : </label>
          <input
            onBlur={formik.handleBlur}
            placeholder="Enter your repassword"
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik?.values?.rePassword}
            type="password"
            name="rePassword"
            id="rePassword"
          />
          {formik?.errors?.rePassword && formik?.touched?.rePassword ? (
            <div className="alert alert-danger">{formik?.errors?.rePassword}</div>
          ) : (
            ""
          )}

          <label htmlFor="phone">Phone : </label>
          <input
            onBlur={formik.handleBlur}
            placeholder="Enter your phone"
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="tel"
            name="phone"
            id="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : (
            ""
          )}

          <button
            disabled={!(formik.isValid && formik.dirty && !isloading)}
            type="submit"
            className="btn bg-main text-white"
          >
            {!isloading ? (
              "Register"
            ) : (
              <i className="fas fa-spinner fa-spin"></i>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
