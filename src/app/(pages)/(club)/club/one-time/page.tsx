import { Suspense } from "react";
import OneTimeContent from "./_components/OneTimeContent";

import Loading from "@/app/loading";

const OnePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <OneTimeContent />
    </Suspense>
  );
};

export default OnePage;
