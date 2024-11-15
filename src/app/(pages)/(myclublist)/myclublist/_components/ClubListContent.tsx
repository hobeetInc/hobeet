// "use client";

// import { useEffect, useState } from "react";
// import { OneTimeClubCard } from "@/app/(pages)/(myclublist)/myclublist/_components/OneTimeClubCard";
// import { RegularClubCard } from "@/app/(pages)/(myclublist)/myclublist/_components/RegularClubCard";
// import { EggClub, EggPop } from "@/types/cardlist.types";
// import { createClient } from "@/utils/supabase/client";
// import { fetchCreatedClubs, fetchJoinedClubs } from "../_apis/ClubListContentApi";
// import TabBar from "@/components/uiComponents/TapBar";

// const supabase = createClient();

// export default function ClubListContent() {
//   const [activeTab, setActiveTab] = useState(true);
//   const [oneTimeClubs, setOneTimeClubs] = useState<EggPop[]>([]);
//   const [regularClubs, setRegularClubs] = useState<EggClub[]>([]);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     supabase.auth.getUser().then(({ data: { user } }) => {
//       if (user) {
//         setUserId(user.id);
//         fetchClubs(user.id, true);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchClubs(userId, activeTab);
//     }
//   }, [activeTab, userId]);

//   const fetchClubs = async (currentUserId: string, tab: boolean) => {
//     setLoading(true);
//     const fetchData = tab ? fetchCreatedClubs : fetchJoinedClubs;
//     const { oneTime, regular } = await fetchData(currentUserId);

//     setOneTimeClubs(oneTime);
//     setRegularClubs(regular);
//     setLoading(false);
//   };

//   const handleTabSwitch = (tab: boolean) => {
//     setActiveTab(tab);
//     fetchClubs(userId!, tab);
//   };

//   const renderEmptyState = () => {
//     const message = activeTab ? "내가 만든 모임이 없습니다" : "내가 참여한 모임이 없습니다";
//     return <div className="flex items-center justify-center p-12 text-gray-500">{message}</div>;
//   };

//   const renderLoadingState = () => (
//     <div className="flex items-center justify-center p-12 text-gray-500">모임 로딩중...</div>
//   );

//   return (
//     <div className="w-full border-b">
//       <TabBar activeTab={activeTab} onTabChange={handleTabSwitch} value={"myclub"} />

//       <div className="w-full mt-9 px-4">
//         {loading ? (
//           renderLoadingState()
//         ) : oneTimeClubs.length === 0 && regularClubs.length === 0 ? (
//           renderEmptyState()
//         ) : (
//           <div className="w-full mb-5 flex-col justify-start items-start gap-4 inline-flex">
//             {oneTimeClubs.map((club) => (
//               <OneTimeClubCard key={club.egg_pop_id} club={club} />
//             ))}
//             {regularClubs.map((club) => (
//               <RegularClubCard key={club.egg_club_id} club={club} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { fetchCreatedClubs, fetchJoinedClubs } from "../_apis/ClubListContentApi";
import { OneTimeClubCard } from "./OneTimeClubCard";
import { RegularClubCard } from "./RegularClubCard";

export default function ClubListContent({ activeTab }) {
  console.log(activeTab);

  const userId = useAuthStore((state) => state.userId);

  // const { data: user, isLoading: userLoading } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: async () => {
  //     const { data, error } = await supabase.auth.getUser();
  //     if (error) {
  //       console.error(error);
  //     }
  //     console.log(data);
  //     return data.user;
  //   }
  // });

  const fetchClubs = async (currentUserId: string, tab: boolean) => {
    const fetchData = tab ? fetchCreatedClubs : fetchJoinedClubs;
    const { oneTime, regular } = await fetchData(currentUserId);

    return { oneTimeClubs: oneTime, regularClubs: regular };
  };

  const {
    data: clubs,
    isLoading: clubsLoading,
    isError: clubsError
  } = useQuery({
    queryKey: ["clubs", userId],
    queryFn: () => fetchClubs(userId, true),
    enabled: !!userId // userId가 있을 때만 fetchClubs 실행 // 호출 최적화
  });

  console.log(clubs);

  if (clubsLoading) {
    return <div className="flex items-center justify-center p-12 text-gray-500">모임 로딩중...</div>;
  }

  if (clubsError) {
    return <div className="flex items-center justify-center p-12 text-gray-500">모임 로딩 중 오류 발생</div>;
  }

  console.log(clubs?.regularClubs);

  if (activeTab && clubs?.oneTimeClubs.length === 0) {
    return <div className="flex items-center justify-center p-12 text-gray-500">내가 만든 모임이 없습니다</div>;
  }

  if (!activeTab && clubs?.regularClubs.length === 0) {
    return <div className="flex items-center justify-center p-12 text-gray-500">내가 참여한 모임이 없습니다</div>;
  }

  return (
    <div className="w-full border-b">
      <div className="w-full h-[338px] flex-col justify-start items-start gap-4 inline-flex">
        {activeTab
          ? clubs?.oneTimeClubs.map((club) => <OneTimeClubCard key={club.egg_pop_id} club={club} />)
          : clubs?.regularClubs.map((club) => <RegularClubCard key={club.egg_club_id} club={club} />)}
      </div>
    </div>
  );
}
