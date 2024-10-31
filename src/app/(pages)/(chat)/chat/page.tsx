"use client";
import { useState } from "react";
import RegularClubChattingRoomPage from "./_components/RegularClubChattingRoomPage";
import OneTimeClubChattingRoomPage from "./_components/OneTimeClubChattingRoomPage";

const ChatPage = () => {
  const [chattingRooms, setChattingRooms] = useState(true);
  return (
    <>
      <div className="flex flex-col w-[390px]">
        <div className="flex w-[370px] p-[8px] pt-[20px] pb-[20px] justify-between items-center">
          <aside className="bg-[#d9d9d9] flex w-[70px] p-[5px] items-center justify-center gap-[10px] flex-shrink-0">
            내채팅
          </aside>
          <aside className="bg-[#d9d9d9] flex w-[50px] h-[24px] p-[10px] items-center justify-center gap-[10px] flex-shrink-0">
            알림
          </aside>
        </div>
      </div>
      <div className="flex bg-[#D9D9D9] w-[390px] h-[90px] justify-center items-center">광고배너</div>
      <div className="grid grid-cols-2 w-[370px] h-[70px]">
        <button
          type="button"
          onClick={() => setChattingRooms(true)}
          className={`${chattingRooms ? "border-b-4 border-solid border-black" : ""}`}
        >
          에그클럽
        </button>
        <button
          type="button"
          onClick={() => setChattingRooms(false)}
          className={`${chattingRooms ? "" : "border-b-4 border-solid border-black"}`}
        >
          에그팝
        </button>
      </div>
      {chattingRooms ? <RegularClubChattingRoomPage /> : <OneTimeClubChattingRoomPage />}
    </>
  );
};

export default ChatPage;
