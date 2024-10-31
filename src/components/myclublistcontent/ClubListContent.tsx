"use client";

import { useEffect, useState } from "react";
import { OneTimeClubCard } from "@/components/onetimeclublist/OneTimeClubCard";
import { RegularClubCard } from "@/components/regularclublist/RegularClubCard";
import { OneTimeClub, RegularClub } from "@/types/clubcardlist/types";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function ClubListContent() {
  const [activeTab, setActiveTab] = useState<"created" | "joined">("created");
  const [oneTimeClubs, setOneTimeClubs] = useState<OneTimeClub[]>([]);
  const [regularClubs, setRegularClubs] = useState<RegularClub[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

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
    if (activeTab === "created") {
      const { data: oneTime } = await supabase
        .from("one_time_club")
        .select("*")
        .eq("user_id", currentUserId)
        .order("one_time_club_date_time", { ascending: false });

      const { data: regular } = await supabase
        .from("regular_club")
        .select("*")
        .eq("user_id", currentUserId)
        .order("regular_club_create_at", { ascending: false });

      setOneTimeClubs(oneTime || []);
      setRegularClubs(regular || []);
    } else {
      const { data: oneTimeMemberships } = await supabase
        .from("o_t_c_member")
        .select("o_t_c_id")
        .eq("user_id", currentUserId);

      const { data: regularMemberships } = await supabase
        .from("r_c_member")
        .select("r_c_id")
        .eq("user_id", currentUserId)
        .eq("regular_club_request_status", "active");

      if (oneTimeMemberships?.length) {
        const { data } = await supabase
          .from("one_time_club")
          .select("*")
          .in(
            "one_time_club_id",
            oneTimeMemberships.map((m) => m.o_t_c_id)
          )
          .order("one_time_club_date_time", { ascending: false });
        setOneTimeClubs(data || []);
      }

      if (regularMemberships?.length) {
        const { data } = await supabase
          .from("regular_club")
          .select("*")
          .in(
            "regular_club_id",
            regularMemberships.map((m) => m.r_c_id)
          )
          .order("regular_club_create_at", { ascending: false });
        setRegularClubs(data || []);
      }
    }
  };

  const renderEmptyState = () => {
    const message = activeTab === "created" ? "내가 만든 모임이 없습니다" : "내가 참여한 모임이 없습니다";

    return <div className="flex items-center justify-center p-12 text-gray-500">{message}</div>;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex gap-4 mb-6">
        <button
          className={`flex-1 py-2 rounded ${activeTab === "created" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("created")}
        >
          내가 만든 모임
        </button>
        <button
          className={`flex-1 py-2 rounded ${activeTab === "joined" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("joined")}
        >
          내가 참여한 모임
        </button>
      </div>

      <div className="space-y-4">
        {oneTimeClubs.length === 0 && regularClubs.length === 0 ? (
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
