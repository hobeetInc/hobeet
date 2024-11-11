"use client";
import { useState } from "react";
import RegularClubChattingRoomPage from "./_components/RegularClubChattingRoomPage";
import OneTimeClubChattingRoomPage from "./_components/OneTimeClubChattingRoomPage";
import TabBar from "@/components/uiComponents/TapBar";

const ChatPage = () => {
  const [chattingRooms, setChattingRooms] = useState(true);
  return (
    <>
      <div className="flex  py-[var(--Font-size-100, 10px)] px-4 pt-[10px] border-b border-gray-200 justify-center items-center">
        <TabBar activeTab={chattingRooms} onTabChange={setChattingRooms} value="mychat" />
      </div>
      {chattingRooms ? <RegularClubChattingRoomPage /> : <OneTimeClubChattingRoomPage />}
    </>
  );
};

export default ChatPage;
