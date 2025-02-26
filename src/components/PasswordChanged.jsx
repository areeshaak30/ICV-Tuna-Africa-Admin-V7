import React from "react";
import { useNavigate } from "react-router-dom";
import LeftImage from "../assets/Left-Image.png";
import LogoImage from "../assets/Logo.png";
import SuccessVector from "../assets/Success-Vector.png";

export default function PasswordChanged() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="relative flex-1 flex justify-center items-center overflow-hidden min-h-[300px]">
        <img
          src={LeftImage}
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        />
        <img
          src={LogoImage}
          alt="Logo"
          className="absolute w-4/5 max-w-[400px] md:max-w-[615px] h-auto top-1/2 transform -translate-y-1/2"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center bg-white p-5">
        <div className="w-full max-w-[450px] flex flex-col items-center gap-6">
          <img
            src={SuccessVector}
            alt="Success"
            className="w-full max-w-[300px] h-auto"
          />
          <h2 className="font-inter font-semibold text-2xl text-[#1E293B] text-center">
            Password Changed Successfully
          </h2>
          <button
            onClick={() => navigate("/")}
            className="w-full max-w-[300px] h-[45px] bg-[#0857A3] text-white text-lg font-bold rounded-lg p-2 cursor-pointer transition-all duration-300 hover:bg-blue-800 active:scale-95"
          >
            Back To Login
          </button>
        </div>
      </div>
    </div>
  );
}
