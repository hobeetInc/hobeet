"use client";

import { addHours, format, parseISO } from "date-fns";
import { getEggDayPayList } from "../_api/supabase";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

const EggDayPayDetail = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["eggDayPayData"],
    queryFn: getEggDayPayList
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
      console.error("Invalid date format:", dateString, error);
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
      {data?.map((notification, index) => (
        <div key={index} className="notification-card my-4">
          <div>{customDateFormat(notification.r_c_notification_kakaopay_create_at)}</div>
          <div className="notification-image">
            <Image
              src={notification.r_c_notification_id.r_c_notification_image}
              alt="payList"
              width={100}
              height={100}
            />
          </div>
          <div className="notification-content">
            <div className=" bg-gray-900 text-white text-xs px-2 py-1 rounded-full w-16 mt-2">에그데이</div>
            <h3 className="notification-title">{notification.r_c_notification_id.r_c_notification_name}</h3>
            <p className="notification-location">
              {customAddress(notification.r_c_notification_id.r_c_notification_location)}
            </p>
            <p className="notification-date">
              {customDate(notification.r_c_notification_id.r_c_notification_date_time)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EggDayPayDetail;
