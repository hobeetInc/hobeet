"use client";

import ClubListContent from "@/app/(pages)/(myclublist)/myclublist/_components/ClubListContent";
import TabBar from "@/components/uiComponents/TapBar";
import { useState } from "react";

export default function MyClubListPage() {
  const [activeTab, setActiveTab] = useState(true);

  const handleTabChange = (tab: boolean) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full max-w-[480px] mx-auto min-h-screen bg-white">
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} value={"myclub"} />
      <div className="mt-9">
        <ClubListContent activeTab={activeTab} />
      </div>
    </div>
  );
}
