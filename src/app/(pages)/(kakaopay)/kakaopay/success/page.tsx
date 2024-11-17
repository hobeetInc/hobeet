"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/store/AuthContext";
import { EggClubDataNoTax, EggClubPay, EggPopDataNoTax, EggPopPay } from "@/types/payment.types";
import { CustomAddress } from "@/utils/CustomAddress";
import Tag from "@/components/uiComponents/TagComponents/Tag";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Text from "@/components/uiComponents/TextComponents/Text";
import { Icon } from "@/components/uiComponents/IconComponents/Icon";
import { Button } from "@/components/uiComponents/Button/ButtonCom";
import { fetchClubData, fetchRegularClubId } from "../_api/fetchClub";
import { fetchPaymentData } from "../_api/fetchPayment";
import { approvePayment, fetchOrderData } from "../_api/kakaoPayment";
import { customDateFormat, customDateNotWeek } from "@/utils/CustomDate";

interface EggClubIdType {
  egg_club_id: number;
}

const PaymentSuccessPage = () => {
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
    const initClubData = async () => {
      const { requestUserId, clubId, clubType } = queryParams;
      if (!requestUserId || !clubId || clubType === null) {
        console.log("잘못된 요청입니다.");
        return;
      }

      try {
        const isOneTimeClub = clubType === "true";
        const { oneTimeClubData, regularClubData } = await fetchClubData(clubId, isOneTimeClub);

        if (oneTimeClubData) setOneTimeClubData(oneTimeClubData);
        if (regularClubData) setRegularClubData(regularClubData);
      } catch (error) {
        console.error("모임 정보를 불러오는 중 오류가 발생했습니다:", error);
        alert("모임 정보를 불러오는데 실패했습니다.");
        router.push("/signin");
      }
    };

    if (queryParams.requestUserId && queryParams.clubId && queryParams.clubType) {
      initClubData();
    }
  }, [queryParams, router]);

  // 결제 정보 불러오기
  useEffect(() => {
    const initPaymentData = async () => {
      const { requestUserId, clubId, clubType } = queryParams;
      if (!requestUserId || !clubId || clubType === null) {
        console.log("잘못된 요청입니다.");
        return;
      }

      try {
        const isOneTimeClub = clubType === "true";
        const { oneTimeClubPayData, regularClubPayData } = await fetchPaymentData(requestUserId, clubId, isOneTimeClub);

        if (oneTimeClubPayData) setOneTimeClubPayData(oneTimeClubPayData);
        if (regularClubPayData) setRegularClubPayData(regularClubPayData);
      } catch (error) {
        console.error("결제 정보를 불러오는 중 오류가 발생했습니다:", error);
        alert("결제 정보를 불러오는데 실패했습니다.");
      }
    };

    if (queryParams.requestUserId && queryParams.clubId && queryParams.clubType) {
      initPaymentData();
    }
  }, [queryParams]);

  // 결제 승인
  useEffect(() => {
    const initApprovePayment = async () => {
      const { requestUserId, clubId, clubType, pgToken } = queryParams;
      if (!requestUserId || !clubId || clubType === null || !pgToken) return;
      if (!oneTimeClubPayData && !regularClubPayData) return;

      try {
        await approvePayment({
          cid: oneTimeClubPayData?.egg_pop_kakaopay_cid || regularClubPayData?.egg_day_kakaopay_cid,
          tid: oneTimeClubPayData?.egg_pop_kakaopay_tid || regularClubPayData?.egg_day_kakaopay_tid,
          partner_order_id: clubId,
          partner_user_id: requestUserId,
          pg_token: pgToken
        });
      } catch (error) {
        console.error("결제 승인 중 오류가 발생했습니다:", error);
        alert("결제 승인에 실패했습니다.");
      }
    };

    if (
      queryParams.requestUserId &&
      queryParams.clubId &&
      queryParams.clubType &&
      (oneTimeClubPayData || regularClubPayData)
    ) {
      initApprovePayment();
    }
  }, [queryParams, oneTimeClubPayData, regularClubPayData]);

  // 주문 정보 조회
  useEffect(() => {
    const initOrderData = async () => {
      if (!oneTimeClubPayData && !regularClubPayData) return;

      try {
        const orderData = await fetchOrderData(
          oneTimeClubPayData?.egg_pop_kakaopay_cid || regularClubPayData?.egg_day_kakaopay_cid,
          oneTimeClubPayData?.egg_pop_kakaopay_tid || regularClubPayData?.egg_day_kakaopay_tid
        );

        setPaymentAmount(orderData.amount.total);
      } catch (error) {
        console.error("주문 정보를 불러오는 중 오류가 발생했습니다:", error);
        alert("주문 정보를 불러오는데 실패했습니다.");
      }
    };

    if (oneTimeClubPayData || regularClubPayData) {
      initOrderData();
    }
  }, [oneTimeClubPayData, regularClubPayData]);

  // 정기 모임 ID 조회
  useEffect(() => {
    const initClubId = async () => {
      try {
        const clubId = searchParams.get("clubId");
        if (!clubId) return;

        const data = await fetchRegularClubId(clubId);
        setEggClubId(data);
      } catch (error) {
        console.error("정기 모임 ID를 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    initClubId();
  }, [searchParams, oneTimeClubPayData, regularClubPayData]);

  const clubImageUrl =
    (queryParams.clubType === "true" ? oneTimeClubData?.egg_pop_image : regularClubData?.egg_day_image) || "";

  const handleGoToMyClub = () => {
    const { clubId, clubType } = queryParams;
    if (!clubId) return;

    localStorage.setItem("fromKakaoPay", "true");

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
      <div className="fixed top-0 right-0 left-0 flex w-full h-12 bg-white items-center">
        <div className="left-0 m-3">
          <button onClick={handleGoToMyClub}>
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

      <div className="flex items-center justify-center mt-12">
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
                      ? customDateNotWeek(oneTimeClubData?.egg_pop_date_time || "날짜 정보 없음").date
                      : customDateNotWeek(regularClubData?.egg_day_date_time || "날짜 정보 없음").date}
                  </Text>
                  <Text variant="body_medium-14">
                    {queryParams.clubType === "true"
                      ? customDateNotWeek(oneTimeClubData?.egg_pop_date_time || "날짜 정보 없음").time
                      : customDateNotWeek(regularClubData?.egg_day_date_time || "날짜 정보 없음").time}
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
export default PaymentSuccessPage;
