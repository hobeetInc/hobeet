"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WishHeart } from "@/components/ui/atoms/icons/Icons";

import Text from "@/components/ui/atoms/text/Text";
import Tag from "@/components/ui/atoms/tags/Tag";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useWishlist } from "@/hooks/utils/features/wishlist/useMyWishlist";
import { HeartImage } from "@/components/ui/molecules/Images/HeartImage";
import useScreenSizeStore from "@/store/useScreenSizeStore";

const WishClubListPage = () => {
  const router = useRouter();
  const userId = useAuthStore((state) => state.userId);
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  const { data: wishData, isLoading, error } = useWishlist(userId);

  const handleClick = (egg_club_id: number) => {
    router.push(`/club/regular-club-sub/${egg_club_id}`);
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>찜 목록을 가져오는 중 오류가 발생했습니다.</div>;

  return (
    <div className="relative lg:static">
      <div className="fixed top-0 right-0 left-0 flex w-full h-12 bg-white items-center lg:static lg:mt-[84px]">
        {isLargeScreen ? (
          ""
        ) : (
          <div className="left-0 m-3">
            <Link href="/mypage/profile">
              <HiOutlineChevronLeft className="w-6 h-6" />
            </Link>
          </div>
        )}

        <div className="flex flex-grow justify-center lg:justify-start lg:ml-4 lg:py-5">
          <Text variant={isLargeScreen ? "header-20" : "header-16"} className="text-gray-900">
            내가 찜한 클럽
          </Text>
        </div>
      </div>

      <div className="lg:mt-5">
        {wishData.length === 0 ? (
          <Text variant="subtitle-14" className="text-gray-500 ml-[16px] mt-[10px]">
            찜한 클럽이 없습니다.
          </Text>
        ) : (
          <div className="w-full grid grid-cols-2 px-4 pt-4 gap-2 lg:grid-cols-4 lg:gap-4 lg:justify-items-center lg:mx-auto">
            {wishData.map((item) => (
              <div
                onClick={() => handleClick(item.egg_club.egg_club_id)}
                key={item.egg_club.egg_club_id}
                className="max-w-[174px] lg:max-w-[228px] flex-col justify-start items-start gap-2 inline-flex"
              >
                <div className="flex-col justify-start items-start gap-2 inline-flex min-h-[306px] mb-10">
                  <div className="w-[174px] h-[174px] overflow-hidden relative lg:w-[228px] lg:h-[228px]">
                    <Image
                      src={item.egg_club.egg_club_image}
                      alt={item.egg_club.egg_club_name}
                      width={174}
                      height={174}
                      className="w-[174px] h-[174px] object-cover rounded-[12px] lg:w-[228px] lg:h-[228px]"
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
    </div>
  );
};

export default WishClubListPage;
