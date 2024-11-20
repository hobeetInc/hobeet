"use client";

import { useRouter } from "next/navigation";
import OverallPopularMeetings from "../_components/OverallPopularMeetings";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getSearchedRegularClubs, getSearchedOneTimeClubs } from "../_api/supabase";
import Link from "next/link";
import Image from "next/image";

import { IoSearchOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { EggClubSearchResults, EggPopSearchResults } from "@/types/utils/search.types";
import {
  HorizontalContentsListLargeEggClub,
  HorizontalContentsListLargeEggPop
} from "@/components/uiComponents/organisms/lists/HorizontalContentsListLarge";

const SearchPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [regularClubs, setRegularClubs] = useState<EggClubSearchResults[]>([]);
  const [oneTimeClubs, setOneTimeClubs] = useState<EggPopSearchResults[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleCreateClub = () => {
    router.push("/club");
  };
  useEffect(() => {
    const search = async () => {
      if (!searchTerm.trim() || !isSearching) return;

      try {
        const [regularResults, oneTimeResults] = await Promise.all([
          getSearchedRegularClubs(searchTerm),
          getSearchedOneTimeClubs(searchTerm)
        ]);

        setRegularClubs(regularResults);
        setOneTimeClubs(oneTimeResults);
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
          className="w-full h-[14px] bg-transparent outline-none text-[14px] font-[400px] placeholder:text-[#a6a6a6]"
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
      {regularClubs.length > 0 || oneTimeClubs.length > 0 ? (
        <div className="w-full mt-4">
          {regularClubs.map((club) => (
            <div key={club.egg_club_id} className="p-4 bg-white rounded-lg mb-2 shadow-sm">
              <Link
                href={`/club/regular-club-sub/${club.egg_club_id}`}
                className="h-[90px] flex items-center gap-[8px] mx-4"
              >
                <HorizontalContentsListLargeEggClub eggClub={club} />
              </Link>
            </div>
          ))}
          {oneTimeClubs.map((club) => (
            <div key={club.egg_pop_id} className="p-4 bg-white rounded-lg mb-2 shadow-sm">
              <Link href={`/club/one-time-club-sub/${club.egg_pop_id}`} className="w-[160px] h-[311px] mr-4">
                <HorizontalContentsListLargeEggPop eggPop={club} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <>
          <Image
            src="/asset/Banner/smallBanner.svg"
            alt="smallBanner"
            width={358}
            height={80}
            onClick={handleCreateClub}
            className="rounded-xl w-[358px] h-[80px] mt-[24px]"
          />

          <p className="text-[18px] font-semibold py-4 leading-[135%] mt-4">전체 인기 모임</p>
          <OverallPopularMeetings />
        </>
      )}
    </div>
  );
};

export default SearchPage;
