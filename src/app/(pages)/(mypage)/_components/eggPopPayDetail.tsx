"use client";

import { useQuery } from "@tanstack/react-query";
import { addHours, format, parseISO } from "date-fns";
import { getEggPopPayList } from "../_api/supabase";
import Image from "next/image";

const EggPopPayDetail = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["eggPopPayData"],
    queryFn: getEggPopPayList
  });

  const customAddress = (address: string) => {
    const withoutNumber = address?.replace(/\[\d+\]\s*/, "");
    const parts = withoutNumber?.split(" ");
    return parts?.slice(0, 2).join(" ");
  };

  const customDate = (dateString: string | null | undefined) => {
    if (!dateString) {
      return "날짜 정보 없음";
    }

    try {
      const parsedDate = parseISO(dateString);
      const adjustedDate = addHours(parsedDate, 9);
      return format(adjustedDate, "yy년 MM월 dd일 HH:mm");
    } catch (error) {
      console.error("Invalid date format:", dateString, error);
      return "유효하지 않은 날짜 형식";
    }
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  console.log(data);

  return (
    <div className="egg-day-pay-list">
      {data?.map((oneTimeClub, index) => (
        <div key={index} className="oneTimeClub-card">
          <div>{oneTimeClub.o_t_c_kakaopay_create_at}</div>
          <div className="oneTimeClub-image">
            <Image src={oneTimeClub.o_t_c_id.one_time_image} alt="payList" width={100} height={100} />
          </div>
          <div className="oneTimeClub-content">
            <span className="oneTimeClub-badge">에그데이</span>
            <h3 className="oneTimeClub-title">{oneTimeClub.o_t_c_id.one_time_club_name}</h3>
            <p className="oneTimeClub-location">{customAddress(oneTimeClub.o_t_c_id.one_time_club_location)}</p>
            <p className="oneTimeClub-date">{customDate(oneTimeClub.o_t_c_id.one_time_club_date_time)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EggPopPayDetail;
