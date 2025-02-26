import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import * as Yup from "yup";
import LeftImage from "../assets/Left-Image.png";
import LogoImage from "../assets/Logo.png";
import ResetVector from "../assets/Reset-Vector.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must include at least one symbol")
      .matches(/[0-9]/, "Must include at least one number")
      .matches(/[A-Z]/, "Must include at least one uppercase letter")
      .matches(/[a-z]/, "Must include at least one lowercase letter"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(
        { newPassword, confirmPassword },
        { abortEarly: false }
      );
      console.log("Form Submitted Successfully");
      navigate("/PasswordChanged");
    } catch (error) {
      const formattedErrors = {};
      error.inner.forEach((err) => {
        formattedErrors[err.path] = err.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="relative flex-1 flex justify-center items-center overflow-hidden min-h-[300px] bg-gray-100">
        <img
          src={LeftImage}
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        />
        <img
          src={LogoImage}
          alt="Logo"
          className="w-4/5 max-w-[300px] md:max-w-[500px] h-auto relative"
        />
      </div>

      <div className="flex-1 flex justify-center items-center bg-white p-5">
        <div className="w-full max-w-[400px] md:max-w-[500px] flex flex-col items-center gap-4 text-center">
          <img
            src={ResetVector}
            alt="Reset Password Vector"
            className="w-[200px] md:w-[300px] h-auto"
          />
          <h2 className="font-inter font-bold text-2xl md:text-3xl text-gray-800">
            Reset Password
          </h2>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col text-left relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
                className={`w-full h-[45px] px-3 pr-10 border ${
                  errors.newPassword ? "border-red-500" : "border-[#CBD5E1]"
                } rounded-md text-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 font-inter`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <HiEye size={22} /> : <HiEyeOff size={22} />}
              </button>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>
            <div className="flex flex-col text-left relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className={`w-full h-[45px] px-3 pr-10 border ${
                  errors.confirmPassword ? "border-red-500" : "border-[#CBD5E1]"
                } rounded-md text-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 font-inter`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <HiEye size={22} />
                ) : (
                  <HiEyeOff size={22} />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-blue-700 text-white text-lg font-bold rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-800 active:scale-95"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
