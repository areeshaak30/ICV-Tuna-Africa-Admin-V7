import React, { useState } from "react";
import filter from "../assets/filter.png";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import DatePicker from "react-datepicker";
import reset from "../assets/reset.png";
import "react-datepicker/dist/react-datepicker.css";

const FilterComponent = () => {
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isBoatOpen, setIsBoatOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Market Type");
  const [tempSelectedOption, setTempSelectedOption] = useState(null);
  const [selectedBoat, setSelectedBoat] = useState("Boat Type");
  const [tempSelectedBoat, setTempSelectedBoat] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleMarketClick = () => {
    setIsMarketOpen((prev) => !prev);
    setIsDateOpen(false);
    setIsBoatOpen(false);
  };

  const handleDateClick = () => {
    setIsDateOpen((prev) => !prev);
    setIsMarketOpen(false);
    setIsBoatOpen(false);
  };

  const handleBoatClick = () => {
    setIsBoatOpen((prev) => !prev);
    setIsMarketOpen(false);
    setIsDateOpen(false);
  };

  const handleOptionClick = (option) => {
    setTempSelectedOption(option);
  };

  const handleBoatSelection = (boat) => {
    setTempSelectedBoat(boat);
  };

  const applyBoatSelection = () => {
    if (tempSelectedBoat) {
      setSelectedBoat(tempSelectedBoat);
    }
    setIsBoatOpen(false);
  };

  const applyMarketSelection = () => {
    if (tempSelectedOption) {
      setSelectedOption(tempSelectedOption);
    }
    setIsMarketOpen(false);
  };

  const formatDate = (date) => {
    if (!date) return "Date";
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      })
      .toUpperCase();
  };

  const resetFilters = () => {
    setSelectedOption("Market Type");
    setTempSelectedOption(null);
    setSelectedBoat("Boat Type");
    setTempSelectedBoat(null);
    setSelectedDate(null);
    setIsMarketOpen(false);
    setIsDateOpen(false);
    setIsBoatOpen(false);
  };

  return (
    <div className="flex mt-4 font-inter">
      <div className="flex items-center w-[630px] h-[50px] shadow-md bg-white rounded-lg whitespace-nowrap p-3">
        <img src={filter} alt="Filter" className="w-5 h-5" />
        <div className="h-[30px] border-l border-[#CBD5E1] mx-3"></div>
        <p className="font-medium text-[14px] leading-[16px]">Filter By</p>
        <div className="h-[30px] border-l border-[#CBD5E1] mx-2"></div>

        {/* Date Picker */}
        <div className="relative">
          <div
            className="flex justify-between items-center px-3 py-2 cursor-pointer rounded-lg"
            onClick={handleDateClick}
          >
            <span className="font-medium text-[14px] font-inter">
              {formatDate(selectedDate)}
            </span>
            {isDateOpen ? (
              <FiChevronUp className="w-4 h-4 text-[#1E293B]" />
            ) : (
              <FiChevronDown className="w-4 h-4 text-[#1E293B]" />
            )}
          </div>

          {isDateOpen && (
            <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-3 z-20 w-64">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setIsDateOpen(false);
                }}
                inline
                className="border-none shadow-none"
              />

              {/* calender footer */}
              <div className="mt-1 text-center">
                <p className="font-[300] pb-2 text-start text-[14px] leading-4 ">
                  *You can choose multiple dates
                </p>
                <button
                  className="w-[129px] h-[34px] text-[12px] leading-3 bg-[#233B77] text-white rounded-lg"
                  onClick={() => setIsDateOpen(false)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="h-[30px] border-l border-[#CBD5E1] mx-3"></div>

        {/* Market Type Dropdown */}
        <div className="relative">
          <div
            className="flex justify-between items-center px-3 py-2 cursor-pointer rounded-lg"
            onClick={handleMarketClick}
          >
            <span className="text-[#1E293B] font-medium text-[14px] font-inter">
              {selectedOption}
            </span>
            {isMarketOpen ? (
              <FiChevronUp className="w-4 h-4 text-[#1E293B]" />
            ) : (
              <FiChevronDown className="w-4 h-4 text-[#1E293B]" />
            )}
          </div>
          {isMarketOpen && (
            <div className="absolute left-0 mt-2 w-[400px] h-[170px] bg-white shadow-md rounded-lg p-2 z-10">
              <h1 className="text-[18px] font-bold leading-5 text-[#1E293B] p-2 ">
                Select Market Type
              </h1>
              <div className="flex gap-2 ml-3 mt-3">
                <button
                  onClick={() => handleOptionClick("Domestic")}
                  className={`w-[120px] h-[33px] text-center rounded-[17px] ${
                    tempSelectedOption === "Domestic"
                      ? "bg-[#0857A3] text-white"
                      : "border border-[#0857A3] text-white bg-[#0857A3] hover:bg-white hover:text-[#0857A3]"
                  }`}
                >
                  Domestic
                </button>
                <button
                  onClick={() => handleOptionClick("Export")}
                  className={`w-[120px] h-[33px] text-center rounded-[17px] ${
                    tempSelectedOption === "Export"
                      ? "bg-[#0857A3] text-white"
                      : "border border-[#0857A3] text-[#0857A3] hover:bg-[#0857A3] hover:text-white"
                  }`}
                >
                  Export
                </button>
              </div>
              <hr className="mt-2" />
              <button
                onClick={applyMarketSelection}
                className="w-[135px] h-[33px] mt-6 ml-28 text-center text-white bg-[#0857A3] rounded-md"
              >
                Apply Now
              </button>
            </div>
          )}
        </div>

        <div className="h-[30px] border-l border-[#CBD5E1] mx-3"></div>
        {/* Boat Type Dropdown */}
        <div className="relative">
          <div
            className="flex justify-between items-center px-3 py-2 cursor-pointer rounded-lg"
            onClick={handleBoatClick}
          >
            <span className="text-[#1E293B] font-medium text-[14px] font-inter">
              {selectedBoat}
            </span>
            {isBoatOpen ? (
              <FiChevronUp className="w-4 h-4 text-[#1E293B]" />
            ) : (
              <FiChevronDown className="w-4 h-4 text-[#1E293B]" />
            )}
          </div>

          {isBoatOpen && (
            <div className="absolute left-0 mt-2 w-[460px] h-[294px] bg-white shadow-md rounded-lg p-2 z-10">
              <h1 className="text-[18px] font-bold leading-5 text-[#1E293B] p-2 ">
                Select Boat Name
              </h1>
              <div className="flex flex-wrap gap-2 ml-3 mt-3">
                {[
                  "Balaguru",
                  "Ocean Star",
                  "Blue Horizon",
                  "Sea Flacon",
                  "Golden Wave",
                  "Marine Spirit",
                  "Strom Rider",
                  "Aqua Voyager",
                  "Neptune Pearl",
                ].map((boat) => (
                  <button
                    key={boat}
                    onClick={() => handleBoatSelection(boat)}
                    className={`px-4 py-2 rounded-full ${
                      tempSelectedBoat === boat
                        ? "bg-[#0857A3] text-white"
                        : "border border-[#1E293B] text-black"
                    }`}
                  >
                    {boat}
                  </button>
                ))}
              </div>
              <hr className="my-3" />
              <button
                onClick={applyBoatSelection}
                className="w-[128px] h-[33px] mt-6 ml-[35%] text-center text-white bg-[#0857A3] rounded-md"
              >
                Apply Now
              </button>
            </div>
          )}
        </div>
        <div className="h-[30px] border-l border-[#CBD5E1] mx-3"></div>
        {/* reset filters */}
        <div className="flex">
          <button onClick={resetFilters} className="flex font-inter">
            <img src={reset} alt="Reset" className="w-4 h-4" />
            <p className="font-[600] text-[14px] leading-4 text-[#EA0234] ">
              Reset Filter
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default FilterComponent;