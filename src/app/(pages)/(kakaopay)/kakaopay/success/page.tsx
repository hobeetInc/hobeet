"use client";

import { useAuth } from "@/app/store/AuthContext";
import browserClient from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { addHours, format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";

type OneTimeClubPay = {
  o_t_c_kakaopay_cid: string;
  o_t_c_kakaopay_tid: string;
};

type RegularClubPay = {
  r_c_notification_kakaopay_cid: string;
  r_c_notification_kakaopay_tid: string;
};

type OneTimeClubData = {
  one_time_club_name: string;
  one_time_club_location: string;
  one_time_club_date_time: string;
  one_time_image: string | null;
  m_category: {
    m_c_name: string;
  };
};

type RegularClubData = {
  r_c_notification_name: string;
  r_c_notification_location: string;
  r_c_notification_date_time: string;
  r_c_notification_image: string;
  r_c_id: {
    m_c_id: {
      m_c_name: string;
    };
  };
};

const PaymentSuccesspage = () => {
  const [oneTimeClubPayData, setOneTimeClubPayData] = useState<OneTimeClubPay | null>(null);
  const [regularClubPayData, setRegularClubPayData] = useState<RegularClubPay | null>(null);
  const [oneTimeClubData, setOneTimeClubData] = useState<OneTimeClubData | null>();
  const [regularClubData, setRegularClubData] = useState<RegularClubData | null>();
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

          const formattedData: RegularClubData = {
            r_c_notification_name: regularClubFetchData.r_c_notification_name,
            r_c_notification_location: regularClubFetchData.r_c_notification_location,
            r_c_notification_date_time: regularClubFetchData.r_c_notification_date_time,
            r_c_notification_image: regularClubFetchData.r_c_notification_image,
            r_c_id: {
              m_c_id: {
                m_c_name: regularClubFetchData.r_c_id[0]?.m_c_id[0]?.m_c_name || ""
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
            .eq("egg_club_id", parseInt(clubId))
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
            cid: oneTimeClubPayData?.o_t_c_kakaopay_cid || regularClubPayData?.r_c_notification_kakaopay_cid,
            tid: oneTimeClubPayData?.o_t_c_kakaopay_tid || regularClubPayData?.r_c_notification_kakaopay_tid,
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
            cid: oneTimeClubPayData?.o_t_c_kakaopay_cid || regularClubPayData?.r_c_notification_kakaopay_cid,
            tid: oneTimeClubPayData?.o_t_c_kakaopay_tid || regularClubPayData?.r_c_notification_kakaopay_tid
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

  // console.log(regularClubData?.r_c_id);

  const clubImageUrl =
    (queryParams.clubType === "true" ? oneTimeClubData?.one_time_image : regularClubData?.r_c_notification_image) || "";

  const handleGoToMyClub = () => {
    const { clubId, clubType } = queryParams;

    if (!clubId) return;

    if (clubType === "true") {
      router.push(`/club/one-time-club-sub/${clubId}`);
    } else {
      const r_c_id = regularClubData?.r_c_id;
      if (r_c_id) {
        router.push(`/club/regular-club-sub/${r_c_id}/create/${clubId}`);
      }
    }
  };

  return (
    <div className="font-sans p-5 max-w-md mx-auto">
      <h2 className="text-center text-lg font-bold mb-2">주문완료</h2>
      <p className="text-center text-gray-600 mb-1">모임 참여 신청이 완료됐어요!</p>

      <div className="border-b border-gray-200 my-4"></div>

      <div className="flex items-center mb-6">
        <Image src={clubImageUrl} alt="모임 이미지" width={60} height={60} className="rounded-lg mr-4 object-cover" />
        <div>
          <div className="text-xs text-gray-400">
            {queryParams.clubType === "true"
              ? oneTimeClubData?.m_category?.m_c_name
              : regularClubData?.r_c_id.m_c_id.m_c_name}
          </div>
          <div className="text-base font-semibold">
            {queryParams.clubType === "true"
              ? oneTimeClubData?.one_time_club_name
              : regularClubData?.r_c_notification_name}
          </div>
          <div className="text-xs text-gray-600">
            {queryParams.clubType === "true"
              ? customAddress(oneTimeClubData?.one_time_club_location || "주소 정보 없음")
              : customAddress(regularClubData?.r_c_notification_location || "주소 정보 없음")}
          </div>
          <div className="text-xs text-gray-600">
            {queryParams.clubType === "true"
              ? customDate(oneTimeClubData?.one_time_club_date_time || "닐짜 정보 없음")
              : customDate(regularClubData?.r_c_notification_date_time || "닐짜 정보 없음")}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">이름</span>
          <span className="text-sm font-semibold">{userName}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">결제 금액</span>
          <span className="text-sm font-semibold">{paymentAmount}원</span>
        </div>
      </div>
      {/* TODO 내 모임으로 가기 연결해야함 */}
      <button className="w-full py-3 bg-gray-300 text-gray-700 font-bold rounded-lg mt-5" onClick={handleGoToMyClub}>
        내 모임으로 가기
      </button>
    </div>
  );
};
export default PaymentSuccesspage;
