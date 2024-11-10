"use client";
import { useState } from "react";
import RegularClubChattingRoomPage from "./_components/RegularClubChattingRoomPage";
import OneTimeClubChattingRoomPage from "./_components/OneTimeClubChattingRoomPage";

const ChatPage = () => {
  const [chattingRooms, setChattingRooms] = useState(true);
  return (
    <>
      <div className="flex  py-[var(--Font-size-100, 10px)] px-4 pt-[10px] border-b border-gray-200 justify-center items-center">
        <div
          className={`flex w-[179px] flex-col items-center gap-3 flex-shrink-0 ${
            chattingRooms ? "text-[#0d0d0d]" : "text-[#A6A6A6]"
          }`}
        >
          <button type="button" onClick={() => setChattingRooms(true)}>
            에그클럽
          </button>
          {chattingRooms ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="183" height="4" viewBox="0 0 183 4" fill="none">
              <path d="M2 2H181" stroke="#FDB800" strokeWidth="3" strokeLinecap="round" />
            </svg>
          ) : null}
        </div>

        <div
          className={`flex w-[179px] flex-col items-center gap-3 flex-shrink-0 ${
            chattingRooms ? "text-[#A6A6A6]" : "text-[#0d0d0d]"
          }`}
        >
          <button type="button" onClick={() => setChattingRooms(false)}>
            에그팝
          </button>
          {chattingRooms ? null : (
            <svg xmlns="http://www.w3.org/2000/svg" width="183" height="4" viewBox="0 0 183 4" fill="none">
              <path d="M2 2H181" stroke="#FDB800" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>
      {chattingRooms ? <RegularClubChattingRoomPage /> : <OneTimeClubChattingRoomPage />}
    </>
  );
};

export default ChatPage;
