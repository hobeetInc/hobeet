"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Tag from "@/components/ui/atoms/tags/Tag";
import Text from "@/components/ui/atoms/text/Text";
import { Icon } from "@/components/ui/atoms/icons/Icon";
import { EggDayWithEggDayMember } from "@/types/features/club/eggday.types";
import { MemberInfo } from "@/types/features/user/user.types";
import { useAuthStore } from "@/store/authStore";
import { CustomAddress } from "@/utils/CustomAddress";

interface ClubCardProps {
  notification: EggDayWithEggDayMember;
  crewMembers: MemberInfo[];
}

const ClubCard = ({ notification, crewMembers }: ClubCardProps) => {
  const router = useRouter();
  const userId = useAuthStore((state) => state.userId);

  // 날짜와 시간 커스텀
  const DateTimeCustom = (dateTime: string) => {
    const date = new Date(dateTime);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const addZero = (num: number) => String(num).padStart(2, "0");

    return {
      date: `${month}월 ${day}일`,
      time: `${hours}:${addZero(minutes)}`
    };
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

    router.push(`/club/regular-club-sub/${notification.egg_club_id}/create/${notification.egg_day_id}`);
  };

  return (
    <button onClick={handleClick} className="flex gap-2 w-full">
      <div className="w-[102px] h-102px overflow-hidden flex items-center justify-center rounded-[12px]">
        <Image
          src={notification.egg_day_image}
          alt={notification.egg_day_name}
          width={102}
          height={102}
          className="object-cover w-[102px] h-[102px] rounded-[12px]"
        />
      </div>

      <div className="flex-1 py-0.5 flex-col justify-start items-start gap-0.5 inline-flex">
        <Tag tagName="eggday" />
        <Text variant="subtitle-14">{notification.egg_day_name}</Text>

        <div className="flex items-center gap-1">
          <Icon name="location" />

          <div className="flex gap-2">
            <Text variant="body_medium-14" className="text-gray-400">
              {CustomAddress(notification.egg_day_location)}
            </Text>

            <Text variant="body_medium-14" className="text-gray-400">
              {DateTimeCustom(notification.egg_day_date_time).date}
            </Text>

            <Text variant="body_medium-14" className="text-gray-400">
              {DateTimeCustom(notification.egg_day_date_time).time}
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Text variant="body_medium-14" className="text-gray-400">
            참여 인원
          </Text>

          <Text variant="body_medium-14" className="text-gray-400">
            {notification.egg_day_member[0].count}
          </Text>
        </div>
      </div>
    </button>
  );
};

export default ClubCard;
