"use client";
import Image from "next/image";
import { InSertRegularClubNotification } from "../create/_types/subCreate";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/store/AuthContext";
import { useEffect } from "react";

type CrewInfo = {
  memberId: number;
  userId: string;
  userName: string;
  userImage: string;
};

type ClubCardProps = { notification: InSertRegularClubNotification; crewMembers: CrewInfo[] };

const ClubCard = ({ notification, crewMembers }: ClubCardProps) => {
  const router = useRouter();
  const { userId } = useAuth();

  // useEffect(() => {
  //   console.log("ClubCard 렌더링 시 crewMembers:", crewMembers);
  // }, []);

  // console.log("객체:", { notification, crewMembers });

  // 날짜와 시간 커스텀
  const DateTimeCustom = (dateTime: string) => {
    const date = new Date(dateTime);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${month}월 ${day}일 ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  // 주소 커스텀
  const addressCustom = (address: string) => {
    const shortAddress = address.split(" ").slice(1, 3).join(" ");

    return shortAddress;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!userId) {
      alert("로그인이 필요한 서비스입니다");
      router.push("/signin");
    }

    const isMember = crewMembers.some((member) => member.userId === userId);

    if (!isMember) {
      alert("크루 맴버만 이용 가능합니다. 먼저 가입을 진행해주세요");
      return;
    }

    router.push(`/club/regular-club-sub/${notification.r_c_id}/create/${notification.r_c_notification_id}`);
  };

  return (
    <div onClick={handleClick} className="flex m-4 bg-yellow-200 rounded-lg p-4 gap-4">
      <Image
        src={notification.r_c_notification_image}
        alt={notification.r_c_notification_name}
        width={80}
        height={80}
      />

      <div>
        <p>에그데이</p>
        <p>{notification.r_c_notification_name}</p>

        <div>
          <p>{addressCustom(notification.r_c_notification_location)}</p>
          <p>{DateTimeCustom(notification.r_c_notification_date_time)}</p>
        </div>
        <p>맴버 {notification.r_c_notification_member[0].count}명</p>
      </div>
    </div>
  );
};

export default ClubCard;
