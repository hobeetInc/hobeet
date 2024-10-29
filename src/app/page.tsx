"use client";

import Link from "next/link";
import { useAuthStore } from "./store/authStore";
import { createClient } from "@/utils/supabase/client";
import { CreateChatRoom } from "./(pages)/(chat)/_components/ChatRoom";
import { ChatRoomRecruiterEntrance } from "./(pages)/(chat)/_components/ChatRoomRecruiterEntrance";

export default function Home() {
  const reset = useAuthStore((state) => state.reset);
  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    reset();
    if (error) {
      console.log(error);
      return;
    } else {
      alert("지웠음");
    }
  };

  const handleCreateChattingRoom = () => {
    CreateChatRoom("으아아아아", 3);
  };

  const handleChattingRoom = async () => {
    ChatRoomRecruiterEntrance({ r_c_id: 3 });
  };

  return (
    <>
      <div>홈 입니다.</div>
      <button className="bg-gray-400" onClick={handleLogout}>
        로그아웃
      </button>
      <Link className="bg-gray-400 ml-4" href={"/signin"}>
        로그인
      </Link>
      <button onClick={handleCreateChattingRoom}>채팅방 생성</button>
      <button onClick={handleChattingRoom}>채팅방 입장</button>
    </>
  );
}
