import Image from "next/image";
import React from "react";
import { getNotificationData, getNotificationMember } from "../../../../_api/supabase";
import { NotificaitonInfo, NotificationMember } from "./_types/notifictionInfo";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CrewList from "./_components/CrewList";
import DayHeader from "./_components/DayHeader";

type SubSubPageProps = {
  params: {
    id: string; // 첫 번째 동적 파라미터
    subId: string; // 두 번째 동적 파라미터
  };
};

const SubSubPage = async ({ params }: SubSubPageProps) => {
  const { id, subId } = params;

  const secondId = Number(subId);
  const clubId = Number(id);
  const data: NotificaitonInfo[] = await getNotificationData(clubId);

  // 임시 확인용
  //   console.log("이거 확인해!!!!!:", params);
  //   console.log("이거 확인해!!!!!:", subId);
  // console.log("이거 확인해!!!!!!!!!!!!!!!!!!!:", data);

  // 해당하는 클럽 정보 추출
  const clubInfo = data.find((club) => club.r_c_notification_id === secondId);

  console.log("해당 클럽!!", clubInfo);

  const member: NotificationMember[] = await getNotificationMember(clubInfo?.r_c_notification_id);

  // console.log("유저!!!!!!!", member);

  // 날짜 커스텀
  const date = clubInfo?.r_c_notification_date_time;
  const currentDate = new Date(date);
  const addZero = (num: number) => String(num).padStart(2, "0");

  // 오전/오후 판단
  const hours = currentDate.getHours();
  const ampm = hours >= 12 ? "오후" : "오전";
  const displayHours = hours % 12 || 12;

  const formDate = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월 ${currentDate.getDate()}일 ${ampm} ${displayHours}:${addZero(currentDate.getMinutes())}`;

  // 장소 커스텀
  const location = clubInfo?.r_c_notification_location;
  const currentLocation = location.split(" ").slice(1).join(" ");

  // 참가비 커스텀
  const tax = clubInfo?.r_c_notification_tax;
  const currentTax = tax === 0 ? "X" : tax.toLocaleString() + "원";

  //   console.log("택스", tax);

  //   참여 크루 정보 추출
  const crewMembers = member.map((member) => ({
    notificationId: member.r_c_notification_id,
    userId: member.user_id,
    userName: member.user.user_name,
    userImage: member.user.user_profile_img
  }));

  // 호스트 정보 추출
  const hostInfo = crewMembers.find((member) => member.userId === clubInfo?.user_id);

  // 임시 확인용
  // console.log("클럽 정보 아이디", clubInfo.user_id);
  // console.log("참여 크루", crewMembers);
  console.log("호스트 정보", hostInfo);

  return (
    <div className="container">
      <DayHeader clubInfo={clubInfo} />

      <div className="flex flex-col w-full">
        <Image
          src={clubInfo?.r_c_notification_image}
          alt={clubInfo?.r_c_notification_name}
          width={100}
          height={100}
          className="w-full"
        />
      </div>

      <div className="flex flex-col p-4">
        <div className="flex flex-col mt-4">
          <p className="text-[13px]">에그데이</p>

          <h1 className="font-bold text-[23px]">{clubInfo?.r_c_notification_name}</h1>

          <div className="flex justify-first items-center border-b-4 border-red-600 mb-7 pb-4">
            <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full">
              <Image
                src={hostInfo?.userImage || ""}
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
            <p>{clubInfo?.r_c_notification_content}</p>
          </div>
        </div>

        <CrewList crewMembers={crewMembers} clubId={secondId} clubHostId={clubInfo.user_id} clubInfo={clubInfo} />
      </div>
    </div>
  );
};

export default SubSubPage;
