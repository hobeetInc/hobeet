"use client";

import { Button } from "@/components/ui/atoms/buttons/ButtonCom";
import { Icon } from "@/components/ui/atoms/icons/Icon";
import Text from "@/components/ui/atoms/text/Text";
import { useRouter } from "next/navigation";
import React from "react";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="mt-[30px] flex flex-col justify-center items-center text-center">
        <div className="flex mb-[20px]">
          <div className="w-[90px] h-[90px] -scale-y-100">
            <Icon name="whiteEgg" />
          </div>
          <div className="w-[90px] h-[90px]">
            <Icon name="yellowEgg" />
          </div>
        </div>

        <Text variant="header-20" className="w-46 text-center text-gray-500">
          에러에러
        </Text>
      </div>

      <div className="flex w-full justify-center mt-auto mb-[140px]">
        <Button borderType="circle" colorType="orange" onClick={() => router.push("/")} className="w-[358px]">
          모임 둘러보기
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
