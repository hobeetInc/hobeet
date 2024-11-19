"use client";

import React, { useState } from "react";

import TabBar from "@/components/uiComponents/TapBar";
import Link from "next/link";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Text from "@/components/uiComponents/TextComponents/Text";
import EggPopPayDetail from "../../../_components/eggPopPayDetail";
import EggDayPayDetail from "../../../_components/eggDayPayDetail";

const PaymentHistory = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(true);

  return (
    <div>
      <div className="fixed top-0 right-0 left-0 flex w-full h-12 bg-white items-center">
        <div className="left-0 m-3">
          <Link href="/mypage/profile">
            <HiOutlineChevronLeft className="w-6 h-6" />
          </Link>
        </div>
        <div className="flex flex-grow justify-center">
          <Text variant="header-16" className="text-gray-900">
            내 결제 내역
          </Text>
        </div>
        <div className="w-6 m-3"></div>
      </div>
      <div className="w-full fixed top-12 right-0 left-0">
        <TabBar value="payment" activeTab={selectedTab} onTabChange={setSelectedTab} />
      </div>
      <div className="mt-[60px]">{selectedTab ? <EggPopPayDetail /> : <EggDayPayDetail />}</div>
    </div>
  );
};

export default PaymentHistory;
