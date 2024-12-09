"use client";

import ClubListContent from "@/app/(pages)/(myclublist)/myclublist/_components/ClubListContent";
import TabBar from "@/components/ui/molecules/navigation/TapBar";
import { useState } from "react";

export default function MyClubListPage() {
  const [activeTab, setActiveTab] = useState(true);

  const handleTabChange = (tab: boolean) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full mx-auto min-h-screen bg-white">
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} value={"myclub"} />
      <div className="mt-9">
        <ClubListContent activeTab={activeTab} />
      </div>
    </div>
  );
}
