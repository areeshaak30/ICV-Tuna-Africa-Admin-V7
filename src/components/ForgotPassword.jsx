import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftImage from "../assets/Left-Image.png";
import LogoImage from "../assets/Logo.png";
import ForgotVector from "../assets/Forgot-Vector.png";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase/firebase'

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [resendEnabled, setResendEnabled] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    let countdown;
    if (showOTP && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendEnabled(true);
    }

    return () => clearInterval(countdown);
  }, [showOTP, timer]);

  useEffect(() => {
    if (showOTP) {
      inputRefs.current[0]?.focus();
    }
  }, [showOTP]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    try {
      await sendPasswordResetEmail(auth, email)
      alert("Password reset email sent! Check your inbox.");
      setShowOTP(true);
      setTimer(30);
      setResendEnabled(false);
    } catch (error) {
      console.error("Error sending reset email:", error.message);
      alert("Failed to send reset email. Please check the email address and try again.");
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    if (otp.join("").length === 6) {
      navigate("/ResetPassword");
    }
  };

  const handleOTPChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendOTP = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimer(30);
    setResendEnabled(false);
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden font-inter">
      <div className="flex-1 h-full flex justify-center items-center relative">
        <img
          src={LeftImage}
          alt="Left Image"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        />
        <img
          src={LogoImage}
          alt="Logo Image"
          className="w-4/5 max-w-[615px] h-auto"
        />
      </div>

      <div className="flex-1 h-full flex justify-center items-center bg-white p-5">
        <div className="w-full max-w-[400px] flex flex-col items-center gap-2 text-center">
          <img
            src={ForgotVector}
            alt="Vector"
            className="w-[300px] h-[300px]"
          />
          <h2 className="font-inter font-[800] text-[30px] leading-[36px] tracking-[8%] text-[#1E293B]">
            FORGOT PASSWORD
          </h2>
          {!showOTP ? (
            <>
              <p className="text-[#1E293B] text-[15px] font-semibold leading-[18px] mb-5">
                Enter Your Registered E-mail Address
              </p>
              <form
                className="w-full flex flex-col gap-4"
                onSubmit={handleEmailSubmit}
              >
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your E-mail"
                  className="w-full h-[45px] px-3 border border-gray-300 rounded-md text-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 mb-3"
                  required
                />
                <button
                  type="submit"
                  className="w-full h-[45px] bg-blue-700 text-white text-lg font-bold rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-800"
                >
                  Next
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="text-[#1E293B] font-inter font-semibold text-[15px] leading-[18px] mb-1 text-center">
                Check your email. We've sent a code.
              </p>
              <form
                className="w-full flex flex-col gap-3"
                onSubmit={handleOTPSubmit}
              >
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 mt-3 text-center border border-green-500 rounded-md text-lg outline-none focus:border-green-600 focus:ring-2 focus:ring-green-300"
                    />
                  ))}
                </div>
                <div className="flex justify-center items-center gap-2 mt-1">
                  <span className="text-[#1E293B] text-[15px] text-center">
                    {resendEnabled ? (
                      <span
                        className="underline cursor-pointer"
                        onClick={handleResendOTP}
                      >
                        Resend OTP
                      </span>
                    ) : (
                      <>
                        <span className="text-gray-500 cursor-not-allowed">
                          Resend OTP
                        </span>{" "}
                        <span className="text-gray-500">0:{timer}s</span>
                      </>
                    )}
                  </span>
                </div>
                <button
                  type="submit"
                  className={`w-full h-[45px] text-white text-lg font-bold rounded-lg cursor-pointer transition-all duration-300 ${otp.join("").length === 6
                    ? "bg-blue-700 hover:bg-blue-800"
                    : "bg-gray-400 cursor-not-allowed"
                    }`}
                  disabled={otp.join("").length !== 6}
                >
                  Next
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
