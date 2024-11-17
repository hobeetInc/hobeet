"use client";

import React, { useEffect, useState } from "react";
import browserClient from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WishHeart } from "@/components/uiComponents/IconComponents/Icons";
import { HeartImage } from "@/components/uiComponents/HeartImage";
import Text from "@/components/uiComponents/TextComponents/Text";
import Tag from "@/components/uiComponents/TagComponents/Tag";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Link from "next/link";

const WishClubListPage = () => {
  const supabase = browserClient;
  const [wishData, setWishData] = useState([]);
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
            `egg_club(
              egg_club_id,
              egg_club_name,
              egg_club_image, 
              egg_club_people_limited,
              egg_club_member(count),
              wish_list(count),
              user(
                user_name, 
                user_profile_img
              )
            )`
          )
          .eq("user_id", userData.user.id);

        if (fetchError) throw fetchError;
        if (!rawData) throw new Error("데이터를 가져올 수 없습니다");

        setWishData(rawData);
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
    <div className="relative">
      <div className="fixed top-0 right-0 left-0 flex w-full h-12 bg-white items-center">
        <div className="left-0 m-3">
          <Link href="/mypage/profile">
            <HiOutlineChevronLeft className="w-6 h-6" />
          </Link>
        </div>
        <div className="flex flex-grow justify-center">
          <Text variant="header-16" className="text-gray-900">
            내가 찜한 클럽
          </Text>
        </div>
        <div className="w-6 m-3"></div>
      </div>

      {wishData.length === 0 ? (
        <Text variant="subtitle-14" className="text-gray-500">
          찜한 클럽이 없습니다
        </Text>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-2.5 p-4">
          {wishData.map((item) => (
            <div
              onClick={() => handleClick(item.egg_club.egg_club_id)}
              key={item.egg_club.egg_club_id}
              className="w-[174px] flex-col justify-start items-start gap-2 inline-flex"
            >
              <div className="flex-col justify-start items-start gap-2 inline-flex min-h-[306px]">
                <div className="w-[174px] h-[174px] overflow-hidden relative">
                  <Image
                    src={item.egg_club.egg_club_image}
                    alt={item.egg_club.egg_club_name}
                    width={174}
                    height={174}
                    className="w-[174px] h-[174px] object-cover rounded-[12px]"
                  />
                  <div className="absolute bottom-3 right-3">
                    <HeartImage selectedId={2} />
                  </div>
                </div>

                <div className="self-stretch h-[124px] flex-col justify-start items-start gap-1.5 flex">
                  <Tag tagName="eggclub" />

                  <Text variant="subtitle-16"> {item.egg_club.egg_club_name}</Text>

                  <div className="self-stretch justify-start items-center gap-1 inline-flex">
                    <div className="justify-start items-center gap-0.5 flex">
                      <div className="w-[22px] h-[22px] relative">
                        <Image
                          src={item.egg_club.user_id.user_profile_img}
                          alt={item.egg_club.user_id.user_name}
                          width={24}
                          height={24}
                          className="w-[22px] h-[22px] left-0 top-0 absolute bg-gray-100 rounded-full"
                        />
                      </div>

                      <Text variant="body_medium-14" className="text-gray-400">
                        {item.egg_club.user_id.user_name}
                      </Text>
                    </div>
                    <div className="justify-start items-center gap-0.5 flex">
                      <Text variant="body_medium-14" className="text-gray-400">
                        멤버
                      </Text>
                      <Text variant="body_medium-14" className="text-gray-400">
                        {item.egg_club.egg_club_member[0]?.count || 0}/{item.egg_club.egg_club_people_limited}
                      </Text>
                    </div>
                  </div>
                  <div className="pt-1 justify-start items-center gap-0.5 inline-flex">
                    <div className="justify-start items-center flex gap-[2px]">
                      <WishHeart />

                      <Text variant="body_medium-14" className="text-gray-400">
                        찜수 {item.egg_club.wish_list[0]?.count || 0}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishClubListPage;
