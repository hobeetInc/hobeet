import Image from "next/image";
import banner1 from "@/public/asset/Banner/banner1.jpg";
import Text from "@/components/ui/atoms/text/Text";

interface BannerProps {
  isLargeScreen: boolean;
}

export default function ChristmasBanner({ isLargeScreen }: BannerProps) {
  return (
    <div className="flex mx-4 justify-center items-center mt-2">
      <div
        className={`relative w-full max-w-[984px] flex-shrink-0 rounded-[12px] bg-[#d9d9d9] overflow-hidden ${
          isLargeScreen ? "h-[436px]" : "h-[300px]"
        }`}
      >
        <Image
          src={banner1}
          alt="MainBigBanner"
          //   className="object-cover"
          priority
          loading="eager"
          fetchPriority="high"
          sizes="984px"
          fill
          placeholder="blur"
        />
        <Text
          variant="subtitle-18"
          className="absolute inset-0 flex justify-start items-center mt-[40px] ml-[14px] mb-9 text-white"
        >
          Christmas Party 🎄
        </Text>
        <Text
          variant="body-16"
          className="absolute inset-0 flex justify-start items-center mt-[113px] ml-[14px] mb-8 text-white"
        >
          다가오는 크리스마스 어떻게 보내시나요?
          <br />
          우리 다 같이 특별한 추억 만들어요!
        </Text>
      </div>
    </div>
  );
}
