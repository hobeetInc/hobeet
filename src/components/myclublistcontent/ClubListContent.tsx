"use client";

import { useEffect, useState } from "react";
import { OneTimeClubCard } from "@/components/onetimeclublist/OneTimeClubCard";
import { RegularClubCard } from "@/components/regularclublist/RegularClubCard";
import { EggClub, EggPop } from "@/types/cardlist.types";
import { createClient } from "@/utils/supabase/client";
import { fetchCreatedClubs, fetchJoinedClubs } from "./_api/ClubListContentApi";

const supabase = createClient();

export default function ClubListContent() {
  const [activeTab, setActiveTab] = useState<"created" | "joined">("created");
  const [oneTimeClubs, setOneTimeClubs] = useState<EggPop[]>([]);
  const [regularClubs, setRegularClubs] = useState<EggClub[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        fetchClubs(user.id);
      }
    });
  }, []);

  useEffect(() => {
    if (userId) {
      fetchClubs(userId);
    }
  }, [activeTab, userId]);

  const fetchClubs = async (currentUserId: string) => {
    setLoading(true);
    const fetchData = activeTab === "created" ? fetchCreatedClubs : fetchJoinedClubs;
    const { oneTime, regular } = await fetchData(currentUserId);

    setOneTimeClubs(oneTime);
    setRegularClubs(regular);
    setLoading(false);
  };

  const renderEmptyState = () => {
    const message = activeTab === "created" ? "내가 만든 모임이 없습니다" : "내가 참여한 모임이 없습니다";
    return <div className="flex items-center justify-center p-12 text-gray-500">{message}</div>;
  };

  const renderLoadingState = () => (
    <div className="flex items-center justify-center p-12 text-gray-500">모임 로딩중...</div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-4 border-b">
      <div className="flex gap-4 mb-6">
        <button
          className={`flex-1 py-2 rounded ${
            activeTab === "created" ? "bg-blue-500 text-white border-b-4" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("created")}
        >
          내가 만든 모임
        </button>
        <button
          className={`flex-1 py-2 rounded ${
            activeTab === "joined" ? "bg-blue-500 text-white border-b-4" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("joined")}
        >
          내가 참여한 모임
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          renderLoadingState()
        ) : oneTimeClubs.length === 0 && regularClubs.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            {oneTimeClubs.map((club) => (
              <OneTimeClubCard key={club.one_time_club_id} club={club} />
            ))}
            {regularClubs.map((club) => (
              <RegularClubCard key={club.regular_club_id} club={club} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
