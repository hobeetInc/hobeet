"use client";

import { OneTimeClubForm } from "@/app/(pages)/(club)/club/_types/ClubForm";
import browserClient from "@/utils/supabase/client";
import Image from "next/image";
import { addHours, format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { PaymentButtonProps } from "../_components/KakaopayBtn";

type RegularLimited = {
  r_c_id: {
    regular_club_people_limited: number;
  }[];
};

type Rcnotification = {
  r_c_notification_id: number;
  user_id: string;
  r_c_notification_name: string;
  r_c_notification_content: string;
  r_c_notification_date_time: string;
  r_c_notification_location: string;
  r_c_notification_tax: number;
  r_c_notification_create_at: string;
  r_c_id: number;
  r_c_notification_image: string;
};

const PaymentSummaryPage = (/*{ clubType, clubId }: PaymentButtonProps*/) => {
  const [clubId] = useState(45); // 테스트용
  const [clubType] = useState(true); // 테스트용
  const [ClubData, setClubData] = useState<OneTimeClubForm | Rcnotification | null>(null);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [regularLimited, setRegularLimited] = useState<RegularLimited>();
  const router = useRouter();
  const supabase = browserClient;

  const handlePaymentClick = () => {
    router.push(`/kakaopay/paymentConfirm?clubType=${clubType}&clubId=${clubId}`);
  };

  useEffect(() => {
    if (clubType === true) {
      const fetchOneTimeClub = async () => {
        const { data, error } = await supabase
          .from("one_time_club")
          .select("*")
          .eq("one_time_club_id", clubId)
          .single();

        if (error) {
          console.error("모임 정보를 불러오는 중 오류가 발생했습니다.:", error);
          return;
        }

        setClubData(data);
      };

      const fetchOneTimeMemberCount = async () => {
        const { count, error } = await supabase
          .from("o_t_c_member")
          .select("user_id", { count: "exact" })
          .eq("o_t_c_id", clubId);

        if (error) {
          console.error("회원 수를 불러오는 중 오류가 발생했습니다:", error);
          return;
        }

        setMemberCount(count || 0);
      };

      fetchOneTimeClub();
      fetchOneTimeMemberCount();
    } else {
      const fetchRegularClub = async () => {
        const { data, error } = await supabase
          .from("r_c_notification")
          .select("*")
          .eq("r_c_notification_id", clubId)
          .single();

        if (error) {
          console.error("모임 정보를 불러오는 중 오류가 발생했습니다.:", error);
          return;
        }

        setClubData(data);
      };

      const fetchRegularMemberCount = async () => {
        const { count, error } = await supabase
          .from("r_c_notification_member")
          .select("user_id", { count: "exact" })
          .eq("r_c_notification_id", clubId)
          .single();

        if (error) {
          console.error("회원 수를 불러오는 중 오류가 발생했습니다:", error);
          return;
        }

        setMemberCount(count || 0);
      };

      const fetchRegularLimited = async () => {
        const { data, error } = await supabase
          .from("r_c_notification")
          .select("r_c_id(regular_club_people_limited)")
          .eq("r_c_notification_id", clubId)
          .single();

        if (error) {
          console.error("최대 정원을 불러오는 중 오류가 발생했습니다:", error);
          return;
        }

        setRegularLimited(data);
        console.log(data);
      };

      fetchRegularClub();
      fetchRegularMemberCount();
      fetchRegularLimited();
    }
  }, [clubId]);

  const customAddress = (address: string) => {
    const withoutNumber = address?.replace(/\[\d+\]\s*/, "");
    const parts = withoutNumber?.split(" ");
    return parts?.slice(0, 2).join(" ");
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

  return (
    <div className="font-sans p-5 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-center text-lg font-bold">결제하기</h2>
      </div>

      <div className="flex items-center mb-6">
        <Image
          src={
            clubType === true
              ? ((ClubData as OneTimeClubForm)?.one_time_image as string)
              : ((ClubData as Rcnotification)?.r_c_notification_image as string)
          }
          alt="모임 이미지"
          width={60}
          height={60}
          className="rounded-lg object-cover"
        />
        <div className="ml-4">
          <div className="flex items-center mb-1">
            <span className="bg-yellow-500 text-white text-xs font-semibold py-1 px-2 rounded">
              {clubType === true ? "에그팝" : "에그데이"}
            </span>
          </div>
          <div className="text-lg font-semibold">
            {clubType === true
              ? (ClubData as OneTimeClubForm)?.one_time_club_name
              : (ClubData as Rcnotification)?.r_c_notification_name}
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <span className="material-icons-outlined text-gray-500 mr-1"></span>
            <span>
              {clubType === true
                ? customAddress((ClubData as OneTimeClubForm)?.one_time_club_location || "주소 정보 없음")
                : customAddress((ClubData as Rcnotification)?.r_c_notification_location || "주소 정보 없음")}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {clubType === true
              ? customDate((ClubData as OneTimeClubForm)?.one_time_club_date_time || "날짜 정보 없음")
              : customDate((ClubData as Rcnotification)?.r_c_notification_date_time || "날짜 정보 없음")}
          </div>
          <div className="text-sm text-gray-500">
            멤버 {memberCount} /{" "}
            {clubType === true
              ? (ClubData as OneTimeClubForm)?.one_time_people_limited
              : regularLimited?.r_c_id[0]?.regular_club_people_limited || "정보 없음"}
          </div>
        </div>
      </div>

      <button className="w-full py-3 bg-black text-white font-bold rounded-lg" onClick={handlePaymentClick}>
        결제하기
      </button>
    </div>
  );
};

export default PaymentSummaryPage;
