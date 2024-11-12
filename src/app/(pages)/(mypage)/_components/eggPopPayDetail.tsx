"use client";

import { useQuery } from "@tanstack/react-query";
import { addHours, format, parseISO } from "date-fns";
import { getEggPopPayList } from "../_api/supabase";
import Image from "next/image";
import Link from "next/link";

const EggPopPayDetail = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["eggPopPayData"],
    queryFn: getEggPopPayList
  });

  const customAddress = (address: string) => {
    const withoutNumber = address?.replace(/\[\d+\]\s*/, "");
    const parts = withoutNumber?.split(" ");
    return parts?.slice(0, 2).join(" ");
  };

  const customDateFormat = (dateString: string | null | undefined) => {
    if (!dateString) {
      return "날짜 정보 없음";
    }

    try {
      const parsedDate = parseISO(dateString);
      return format(parsedDate, "yyyy. MM. dd");
    } catch (error) {
      console.error("날짜 포멧팅 실패:", dateString, error);
      return "유효하지 않은 날짜 형식";
    }
  };

  const customDate = (dateString: string | null | undefined) => {
    if (!dateString) {
      return "날짜 정보 없음";
    }

    try {
      const parsedDate = parseISO(dateString);
      const adjustedDate = addHours(parsedDate, 9);
      return format(adjustedDate, "MM월 dd일 HH:mm");
    } catch (error) {
      console.error("날짜 포멧팅 실패:", dateString, error);
      return "유효하지 않은 날짜 형식";
    }
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div className="egg-day-pay-list">
      {data?.map((oneTimeClub) => (
        <Link
          href={`/club/one-time-club-sub/${oneTimeClub.egg_pop_id.egg_pop_id}`}
          key={oneTimeClub.egg_pop_id.egg_pop_id}
        >
          <div key={oneTimeClub.egg_pop_id.egg_pop_id} className="oneTimeClub-card my-4 mb-[64px]">
            <div className="h-[35px] py-2 justify-start items-center gap-2.5 inline-flex">
              <div className="text-black text-sm font-semibold font-['Pretendard'] leading-[18.90px]">
                {customDateFormat(oneTimeClub.egg_pop_id.egg_pop_kakaopay_create_at)}
              </div>
            </div>

            <div className="h-[88px] justify-start items-center gap-2 inline-flex">
              <Image
                src={oneTimeClub.egg_pop_id.egg_pop_image}
                alt="payList"
                width={88}
                height={88}
                className="w-[88px] h-[88px] relative bg-[#d9d9d9] rounded-xl"
              />
              <div>
                <div className="inline-flex px-2 py-0.5 bg-primary-500 rounded-[124px] text-[10px] text-gray-900 font-pretendard font-normal leading-[14.50px]">
                  에그팝
                </div>
                <h3 className="text-sm font-semibold mt-2">{oneTimeClub.egg_pop_id.egg_pop_name}</h3>
                <div className="flex items-center mt-1 text-gray-400 text-sm">
                  <span>
                    <Image src={"/asset/Icon/Icon-Location.png"} alt="지도" width={16} height={16} />
                  </span>
                  <span className="ml-1">{customAddress(oneTimeClub.egg_pop_id.egg_pop_location)}</span>
                  <span className="ml-2">{customDate(oneTimeClub.egg_pop_id.egg_pop_date_time)}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EggPopPayDetail;
