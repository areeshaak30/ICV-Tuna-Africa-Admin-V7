import React, { useEffect, useState } from "react";
import { cards, table } from "../constants/dashboard";
import Table from "./Table";
import { ThreeDots } from "react-loader-spinner";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Ascending");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsOpen(false);
  }, [selectedOption]);

  useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, []);
  
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <ThreeDots
            height="80"
            width="80"
            color="#0857A3"
            ariaLabel="loading"
          />
        </div>
      );
    }

  return (
    <div className="mt-3 px-4 pr-8 max-w-full ml-[250px] font-inter">
      {/* Heading */}
      <div>
        <h1 className="text-[#0857A3] font-bold text-[28px] sm:text-[36px] lg:text-[40px] leading-[33px] sm:leading-[43px] tracking-[-0.11px] font-inter">
          Dashboard
        </h1>
        <h3 className="text-[#1E293B] font-bold text-[20px] sm:text-[24px] lg:text-[28px] leading-[25px] sm:leading-[29px] mt-1 font-inter">
          Today Count
        </h3>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-3 mt-6">
        {cards.map((item, index) => (
          <div
            key={index}
            className="h-[114px] shadow-md rounded-lg bg-white p-3 font-inter"
          >
            <div className="flex justify-between items-center">
              <div className="min-w-[100px]"> 
                <p className="font-medium text-[14px] sm:text-[16px] lg:text-[18px] text-[#1E293B]">
                  {item.titile}
                </p>
                <p className="font-semibold text-[24px] sm:text-[28px] lg:text-[32px] tracking-[1px] text-[#1E293B]">
                  {item.number}
                </p>
              </div>
              <img
                src={item.icon}
                alt="Icon"
                className="w-[50px] sm:w-[81px] lg:w-[70px] h-[50px] sm:h-[81px] lg:h-[90px]"
              />
            </div>
          </div>
        ))}
      </div>


      {/* Second Cards */}
      <div className="flex flex-wrap gap-4 mt-4">
        {["4233", "45326KG"].map((value, index) => (
          <div
            key={index}
            className="flex-1 min-w-[220px] max-w-[300px] h-[54px] bg-white flex justify-between items-center shadow-md rounded-lg p-3 font-inter"
          >
            <p className="font-semibold text-[14px] sm:text-[16px] lg:text-[18px] text-[#1E293B] font-inter">
              Total Count
            </p>
            <p className="font-bold text-[18px] sm:text-[22px] lg:text-[24px] text-[#475569] font-inter">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="mt-4 w-full font-inter">
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
