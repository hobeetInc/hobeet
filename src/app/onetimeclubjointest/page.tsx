"use client";

import JoinClubButton from "@/components/oneTimeClubJoinButton";
import { OneTimeClub } from "@/utils/onetimeclubjoin/_api/supabase";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function OneTimeClubJoinTest() {
  const [clubs, setClubs] = useState<OneTimeClub[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchClubs = async () => {
      const { data, error } = await supabase.from("one_time_club").select("*");
      if (!error && data) {
        setClubs(data);
      }
    };

    fetchClubs();
  }, []);

  // 테스트 로그인 핸들러(추후 삭제)
  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({
      email: "jeho017@gmail.com",
      password: "dlwogh017"
    });
  };

  return (
    <div className="p-4">
      <div className="mb-4">원타임 클럽 테스트 페이지입니다.</div>
      {clubs.map((club) => (
        <div key={club.one_time_club_id} className="mb-4">
          <h3 className="text-lg">{club.one_time_club_name}</h3>
          <JoinClubButton clubId={club.one_time_club_id} onSuccess={() => {}} onError={() => {}} />
        </div>
      ))}
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

// 테스트 페이지 입니다
