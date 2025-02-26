import React, { useState, useEffect } from "react";
import search from "../assets/search.png";
import { table } from "../constants/dashboard";
import Pagination from "./Pagination";
import { ThreeDots } from "react-loader-spinner";


const UserRecords = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = 10;
  const [isLoading, setIsLoading] = useState(true);


  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

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
    <div className="ml-[250px] max-w-full px-4 lg:px-4 xl:px-4">
      {/* heading */}
      <div className="flex justify-between pt-2">
        <h1 className="text-[#0857A3] font-bold text-[36px] leading-[43px] tracking-[-0.11px] font-inter">
          User
        </h1>
        <div className="relative mx-4">
          <input
            type="text"
            placeholder="Search"
            className="w-[200px] shadow-md rounded-lg focus:outline-none py-2 pl-4 pr-10 text-[14px] text-[#1E293B] placeholder:text-[#1E293B] font-inter"
          />
          <img
            src={search}
            alt="Search"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
          />
        </div>
      </div>
      <h3 className="text-[#1E293B] font-bold text-[24px] leading-[29px] tracking-[-0.11px] mt-1 font-inter">
        User Records
      </h3>

      {/* table */}
      <div className="mt-6 overflow-auto w-full">
        <table className="bg-white shadow-sm w-full">
          <thead>
            <tr>
              {[
                "No",
                "User Name",
                "Vessel Name",
                "Offload Date",
                "Market Type",
                "L.F",
                "Weight",
                "B.E",
                "Weight",
                "Y.F",
                "Weight",
                "SB.F",
                "Weight",
                "T.Count",
                "T.Weight",
                "Download",
              ].map((header, index) => (
                <th
                  key={index}
                  className="font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1] font-inter"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map((row) => (
              <tr key={row.no} className="text-center font-inter">
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">
                  {row.no}
                </td>
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">{row.username}</td>
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">{row.VesselName}</td>
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">{row.offloadDate}</td>
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">{row.MarketType}</td>
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">{row.LongFin}</td>
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">{row.TWeight}</td>
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">{row.BigEye}</td>
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">{row.TWeight}</td>
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">{row.YellowFin}</td>
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">{row.SBlueFin}</td>
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">{row.TWeight}</td>
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">{row.TCount}</td>
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">{row.TWeight}</td>
                <td className="p-2 text-[13px] text-[#475569] border-r border-[#CBD5E1]">{row.TWeight}</td>
                <td className="p-2">
                  <img
                    src={row.DetailedView}
                    alt=""
                    className="w-6 h-6 mx-auto"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      </div>

    </div>
  );
};

export default UserRecords;
