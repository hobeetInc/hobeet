"use client";

import useScreenSizeStore from "@/store/useScreenSizeStore";
import Image from "next/image";

const EggPopImage = ({ clubInfo }) => {
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  return (
    <div
      className={`flex overflow-hidden  relative mb-6 ${
        isLargeScreen ? "w-[1024px] h-[405px] bg-white" : "mt-12 w-[390px] h-[332px] bg-gray-100 "
      }`}
    >
      <Image
        src={clubInfo.egg_pop_image}
        alt={clubInfo.egg_pop_name}
        width={isLargeScreen ? 1024 : 390}
        height={isLargeScreen ? 405 : 332}
        sizes={isLargeScreen ? "1024px" : "390px"}
        className={`${isLargeScreen ? "w-[1024px] h-[405px] object-fill" : "w-[390px] h-[332px]"} object-cover`}
        priority
      />
    </div>
  );
};

export default EggPopImage;
