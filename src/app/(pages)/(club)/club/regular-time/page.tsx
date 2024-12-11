import RegularContent from "./RegularContent";
import { Suspense } from "react";
import Loading from "@/app/loading";

const RegularPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RegularContent />
    </Suspense>
  );
};

export default RegularPage;
