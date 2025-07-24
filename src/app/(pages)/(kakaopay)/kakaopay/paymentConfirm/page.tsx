"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import PaymentButton from "../_components/KakaopayBtn";
import Radio from "@/components/ui/atoms/Radio";
import Tag from "@/components/ui/atoms/tags/Tag";
import { CustomAddress } from "@/utils/CustomAddress";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Text from "@/components/ui/atoms/text/Text";
import { Icon } from "@/components/ui/atoms/icons/Icon";
import { Button } from "@/components/ui/atoms/buttons/ButtonCom";
import { customDateNotWeek } from "@/utils/CustomDate";
import { useAuthStore } from "@/store/authStore";
import { useKakaopayRequest } from "@/hooks/utils/api/useKakaopayRequest";
import { EggDayData, EggPopData } from "@/types/features/commerce/payment.types";
import LoadingSpinner from "@/components/ui/atoms/LoadingSpinner";
import useScreenSizeStore from "@/store/useScreenSizeStore";
const PaymentConfirmPage = () => {
  const [agreeChecked, setAgreeChecked] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);
  const userId = useAuthStore((state) => state.userId);
  const clubType = searchParams.get("clubType");
  const clubId = searchParams.get("clubId") ?? "";
  const isOneTimeClub = clubType === "true";

  // 결제할 클럽 상세 정보 조회
  const { paymentClubQuery, isLoading, isError } = useKakaopayRequest(userId, clubId, isOneTimeClub);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>결제 모임 정보 처리 중 오류</div>;

  // 모임 유형에 따른 분기 처리
  const clubData = isOneTimeClub ? paymentClubQuery.data?.oneTimeClubData : paymentClubQuery.data?.regularClubData;

  // 클럽 정보 구조화
  const clubInfo = isOneTimeClub
    ? {
        image: (clubData as EggPopData)?.egg_pop_image,
        name: (clubData as EggPopData)?.egg_pop_name,
        location: (clubData as EggPopData)?.egg_pop_location,
        dateTime: (clubData as EggPopData)?.egg_pop_date_time,
        tax: (clubData as EggPopData)?.egg_pop_tax
      }
    : {
        image: (clubData as EggDayData)?.egg_day_image,
        name: (clubData as EggDayData)?.egg_day_name,
        location: (clubData as EggDayData)?.egg_day_location,
        dateTime: (clubData as EggDayData)?.egg_day_date_time,
        tax: (clubData as EggDayData)?.egg_day_tax
      };

  return (
    <div className="lg:w-full">
      {isLargeScreen ? (
        <div className="mt-5 p-5">
          <Text variant="header-20" className="text-gray-900">
            결제하기
          </Text>
        </div>
      ) : (
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
              결제하기
            </Text>
          </div>
        </div>
      )}

      <div className="mt-5">
        <div className="flex justify-center items-center lg:justify-start">
          <div className="flex items-center gap-2 mb-6 w-[390px] px-4">
            <div className="overflow-hidden w-[88px] h-[88px] flex justify-center items-center rounded-xl lg:w-[144px] lg:h-[144px]">
              {clubInfo.image ? (
                <Image
                  src={clubInfo.image}
                  alt="모임 이미지"
                  width={isLargeScreen ? 144 : 88}
                  height={isLargeScreen ? 144 : 88}
                  priority
                  className="rounded-xl object-cover w-[88px] h-[88px] lg:w-[144px] lg:h-[144px]"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <div className="lg:ml-2">
              <Tag tagName={`${clubType === "true" ? "eggpop" : "eggday"}`} className="mb-0.5" />

              <Text variant={isLargeScreen ? "subtitle-16" : "subtitle-14"} className="mb-[5px]">
                {clubInfo.name}
              </Text>
              <div className="flex items-center">
                <div className="mr-1 w-4 h-4">
                  <Icon name="location" />
                </div>

                <Text variant="body_medium-14" className="text-gray-600 mr-2 whitespace-nowrap">
                  {CustomAddress(clubInfo.location || "")}
                </Text>

                <Text variant="body_medium-14" className="text-gray-600 mr-2 whitespace-nowrap">
                  {customDateNotWeek(clubInfo.dateTime || "").date}
                </Text>

                <Text variant="body_medium-14" className="text-gray-600 whitespace-nowrap">
                  {customDateNotWeek(clubInfo.dateTime || "").time}
                </Text>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-solid border-gray-50 bg-gray-50 h-[7px] w-full lg:mt-4"></div>

        <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start">
          <div className="w-[390px] px-4 lg:w-full">
            <div className="border-gray-50 border-b-2 py-4 h-[88px] border-solid">
              <div className="flex justify-between items-center w-full h-full">
                <Text variant="subtitle-18">결제 금액</Text>

                <Text variant="subtitle-18">{new Intl.NumberFormat("ko-KR").format(clubInfo.tax || 0)}원</Text>
              </div>
            </div>

            <div className="border-gray-50 border-b-2 py-4 h-[120px] border-solid flex flex-col justify-center mb-8">
              <h3 className="font-semibold mb-2">결제수단</h3>
              <div className="flex items-center">
                <Radio isSelected={true} />
                <label htmlFor="kakaoPay" className="ml-2 text-sm ">
                  카카오페이
                </label>
              </div>
            </div>
            <div className="mb-[64px]">
              <h3 className="font-semibold mb-2">참가비 환불 규정</h3>
              <p className="text-sm text-gray-600 mb-[2px]">모임 시작 일주일 전: 전액 환불</p>
              <p className="text-sm text-gray-600 mb-[2px]">모임 시작 3일 전: 50% 환불</p>
              <p className="text-sm text-gray-600">모임 시작 1일 전: 환불 불가</p>
            </div>

            <div className="fixed bottom-[34px] flex flex-col gap-[10px] justify-center items-start w-full h-[114px] lg:max-w-[1024px] lg:relative">
              <label htmlFor="agree" className="flex items-center cursor-pointer">
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

              <div className="h-[50px] bg-primary-500 rounded-[25px] justify-center items-center gap-2.5 inline-flex lg:w-full">
                {agreeChecked ? (
                  <PaymentButton
                    clubId={parseInt(clubId || "0")}
                    clubType={clubType === "true"}
                    agreeChecked={agreeChecked}
                  />
                ) : (
                  <Button className="w-[358px] lg:w-full" borderType="circle" disabled>
                    결제하기
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmPage;
