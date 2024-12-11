import { Suspense } from "react";
import NotificationCreate from "./_components/NotificationCreate";

import Loading from "@/app/loading";

const RegularClubNotificationCreatePage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <NotificationCreate params={params} />
      </Suspense>
    </>
  );
};

export default RegularClubNotificationCreatePage;
