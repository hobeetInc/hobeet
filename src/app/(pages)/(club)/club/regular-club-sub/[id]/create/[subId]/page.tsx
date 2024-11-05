import Image from "next/image";
import React from "react";
import { getNotificationData, getNotificationMember } from "../../../../_api/supabase";
import { NotificaitonInfo, NotificationMember } from "./_types/notifictionInfo";
import CrewList from "./_components/CrewList";
import DayHeader from "./_components/DayHeader";

type SubSubPageProps = {
  params: {
    id: string;
    subId: string;
  };
};

const SubSubPage = async ({ params }: SubSubPageProps) => {
  const { id, subId } = params;
  const secondId = Number(subId);
  const clubId = Number(id);

  try {
    const data: NotificaitonInfo[] = await getNotificationData(clubId);
    const clubInfo = data.find((club) => club.r_c_notification_id === secondId);

    if (!clubInfo) {
      throw new Error("Club information not found");
    }
    // console.log("세컨드 아이디!!!!", secondId);

    const member: NotificationMember[] = await getNotificationMember(secondId);

    // console.log("맴버!!!", member);
    // 날짜 커스텀
    const date = clubInfo.r_c_notification_date_time;
    const currentDate = new Date(date);
    const addZero = (num: number) => String(num).padStart(2, "0");

    const hours = currentDate.getHours();
    const ampm = hours >= 12 ? "오후" : "오전";
    const displayHours = hours % 12 || 12;

    const formDate = `${currentDate.getFullYear()}년 ${
      currentDate.getMonth() + 1
    }월 ${currentDate.getDate()}일 ${ampm} ${displayHours}:${addZero(currentDate.getMinutes())}`;

    const location = clubInfo.r_c_notification_location || "";
    const currentLocation = location.split(" ").slice(1).join(" ");

    const tax = clubInfo.r_c_notification_tax ?? 0;
    const currentTax = tax === 0 ? "X" : tax.toLocaleString() + "원";

    const crewMembers = member.map((member) => ({
      notificationId: member.r_c_notification_id,
      userId: member.user_id,
      userName: member.user.user_name,
      userImage: member.user.user_profile_img
    }));

    const hostInfo = crewMembers.find((member) => member.userId === clubInfo.user_id);

    const defaultImage = "/default-profile-image.jpg"; // 실제 기본 이미지 경로로 변경하세요

    return (
      <div className="container">
        <DayHeader clubInfo={clubInfo} />
        <div className="flex flex-col w-full">
          <Image
            src={clubInfo.r_c_notification_image || defaultImage}
            alt={clubInfo.r_c_notification_name || "모임 이미지"}
            width={100}
            height={100}
            className="w-full"
          />
        </div>

        <div className="flex flex-col p-4">
          <div className="flex flex-col mt-4">
            <p className="text-[13px]">에그데이</p>
            <h1 className="font-bold text-[23px]">{clubInfo.r_c_notification_name}</h1>

            <div className="flex justify-first items-center border-b-4 border-red-600 mb-7 pb-4">
              <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full">
                <Image
                  src={hostInfo?.userImage || defaultImage}
                  alt={hostInfo?.userName || "호스트"}
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex">
                  <p>{hostInfo?.userName}</p>
                  <p className="text-[13px]">에그장</p>
                </div>
                <p className="text-[13px]">참여도</p>
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="text-lg font-semibold mb-2">상세 정보</h1>
              <p>일시: {formDate}</p>
              <p>장소: {currentLocation}</p>
              <p>참가비: {currentTax}</p>
            </div>

            <div className="flex flex-col">
              <h1 className="text-[20px] font-semibold">모임 소개</h1>
              <p>{clubInfo.r_c_notification_content}</p>
            </div>
          </div>
          <CrewList
            crewMembers={crewMembers}
            clubId={clubId}
            clubHostId={clubInfo.user_id}
            clubInfo={clubInfo}
            secondId={secondId} // clubInfo가 올바르게 전달되고 있는지 확인
          />{" "}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading club information:", error);
    return (
      <div className="container p-4">
        <h1 className="text-xl font-bold">오류가 발생했습니다</h1>
        <p>모임 정보를 불러오는 중 문제가 발생했습니다.</p>
      </div>
    );
  }
};

export default SubSubPage;
