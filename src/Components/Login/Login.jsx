import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Context/AuthStore";

export default function Login() {
  let {saveUserData}=useContext(AuthContext)
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false);

  const handelLogin = (values) =>{
    setisloading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((data) => {
        if (data.status == 200) {
          localStorage.setItem("userToken", data.data.token);
          saveUserData();
          setisloading(false);
          toast.success(data?.message || "success");
          navigate("/E-commerce-App");
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          setisloading(false);
          toast.error(error.response.data.message || "Network error");
        }
      });
  };
  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{6,10}$/,
        "password should start with uppercase and at least 6 characters & special character not allowed...."
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handelLogin,
  });
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-75 mx-auto py-4">
        <h3>Login Now : </h3>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email : </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.email}
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
          <div className="my-1">
            <Link to={"/forget-password"} className="text-main">
              Forgot Your Password ?
            </Link>
          </div>

          <button
            disabled={!(formik?.isValid && formik?.dirty && !isloading)}
            type="submit"
            className="btn bg-main text-white"
          >
            {!isloading ? "Login" : <i className="fas fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </>
  );
}
