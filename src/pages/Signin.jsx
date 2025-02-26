import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";
import LeftImage from "../assets/Left-Image.png";
import LogoImage from "../assets/Logo.png";
import LoginVector from "../assets/Logo-Vector.png";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase/firebase'

export default function Signin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async(values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password)
        navigate("/dashboard");
      } catch (error) {
        console.error("Login error:", error);
        setErrors({ password: "Invalid credentials. Please try again." });
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full overflow-hidden font-inter">
      <div className="relative flex-1 flex justify-center items-center overflow-hidden">
        <img
          src={LeftImage}
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        />
        <img
          src={LogoImage}
          alt="Logo"
          className="absolute w-4/5 max-w-[400px] md:max-w-[500px] h-auto top-1/2 transform -translate-y-1/2"
        />
      </div>

      <div className="flex-1 flex justify-center items-center bg-white px-6">
        <div className="w-full max-w-[400px] flex flex-col items-center text-center">
          <img
            src={LoginVector}
            alt="Login Vector"
            className="w-[200px] md:w-[250px] h-auto mb-2"
          />

          <h2 className="font-bold text-2xl text-[#1E293B] mb-4">LOGIN</h2>

          <form
            className="w-full flex flex-col gap-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col text-left">
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter E-mail"
                className={`w-full h-[45px] px-3 border rounded-md text-lg outline-none font-inter ${formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-[#CBD5E1] focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
                  }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div className="flex flex-col text-left relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Password"
                className={`w-full h-[45px] px-3 pr-10 border rounded-md text-lg outline-none font-inter ${formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-[#CBD5E1] focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
                  }`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <HiEye size={22} /> : <HiEyeOff size={22} />}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            <div className="w-full flex justify-end">
              <Link
                to="/ForgotPassword"
                className="text-[#0857A3] text-sm underline font-inter"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full h-[45px] bg-[#0857A3] text-white text-lg font-bold rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-800 active:scale-95 mt-0 font-inter flex items-center justify-center ${formik.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}