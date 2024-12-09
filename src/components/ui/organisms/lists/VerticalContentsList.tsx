//에그팝 세로 리스트 컴포넌트
export const EggPopVerticalContentsList = (
  {
    /*eggPop*/
  }
) => {
  return (
    <div className="h-[311px] flex-col justify-start items-start gap-2 inline-flex">
      <div className="w-40 h-40 relative bg-[#d9d9d9] rounded-xl"></div>
      <div className="h-[143px] flex-col justify-start items-start gap-1 flex">
        <div className="px-2 py-0.5 bg-[#fdb800] rounded-[124px] justify-center items-center inline-flex">
          <div className="text-[#0c0c0c] text-[10px] font-normal font-['Pretendard'] leading-[14.50px]">에그팝</div>
        </div>
        <div className="self-stretch text-[#0c0c0c] text-base font-semibold font-['Pretendard'] leading-snug">
          모임제목
          <br />
          모임제목
        </div>
        <div className="self-stretch pt-0.5 justify-start items-center gap-0.5 inline-flex">
          <div className="w-4 h-4 justify-center items-center flex">
            <div className="w-4 h-4 relative flex-col justify-start items-start flex"></div>
          </div>
          <div className="grow shrink basis-0 text-[#8c8c8c] text-sm font-medium leading-tight">서울 용산구</div>
        </div>
        <div className="justify-start items-center gap-2 inline-flex">
          <div className="text-[#8c8c8c] text-sm font-medium  leading-tight">12월 25일</div>
          <div className="text-[#8c8c8c] text-sm font-medium  leading-tight">17:00</div>
        </div>
        <div className="self-stretch justify-start items-center gap-2 inline-flex">
          <div className="justify-start items-center gap-0.5 flex">
            <div className="w-[22px] h-[22px] relative">
              <div className="w-[22px] h-[22px] left-0 top-0 absolute bg-[#d9d9d9] rounded-full"></div>
            </div>
            <div className="grow shrink basis-0 text-[#8c8c8c] text-sm font-medium font-['Pretendard'] leading-tight">
              김수한무
            </div>
          </div>
          <div className="justify-start items-center gap-0.5 flex">
            <div className="text-[#8c8c8c] text-sm font-medium font-['Pretendard'] leading-tight">멤버</div>
            <div className="text-[#8c8c8c] text-sm font-medium font-['Pretendard'] leading-tight">100/100</div>
          </div>
        </div>
      </div>
    </div>
  );
};
