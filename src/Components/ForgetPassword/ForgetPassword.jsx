import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [flagData, setFlagData] = useState(false);
  const [errMsg, setMsg] = useState("");

  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
  });
  async function forgotPassword(value) {
    
    setisloading(true);
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      value
    );
    setisloading(false);
    if (data.statusMsg === "success") {
      setFlagData(true);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      forgotPassword(values);
    },
  });

  async function resetPassword(value) {
    setisloading(true);
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        value
      )
      .catch((err) => {
        setisloading(false);
        setMsg(err.response.data.message);
      });
    if (data.status === "Success") {
      navigate("/reset-password");
    }
  }
  let formik2 = useFormik({
    initialValues: {
      resetCode: "",
    },

    onSubmit: (values) => {
      resetPassword(values);
    },
  });
  return (
    <>
      <Helmet>
        <title>Forgot-Password</title>
      </Helmet>
      <div className="w-75 mx-auto py-4 my-5">
        {flagData ? (
          <form onSubmit={formik2.handleSubmit}>
            <p>Enter the code that was sent to your email..</p>
            <label htmlFor="resetCode">ResetCode : </label>
            <input
              onBlur={formik2.handleBlur}
              placeholder="Enter verification code"
              className="form-control mb-2"
              onChange={formik2.handleChange}
              value={formik2.values.resetCode}
              type="text"
              name="resetCode"
              id="resetCode"
            />
            {formik2.errors.resetCode && formik2.touched.resetCode ? (
              <div className="alert alert-danger">
                {formik2.errors.resetCode}
              </div>
            ) : (
              ""
            )}
            {errMsg ? <div className="alert alert-danger">{errMsg}</div> : null}
            <button
              disabled={!(formik2.isValid && formik2.dirty && !isloading)}
              type="submit"
              className="btn bg-main text-white"
            >
              {!isloading ? (
                "Verify Code"
              ) : (
                <i className="fas fa-spinner fa-spin"></i>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <p>
              Please enter your email address. you will receive a verification
              code..
            </p>
            <label htmlFor="email">Email : </label>
            <input
              onBlur={formik.handleBlur}
              placeholder="Enter email"
              className="form-control mb-2"
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : (
              ""
            )}
            <button
              disabled={!(formik.isValid && formik.dirty && !isloading)}
              type="submit"
              className="btn bg-main text-white"
            >
              {!isloading ? "Send" : <i className="fas fa-spinner fa-spin"></i>}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
