import ClubListContent from "@/components/myclublistcontent/ClubListContent";
import { Suspense } from "react";

export default function MyClubListPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClubListContent />
    </Suspense>
  );
}
