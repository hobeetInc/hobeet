"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import PaymentButton from "../_components/KakaopayBtn";
import { EggDayData, EggPopData } from "@/types/payment.types";
import Radio from "@/components/uiComponents/Radio";
import Tag from "@/components/uiComponents/TagComponents/Tag";
import { CustomAddress } from "@/utils/CustomAddress";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Text from "@/components/uiComponents/TextComponents/Text";
import { Icon } from "@/components/uiComponents/IconComponents/Icon";
import { Button } from "@/components/uiComponents/Button/ButtonCom";
import { customDateNotWeek } from "@/utils/CustomDate";
import { useKakaopayRequest } from "@/hooks/useKakaopayRequest";
import { useAuthStore } from "@/store/authStore";

const PaymentConfirmPage = () => {
  const [agreeChecked, setAgreeChecked] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = useAuthStore((state) => state.userId);
  const clubType = searchParams.get("clubType");
  const clubId = searchParams.get("clubId") ?? "";
  const isOneTimeClub = clubType === "true";

  const { paymentClubQuery, isLoading, isError } = useKakaopayRequest(userId, clubId, isOneTimeClub);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>결제 모임 정보 처리 중 오류</div>;

  const clubData = isOneTimeClub ? paymentClubQuery.data?.oneTimeClubData : paymentClubQuery.data?.regularClubData;

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
    <div>
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
        <div className="w-6 m-3"></div>
      </div>

      <div className="mt-16">
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-2 mb-6 w-[390px] px-4">
            <div className="overflow-hidden w-[88px] h-[88px] flex justify-center items-center rounded-xl">
              {clubInfo.image ? (
                <Image
                  src={clubInfo.image}
                  alt="모임 이미지"
                  width={88}
                  height={88}
                  priority
                  className="rounded-xl object-cover w-[88px] h-[88px]"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <div>
              <Tag tagName={`${clubType === "true" ? "eggpop" : "eggday"}`} className="mb-0.5" />

              <Text variant="subtitle-14" className="mb-[5px]">
                {clubInfo.name}
              </Text>
              <div className="flex items-center">
                <div className="mr-1 w-4 h-4">
                  <Icon name="location" />
                </div>

                <Text variant="body_medium-14" className="text-gray-600 mr-2">
                  {CustomAddress(clubInfo.location || "")}
                </Text>

                <Text variant="body_medium-14" className="text-gray-600 mr-2">
                  {customDateNotWeek(clubInfo.dateTime || "").date}
                </Text>

                <Text variant="body_medium-14" className="text-gray-600">
                  {customDateNotWeek(clubInfo.dateTime || "").time}
                </Text>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-solid border-gray-50 bg-gray-50 h-[7px] w-full"></div>

        <div className="flex flex-col justify-center items-center">
          <div className="w-[390px] px-4">
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

            <div className="fixed bottom-[34px]   flex flex-col gap-[10px] justify-center items-start w-full h-[114px]">
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

              <div className="h-[50px] bg-neutral-800 rounded-[25px] justify-center items-center gap-2.5 inline-flex">
                {agreeChecked ? (
                  <PaymentButton
                    clubId={parseInt(clubId || "0")}
                    clubType={clubType === "true"}
                    agreeChecked={agreeChecked}
                  />
                ) : (
                  <Button className="w-[358px]" borderType="circle" disabled>
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
