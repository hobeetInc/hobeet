"use client";

import { useRouter } from "next/navigation";
import OverallPopularMeetings from "../_components/OverallPopularMeetings";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getSearchedClubs } from "../_api/supabase";
import Link from "next/link";
import { Club } from "@/types/search.types";
import Image from "next/image";
import {
  HorizontalContentsListLargeEggClub,
  HorizontalContentsListLargeEggPop
} from "@/components/uiComponents/HorizontalContentsListLarge";
import Text from "@/components/uiComponents/TextComponents/Text";

import { IoSearchOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

const SearchPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Club[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleCreateClub = () => {
    router.push("/club");
  };
  useEffect(() => {
    const search = async () => {
      if (!searchTerm.trim() || !isSearching) return;

      try {
        const results = await getSearchedClubs(searchTerm);
        setSearchResults(results);
        setIsSearching(false);
      } catch (error) {
        console.error("검색 중 에러 발생:", error);
        setIsSearching(false);
      }
    };

    search();
  }, [searchTerm, isSearching]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearching(true);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col items-start w-full  mx-auto px-4 ">
      <form onSubmit={handleSearch} className="relative flex items-center w-full bg-[#f2f2f2] rounded-[22px] py-2 px-5">
        <input
          className="w-full h-[11px] bg-transparent outline-none text-[14px] font-[400px] placeholder:text-[#a6a6a6]"
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchTerm.length > 0 && (
          <button type="button" onClick={() => setSearchTerm("")}>
            <IoMdCloseCircle className="w-5 h-5" color="#A6A6A6" />
          </button>
        )}
        <button type="submit" className="flex items-center justify-center ml-2 flex-shrink-0">
          <IoSearchOutline className="w-5 h-5" color="#A6A6A6" />
        </button>
      </form>

      {/* 검색 결과 표시 */}
      {searchResults.length > 0 && (
        <div className="w-full mt-4">
          {searchResults.map((club) => (
            <div
              key={club.type === "eggClub" ? club.egg_club_id : club.egg_pop_id}
              className="p-4 bg-white rounded-lg mb-2 shadow-sm"
            >
              {club.type === "eggClub" ? (
                // 정규 모임 표시
                <div>
                  <Link
                    key={club.egg_club_id}
                    href={`/club/regular-club-sub/${club.egg_club_id}`}
                    className=" h-[90px] flex items-center gap-[8px] mx-4"
                  >
                    <HorizontalContentsListLargeEggClub eggClub={club} />
                  </Link>
                </div>
              ) : (
                // 일회성 모임 표시
                <div>
                  <Link
                    href={`/club/one-time-club-sub/${club.egg_pop_id}`}
                    key={club.egg_pop_id}
                    className="w-[160px] h-[311px] mr-4"
                  >
                    <HorizontalContentsListLargeEggPop eggPop={club} />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {searchResults.length === 0 && (
        <>
          <button className="w-full" onClick={handleCreateClub}>
            <div className="w-full h-[80px] mt-6 rounded-xl flex items-center bg-primary-200 p-4 justify-center">
              <div className="flex flex-col">
                <div className="w-[213px]">
                  <Text variant="subtitle-16" className="text-gray-900">
                    나만의 모임, 지금 만들어봐요!
                  </Text>
                </div>
                <div className="w-[320px] flex items-center ml-3">
                  <Text variant="body-14" className="text-gray-500">
                    함께할 에그즈들을 만나볼까요?
                  </Text>
                  <Image src="/asset/eggsBanner.png" alt="eggsBanner" width={84} height={34} className="ml-[60px]" />
                </div>
              </div>
            </div>
          </button>
          <div className="flex w-full mt-8 flex-col items-start">
            <p className="text-[18px] font-semibold pb-4 leading-[135%]">전체 인기 모임</p>
          </div>
          <OverallPopularMeetings />
        </>
      )}
    </div>
  );
};

export default SearchPage;
