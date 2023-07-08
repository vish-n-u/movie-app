import React from "react";

const ShimmerHomePage = () => {
  const arr = new Array(20).fill(1);
  return (
    <div className="flex flex-wrap justify-center mt-10">
      {arr.map((x,index) => (
        <div
          key={index}
          className=" w-56  rounded-md flex flex-col  m-2"
        >
          
            <div
              className="h-80 w-full rounded-md bg-slate-500 animate-pulse"
              
            ></div>
            <h1 className="w-full bg-slate-500"></h1>
            
          
        </div>
      ))}
    </div>
  );
};

export default ShimmerHomePage;
