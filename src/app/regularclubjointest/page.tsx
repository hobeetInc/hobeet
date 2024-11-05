"use client";

import RegularClubJoinButton from "@/components/regularClubJoinButton";
import { RegularClub } from "@/utils/regularclubjoin/_api/supabase";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function RegularClubJoinTest() {
  const [clubs, setClubs] = useState<RegularClub[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchClubs = async () => {
      const { data, error } = await supabase.from("egg_club").select("*");
      if (!error && data) {
        setClubs(data);
      }
    };

    fetchClubs();
  }, []);

  // Test login handler (to be removed in production)
  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({
      email: "jeho017@gmail.com",
      password: "dlwogh017"
    });
  };

  return (
    <div className="p-4">
      <div className="mb-4">정기 모임 테스트 페이지입니다.</div>
      {clubs.map((club) => (
        <div key={club.regular_club_id} className="mb-4">
          <h3 className="text-lg">{club.regular_club_name}</h3>
          <RegularClubJoinButton
            clubId={club.regular_club_id}
            onSuccess={() => {}}
            onError={(message) => alert(message)}
          />
        </div>
      ))}
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
