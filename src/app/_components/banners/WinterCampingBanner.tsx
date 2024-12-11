import Image from "next/image";
import banner2 from "@/public/asset/Banner/banner2.jpg";
import Text from "@/components/ui/atoms/text/Text";

interface BannerProps {
  isLargeScreen: boolean;
}

export default function WinterCampingBanner({ isLargeScreen }: BannerProps) {
  return (
    <div className="relative flex justify-center mx-4 mt-16">
      <div className={`relative w-full max-w-[984px] mx-auto ${isLargeScreen ? "h-[473px]" : "h-[300px]"}`}>
        <Image
          src={banner2}
          alt="Rectangle 20"
          className="object-cover rounded-[12px]"
          sizes="984px"
          fill
          placeholder="blur"
        />
        <Text
          variant="subtitle-18"
          className="absolute inset-0 flex justify-start items-center mt-[40px] ml-[14px] mb-9 text-white"
        >
          Winter Camping🏕️
        </Text>
        <Text
          variant="body-16"
          className="absolute inset-0 flex justify-start items-center mt-[113px] ml-[14px] mb-8 text-white"
        >
          추운 겨울이 오고 있어요
          <br />
          함께 캠핑을 떠��보는 건 어때요?
        </Text>
      </div>
    </div>
  );
}
