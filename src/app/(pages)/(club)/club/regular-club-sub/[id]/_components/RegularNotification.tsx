import ClubCard from "./ClubCard";
import { InSertRegularClubNotification } from "../create/_types/subCreate";

type CrewInfo = {
  memberId: number;
  userId: string;
  userName: string;
  userImage: string;
};

type RegularNotificationProps = {
  notificationData: InSertRegularClubNotification[];
  crewMembers: CrewInfo[];
};

const RegularNotification = ({ notificationData, crewMembers }: RegularNotificationProps) => {
  // console.log("Hmm...2", crewMembers);

  return (
    <>
      <p>총 {notificationData.length}개</p>

      <div>
        {notificationData.map((notification) => {
          // console.log("각 notification의 정보:", notification);
          // console.log("전달되는 crewMembers:", crewMembers);

          return (
            <ClubCard
              key={notification.r_c_notification_id}
              notification={notification}
              crewMembers={crewMembers} // 이 값이 제대로 전달되는지 확인
            />
          );
        })}
      </div>
    </>
  );
};

export default RegularNotification;
