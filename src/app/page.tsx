"use client";

import { createClient } from "@/utils/supabase/client";
import { CreateChatRoom } from "./(pages)/(chat)/_components/ChatRoom";
import { ChatRoomRecruiterEntrance } from "./(pages)/(chat)/_components/ChatRoomRecruiterEntrance";

export default function Home() {
  const handleCreateChattingRoom = () => {
    CreateChatRoom("으아아아아", 3);
  };

  // const hadleSignUp = async () => {
  //   const supabase = createClient();
  //   const email = "chattingtest@naver.com";
  //   const password = "chattingtest@naver.com";

  //   const { user,error } = await supabase.auth.signUp({
  //     email: email,
  //     password: password
  //   });
  //   if (error) {
  //     console.error("회원가입 실패:", error.message);
  //   } else {
  //     console.log("회원가입 성공:", user);
  //   }
  // };

  const handleLogin = async () => {
    const supabase = createClient();
    const email = "chattingtest@naver.com"; // 입력한 이메일
    const password = "chattingtest@naver.com"; // 입력한 비밀번호

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      console.error("로그인 실패:", error.message);
    } else {
      console.log("로그인 성공:", data);
    }
  };

  const handleLogin2 = async () => {
    const supabase = createClient();
    const email = "dlwogh@naver.com"; // 입력한 이메일
    const password = "dlwogh"; // 입력한 비밀번호

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      console.error("로그인 실패:", error.message);
    } else {
      console.log("로그인 성공:", data);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  const handleChattingRoom = async () => {
    ChatRoomRecruiterEntrance({ r_c_id: 3 });
  };

  return (
    <>
      <div>홈 입니다.</div>
      <button onClick={handleLogout}>로그아웃</button>
      {/* <button onClick={hadleSignUp}>회원가입</button> */}
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleLogin2}>로그인</button>
      <button onClick={handleCreateChattingRoom}>채팅방 생성</button>
      <button onClick={handleChattingRoom}>채팅방 입장</button>
    </>
  );
}
