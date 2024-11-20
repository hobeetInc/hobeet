import Text from "@/components/uiComponents/atoms/text/Text";
import ClubCard from "./ClubCard";
import { EggDayWithEggDayMember } from "@/types/features/club/eggday.types";
import { MemberInfo } from "@/types/features/user/user.types";

interface EggClubNotificationProps {
  notificationData: EggDayWithEggDayMember[];
  crewMembers: MemberInfo[];
  egg_club_id: number;
}

const RegularNotification = ({ notificationData, crewMembers }: EggClubNotificationProps) => {
  return (
    <div className="w-full">
      <div className="h-9 px-4 py-2 justify-start items-center gap-2.5 inline-flex">
        <Text variant="body_medium-14">총 {notificationData.length}개</Text>
      </div>

      <div className="flex flex-col gap-[10px] mx-4 my-2">
        {notificationData.map((notification) => {
          return <ClubCard key={notification.egg_day_id} notification={notification} crewMembers={crewMembers} />;
        })}
      </div>
    </div>
  );
};

export default RegularNotification;
