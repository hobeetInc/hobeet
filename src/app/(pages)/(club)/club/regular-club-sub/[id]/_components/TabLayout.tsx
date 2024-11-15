"use client";

import ApproveMemberTabBar from "@/components/uiComponents/ApproveMemberTapBar";
import { TabLayoutProps } from "@/types/안끝난거/eggclub.types";
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
