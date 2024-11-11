"use client";

import { useAuth } from "@/app/store/AuthContext";
import browserClient from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { EggClubDataNoTax, EggClubPay, EggPopDataNoTax, EggPopPay } from "@/types/payment.types";
import { CustomAddress } from "@/utils/CustomAddress";
import { CustomDateNotWeek } from "@/utils/CustomDate";
import Tag from "@/components/uiComponents/TagComponents/Tag";
import { LocationIcon } from "@/components/uiComponents/IconComponents/Icons";

interface EggClubIdType {
  egg_club_id: number;
}

const PaymentSuccesspage = () => {
  const [oneTimeClubPayData, setOneTimeClubPayData] = useState<EggPopPay | null>(null);
  const [regularClubPayData, setRegularClubPayData] = useState<EggClubPay | null>(null);
  const [oneTimeClubData, setOneTimeClubData] = useState<EggPopDataNoTax | null>();
  const [regularClubData, setRegularClubData] = useState<EggClubDataNoTax | null>();
  const [paymentAmount, setPaymentAmount] = useState(null);
  const [queryParams, setQueryParams] = useState<{
    requestUserId: string | null;
    clubId: string | null;
    clubType: string | null;
    pgToken: string | null;
  }>({
    requestUserId: null,
    clubId: null,
    clubType: null,
    pgToken: null
  });
  const [eggClubId, setEggClubId] = useState<EggClubIdType | null>(null);
  const supabase = browserClient;
  const router = useRouter();
  const { userName } = useAuth();
  const searchParams = useSearchParams();

  // 쿼리파라미터 추출
  useEffect(() => {
    const requestUserId = searchParams.get("requestUserId");
    const clubId = searchParams.get("clubId");
    const clubType = searchParams.get("clubType");
    const pgToken = searchParams.get("pg_token");

    setQueryParams({ requestUserId, clubId, clubType, pgToken });
  }, [searchParams]);

  // 모임 정보들 불러오기
  useEffect(() => {
    const fetchClub = async () => {
      try {
        const { requestUserId, clubId, clubType } = queryParams;

        if (!requestUserId || !clubId || clubType === null) {
          console.log("잘못된 요청입니다.");
          return;
        }

        const isOneTimeClub = clubType === "true";

        if (isOneTimeClub) {
          const { data: oneTimeClubFetchData, error: oneTimeClubFetchError } = await supabase
            .from("egg_pop")
            .select(
              "egg_pop_name, egg_pop_location, egg_pop_date_time, egg_pop_image, main_category_id, main_category:main_category_id(main_category_name)"
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
                egg_club_id (
                  main_category_id (main_category_name)
                )
              `
            )
            .eq("egg_day_id", parseInt(clubId))
            .single();

          if (regularClubFetchError || !regularClubFetchData) {
            console.error("모임 정보를 불러오는 중 오류가 발생했습니다.");
            return;
          }

          const formattedData: EggClubDataNoTax = {
            egg_day_name: regularClubFetchData.egg_day_name,
            egg_day_location: regularClubFetchData.egg_day_location,
            egg_day_date_time: regularClubFetchData.egg_day_date_time,
            egg_day_image: regularClubFetchData.egg_day_image,
            egg_club_id: {
              main_category_id: {
                main_category_name: regularClubFetchData.egg_club_id[0]?.main_category_id[0]?.main_category_name || ""
              }
            }
          };

          setRegularClubData(formattedData);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (queryParams.requestUserId && queryParams.clubId && queryParams.clubType) {
      fetchClub();
    }
  }, [queryParams]);

  // cid, tid 추출
  useEffect(() => {
    const fetchPayData = async () => {
      try {
        const { requestUserId, clubId, clubType } = queryParams;

        if (!requestUserId || !clubId || clubType === null) {
          console.log("잘못된 요청입니다.");
          return;
        }

        const isOneTimeClub = clubType === "true";

        if (isOneTimeClub) {
          const { data, error } = await supabase
            .from("egg_pop_kakaopay")
            .select("egg_pop_kakaopay_cid, egg_pop_kakaopay_tid")
            .eq("user_id", requestUserId)
            .eq("egg_pop_id", parseInt(clubId))
            .limit(1)
            .single();

          if (error || !data) {
            console.error("결제 정보를 불러오는 중 오류가 발생했습니다.");
            return;
          }

          setOneTimeClubPayData(data);
        } else {
          const { data, error } = await supabase
            .from("egg_day_kakaopay")
            .select("egg_day_kakaopay_cid, egg_day_kakaopay_tid")
            .eq("user_id", requestUserId)
            .eq("egg_day_id", parseInt(clubId))
            .limit(1)
            .single();

          if (error || !data) {
            console.error("결제 정보를 불러오는 중 오류가 발생했습니다.");
            return;
          }

          setRegularClubPayData(data);
        }
      } catch (err) {
        console.error("결제 정보를 불러오는 중 오류가 발생했습니다.", err);
      }
    };

    if (queryParams.requestUserId && queryParams.clubId && queryParams.clubType) {
      fetchPayData();
    }
  }, [queryParams]);

  // 결제승인
  useEffect(() => {
    const fetchApproveData = async () => {
      try {
        const { requestUserId, clubId, clubType, pgToken } = queryParams;

        if (!requestUserId || !clubId || clubType === null || !pgToken) {
          console.log("잘못된 요청입니다.");
          return;
        }

        if (!oneTimeClubPayData && !regularClubPayData) {
          return;
        }

        const response = await fetch("/api/kakaopayApprove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cid: oneTimeClubPayData?.egg_pop_kakaopay_cid || regularClubPayData?.egg_day_kakaopay_cid,
            tid: oneTimeClubPayData?.egg_pop_kakaopay_tid || regularClubPayData?.egg_day_kakaopay_tid,
            partner_order_id: clubId,
            partner_user_id: requestUserId,
            pg_token: pgToken
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API 요청 오류:", errorText);
          return;
        }

        // const approveData = await response.json();
        // console.log(approveData);
      } catch (err) {
        console.error("결제 정보를 불러오는 중 오류가 발생했습니다.", err);
      }
    };

    if (queryParams.requestUserId && queryParams.clubId && queryParams.clubType) {
      fetchApproveData();
    }
  }, [queryParams, oneTimeClubPayData, regularClubPayData]);

  // 주문조회
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        if (!oneTimeClubPayData && !regularClubPayData) {
          return;
        }

        const response = await fetch("/api/kakaopayOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cid: oneTimeClubPayData?.egg_pop_kakaopay_cid || regularClubPayData?.egg_day_kakaopay_cid,
            tid: oneTimeClubPayData?.egg_pop_kakaopay_tid || regularClubPayData?.egg_day_kakaopay_tid
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API 요청 오류:", errorText);
          return;
        }

        const orderData = await response.json();
        setPaymentAmount(orderData.amount.total);
        // console.log(orderData);
      } catch (err) {
        console.error("결제 정보를 불러오는 중 오류가 발생했습니다.", err);
      }
    };

    fetchOrderData();
  }, [oneTimeClubPayData, regularClubPayData]);

  useEffect(() => {
    const fetchClubId = async () => {
      const clubId = searchParams.get("clubId");
      const { data } = await supabase.from("egg_day").select("egg_club_id").eq("egg_day_id", parseInt(clubId)).single();
      setEggClubId(data);
    };

    fetchClubId();
  }, [oneTimeClubPayData, regularClubPayData]);

  const clubImageUrl =
    (queryParams.clubType === "true" ? oneTimeClubData?.egg_pop_image : regularClubData?.egg_day_image) || "";

  const handleGoToMyClub = () => {
    const { clubId, clubType } = queryParams;

    if (!clubId) return;

    if (clubType === "true") {
      router.push(`/club/one-time-club-sub/${clubId}`);
    } else {
      if (eggClubId) {
        router.push(`/club/regular-club-sub/${eggClubId.egg_club_id}/create/${clubId}`);
      }
    }
  };

  return (
    <div className="p-4  flex flex-col">
      <h2 className="text-center text-lg font-bold mb-2">주문완료</h2>
      <Image src={"/asset/Egg.png"} alt="egg" width={62} height={32} className="self-center mb-[8px]" />
      <p className="text-center text-gray-600 mb-1">모임 참여 신청이 완료됐어요!</p>

      <div className="border-b border-gray-200 my-4"></div>

      <div className="flex items-center mb-6">
        <div className="w-[88px] h-[88px] mr-2">
          <Image
            src={clubImageUrl}
            alt="모임 이미지"
            width={88}
            height={88}
            className="rounded-lg mr-2 object-cover w-[88px] h-[88px]"
          />
        </div>
        <div>
          {/* <div className="text-xs text-gray-400">
            {queryParams.clubType === "true"
              ? oneTimeClubData?.main_category?.main_category_name
              : regularClubData?.egg_club_id.main_category_id.main_category_name}
          </div> */}
          <Tag tagName={`${queryParams.clubType === "true" ? "eggpop" : "eggday"}`} className="mb-[4px]" />
          <div className="text-base font-semibold mb-[5px]">
            {queryParams.clubType === "true" ? oneTimeClubData?.egg_pop_name : regularClubData?.egg_day_name}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <LocationIcon />
            <span className="mx-[4px]"></span>
            <span>
              {queryParams.clubType === "true"
                ? CustomAddress(oneTimeClubData?.egg_pop_location || "주소 정보 없음")
                : CustomAddress(regularClubData?.egg_day_location || "주소 정보 없음")}
            </span>
            <span className="mx-[4px]"></span>
            <span>
              {queryParams.clubType === "true"
                ? CustomDateNotWeek(oneTimeClubData?.egg_pop_date_time || "날짜 정보 없음")
                : CustomDateNotWeek(regularClubData?.egg_day_date_time || "날짜 정보 없음")}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4">
        <span className="text-[#0c0c0c] text-lg font-medium font-['Pretendard'] leading-normal">결제 정보</span>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">이름</span>
          <span className="text-sm font-semibold">{userName}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">결제방법</span>
          <span className="text-sm font-semibold">카카오페이</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">결제 금액</span>
          <span className="text-sm font-semibold">{new Intl.NumberFormat("ko-KR").format(paymentAmount)}원</span>
        </div>
      </div>

      <div className="h-[50px] px-2.5 py-3.5 bg-neutral-800 rounded-[25px] justify-center items-center gap-2.5 inline-flex">
        <button className="text-white text-base font-semibold leading-snug" onClick={handleGoToMyClub}>
          내 모임으로 가기
        </button>
      </div>
    </div>
  );
};
export default PaymentSuccesspage;
