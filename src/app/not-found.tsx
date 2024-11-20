"use client";

import { Button } from "@/components/uiComponents/atoms/buttons/ButtonCom";
import { Icon } from "@/components/uiComponents/atoms/icons/Icon";
import Text from "@/components/uiComponents/atoms/text/Text";
import { useRouter } from "next/navigation";
import React from "react";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="fixed top-[292px] flex flex-col justify-center items-center text-center right-0 left-0">
        <div className="flex items-center mb-[20px]">
          <div className="w-[90px] h-[90px] z-10">
            <Icon name="whiteEgg" />
          </div>
          <div className="w-[90px] h-[90px] -ml-2 ">
            <Icon name="yellowEgg" />
          </div>
        </div>

        <Text variant="header-20" className="w-46 text-center text-gray-500">
          두근두근
          <br />첫 모임을 기다리는 중!
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

export default NotFoundPage;
