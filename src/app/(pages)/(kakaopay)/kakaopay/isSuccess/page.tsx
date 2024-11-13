"use client"; // 클라이언트 컴포넌트로 지정

import { useEffect, useState } from "react";
import { SupabaseClubAPI } from "@/utils/onetimeclubjoin/_api/supabase";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestUserId = searchParams.get("requestUserId") || "";
  const clubId = searchParams.get("clubId") || "";
  const clubType = searchParams.get("clubType") || "";
  const pgToken = searchParams.get("pg_token");

  const [isMemberInserted, setIsMemberInserted] = useState(false);

  useEffect(() => {
    if (isMemberInserted) return;

    const clubApi = new SupabaseClubAPI();

    const insertMember = async () => {
      if (clubType === "true") {
        await clubApi.insertMember(clubId, requestUserId);
        setIsMemberInserted(true);

        // router.push(
        //   `http://localhost:3000/kakaopay/success?requestUserId=${requestUserId}&clubId=${clubId}&clubType=${clubType}&pg_token=${pgToken}`
        // );
         router.push(
          `https://www.eggfriends.site/kakaopay/success?requestUserId=${requestUserId}&clubId=${clubId}&clubType=${clubType}&pg_token=${pgToken}`
        );
      } else {
        await clubApi.eggDayInsertMember(clubId, requestUserId);
        setIsMemberInserted(true);

        // router.push(
        //   `http://localhost:3000/kakaopay/success?requestUserId=${requestUserId}&clubId=${clubId}&clubType=${clubType}&pg_token=${pgToken}`
        // );

        router.push(
          `https://www.eggfriends.site/kakaopay/success?requestUserId=${requestUserId}&clubId=${clubId}&clubType=${clubType}&pg_token=${pgToken}`
        );
      }
    };

    insertMember();
  }, [clubId, requestUserId, router, isMemberInserted]);

  return <div>로딩중...</div>;
};

export default Page;
