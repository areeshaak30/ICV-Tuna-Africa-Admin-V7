import React from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6 mr-14 mb-2">
      <ReactPaginate
        previousLabel={
          <div className="flex items-center gap-2 px-6 py-2 bg-[#0857A3] text-white rounded-md text-sm font-inter font-medium">
            <FaChevronLeft className="w-[7.6px] h-[18px]" /> Prev
          </div>
        }
        nextLabel={
          <div className="flex items-center gap-2 px-6 py-2 bg-[#0857A3] text-white rounded-md text-sm font-inter font-medium">
            Next <FaChevronRight className="w-[7.6px] h-[18px]" />
          </div>
        }
        breakLabel={<span className="px-3">...</span>}
        pageCount={pageCount}
        marginPagesDisplayed={0}   
        pageRangeDisplayed={3}    
        onPageChange={onPageChange}
        containerClassName="flex items-center gap-[10px]"
        pageClassName="w-[27px] h-[27px] flex items-center justify-center rounded-full text-sm font-inter font-medium"
        pageLinkClassName="px-3 py-1 rounded-full transition-all duration-300"
        activeClassName="bg-[#0857A3] text-white"
        disabledClassName="opacity-30 cursor-not-allowed"
      />
    </div>
  );
};
export default Pagination;