"use client";
import Text from "@/components/ui/atoms/text/Text";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-spin">
        <Image src="/asset/Icon/LoadingIcon.svg" alt="loading" width={195} height={195} />
      </div>
      <Text variant="subtitle-16" className="text-gray-100 mt-4">
        로딩중
      </Text>
    </div>
  );
};

export default Loading;
