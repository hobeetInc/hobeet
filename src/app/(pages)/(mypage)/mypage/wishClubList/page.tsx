"use client";

import React, { useEffect, useState } from "react";
import browserClient from "@/utils/supabase/client";
import Image from "next/image";
import { WishListResponse } from "@/types/mypage.types";
import { useRouter } from "next/navigation";
import { WishHeart } from "@/components/uiComponents/icon/icons";

const WishClubListPage = () => {
  const supabase = browserClient;
  const [wishData, setWishData] = useState<WishListResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getWishList = async () => {
      try {
        const { data: userData, error: authError } = await supabase.auth.getUser();

        if (authError) throw new Error("인증 에러가 발생했습니다");
        if (!userData.user?.id) throw new Error("사용자를 찾을 수 없습니다");

        const { data: rawData, error: fetchError } = await supabase
          .from("wish_list")
          .select(
            `egg_club_id(
              egg_club_id,
              egg_club_name,
              egg_club_image, 
              egg_club_people_limited,
              egg_club_member(count),
              wish_list(count),
              user_id(
                user_name, 
                user_profile_img
              )
            )`
          )
          .eq("user_id", userData.user.id);

        if (fetchError) throw fetchError;
        if (!rawData) throw new Error("데이터를 가져올 수 없습니다");

        // console.log("Fetched data:", rawData); // 데이터 구조 확인

        // 타입 안전성을 위해 unknown으로 먼저 변환
        const data = rawData as unknown as WishListResponse[];
        setWishData(data);
        setError(null);
      } catch (err) {
        console.error("찜 목록 가져오기 에러:", err);
        setError(err instanceof Error ? err.message : "알 수 없는 에러가 발생했습니다");
      }
    };

    getWishList();
  }, []);

  const handleClick = (egg_club_id: number) => {
    router.push(`/club/regular-club-sub/${egg_club_id}`);
  };

  if (error) {
    return <div className="p-4 text-red-500 text-center">에러: {error}</div>;
  }

  return (
    <div className="w-[390px] h-[844px] relative bg-white px-[16px]">
      <h1 className="text-xl font-bold text-center mb-4">내가 찜한 클럽</h1>
      {wishData.length === 0 ? (
        <p className="text-center text-gray-500">찜한 클럽이 없습니다.</p>
      ) : (
        <div className="w-[358px] h-[652px] justify-start items-start gap-2.5 grid grid-cols-2">
          {wishData.map((item, index) => (
            <div
              onClick={() => handleClick(item.egg_club_id.egg_club_id)}
              key={index}
              className="w-[174px] flex-col justify-start items-start gap-2 inline-flex"
            >
              <div className="w-[174px] flex-col justify-start items-start gap-2 inline-flex">
                <Image
                  src={item.egg_club_id.egg_club_image}
                  alt={item.egg_club_id.egg_club_name}
                  width={150}
                  height={150}
                  className="w-full h-32 object-cover rounded-md"
                />
                <div className="self-stretch h-[124px] flex-col justify-start items-start gap-1.5 flex">
                  <div className="px-2 py-0.5 bg-neutral-800 rounded-[124px] justify-center items-center inline-flex">
                    <div className="text-white text-[10px] font-normal font-['Pretendard'] leading-[14.50px]">
                      에그클럽
                    </div>
                  </div>
                  <div className="self-stretch text-[#0c0c0c] text-base font-semibold font-['Pretendard'] leading-snug">
                    {item.egg_club_id.egg_club_name}
                  </div>
                  <div className="self-stretch justify-start items-center gap-1 inline-flex">
                    <div className="justify-start items-center gap-0.5 flex">
                      <div className="w-[22px] h-[22px] relative">
                        <Image
                          src={item.egg_club_id.user_id.user_profile_img}
                          alt={item.egg_club_id.user_id.user_name}
                          width={24}
                          height={24}
                          className="w-[22px] h-[22px] left-0 top-0 absolute bg-[#d9d9d9] rounded-full"
                        />
                      </div>
                      <div className="grow shrink basis-0 text-[#8c8c8c] text-sm font-medium font-['Pretendard'] leading-tight">
                        {item.egg_club_id.user_id.user_name}
                      </div>
                    </div>
                    <div className="justify-start items-center gap-0.5 flex">
                      <div className="text-[#8c8c8c] text-sm font-medium font-['Pretendard'] leading-tight">멤버</div>
                      <div className="text-[#8c8c8c] text-sm font-medium font-['Pretendard'] leading-tight">
                        {item.egg_club_id.egg_club_member[0]?.count || 0}/{item.egg_club_id.egg_club_people_limited}
                      </div>
                    </div>
                  </div>
                  <div className="pt-1 justify-start items-center gap-0.5 inline-flex">
                    <div className="justify-start items-center flex">
                      <span>
                        <WishHeart />
                      </span>
                      <div className="text-[#8c8c8c] text-xs font-normal font-['Pretendard'] leading-[17.40px]">
                        <span>찜수 {item.egg_club_id.wish_list[0]?.count || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="relative">
                <Image
                  src={item.egg_club_id.egg_club_image}
                  alt={item.egg_club_id.egg_club_name}
                  width={150}
                  height={150}
                  className="w-full h-32 object-cover rounded-md"
                />
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded-full w-16 mt-2">에그클럽</div>
              </div>

              <div className="mt-3 text-sm font-semibold text-gray-800 leading-tight">
                {item.egg_club_id.egg_club_name}
              </div>

              <div className="flex items-center mt-2">
                <Image
                  src={item.egg_club_id.user_id.user_profile_img}
                  alt={item.egg_club_id.user_id.user_name}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <p className="text-xs text-gray-500">
                  {item.egg_club_id.user_id.user_name} 멤버 {item.egg_club_id.egg_club_member[0]?.count || 0}/
                  {item.egg_club_id.egg_club_people_limited}
                </p>
              </div>

              <div className="flex items-center mt-2 text-xs text-gray-500">
                찜수+ {item.egg_club_id.wish_list[0]?.count || 0}
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishClubListPage;
