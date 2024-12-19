import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="mt-[32px] ml-[16px] h-6 w-32 bg-gray-200 rounded" />

      <div className="mt-4 flex gap-3 overflow-x-hidden px-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[120px] h-[120px] bg-gray-200 rounded-lg" />
        ))}
      </div>

      <div className="flex justify-between items-center mt-9 mx-4">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="w-6 h-6 bg-gray-200 rounded-full" />
      </div>
      <div className="mt-4 flex gap-3 overflow-x-hidden px-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[280px] h-[200px] bg-gray-200 rounded-lg" />
        ))}
      </div>

      <div className="mt-8 mx-4 h-[120px] bg-gray-200 rounded-lg" />

      <div className="flex justify-between items-center mt-16 mx-4">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="w-6 h-6 bg-gray-200 rounded-full" />
      </div>
      <div className="mt-4 flex gap-3 overflow-x-hidden px-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[280px] h-[200px] bg-gray-200 rounded-lg" />
        ))}
      </div>

      <div className="mt-8 mx-4 h-[120px] bg-gray-200 rounded-lg" />
      <div className="mt-5 mx-4">
        <div className="h-6 w-64 bg-gray-200 rounded" />
        <div className="mt-2 h-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
