import React from "react";

const ShimmerMoviePage = () => {
  return (
    <div className="flex ">
      <div className="w-64 h-80 bg-gray-600 animate-pulse"></div>
      <div className="flex flex-col mx-10">
        <h1 className="w-48  my-4 h-8 bg-gray-500 animate-pulse"></h1>
        <h1 className="w-40 my-4 h-8 bg-gray-500 animate-pulse"></h1>
        <h1 className="w-40 my-4 h-8 bg-gray-500 animate-pulse"></h1>
      </div>
    </div>
  );
};

export default ShimmerMoviePage;
