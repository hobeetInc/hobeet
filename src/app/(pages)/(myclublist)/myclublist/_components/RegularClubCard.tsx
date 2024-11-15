// import { useEffect, useState } from "react";
// import { EggClub } from "@/types/cardlist.types";
// import { createClient } from "@/utils/supabase/client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { User } from "@/types/user.types";

// const supabase = createClient();

// export const RegularClubCard = ({ club }: { club: EggClub }) => {
//   const [creator, setCreator] = useState<User | null>(null);
//   const [memberCount, setMemberCount] = useState<number>(0);
//   const [wishlistCount, setWishlistCount] = useState<number>(0);
//   const router = useRouter();

//   useEffect(() => {
//     fetchCreator();
//     fetchMemberCount();
//     fetchWishlistCount();
//   }, []);

//   const fetchCreator = async () => {
//     const { data } = await supabase
//       .from("user")
//       .select("user_id, user_name, user_profile_img")
//       .eq("user_id", club.user_id)
//       .single();

//     setCreator(data);
//   };

//   const fetchMemberCount = async () => {
//     const { data } = await supabase
//       .from("egg_club_member")
//       .select("*", { count: "exact" })
//       .eq("egg_club_id", club.egg_club_id)
//       .eq("egg_club_request_status", "active");

//     setMemberCount(data?.length || 0);
//   };

//   const fetchWishlistCount = async () => {
//     const { data } = await supabase
//       .from("wish_list")
//       .select("*", { count: "exact" })
//       .eq("egg_club_id", club.egg_club_id);

//     setWishlistCount(data?.length || 0);
//   };

//   const handleClick = () => {
//     router.push(`/club/regular-club-sub/${club.egg_club_id}`);
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className="w-full hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b border-gray-100 last:border-b-0 "
//     >
//       <div className=" flex gap-2">
//         <div className="w-[102px] h-[102px] relative overflow-hidden rounded-[12px] bg-gray-100">
//           <Image
//             src={club.egg_club_image}
//             alt={club.egg_club_name}
//             width={102}
//             height={102}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         <div className="h-[19px] flex-1 flex flex-col justify-between">
//           <div>
//             <div className="inline-flex px-2 py-0.5 bg-gray-800 rounded-[124px] text-center text-[10px] text-white font-normal font-pretendard leading-[14.50px]">
//               에그클럽
//             </div>
//             <h3 className="text-sm font-semibold mt-2">{club.egg_club_name}</h3>
//             <div className="flex items-center mt-1">
//               <div className="flex items-center">
//                 {creator?.user_profile_img && (
//                   <div className="w-5 h-5 rounded-full overflow-hidden mr-2">
//                     <Image
//                       src={creator.user_profile_img}
//                       alt={creator.user_name}
//                       width={20}
//                       height={20}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 )}
//                 <span className="text-sm text-gray-400 font-pretendard">{creator?.user_name}</span>
//                 <span className="mx-2 text-gray-400"></span>
//                 <span className="text-sm text-gray-400">
//                   멤버 <span className=" text-gray-400">{memberCount}</span>
//                   <span className="text-gray-400"> / {club.egg_club_people_limited}</span>
//                 </span>
//               </div>
//             </div>
//             <div className="flex items-center mt-1">
//               <Image src="/asset/Icon/Heart-Filled.svg" alt="heart" width={16} height={16} className="mr-1" />
//               <span className="text-xs text-gray-400">{wishlistCount > 100 ? "100+" : wishlistCount}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { EggClub } from "@/types/cardlist.types";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user.types";
import { useAuthStore } from "@/app/store/authStore";

const supabase = createClient();

