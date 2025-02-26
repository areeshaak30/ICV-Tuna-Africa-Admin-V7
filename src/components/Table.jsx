import React, { useEffect, useState } from "react";
import { table } from "../constants/dashboard";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import search from "../assets/search.png";
import Pagination from "./Pagination";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Table = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Ascending");
  const [currentPage, setCurrentPage] = useState(0);
  const [tableData, setTableData] = useState([]);
  const pageCount = 6;

  const handleSelectClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [selectedOption]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coll = collection(db, "offload");
        const document = await getDocs(coll);
        const data = document.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Data", data);
        setTableData(data);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-7">
      <div className="flex flex-col lg:flex-row justify-between mr-2">
        <div className="mb-4 lg:mb-0">
          <p className="font-bold text-[24px] leading-[29px] tracking-[-0.11px]">
            Today Entries
          </p>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="flex items-center w-full lg:w-[191px] h-[37px] shadow-md bg-white rounded-lg whitespace-nowrap mb-4 lg:mb-0">
            <p className="font-normal text-[14px] leading-[16px] pl-3">
              Sort By
            </p>
            <div className="h-[30px] border-l border-[#CBD5E1] mx-3"></div>
            <div className="relative" onClick={handleSelectClick}>
              <div className="flex justify-between items-center w-full px-3 py-2 cursor-pointer rounded-lg hover:text-white">
                <span className="text-[#1E293B] font-medium text-[14px]">
                  {selectedOption}
                </span>
                <div>
                  {isOpen ? (
                    <FiChevronUp className="w-4 h-4 text-[#1E293B]" />
                  ) : (
                    <FiChevronDown className="w-4 h-4 text-[#1E293B]" />
                  )}
                </div>
              </div>
              {isOpen && (
                <div className="absolute left-0 top-full w-[112px] bg-white shadow-md z-10 rounded-lg">
                  <div
                    className="p-2 text-[#1E293B] font-medium text-[14px] cursor-pointer hover:bg-[#0857A3] hover:text-white"
                    onClick={() => handleOptionClick("Ascending")}
                  >
                    Ascending
                  </div>
                  <div
                    className="p-2 text-[#1E293B] font-medium text-[14px] cursor-pointer hover:bg-[#0857A3] hover:text-white"
                    onClick={() => handleOptionClick("Descending")}
                  >
                    Descending
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="relative lg:ml-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full lg:w-[200px] shadow-md rounded-lg focus:outline-none py-2 pl-4 pr-10 text-[14px] text-[#1E293B] placeholder:text-[#1E293B]"
            />
            <img
              src={search}
              alt="Search"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            />
          </div>
        </div>
      </div>

      {/* table content */}
      <div className="mt-4 overflow-x-auto">
        <div className="overflow-y-auto">
          <table className="bg-white shadow-sm w-full">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]">
                  No
                </th>
                <th className="font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]">
                  User Name
                </th>
                <th className="font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]">
                  Vessel Name
                </th>
                <th className="font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]">
                  Offload Date
                </th>
                <th className="font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]">
                  Market Type
                </th>
                <th className="font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]">
                  L.F
                </th>
                <th className="font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]">
                  Weight
                </th>
                <th className="font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]">
                  B.E
                </th>
                <th className="font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]">
                  Weight
                </th>
                {/* <th className='font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>Y.F</th>
                                <th className='font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>Weight</th>
                                <th className='font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>SB.F</th>
                                <th className='font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>Weight</th>
                                <th className='font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>T.Count</th>
                                <th className='font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>T.Weight</th>
                                <th className='font-[500] text-[14px] leading-[22px] py-2 text-[#1E293B] border-b border-[#CBD5E1]'>Download</th> */}
              </tr>
            </thead>
            <tbody>
              {tableData
                .slice(currentPage * pageCount, (currentPage + 1) * pageCount)
                .map((row, index) => (
                  <tr key={row.id}>
                    <td className="text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]">
                      {index + 1 + currentPage * pageCount}
                    </td>
                    <td className="text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]">
                      {row.userId}
                    </td>
                    <td className="text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]">
                      {row.vesselName}
                    </td>
                    <td className="text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]">
                      {row.offloadDate}
                    </td>
                    <td className="text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]">
                      {row.totalCount}
                    </td>
                    <td className="text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]">
                      {row.totalWeight}
                    </td>
                    <td className="text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]">
                      {row.truck}
                    </td>
                    <td className="text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]">
                      {row.strop}
                    </td>
                    <td className="text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]">
                      {row.sailingDate}
                    </td>
                    {/* <td className='text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]'>{row.YellowFin}</td>
                                    <td className='text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]'>{row.SBlueFin}</td>
                                    <td className='text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]'>{row.TWeight}</td>
                                    <td className='text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]'>{row.TCount}</td>
                                    <td className='text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]'>{row.TWeight}</td>
                                    <td className='text-center p-2 font-[400] text-[13px] leading-[22px] text-[#475569] border-r border-[#CBD5E1]'>{row.TWeight}</td> */}
                    {/* <td className='text-center p-2'>
                                        <img src={row.DetailedView} alt="" className='w-6 h-6 mx-auto' />
                                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default Table;
