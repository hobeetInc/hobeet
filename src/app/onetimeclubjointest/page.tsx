"use client";

import JoinClubButton from "@/components/oneTimeClubJoinButton";
import { OneTimeClub } from "@/types/oneTimeClub";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function OneTimeClubJoinTest() {
  const [clubs, setClubs] = useState<OneTimeClub[]>([]);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const supabase = createClient();

  useEffect(() => {
    const fetchClubs = async () => {
      const { data, error } = await supabase.from("one_time_club").select("*");

      if (error) {
        setErrorMessage("모임 정보를 불러오는데 실패했습니다.");
      } else {
        setClubs(data);
      }
    };

    fetchClubs();
  }, []);

  // 성공 핸들러
  const handleSuccess = (currentMembers?: number) => {
    if (currentMembers) {
      setMemberCount(currentMembers);
    }
    setErrorMessage("");
  };

  // 에러 핸들러
  const handleError = (message: string) => {
    setErrorMessage(message);
  };

  // 테스트 로그인 핸들러
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
          <JoinClubButton clubId={club.one_time_club_id} onSuccess={handleSuccess} onError={handleError} />
        </div>
      ))}

      {/* 상태 표시 */}
      {memberCount > 0 && <div className="mt-2 text-green-600">현재 멤버 수: {memberCount}명</div>}

      {errorMessage && <div className="mt-2 text-red-600">{errorMessage}</div>}
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
