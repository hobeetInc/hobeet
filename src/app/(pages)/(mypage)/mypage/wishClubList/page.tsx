"use client";

import React, { useEffect, useState } from "react";
import browserClient from "@/utils/supabase/client";
// import Image from "next/image";

type WishList = {
  r_c_id: {
    regular_club_name: string;
    regular_club_image: string;
    regular_club_people_limited: number;
    r_c_member: {
      count: number;
    }[];
    wish_list: {
      count: number;
    }[];
    user_id: {
      user_name: string;
      user_profile_img: string;
    }[];
  }[];
}[];

const WishClubListPage = () => {
  const supabase = browserClient;
  const [wishData, setWishData] = useState<WishList>();

  useEffect(() => {
    const getWishList = async () => {
      const { data: userData } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("wish_list")
        .select(
          `r_c_id(
            regular_club_name,
            regular_club_image, 
            regular_club_people_limited,
            r_c_member(count),
            wish_list(count),
            user_id(
              user_name, 
              user_profile_img
            )
          )`
        )
        .eq("user_id", userData.user?.id);

      console.log("@@@@@@전체데이터", data);

      if (error) {
        console.error("찜 목록 불러오기 실패@@@:", error);
        return;
      }

      // setWishData(data);
    };

    getWishList();
  }, []);

  return (
    // <div className="p-4">
    //   <h1 className="text-xl font-bold text-center mb-4">내가 찜한 클럽</h1>
    //   <div className="grid grid-cols-2 gap-4">
    //     {wishData.map((clubData, index) => (
    //       <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative">
    //         <div className="relative">
    //           <Image
    //             src={clubData.club.regular_club_image}
    //             alt={clubData.club.regular_club_name}
    //             width={150}
    //             height={150}
    //             className="w-full h-32 object-cover rounded-md"
    //           />
    //           <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded-full w-16 mt-2">에그클럽</div>
    //         </div>

    //         <div className="mt-3 text-sm font-semibold text-gray-800 leading-tight">
    //           {clubData.club.regular_club_name}
    //         </div>

    //         <div className="flex items-center mt-2">
    //           <Image
    //             src={clubData.user.user_profile_img}
    //             alt={clubData.user.user_name}
    //             width={24}
    //             height={24}
    //             className="w-6 h-6 rounded-full mr-2"
    //           />
    //           <p className="text-xs text-gray-500">
    //             {clubData.user.user_name} 멤버 {clubData.club.r_c_member[0]?.count || 0}/
    //             {clubData.club.regular_club_people_limited}
    //           </p>
    //         </div>

    //         <div className="flex items-center mt-2 text-xs text-gray-500">
    //           찜수+ {clubData.club.wish_list[0]?.count || 0}
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div>asd</div>
  );
};

export default WishClubListPage;
