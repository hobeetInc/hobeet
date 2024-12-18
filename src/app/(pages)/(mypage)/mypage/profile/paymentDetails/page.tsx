"use client";

import React, { useState } from "react";

import TabBar from "@/components/ui/molecules/navigation/TapBar";
import Link from "next/link";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Text from "@/components/ui/atoms/text/Text";
import EggPopPayDetail from "../../../_components/eggPopPayDetail";
import EggDayPayDetail from "../../../_components/eggDayPayDetail";
import useScreenSizeStore from "@/store/useScreenSizeStore";

const PaymentHistory = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  return (
    <div>
      <div className="fixed top-0 right-0 left-0 flex w-full h-12 bg-white items-center lg:static lg:mt-10">
        {isLargeScreen ? (
          ""
        ) : (
          <div className="left-0 m-3">
            <Link href="/mypage/profile">
              <HiOutlineChevronLeft className="w-6 h-6" />
            </Link>
          </div>
        )}

        <div className="flex flex-grow justify-center lg:justify-start lg:p-5">
          <Text variant={isLargeScreen ? "header-20" : "header-16"} className="text-gray-900">
            내 결제 내역
          </Text>
        </div>
      </div>
      <div className="lg:mt-5">
        <div className="bg-white">
          <TabBar value="payment" activeTab={selectedTab} onTabChange={setSelectedTab} />
        </div>
      </div>
      <div className="pt-[16px] lg:pt-9">{selectedTab ? <EggPopPayDetail /> : <EggDayPayDetail />}</div>
    </div>
  );
};

export default PaymentHistory;
