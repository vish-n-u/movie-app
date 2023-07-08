import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./j.css";

const Pagination = ({ pageNumber, setPageNumber, totalResults }) => {
  // useEffect(() => {
  //   const endOffset = itemOffset + itemsPerPage;
  //   setCurrentItems(items.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(items.length / itemsPerPage));
  // }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    console.log(event.selected + 1);
    setPageNumber(event.selected + 1);
  };
  return (
    <div
      className="m-5 p-5 border border-gray-400  text-white "
      style={{ borderRadius: "8px" }}
    >
      <ReactPaginate
        nextLabel="next >"
        previousLabel="<  previous"
        pageCount={Math.ceil((totalResults - 20) / 20) + 1}
        onPageChange={handlePageClick}
        containerClassName=" flex justify-center mt-4"
        pageClassName="text-black m-1"
        pageLinkClassName="page-link bg-white px-3 py-2 border border-gray-300 rounded  cursor-pointer"
        previousClassName="text-black m-1"
        previousLinkClassName=" px-3 py-2 border border-gray-300 rounded bg-white cursor-pointer"
        nextClassName="text-black m-1"
        nextLinkClassName=" px-3 py-2 border border-gray-300 rounded bg-white cursor-pointer"
        activeClassName="active"
      />
    </div>
  );
};

export default Pagination;

// Add a <div id="container"> to your HTML to see the componend rendered.
