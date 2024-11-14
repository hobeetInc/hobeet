"use client";

import { useEffect, useState } from "react";
import { OneTimeClubCard } from "@/components/onetimeclublist/OneTimeClubCard";
import { RegularClubCard } from "@/components/regularclublist/RegularClubCard";
import { EggClub, EggPop } from "@/types/cardlist.types";
import { createClient } from "@/utils/supabase/client";
import { fetchCreatedClubs, fetchJoinedClubs } from "./_api/ClubListContentApi";
import TabBar from "../uiComponents/TapBar";

const supabase = createClient();

export default function ClubListContent() {
  const [activeTab, setActiveTab] = useState(true);
  const [oneTimeClubs, setOneTimeClubs] = useState<EggPop[]>([]);
  const [regularClubs, setRegularClubs] = useState<EggClub[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        fetchClubs(user.id, true);
      }
    });
  }, []);

  useEffect(() => {
    if (userId) {
      fetchClubs(userId, activeTab);
    }
  }, [activeTab, userId]);

  const fetchClubs = async (currentUserId: string, tab: boolean) => {
    setLoading(true);
    const fetchData = tab ? fetchCreatedClubs : fetchJoinedClubs;
    const { oneTime, regular } = await fetchData(currentUserId);

    setOneTimeClubs(oneTime);
    setRegularClubs(regular);
    setLoading(false);
  };

  const handleTabSwitch = (tab: boolean) => {
    setActiveTab(tab);
    fetchClubs(userId!, tab);
  };

  const renderEmptyState = () => {
    const message = activeTab ? "내가 만든 모임이 없습니다" : "내가 참여한 모임이 없습니다";
    return <div className="flex items-center justify-center p-12 text-gray-500">{message}</div>;
  };

  const renderLoadingState = () => (
    <div className="flex items-center justify-center p-12 text-gray-500">모임 로딩중...</div>
  );

  return (
    <div className="w-full border-b">
      <TabBar activeTab={activeTab} onTabChange={handleTabSwitch} value={"myclub"} />

      <div className="w-full mt-9 px-4">
        {loading ? (
          renderLoadingState()
        ) : oneTimeClubs.length === 0 && regularClubs.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="w-full mb-5 flex-col justify-start items-start gap-4 inline-flex">
            {oneTimeClubs.map((club) => (
              <OneTimeClubCard key={club.egg_pop_id} club={club} />
            ))}
            {regularClubs.map((club) => (
              <RegularClubCard key={club.egg_club_id} club={club} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
