"use client";

import { ReactNode, useState } from "react";

type TabLayoutProps = {
  children: [ReactNode, ReactNode];
};

const TabLayout = ({ children }: TabLayoutProps) => {
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <>
      <div className="flex border-b">
        <button
          className={`flex-1 py-4 text-center ${
            activeTab === "home" ? "border-b-2 border-black font-semibold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("home")}
        >
          홈
        </button>
        <button
          className={`flex-1 py-4 text-center ${
            activeTab === "eggday" ? "border-b-2 border-black font-semibold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("eggday")}
        >
          에그데이
        </button>
      </div>

      {activeTab === "home" ? children[0] : children[1]}
    </>
  );
};

export default TabLayout;
