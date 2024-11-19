import { Suspense } from "react";
import NotificationCreate from "./_components/NotificationCreate";
import Text from "@/components/uiComponents/TextComponents/Text";

const RegularClubNotificationCreatePage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Suspense fallback={<Text variant="subtitle-16">로딩 중...</Text>}>
        <NotificationCreate params={params} />
      </Suspense>
    </>
  );
};

export default RegularClubNotificationCreatePage;
