"use client";

import React, { useState } from "react";
import EggPopPayDetail from "../../_components/eggPopPayDetail";
import EggDayPayDetail from "../../_components/eggDayPayDetail";

const PaymentHistory = () => {
  const [selectedTab, setSelectedTab] = useState<"eggpop" | "eggday">("eggpop");

  const handleTabClick = (tab: "eggpop" | "eggday") => {
    setSelectedTab(tab);
  };

  return (
    <div className="payment-history">
      <div className="flex justify-around border-b-2 border-gray-200">
        <button
          className={`flex-1 py-3 text-center font-medium ${
            selectedTab === "eggpop" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-gray-500"
          }`}
          onClick={() => handleTabClick("eggpop")}
        >
          에그팝
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium ${
            selectedTab === "eggday" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-gray-500"
          }`}
          onClick={() => handleTabClick("eggday")}
        >
          에그데이
        </button>
      </div>

      <div className="p-4 mt-4">{selectedTab === "eggpop" ? <EggPopPayDetail /> : <EggDayPayDetail />}</div>
    </div>
  );
};

export default PaymentHistory;
