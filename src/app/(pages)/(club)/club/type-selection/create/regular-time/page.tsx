import { Suspense } from "react";
import RegularContent from "./Regular";

const OnePage = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <RegularContent />
    </Suspense>
  );
};

export default OnePage;
