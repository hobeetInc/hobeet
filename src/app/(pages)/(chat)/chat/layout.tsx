interface Props {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-[390px] h-screen">
      <div className="flex w-[370px] p-[8px] pt-[20px] pb-[20px] justify-between items-center">
        <aside className="bg-[#d9d9d9] flex w-[70px] p-[5px] items-center justify-center gap-[10px] flex-shrink-0">
          내채팅
        </aside>
        <aside className="bg-[#d9d9d9] flex w-[50px] h-[24px] p-[10px] items-center justify-center gap-[10px] flex-shrink-0">
          알림
        </aside>
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        {" "}
        <main className="flex-grow">{children}</main>
      </div>
    </div>
  );
};

export default ChatLayout;
