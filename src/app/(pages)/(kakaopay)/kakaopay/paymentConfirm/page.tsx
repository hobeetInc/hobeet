"use client";

import browserClient from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { addHours, format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PaymentButton from "../_components/KakaopayBtn";

type OneTimeClubData = {
  one_time_club_name: string;
  one_time_club_location: string;
  one_time_club_date_time: string;
  one_time_image: string | null;
  one_time_tax: number;
  m_category: {
    m_c_name: string;
  };
};

type RegularClubData = {
  r_c_notification_name: string;
  r_c_notification_location: string;
  r_c_notification_date_time: string;
  r_c_notification_image: string;
  r_c_notification_tax: number;
  r_c_id:
    | {
        m_c_id: {
          m_c_name: string;
        };
      }
    | {
        m_c_id: Array<{
          m_c_name: string;
        }>;
      };
};

const PaymentConfirmPage = () => {
  const [oneTimeClubData, setOneTimeClubData] = useState<OneTimeClubData | null>();
  const [regularClubData, setRegularClubData] = useState<RegularClubData | null>();
  const [agreeChecked, setAgreeChecked] = useState(false);
  const searchParams = useSearchParams();
  const supabase = browserClient;

  const clubType = searchParams.get("clubType");
  const clubId = searchParams.get("clubId");

  useEffect(() => {
    const fetchClub = async () => {
      try {
        if (!clubId || clubType === null) {
          console.log("잘못된 요청입니다.");
          return;
        }

        const isOneTimeClub = clubType === "true";

        if (isOneTimeClub) {
          const { data: oneTimeClubFetchData, error: oneTimeClubFetchError } = await supabase
            .from("one_time_club")
            .select(
              "one_time_club_name, one_time_club_location, one_time_club_date_time, one_time_tax, one_time_image, m_c_id, m_category:m_c_id(m_c_name)"
            )
            .eq("one_time_club_id", parseInt(clubId))
            .single();

          if (oneTimeClubFetchError || !oneTimeClubFetchData) {
            console.error("모임 정보를 불러오는 중 오류가 발생했습니다.");
            return;
          }

          setOneTimeClubData(Array.isArray(oneTimeClubFetchData) ? oneTimeClubFetchData[0] : oneTimeClubFetchData);
          // console.log(oneTimeClubFetchData);
        } else {
          const { data: regularClubFetchData, error: regularClubFetchError } = await supabase
            .from("r_c_notification")
            .select(
              `
                r_c_notification_name,
                r_c_notification_location,
                r_c_notification_date_time,
                r_c_notification_image,
                r_c_notification_tax,
                r_c_id (
                  m_c_id (m_c_name)
                )
              `
            )
            .eq("r_c_notification_id", parseInt(clubId))
            .single();

          // console.log(regularClubFetchData);
          if (regularClubFetchError || !regularClubFetchData) {
            console.error("모임 정보를 불러오는 중 오류가 발생했습니다.");
            return;
          }

          const formattedData: RegularClubData = {
            r_c_notification_name: regularClubFetchData.r_c_notification_name,
            r_c_notification_location: regularClubFetchData.r_c_notification_location,
            r_c_notification_date_time: regularClubFetchData.r_c_notification_date_time,
            r_c_notification_image: regularClubFetchData.r_c_notification_image,
            r_c_notification_tax: regularClubFetchData.r_c_notification_tax,
            r_c_id: Array.isArray(regularClubFetchData.r_c_id)
              ? { m_c_id: regularClubFetchData.r_c_id[0].m_c_id }
              : regularClubFetchData.r_c_id
          };

          setRegularClubData(formattedData);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchClub();
  }, [clubId, clubType, supabase]);

  const customAddress = (address: string) => {
    const withoutNumber = address.replace(/\[\d+\]\s*/, "");
    const parts = withoutNumber.split(" ");
    return parts.slice(0, 2).join(" ");
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

  const clubImageUrl =
    (clubType === "true" ? oneTimeClubData?.one_time_image : regularClubData?.r_c_notification_image) || "";

  return (
    <div className="p-5 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <h2 className="flex-1 text-center font-bold">결제하기</h2>
      </div>
      <div className="flex items-center mb-6">
        <Image src={clubImageUrl} alt="모임 이미지" width={60} height={60} className="rounded-lg mr-4 object-cover" />
        <div>
          <span className="text-xs bg-gray-200 py-1 px-2 rounded-full">
            {clubType === "true"
              ? oneTimeClubData?.m_category?.m_c_name
              : Array.isArray(regularClubData?.r_c_id.m_c_id)
              ? regularClubData?.r_c_id.m_c_id[0]?.m_c_name
              : regularClubData?.r_c_id.m_c_id?.m_c_name}
          </span>
          <div className="text-lg font-semibold">
            {clubType === "true" ? oneTimeClubData?.one_time_club_name : regularClubData?.r_c_notification_name}
          </div>
          <div className="text-sm text-gray-600">
            {clubType === "true"
              ? customAddress(oneTimeClubData?.one_time_club_location || "")
              : customAddress(regularClubData?.r_c_notification_location || "")}
          </div>
          <div className="text-sm text-gray-600">
            {clubType === "true"
              ? customDate(oneTimeClubData?.one_time_club_date_time)
              : customDate(regularClubData?.r_c_notification_date_time)}
          </div>
        </div>
      </div>
      <div className="border-t border-b py-4 mb-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>결제 금액</span>
          <span>{clubType === "true" ? oneTimeClubData?.one_time_tax : regularClubData?.r_c_notification_tax}원</span>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">참가비 환불 규정</h3>
        <p className="text-sm text-gray-600">모임 시작 일주일 전: 전액 환불</p>
        <p className="text-sm text-gray-600">모임 시작 3일 전: 50% 환불</p>
        <p className="text-sm text-gray-600">모임 시작 1일 전: 환불 불가</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">결제수단</h3>
        <div className="flex items-center">
          <input type="radio" id="kakaoPay" name="payment" defaultChecked />
          <label htmlFor="kakaoPay" className="ml-2 text-sm">
            카카오페이
          </label>
        </div>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="agree"
          checked={agreeChecked}
          onChange={(e) => setAgreeChecked(e.target.checked)}
          className="hidden"
        />

        <div className="cursor-pointer" onClick={() => setAgreeChecked(!agreeChecked)}>
          {agreeChecked ? (
            <Image src={"/asset/Icon/checkbox-selected.png"} alt="checked" width={24} height={24} />
          ) : (
            <Image src={"/asset/Icon/checkbox-default.png"} alt="unChecked" width={24} height={24} />
          )}
        </div>

        <label htmlFor="agree" className="ml-2 text-sm cursor-pointer" onClick={() => setAgreeChecked(!agreeChecked)}>
          주문 내용을 확인했으며, 결제에 동의합니다
        </label>
      </div>
      <PaymentButton clubId={parseInt(clubId || "0")} clubType={clubType === "true"} agreeChecked={agreeChecked} />
    </div>
  );
};

export default PaymentConfirmPage;
