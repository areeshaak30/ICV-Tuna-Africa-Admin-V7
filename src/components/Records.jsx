import React, { useEffect, useState } from 'react'
import search from '../assets/search.png'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { table } from '../constants/dashboard'
import FilterComponent from './FilterComponent';
import Pagination from './Pagination';
import { ThreeDots } from "react-loader-spinner";


const Records = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Ascending');
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = 10;
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="p-4 ml-[250px]">
      {/* heading */}
      <div className="flex flex-wrap justify-between items-center">
        <h1 className='text-[#0857A3] font-bold text-[28px] md:text-[36px] leading-[43px] tracking-[-0.11px]'>Records</h1>
        {/* filter */}
        <div className="flex flex-wrap gap-4 mt-2">
          <div className="flex items-center w-full sm:w-[191px] h-[37px] shadow-md bg-white rounded-lg whitespace-nowrap">
            <p className='font-normal text-[14px] leading-[16px] pl-3'>Sort By</p>
            <div className="h-[30px] border-l border-[#CBD5E1] mx-3"></div>
            <div className='relative' onClick={handleSelectClick}>
              <div className="flex justify-between items-center w-full px-3 py-2 cursor-pointer rounded-lg hover:text-white">
                <span className="text-[#1E293B] font-medium text-[14px]">{selectedOption}</span>
                <div>
                  {isOpen ? (
                    <FiChevronUp className="w-4 h-4 text-[#1E293B]" />
                  ) : (
                    <FiChevronDown className="w-4 h-4 text-[#1E293B]" />
                  )}
                </div>
              </div>
              {isOpen && (
                <div className="absolute left-0 top-full w-[112px] bg-white shadow-md rounded-lg z-10">
                  <div
                    className="p-2 text-[#1E293B] font-medium text-[14px] cursor-pointer hover:bg-[#0857A3] hover:text-white"
                    onClick={() => handleOptionClick('Ascending')}
                  >
                    Ascending
                  </div>
                  <div
                    className="p-2 text-[#1E293B] font-medium text-[14px] cursor-pointer hover:bg-[#0857A3] hover:text-white"
                    onClick={() => handleOptionClick('Descending')}
                  >
                    Descending
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="relative w-full sm:w-[200px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full shadow-md rounded-lg focus:outline-none py-2 pl-4 pr-10 text-[14px] text-[#1E293B] placeholder:text-[#1E293B]"
            />
            <img
              src={search}
              alt="Search"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            />
          </div>
        </div>
      </div>

      {/* subheading */}
      <h3 className='text-[#1E293B] font-bold text-[20px] md:text-[24px] leading-[29px] tracking-[-0.11px] mt-1'>Records</h3>

      {/* filter */}
      <FilterComponent />

      {/* table */}
      <div className="mt-4 overflow-x-auto">
        <table className='min-w-full bg-white shadow-sm'>
          <thead>
            <tr>
              <th className='font-[500] text-[12px] md:text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>No</th>
              <th className='font-[500] text-[12px] md:text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>User Name</th>
              <th className='font-[500] text-[12px] md:text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>Vessel Name</th>
              <th className='font-[500] text-[12px] md:text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>Offload Date</th>
              <th className='font-[500] text-[12px] md:text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>Market Type</th>
              <th className='font-[500] text-[12px] md:text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>L.F</th>
              <th className='font-[500] text-[12px] md:text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>Weight</th>
              <th className='font-[500] text-[12px] md:text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>B.E</th>
              <th className='font-[500] text-[12px] md:text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>Weight</th>
              <th className='font-[500] text-[12px] md:text-[14px] leading-[22px] py-2 text-[#1E293B] border-r border-b border-[#CBD5E1]'>T.Count</th>
              <th className='font-[500] text-[12px] md:text-[14px] leading-[22px] py-2 text-[#1E293B] border-b border-[#CBD5E1]'>Download</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row) => (
              <tr key={row.no}>
                <td className='text-center p-2 text-[12px] md:text-[13px] text-[#475569] border-r border-[#CBD5E1]'>{row.no}</td>
                <td className='text-center p-2 text-[12px] md:text-[13px] text-[#475569] border-r border-[#CBD5E1]'>{row.username}</td>
                <td className='text-center p-2 text-[12px] md:text-[13px] text-[#475569] border-r border-[#CBD5E1]'>{row.VesselName}</td>
                <td className='text-center p-2 text-[12px] md:text-[13px] text-[#475569] border-r border-[#CBD5E1]'>{row.offloadDate}</td>
                <td className='text-center p-2 text-[12px] md:text-[13px] text-[#475569] border-r border-[#CBD5E1]'>{row.MarketType}</td>
                <td className='text-center p-2 text-[12px] md:text-[13px] text-[#475569] border-r border-[#CBD5E1]'>{row.LongFin}</td>
                <td className='text-center p-2 text-[12px] md:text-[13px] text-[#475569] border-r border-[#CBD5E1]'>{row.TWeight}</td>
                <td className='text-center p-2 text-[12px] md:text-[13px] text-[#475569] border-r border-[#CBD5E1]'>{row.BigEye}</td>
                <td className='text-center p-2 text-[12px] md:text-[13px] text-[#475569] border-r border-[#CBD5E1]'>{row.TWeight}</td>
                <td className='text-center p-2 text-[12px] md:text-[13px] text-[#475569] border-r border-[#CBD5E1]'>{row.TCount}</td>
                <td className='text-center p-2'>
                  <img src={row.DetailedView} alt="" className='w-6 h-6 mx-auto' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
    </div>

  )
}
export default Records
