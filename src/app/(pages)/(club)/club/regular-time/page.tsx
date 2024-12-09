import RegularContent from "./RegularContent";
import Text from "@/components/uiComponents/atoms/text/Text";
import { Suspense } from "react";

const RegularPage = () => {
  return (
    <Suspense fallback={<Text variant="subtitle-16">로딩 중...</Text>}>
      <RegularContent />
    </Suspense>
  );
};

export default RegularPage;
