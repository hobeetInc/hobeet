"use client";

import useScreenSizeStore from "@/store/useScreenSizeStore";
import Image from "next/image";

const EggPopImage = ({ clubInfo }) => {
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  return (
    <div
      className={`flex overflow-hidden w-[390px] h-[332px] relative bg-gray-100 mb-6 ${isLargeScreen ? "" : "mt-12"}`}
    >
      <Image
        src={clubInfo.egg_pop_image}
        alt={clubInfo.egg_pop_name}
        width={390}
        height={332}
        className="w-[390px] h-[332px] object-cover"
      />
    </div>
  );
};

export default EggPopImage;
