import { Suspense } from "react";
import OneTimeContent from "./_components/OneTimeContent";
import Text from "@/components/uiComponents/TextComponents/Text";

const OnePage = () => {
  return (
    <Suspense fallback={<Text variant="subtitle-16">로딩 중...</Text>}>
      <OneTimeContent />
    </Suspense>
  );
};

export default OnePage;
