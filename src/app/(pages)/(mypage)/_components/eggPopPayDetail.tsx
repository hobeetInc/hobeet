"use client";

import { useQuery } from "@tanstack/react-query";
import { addHours, format, parseISO } from "date-fns";
import { getEggPopPayList } from "../_api/supabase";
import Image from "next/image";
import Link from "next/link";
import { LocationIcon } from "@/components/uiComponents/icon/icons";

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
          <div key={oneTimeClub.egg_pop_id.egg_pop_id} className="oneTimeClub-card my-4">
            <div className="h-[35px] py-2 justify-start items-center gap-2.5 inline-flex">
              <div className="text-black text-sm font-semibold font-['Pretendard'] leading-[18.90px]">
                {customDateFormat(oneTimeClub.egg_pop_id.egg_pop_date_time)}
              </div>
            </div>

            <div className="w-[358px] h-[88px] justify-start items-center gap-2 inline-flex">
              <Image
                src={oneTimeClub.egg_pop_id.egg_pop_image}
                alt="payList"
                width={88}
                height={88}
                className="w-[88px] h-[88px] relative bg-[#d9d9d9] rounded-xl"
              />
              <div className="w-[248px] py-0.5 flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="px-2 py-0.5 bg-[#fdb800] rounded-[124px] justify-center items-center inline-flex">
                  <div className="text-[#0c0c0c] text-[10px] font-normal font-['Pretendard'] leading-[14.50px]">
                    에그팝
                  </div>
                </div>
                <div className="self-stretch text-[#0c0c0c] text-sm font-semibold font-['Pretendard'] leading-[18.90px]">
                  {oneTimeClub.egg_pop_id.egg_pop_name}
                </div>
                <div className="pt-[3px] justify-start items-center gap-2 inline-flex">
                  <div className="justify-start items-center gap-1 flex">
                    <div className="w-4 h-4 justify-center items-center flex">
                      <LocationIcon />
                    </div>
                    <div className="text-[#8c8c8c] text-sm font-medium font-['Pretendard'] leading-tight">
                      {customAddress(oneTimeClub.egg_pop_id.egg_pop_location)}
                    </div>
                  </div>
                  <div className="text-[#8c8c8c] text-sm font-medium font-['Pretendard'] leading-tight">
                    {customDate(oneTimeClub.egg_pop_id.egg_pop_date_time)}
                  </div>
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
