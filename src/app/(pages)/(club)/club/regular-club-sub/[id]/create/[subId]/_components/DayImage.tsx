"use client";
import Image from "next/image";
import useScreenSizeStore from "@/store/useScreenSizeStore";

interface DayImageProps {
  imageSrc: string;
  imageName: string;
}

const DayImage = ({ imageSrc, imageName }: DayImageProps) => {
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  return (
    <div
      className={`flex overflow-hidden relative ${
        isLargeScreen ? "w-[1024px] h-[405px] bg-white" : "w-[390px] h-[332px] bg-gray-100 mb-6 mt-12"
      }`}
    >
      <Image
        src={imageSrc}
        alt={imageName}
        width={isLargeScreen ? 1024 : 390}
        height={isLargeScreen ? 405 : 332}
        sizes={isLargeScreen ? "1024px" : "390px"}
        className={`${isLargeScreen ? "w-[1024px] h-[405px] object-fill" : "w-[390px] h-[332px]"} object-cover`}
      />
    </div>
  );
};

export default DayImage;
