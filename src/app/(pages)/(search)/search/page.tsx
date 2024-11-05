"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OverallPopularMeetings from "../_components/OverallPopularMeetings";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getSearchedClubs } from "../_api/supabase";
import Link from "next/link";
import { Club } from "@/types/search.types";

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
  // console.log(searchResults);

  return (
    <div className="flex flex-col items-center w-full max-w-[390px] mx-auto px-4 pt-4">
      <form onSubmit={handleSearch} className="relative flex items-center w-full bg-[#f2f2f2] rounded-[22px] py-2 px-5">
        <input
          className="w-full bg-transparent outline-none text-[14px] font-[400px] placeholder:text-[#a6a6a6]"
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit" className="flex items-center justify-center ml-2 flex-shrink-0">
          <Image width={20} height={20} src="/asset/Icon/Frame 1000007052.png" alt="search" />
        </button>
      </form>
      <div className="w-full h-[80px] mt-6 rounded-xl flex items-center justify-center bg-[#fff1cc]">
        <p className="text-[16px] font-semibold text-[#000] leading-[135%]" onClick={handleCreateClub}>
          모임 만들러 가기
        </p>
      </div>
      {/* 검색 결과 표시 */}
      {searchResults.length > 0 && (
        <div className="w-full mt-4">
          {searchResults.map((club) => (
            <div
              key={club.type === "regular" ? club.regular_club_id : club.one_time_club_id}
              className="p-4 bg-white rounded-lg mb-2 shadow-sm"
            >
              {club.type === "regular" ? (
                // 정규 모임 표시
                <div>
                  <Link
                    key={club.regular_club_id}
                    href={`/club/regular-club-sub/${club.regular_club_id}`}
                    className="w-[358px] h-[90px] flex items-center gap-[8px] mx-4"
                  >
                    <div className="w-[358px] h-[90px] flex items-center gap-[8px] mx-4">
                      <div className="w-[88px] h-[88px] rounded-[12px] flex-shrink-0 overflow-hidden">
                        <Image
                          width={88}
                          height={88}
                          src={club.regular_club_image}
                          alt={club.regular_club_name}
                          className="w-[88px] h-[88px] object-cover"
                        />
                      </div>
                      <div className="flex w-[161px] h-[90] flex-col items-start gap-[6px]">
                        <div className="flex py-[2px] px-[8px] justify-center items-center rounded-[128px] bg-[#262626]">
                          <p className="font-pretendard text-[10px] leading-[14.5px] not-italic font-normal text-[#ffffff]">
                            에그클럽
                          </p>
                        </div>
                        <p className="text-[14px] leading-[18.9px] font-[600] overflow-hidden text-overflow-ellipsis">
                          {club.regular_club_name}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex w-[22px] h-[22px] justify-center items-center rounded-full overflow-hidden">
                            <Image
                              src={club.user_id.user_profile_img}
                              alt="profile"
                              width={22}
                              height={22}
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div className="flex max-w-[160px] items-center gap-[2px]">
                            <p className="overflow-hidden leading-[20.3px] text-[#8c8c8c] text-ellipsis text-[14px] font-[500px]">
                              {club.user_id.user_name}
                            </p>
                            <p className="font-pretendard text-[14px] ml-[8px] leading-[20.3px] text-[#8c8c8c] font-[500px]">
                              멤버
                            </p>
                            <p className="font-pretendard text-[14px] ml-[2px] leading-[20.3px] text-[#8c8c8c] font-[500px]">
                              {club.r_c_member[0].count} / {club.regular_club_people_limited}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Image
                            width={16}
                            height={16}
                            src="/asset/Icon/Icon-Heart.png"
                            alt="Heart"
                            className="flex w-4 h-4 justify-center items-center"
                          />
                          <p className="text-[#8c8c8c] font-pretendard text-[12px] font-[400px] leading-[17.4px]">
                            {club.wish_list.length > 100 ? "100+" : club.wish_list.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : (
                // 일회성 모임 표시
                <div>
                  <Link
                    href={`/club/one-time-club-sub/${club.one_time_club_id}`}
                    key={club.one_time_club_id}
                    className="w-[160px] h-[311px] mr-4"
                  >
                    <div className="w-[358px] h-[90px] flex items-center gap-[8px] mx-4">
                      <div className="w-[88px] h-[88px] rounded-[12px] flex-shrink-0 overflow-hidden">
                        <Image
                          width={88}
                          height={88}
                          src={club.one_time_image}
                          alt={club.one_time_club_name}
                          className="w-[88px] h-[88px] object-cover"
                        />
                      </div>
                      <div
                        className="flex py-[2px] px-[8px] justify-center items-center
                 rounded-[128px] bg-[#fdb800]"
                      >
                        <p className="font-pretendard text-[10px] not-italic leading-[14.5px] font-normal">에그팝</p>
                      </div>
                      <p className="text-[14px] leading-[18.9px] font-[600] overflow-hidden text-overflow-ellipsis">
                        {club.one_time_club_name}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex w-[22px] h-[22px] justify-center items-center rounded-full overflow-hidden">
                          <Image
                            src={club.user_id.user_profile_img}
                            alt="profile"
                            width={22}
                            height={22}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <p className="overflow-hidden leading-[20.3px] text-[#8c8c8c] text-ellipsis text-[14px] font-[500px]">
                          {club.user_id.user_name}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {searchResults.length === 0 && (
        <>
          <div className="flex w-full mt-8 p-[16px] flex-col items-start">
            <p className="text-[18px] font-semibold leading-[135%]">전체 인기 모임</p>
          </div>
          <OverallPopularMeetings />
        </>
      )}
    </div>
  );
};

export default SearchPage;
