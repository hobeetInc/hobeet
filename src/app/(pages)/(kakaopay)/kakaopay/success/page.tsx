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
import { HiOutlineChevronLeft } from "react-icons/hi";
import Text from "@/components/uiComponents/TextComponents/Text";
import { addHours, format, parseISO } from "date-fns";
import { Icon } from "@/components/uiComponents/IconComponents/Icon";
import { Button } from "@/components/uiComponents/Button/ButtonCom";

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
            .select("egg_pop_kakaopay_cid, egg_pop_kakaopay_tid, egg_pop_kakaopay_create_at")
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
            .select("egg_day_kakaopay_cid, egg_day_kakaopay_tid, egg_day_kakaopay_create_at")
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

  const customDateFormat = (dateString: string | null | undefined) => {
    if (!dateString) {
      console.log("데이트", dateString);
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

  type DateTimeFormat = {
    date: string;
    time: string;
  };

  const customDate = (dateString: string | null | undefined): DateTimeFormat => {
    if (!dateString) {
      return {
        date: "유효하지 않은 날짜",
        time: "유효하지 않은 시간"
      };
    }

    try {
      const parsedDate = parseISO(dateString);
      const adjustedDate = addHours(parsedDate, 9);
      return {
        date: format(adjustedDate, "MM월 dd일"),
        time: format(adjustedDate, "HH:mm")
      };
    } catch (error) {
      console.error("날짜 포멧팅 실패:", dateString, error);
      return {
        date: "유효하지 않은 날짜",
        time: "유효하지 않은 시간"
      };
    }
  };

  return (
    <div className="p-4  flex flex-col">
      <div className="fixed top-0 right-0 left-0 flex w-full h-12 bg-white items-center">
        <div className="left-0 m-3">
          <button
            onClick={() => {
              router.back();
            }}
          >
            <HiOutlineChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-grow justify-center">
          <Text variant="header-16" className="text-gray-900">
            주문완료
          </Text>
        </div>
        <div className="w-6 m-3"></div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-[390px]">
          <div className="flex flex-col gap-2 mt-8">
            <Image
              src={"/asset/Egg.png"}
              alt="egg"
              width={62}
              height={32}
              className="self-center mb-[8px] w-[62px] h-8 object-cover"
            />

            <Text variant="header-18" className="text-center text-gray-900 mb-1">
              모임 참여 신청이 완료됐어요!
            </Text>

            <div className="border-b border-gray-200 my-4"></div>

            <div className="w-full h-[35px] flex items-center">
              <Text variant="subtitle-14">
                {" "}
                {queryParams.clubType === "true"
                  ? customDateFormat(oneTimeClubPayData?.egg_pop_kakaopay_create_at)
                  : customDateFormat(regularClubPayData?.egg_day_kakaopay_create_at)}
              </Text>
            </div>

            <div className="flex items-center h-[131px] border-b-2 border-solid border-gray-50 pb-[35px]">
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
                <Tag tagName={`${queryParams.clubType === "true" ? "eggpop" : "eggday"}`} className="mb-[4px]" />

                <Text variant="subtitle-14">
                  {queryParams.clubType === "true" ? oneTimeClubData?.egg_pop_name : regularClubData?.egg_day_name}
                </Text>

                <div className="flex items-center text-xs text-gray-600 gap-1">
                  <div className="mr-1 w-4 h-4">
                    <Icon name="location" />
                  </div>

                  <Text variant="body_medium-14">
                    {queryParams.clubType === "true"
                      ? CustomAddress(oneTimeClubData?.egg_pop_location || "주소 정보 없음")
                      : CustomAddress(regularClubData?.egg_day_location || "주소 정보 없음")}
                  </Text>
                  <Text variant="body_medium-14">
                    {queryParams.clubType === "true"
                      ? customDate(oneTimeClubData?.egg_pop_date_time || "날짜 정보 없음").date
                      : customDate(regularClubData?.egg_day_date_time || "날짜 정보 없음").date}
                  </Text>
                  <Text variant="body_medium-14">
                    {queryParams.clubType === "true"
                      ? customDate(oneTimeClubData?.egg_pop_date_time || "날짜 정보 없음").time
                      : customDate(regularClubData?.egg_day_date_time || "날짜 정보 없음").time}
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 w-[359px] h-[116px] flex-col justify-start items-start gap-4 inline-flex">
            <div className="self-stretch h-6 flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch justify-start items-center gap-2 inline-flex">
                <Text variant="body_medium-18" className="grow shrink basis-0">
                  결제 정보
                </Text>
              </div>
            </div>
            <div className="self-stretch h-[76px] flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch justify-start items-center gap-4 inline-flex">
                <Text variant="subtitle-14" className="w-[49px]">
                  이름
                </Text>
                <div className="w-[230px] text-gray-900 text-sm font-normal font-['Pretendard'] leading-tight">
                  {userName}
                </div>
              </div>
              <div className="self-stretch justify-start items-center gap-4 inline-flex">
                <Text variant="subtitle-14" className="w-[49px]">
                  결제방법
                </Text>

                <div className="w-[230px] text-gray-900 text-sm font-normal font-['Pretendard'] leading-tight">
                  카카오페이
                </div>
              </div>
              <div className="self-stretch justify-start items-center gap-4 inline-flex">
                <Text variant="subtitle-14" className="w-[49px]">
                  결제금액
                </Text>
                <div className="w-[230px] text-gray-900 text-sm font-normal font-['Pretendard'] leading-tight">
                  {new Intl.NumberFormat("ko-KR").format(paymentAmount)}원
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[82px] flex items-center justify-center fixed bottom-[34px] right-0 left-0">
            <Button colorType="black" borderType="circle" onClick={handleGoToMyClub}>
              내 모임으로 가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentSuccesspage;
