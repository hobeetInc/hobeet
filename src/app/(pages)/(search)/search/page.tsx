"use client";

import { useRouter, useSearchParams } from "next/navigation";
import OverallPopularMeetings from "../_components/OverallPopularMeetings";
import { useEffect, useState } from "react";
import { getSearchedRegularClubs, getSearchedOneTimeClubs } from "../_api/supabase";
import Link from "next/link";
import Image from "next/image";
import { EggClubSearchResults, EggPopSearchResults } from "@/types/utils/search.types";
import {
  HorizontalContentsListLargeEggClubSearch,
  HorizontalContentsListLargeEggPop
} from "@/components/ui/organisms/lists/HorizontalContentsListLarge";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import HeaderSearchInput from "@/app/_components/HeaderSearchInput";
import Text from "@/components/ui/atoms/text/Text";
import {
  BigVerticalContentsEggClubList,
  BigVerticalContentsEggPopList
} from "@/components/ui/organisms/lists/BigVerticalContentsList";
import { useAuthStore } from "@/store/authStore";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);
  const userId = useAuthStore((state) => state.userId);

  const [regularClubs, setRegularClubs] = useState<EggClubSearchResults[]>([]);
  const [oneTimeClubs, setOneTimeClubs] = useState<EggPopSearchResults[]>([]);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

  useEffect(() => {
    const search = async () => {
      if (!initialQuery) {
        setRegularClubs([]);
        setOneTimeClubs([]);
        setSearchAttempted(false);
        return;
      }

      try {
        setSearchAttempted(true);
        const [regularResults, oneTimeResults] = await Promise.all([
          getSearchedRegularClubs(initialQuery),
          getSearchedOneTimeClubs(initialQuery)
        ]);

        setRegularClubs(regularResults);
        setOneTimeClubs(oneTimeResults);
      } catch (error) {
        console.error("검색 중 에러 발생:", error);
        setRegularClubs([]);
        setOneTimeClubs([]);
      }
    };

    search();
  }, [initialQuery]);

  const handleCreateClub = () => {
    router.push("/club");
  };

  const handleClear = () => {
    setRegularClubs([]);
    setOneTimeClubs([]);
    setSearchAttempted(false);
  };

  const isWishedByUser = (club) => {
    if (!userId) return false;
    return club.wish_list?.some((wish) => wish.user_id === userId) || false;
  };

  console.log("에그클럽리스트:", regularClubs);

  return (
    <div className="flex flex-col items-start w-full mx-auto px-4">
      {isLargeScreen ? null : <HeaderSearchInput variant="page" onClear={handleClear} />}

      {searchAttempted && regularClubs.length === 0 && oneTimeClubs.length === 0 ? (
        // 검색 결과가 없는 경우
        <div className="w-full text-center mt-10">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
          <p className="text-gray-400 text-sm mt-2">다른 검색어로 시도해보세요.</p>
        </div>
      ) : regularClubs.length > 0 || oneTimeClubs.length > 0 ? (
        // 검색 결과가 있는 경우
        <div className={`w-full mt-4 ${isLargeScreen ? "flex flex-wrap " : ""}`}>
          {regularClubs.map((club) => (
            <div key={club.egg_club_id} className={`bg-white rounded-lg mb-2 ${isLargeScreen ? "" : "p-4 shadow-sm"}`}>
              <Link href={`/club/regular-club-sub/${club.egg_club_id}`} className="w-[160px] h-[311px] mr-4">
                {isLargeScreen ? (
                  <BigVerticalContentsEggClubList
                    eggClub={club}
                    hostName={club.user.user_name}
                    hostImage={club.user_id.user_profile_img}
                    memberCount={club.egg_club_member[0].countt}
                    isWished={isWishedByUser(club)} // 아직 고치는중
                    wishListCount={club.wish_list.length}
                  />
                ) : (
                  <HorizontalContentsListLargeEggClubSearch eggClub={club} />
                )}
              </Link>
            </div>
          ))}
          {oneTimeClubs.map((pop) => (
            <div key={pop.egg_pop_id} className={`bg-white rounded-lg mb-2 ${isLargeScreen ? "" : "p-4 shadow-sm"}`}>
              <Link href={`/club/one-time-club-sub/${pop.egg_pop_id}`} className="w-[160px] h-[311px] mr-4">
                {isLargeScreen ? (
                  <BigVerticalContentsEggPopList
                    eggPop={pop}
                    hostName={pop.user.user_name}
                    hostImage={pop.user.user_profile_img}
                    memberCount={pop.egg_pop_member[0].count}
                  />
                ) : (
                  <HorizontalContentsListLargeEggPop eggPop={pop} />
                )}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        // 검색 하지 않은 초기 상태
        <>
          {isLargeScreen ? (
            <Image
              src="/asset/Banner/smallWebBanner.svg"
              alt="smallWebBanner"
              width={984}
              height={80}
              onClick={handleCreateClub}
              className="rounded-xl w-full h-auto mt-[24px]"
            />
          ) : (
            <Image
              src="/asset/Banner/smallBanner.svg"
              alt="smallBanner"
              width={358}
              height={80}
              onClick={handleCreateClub}
              className="rounded-xl w-full h-auto mt-[24px]"
            />
          )}

          <Text variant={`${isLargeScreen ? "header-20" : "header-18"}`} className="py-4 mt-4">
            전체 인기 모임
          </Text>
          <OverallPopularMeetings />
        </>
      )}
    </div>
  );
};

export default SearchPage;
