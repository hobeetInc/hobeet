"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WishHeart } from "@/components/uiComponents/IconComponents/Icons";
import { HeartImage } from "@/components/uiComponents/HeartImage";
import Text from "@/components/uiComponents/TextComponents/Text";
import Tag from "@/components/uiComponents/TagComponents/Tag";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useWishlist } from "@/hooks/useMyWishlist";

const WishClubListPage = () => {
  const router = useRouter();
  const userId = useAuthStore((state) => state.userId);

  const { data: wishData, isLoading, error } = useWishlist(userId);

  const handleClick = (egg_club_id: number) => {
    router.push(`/club/regular-club-sub/${egg_club_id}`);
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>찜 목록을 가져오는 중 오류가 발생했습니다.</div>;

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
        <Text variant="subtitle-14" className="text-gray-500 ml-[16px] mt-[10px]">
          찜한 클럽이 없습니다.
        </Text>
      ) : (
        <div className="w-[390px] grid-cols-2 grid place-items-center px-4 pt-4 gap-2">
          {wishData.map((item) => (
            <div
              onClick={() => handleClick(item.egg_club.egg_club_id)}
              key={item.egg_club.egg_club_id}
              className="w-[174px] flex-col justify-start items-start gap-2 inline-flex"
            >
              <div className="flex-col justify-start items-start gap-2 inline-flex min-h-[306px] mb-10">
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
                          src={item.egg_club.user.user_profile_img}
                          alt={item.egg_club.user.user_name}
                          width={22}
                          height={22}
                          className="w-[22px] h-[22px] left-0 top-0 absolute bg-gray-100 rounded-full"
                        />
                      </div>

                      <Text variant="body_medium-14" className="text-gray-400">
                        {item.egg_club.user.user_name}
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
