"use client";
import ApproveMemberTabBar from "@/components/uiComponents/molecules/navigation/ApproveMemberTapBar";
import { ReactNode, useState } from "react";

interface TabLayoutProps {
  children: [ReactNode, ReactNode];
}

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
