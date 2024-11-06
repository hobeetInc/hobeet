"use client";

import browserClient from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { addHours, format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PaymentButton from "../_components/KakaopayBtn";
import { EggClubData, EggPopData } from "@/types/payment.types";

const PaymentConfirmPage = () => {
  const [oneTimeClubData, setOneTimeClubData] = useState<EggPopData | null>();
  const [regularClubData, setRegularClubData] = useState<EggClubData | null>();
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
        //true면 에크팝 , false면 에크데이
        const isOneTimeClub = clubType === "true";

        if (isOneTimeClub) {
          const { data: oneTimeClubFetchData, error: oneTimeClubFetchError } = await supabase
            .from("egg_pop")
            .select(
              "egg_pop_name, egg_pop_location, egg_pop_date_time, egg_pop_tax, egg_pop_image, main_category_id, main_category:main_category_id(main_category_name)"
            )
            .eq("egg_pop_id", parseInt(clubId))
            .single();

          if (oneTimeClubFetchError || !oneTimeClubFetchData) {
            console.error("모임 정보를 불러오는 중 오류가 발생했습니다.");
            return;
          }

          setOneTimeClubData(Array.isArray(oneTimeClubFetchData) ? oneTimeClubFetchData[0] : oneTimeClubFetchData);
          // console.log(oneTimeClubFetchData);
        } else {
          const { data: regularClubFetchData, error: regularClubFetchError } = await supabase
            .from("egg_day")
            .select(
              `
                egg_day_name,
                egg_day_location,
                egg_day_date_time,
                egg_day_image,
                egg_day_tax,
                egg_club_id (
                  main_category_id (main_category_name)
                )
              `
            )
            .eq("egg_day_id", parseInt(clubId))
            .single();

          // console.log(regularClubFetchData);
          if (regularClubFetchError || !regularClubFetchData) {
            console.error("모임 정보를 불러오는 중 오류가 발생했습니다.");
            return;
          }

          const formattedData: EggClubData = {
            egg_day_name: regularClubFetchData.egg_day_name,
            egg_day_location: regularClubFetchData.egg_day_location,
            egg_day_date_time: regularClubFetchData.egg_day_date_time,
            egg_day_image: regularClubFetchData.egg_day_image,
            egg_day_tax: regularClubFetchData.egg_day_tax,
            egg_club_id: Array.isArray(regularClubFetchData.egg_club_id)
              ? { main_category_id: regularClubFetchData.egg_club_id[0].main_category_id }
              : regularClubFetchData.egg_club_id
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

  const clubImageUrl = (clubType === "true" ? oneTimeClubData?.egg_pop_image : regularClubData?.egg_day_image) || "";

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
              ? oneTimeClubData?.main_category?.main_category_name
              : Array.isArray(regularClubData?.egg_club_id.main_category_id)
              ? regularClubData?.egg_club_id.main_category_id[0]?.main_category_name
              : regularClubData?.egg_club_id.main_category_id?.main_category_name}
          </span>
          <div className="text-lg font-semibold">
            {clubType === "true" ? oneTimeClubData?.egg_pop_name : regularClubData?.egg_day_name}
          </div>
          <div className="text-sm text-gray-600">
            {clubType === "true"
              ? customAddress(oneTimeClubData?.egg_pop_location || "")
              : customAddress(regularClubData?.egg_day_location || "")}
          </div>
          <div className="text-sm text-gray-600">
            {clubType === "true"
              ? customDate(oneTimeClubData?.egg_pop_date_time)
              : customDate(regularClubData?.egg_day_date_time)}
          </div>
        </div>
      </div>
      <div className="border-t border-b py-4 mb-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>결제 금액</span>
          <span>{clubType === "true" ? oneTimeClubData?.egg_pop_tax : regularClubData?.egg_day_tax}원</span>
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
      <label htmlFor="agree" className="mb-4 flex items-center cursor-pointer">
        <input
          type="checkbox"
          id="agree"
          checked={agreeChecked}
          onChange={(e) => setAgreeChecked(e.target.checked)}
          className="hidden"
        />
        <div>
          <Image
            src={agreeChecked ? "/asset/Icon/checkbox-selected.png" : "/asset/Icon/checkbox-default.png"}
            alt={agreeChecked ? "checked" : "unchecked"}
            width={24}
            height={24}
          />
        </div>
        <span className="ml-2 text-sm">주문 내용을 확인했으며, 결제에 동의합니다</span>
      </label>

      <PaymentButton clubId={parseInt(clubId || "0")} clubType={clubType === "true"} agreeChecked={agreeChecked} />
    </div>
  );
};

export default PaymentConfirmPage;
