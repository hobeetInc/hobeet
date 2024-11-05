import ClubCard from "./ClubCard";
import { EggClubNotificationProps } from "@/types/eggclub.types";

const RegularNotification = ({ notificationData, crewMembers }: EggClubNotificationProps) => {
  return (
    <>
      <p>총 {notificationData.length}개</p>

      <div>
        {notificationData.map((notification) => {
          return <ClubCard key={notification.egg_day_id} notification={notification} crewMembers={crewMembers} />;
        })}
      </div>
    </>
  );
};

export default RegularNotification;
