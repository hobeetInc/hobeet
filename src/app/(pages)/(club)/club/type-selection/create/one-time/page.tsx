import { Suspense } from "react";
import OneTimeContent from "./OneTime";

const OnePage = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <OneTimeContent />
    </Suspense>
  );
};

export default OnePage;
