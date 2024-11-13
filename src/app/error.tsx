"use client";

import { Button } from "@/components/uiComponents/Button/ButtonCom";
import { Icon } from "@/components/uiComponents/IconComponents/Icon";
import Text from "@/components/uiComponents/TextComponents/Text";
import { useRouter } from "next/navigation";
import React from "react";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="mt-[292px] flex flex-col justify-center items-center text-center">
        <div className="flex  mb-[20px]">


          
          <div className="w-[90px] h-[90px] -scale-y-100 " >
            <Icon name="whiteEgg" />
          </div>
          <div className="w-[90px] h-[90px]  ">
            <Icon name="yellowEgg" />
          </div>
        </div>

        <Text variant="header-20" className="w-46 text-center text-gray-500">
          에러에러
        </Text>
      </div>

      <div className="fixed bottom-[35px] flex w-full justify-center">
        <Button borderType="circle" colorType="orange" onClick={() => router.push("/")} className="w-[358px]">
          모임 둘러보기
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
