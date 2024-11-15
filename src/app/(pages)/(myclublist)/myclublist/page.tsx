"use client";

import { useState } from "react";
import TabBar from "@/components/uiComponents/TapBar";
import ClubListContent from "./_components/ClubListContent";

export default function MyClubList() {
  const [activeTab, setActiveTab] = useState(true);

  const handleTabSwitch = (tab: boolean) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <TabBar activeTab={activeTab} onTabChange={handleTabSwitch} value={"myclub"} />
      <ClubListContent activeTab={activeTab} />
    </div>
  );
}
