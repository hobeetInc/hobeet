"use client";

import browserClient from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PaymentButton from "../_components/KakaopayBtn";
import { EggClubData, EggPopData } from "@/types/payment.types";
import Radio from "@/components/uiComponents/Radio";
import Tag from "@/components/uiComponents/TagComponents/Tag";
import { CustomAddress } from "@/utils/CustomAddress";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Text from "@/components/uiComponents/TextComponents/Text";
import { Icon } from "@/components/uiComponents/IconComponents/Icon";
import { Button } from "@/components/uiComponents/Button/ButtonCom";

const PaymentConfirmPage = () => {
  const [oneTimeClubData, setOneTimeClubData] = useState<EggPopData | null>();
  const [regularClubData, setRegularClubData] = useState<EggClubData | null>();
  const [agreeChecked, setAgreeChecked] = useState(false);
  const searchParams = useSearchParams();
  const supabase = browserClient;

  const clubType = searchParams.get("clubType");
  const clubId = searchParams.get("clubId");

  const router = useRouter();

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

  type DateTimeFormat = {
    date: string;
    time: string;
  };

  const CustomDateNotWeek = (dateTime: string): DateTimeFormat => {
    const date = new Date(dateTime);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return {
      date: `${month}월${day}일`,
      time: `${hours}:${minutes}`
    };
  };

  const dateTimeCustom = (date: string) => {
    const formattedDateTime = CustomDateNotWeek(date);
    return {
      date: formattedDateTime.date,
      time: formattedDateTime.time
    };
  };

  const clubImageUrl = (clubType === "true" ? oneTimeClubData?.egg_pop_image : regularClubData?.egg_day_image) || "";

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

      <div className="mt-4">
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-2 mb-6 w-[390px] px-4">
            <div className="overflow-hidden w-[88px] h-[88px] flex justify-center items-center rounded-xl">
              <Image
                src={clubImageUrl}
                alt="모임 이미지"
                width={88}
                height={88}
                className="rounded-xl object-cover w-[88px] h-[88px]"
              />
            </div>
            <div>
              <Tag tagName={`${clubType === "true" ? "eggpop" : "eggday"}`} className="mb-0.5" />

              <Text variant="subtitle-14" className="mb-[5px]">
                {" "}
                {clubType === "true" ? oneTimeClubData?.egg_pop_name : regularClubData?.egg_day_name}
              </Text>
              <div className="flex items-center">
                <div className="mr-1 w-4 h-4">
                  <Icon name="location" />
                </div>

                <Text variant="body_medium-14" className="text-gray-600 mr-2">
                  {" "}
                  {clubType === "true"
                    ? `${CustomAddress(oneTimeClubData?.egg_pop_location || "")}`
                    : CustomAddress(regularClubData?.egg_day_location || "")}{" "}
                </Text>

                <Text variant="body_medium-14" className="text-gray-600 mr-2">
                  {clubType === "true"
                    ? dateTimeCustom(oneTimeClubData?.egg_pop_date_time).date
                    : dateTimeCustom(regularClubData?.egg_day_date_time).date}
                </Text>

                <Text variant="body_medium-14" className="text-gray-600">
                  {clubType === "true"
                    ? dateTimeCustom(oneTimeClubData?.egg_pop_date_time).time
                    : dateTimeCustom(regularClubData?.egg_day_date_time).time}
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

                <Text variant="subtitle-18">
                  {clubType === "true"
                    ? new Intl.NumberFormat("ko-KR").format(oneTimeClubData?.egg_pop_tax || 0)
                    : new Intl.NumberFormat("ko-KR").format(regularClubData?.egg_day_tax || 0)}
                  원
                </Text>
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