export const RegularClubCard = ({ club }: { club: EggClub }) => {
  const router = useRouter();
  const { userId, userProfileImg, userName } = useAuthStore((state) => ({
    userId: state.userId,
    userProfileImg: state.userProfileImg,
    userName: state.userName
    // userEmail: state.userEmail,
    // userGender: state.userGender,
    // userAge: state.userAge,
    // userRoleType: state.userRoleType,
    // userBirth: state.userBirth,
    // userCreateAt: state.userCreateAt
  }));

  // 클럽 생성자 정보 조회 - 이미 authStore에서 관리되는 경우 해당 정보 활용
  const { data: creator } = useQuery<User>({
    queryKey: ["clubCreator", club.user_id],
    queryFn: async () => {
      // 현재 로그인한 사용자가 클럽 생성자인 경우 store의 데이터 사용
      if (club.user_id === userId) {
        return {
          user_id: userId,
          user_name: userName,
          user_profile_img: userProfileImg
        };
      }
      // 다른 사용자의 경우 API 호출
      const { data } = await supabase
        .from("user")
        .select("user_id, user_name, user_profile_img")
        .eq("user_id", club.user_id)
        .single();
      return data;
    },
    enabled: !!userId,
    initialData:
      club.user_id === userId
        ? {
            user_id: userId,
            user_name: userName,
            user_profile_img: userProfileImg
          }
        : undefined
  });

  // 멤버 수 조회
  const { data: memberCount = 0 } = useQuery({
    queryKey: ["regularMemberCount", club.egg_club_id, userId],
    queryFn: async () => {
      const { data } = await supabase
        .from("egg_club_member")
        .select("*", { count: "exact" })
        .eq("egg_club_id", club.egg_club_id)
        .eq("egg_club_request_status", "active");
      return data?.length || 0;
    },
    enabled: !!userId
  });

  // 위시리스트 수 조회
  const { data: wishlistData } = useQuery({
    queryKey: ["wishlistCount", club.egg_club_id, userId],
    queryFn: async () => {
      const [totalCount, userWishlist] = await Promise.all([
        supabase.from("wish_list").select("*", { count: "exact" }).eq("egg_club_id", club.egg_club_id),
        userId
          ? supabase.from("wish_list").select("*").eq("egg_club_id", club.egg_club_id).eq("user_id", userId).single()
          : null
      ]);

      return {
        count: totalCount.data?.length || 0,
        isWishlisted: !!userWishlist?.data
      };
    },
    enabled: !!userId
  });

  const wishlistCount = wishlistData?.count || 0;
  const isWishlisted = wishlistData?.isWishlisted || false;

  const handleClick = () => {
    if (!userId) {
      // 로그인이 필요한 경우 처리
      router.push("/login");
      return;
    }
    router.push(`/club/regular-club-sub/${club.egg_club_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b border-gray-100 last:border-b-0"
    >
      <div className="flex gap-2">
        <div className="w-[102px] h-[102px] relative overflow-hidden rounded-[12px] bg-gray-100">
          <Image
            src={club.egg_club_image}
            alt={club.egg_club_name}
            width={102}
            height={102}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="h-[19px] flex-1 flex flex-col justify-between">
          <div>
            <div className="inline-flex px-2 py-0.5 bg-gray-800 rounded-[124px] text-center text-[10px] text-white font-normal font-pretendard leading-[14.50px]">
              에그클럽
            </div>
            <h3 className="text-sm font-semibold mt-2">{club.egg_club_name}</h3>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {creator?.user_profile_img && (
                  <div className="w-5 h-5 rounded-full overflow-hidden mr-2">
                    <Image
                      src={creator.user_profile_img}
                      alt={creator.user_name || ""}
                      width={20}
                      height={20}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <span className="text-sm text-gray-400 font-pretendard">{creator?.user_name}</span>
                <span className="mx-2 text-gray-400"></span>
                <span className="text-sm text-gray-400">
                  멤버 <span className="text-gray-400">{memberCount}</span>
                  <span className="text-gray-400"> / {club.egg_club_people_limited}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center mt-1">
              <Image
                src={isWishlisted ? "/asset/Icon/Heart-Filled.svg" : "/asset/Icon/Heart.svg"}
                alt="heart"
                width={16}
                height={16}
                className="mr-1"
              />
              <span className="text-xs text-gray-400">{wishlistCount > 100 ? "100+" : wishlistCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
