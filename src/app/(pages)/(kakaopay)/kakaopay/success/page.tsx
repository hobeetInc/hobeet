"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/store/AuthContext";
import { useKakaopayRequest } from "@/hooks/useKakaopayRequest";
import { customDateFormat, customDateNotWeek } from "@/utils/CustomDate";
import { CustomAddress } from "@/utils/CustomAddress";
import { EggPopPay, EggClubPay, EggPopDataNoTax, EggClubDataNoTax } from "@/types/payment.types";
import { approvePayment, fetchOrderData } from "../_api/kakaoPayment";
import Text from "@/components/uiComponents/TextComponents/Text";
import { Button } from "@/components/uiComponents/Button/ButtonCom";
import { Icon } from "@/components/uiComponents/IconComponents/Icon";
import Tag from "@/components/uiComponents/TagComponents/Tag";
import { HiOutlineChevronLeft } from "react-icons/hi";

const PaymentSuccessPage = () => {
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);
  const router = useRouter();
  const { userName } = useAuth();
  // URL 파라미터 추출
  const searchParams = useSearchParams();
  const requestUserId = searchParams.get("requestUserId") ?? "";
  const clubId = searchParams.get("clubId") ?? "";
  const clubType = searchParams.get("clubType");
  const pgToken = searchParams.get("pg_token");
  const isOneTimeClub = clubType === "true";

  const { clubQuery, paymentQuery, regularClubIdQuery, isLoading, isError } = useKakaopayRequest(
    requestUserId,
    clubId,
    isOneTimeClub
  );

  useEffect(() => {
    const processPayment = async () => {
      // 필요한 데이터 검증
      if (!paymentQuery.data || !pgToken) return;

      // 클럽 타입에 따른 결제 데이터 분기
      const payData = isOneTimeClub
        ? (paymentQuery.data.oneTimeClubPayData as EggPopPay)
        : (paymentQuery.data.regularClubPayData as EggClubPay);

      if (!payData) return;

      // 카카오페이 결제 정보 추출
      try {
        const cid = isOneTimeClub
          ? (payData as EggPopPay).egg_pop_kakaopay_cid
          : (payData as EggClubPay).egg_day_kakaopay_cid;

        const tid = isOneTimeClub
          ? (payData as EggPopPay).egg_pop_kakaopay_tid
          : (payData as EggClubPay).egg_day_kakaopay_tid;

        // 결제 승인 요청
        await approvePayment({
          cid,
          tid,
          partner_order_id: clubId,
          partner_user_id: requestUserId,
          pg_token: pgToken
        });

        // 주문 정보 조회 및 금액 설정
        const orderData = await fetchOrderData(cid, tid);
        setPaymentAmount(orderData.amount.total);
      } catch (error) {
        console.error("결제 처리 중 오류가 발생했습니다:", error);
        alert("결제 처리에 실패했습니다.");
      }
    };

    processPayment();
  }, [paymentQuery.data, pgToken, clubId, requestUserId, isOneTimeClub]);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다</div>;

  const clubData = isOneTimeClub ? clubQuery.data?.oneTimeClubData : clubQuery.data?.regularClubData;

  const clubInfo = isOneTimeClub
    ? {
        image: (clubData as EggPopDataNoTax)?.egg_pop_image,
        name: (clubData as EggPopDataNoTax)?.egg_pop_name,
        location: (clubData as EggPopDataNoTax)?.egg_pop_location,
        dateTime: (clubData as EggPopDataNoTax)?.egg_pop_date_time
      }
    : {
        image: (clubData as EggClubDataNoTax)?.egg_day_image,
        name: (clubData as EggClubDataNoTax)?.egg_day_name,
        location: (clubData as EggClubDataNoTax)?.egg_day_location,
        dateTime: (clubData as EggClubDataNoTax)?.egg_day_date_time
      };

  const payData = isOneTimeClub ? paymentQuery.data?.oneTimeClubPayData : paymentQuery.data?.regularClubPayData;

  const handleGoToMyClub = () => {
    if (!clubId) return;

    localStorage.setItem("fromKakaoPay", "true");

    if (isOneTimeClub) {
      router.push(`/club/one-time-club-sub/${clubId}`);
    } else if (regularClubIdQuery.data?.egg_club_id) {
      router.push(`/club/regular-club-sub/${regularClubIdQuery.data.egg_club_id}/create/${clubId}`);
    }
  };

  return (
    <div className="p-4 flex flex-col">
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
              src="/asset/Egg.png"
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
                {payData &&
                  customDateFormat(
                    isOneTimeClub
                      ? (payData as EggPopPay).egg_pop_kakaopay_create_at
                      : (payData as EggClubPay).egg_day_kakaopay_create_at
                  )}
              </Text>
            </div>

            <div className="flex items-center h-[131px] border-b-2 border-solid border-gray-50 pb-[35px]">
              <div className="w-[88px] h-[88px] mr-2">
                <Image
                  src={clubInfo.image || ""}
                  alt="모임 이미지"
                  width={88}
                  height={88}
                  className="rounded-lg mr-2 object-cover w-[88px] h-[88px]"
                />
              </div>

              <div>
                <Tag tagName={isOneTimeClub ? "eggpop" : "eggday"} className="mb-[4px]" />
                <Text variant="subtitle-14">{clubInfo.name}</Text>

                <div className="flex items-center text-xs text-gray-600 gap-1">
                  <div className="mr-1 w-4 h-4">
                    <Icon name="location" />
                  </div>

                  <Text variant="body_medium-14">{CustomAddress(clubInfo.location || "주소 정보 없음")}</Text>
                  <Text variant="body_medium-14">{customDateNotWeek(clubInfo.dateTime || "날짜 정보 없음").date}</Text>
                  <Text variant="body_medium-14">{customDateNotWeek(clubInfo.dateTime || "날짜 정보 없음").time}</Text>
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
                  {paymentAmount && new Intl.NumberFormat("ko-KR").format(paymentAmount)}원
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
