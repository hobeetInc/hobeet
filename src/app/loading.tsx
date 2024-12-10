"use client";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin">
        <Image src="/asset/Icon/LoadingIcon.svg" alt="loading" width={195} height={195} />
      </div>
    </div>
  );
};

export default Loading;
