import ClubListContent from "@/app/(pages)/(myclublist)/myclublist/_components/ClubListContent";
import { Suspense } from "react";

export default function MyClubListPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClubListContent />
    </Suspense>
  );
}
