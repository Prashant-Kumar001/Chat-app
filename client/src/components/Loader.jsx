import React from "react";

const Loader = () => {
  return (
    <div className="container h-screen  mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[30%,45%,1fr] ">
      {/* Middle Content Skeleton */}
      <div className="grid grid-rows-10 gap-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-8 md:h-10 bg-gray-300 rounded-md animate-pulse"
          ></div>
        ))}
      </div>
      {/* Left Panel Skeleton */}
      <div className="w-full h-[200px] md:h-full bg-gray-300 rounded-lg animate-pulse"></div>


      {/* Right Panel Skeleton */}
      <div className="w-full h-[200px] md:h-full bg-gray-300 rounded-lg animate-pulse"></div>
    </div>
  );
};

export default Loader;
