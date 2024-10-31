import { Suspense } from "react";
import NotificationCreate from "./_components/NotificationCreate";

const RegularClubNotificationCreatePage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Suspense fallback={<div>로딩 중 ...</div>}>
        <NotificationCreate params={params} />
      </Suspense>
    </>
  );
};

export default RegularClubNotificationCreatePage;
