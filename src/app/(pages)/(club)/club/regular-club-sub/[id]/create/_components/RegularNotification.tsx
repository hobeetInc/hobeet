import ClubCard from "../../_components/ClubCard";
import { InSertRegularClubNotification } from "../_types/subCreate";

type RegularNotificationProps = {
  notificationData: InSertRegularClubNotification[];
};

const RegularNotification = ({ notificationData }: RegularNotificationProps) => (
  <>
    <p>총 {notificationData.length}개</p>

    <div>
      {notificationData.map((notification) => (
        <ClubCard key={notification.r_c_notification_id} notification={notification} />
      ))}
    </div>
  </>
);

export default RegularNotification;
