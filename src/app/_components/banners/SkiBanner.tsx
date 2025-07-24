import Image from "next/image";
import banner3 from "@/public/asset/Banner/banner3.jpg";

interface BannerProps {
  isLargeScreen: boolean;
}

export default function SkiBanner({ isLargeScreen }: BannerProps) {
  return (
    <div className="flex mx-4 justify-center items-center">
      <div
        className={`w-full max-w-[984px] justify-center flex flex-shrink-0 overflow-hidden mt-[64px] mx-4 relative ${
          isLargeScreen ? "h-[473px]" : "h-[300px]"
        }`}
      >
        <Image
          src={banner3}
          alt="Frame 2307"
          className="object-cover rounded-[12px]"
          width={984}
          height={isLargeScreen ? 473 : 300}
          placeholder="blur"
        />
      </div>
    </div>
  );
}
