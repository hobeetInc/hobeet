"use client";
import ApproveMemberTabBar from "@/components/uiComponents/molecules/navigation/ApproveMemberTapBar";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import { ReactNode, useState } from "react";
import FloatingButton from "../../../../../../_components/FloatingButton";

interface TabLayoutProps {
  children: [ReactNode, ReactNode];
}

const TabLayout = ({ children }: TabLayoutProps) => {
  const [activeTab, setActiveTab] = useState<boolean>(true);
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  return (
    <>
      <ApproveMemberTabBar activeTab={activeTab} onTabChange={setActiveTab} value="eggday" />
      {activeTab ? children[0] : children[1]}

      {isLargeScreen && <FloatingButton />}
    </>
  );
};

export default TabLayout;
