"use client";

import ApproveMemberTabBar from "@/components/uiComponents/ApproveMemberTapBar";
import { TabLayoutProps } from "@/types/eggclub.types";
import { useState } from "react";

const TabLayout = ({ children }: TabLayoutProps) => {
  const [activeTab, setActiveTab] = useState<boolean>(true);

  return (
    <>
      <ApproveMemberTabBar activeTab={activeTab} onTabChange={setActiveTab} value="eggday" />

      {activeTab ? children[0] : children[1]}
    </>
  );
};

export default TabLayout;
