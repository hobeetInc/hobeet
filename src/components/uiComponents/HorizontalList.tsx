import { LocationImage } from "./LocationImage";

const HorizontalList = () => {
  return (
    <div className="w-[248px] h-[91px] py-0.5 flex-col justify-start items-start gap-0.5 inline-flex">
      <div className="px-2 py-0.5 bg-primary-500 justify-center items-center inline-flex">
        <div className="text-gray-900 text-body_medium-14">에그팝</div>
      </div>
      <div className="self-stretch text-[#0c0c0c] text-subtitle-14 font-semibold">모임제목</div>
      <div className="pt-[3px] justify-start items-center gap-2 inline-flex">
        <LocationImage selectedId={1} />
        <div className="justify-start items-center gap-1 flex">
          <div className="w-4 h-4 justify-center items-center flex">
            <div className="w-4 h-4 relative flex-col justify-start items-start flex"></div>
          </div>
          <div className="text-[#8c8c8c] text-sm font-medium font-['Pretendard'] leading-tight">서울 용산구</div>
        </div>
        <div className="text-[#8c8c8c] text-sm font-medium font-['Pretendard'] leading-tight">12월 25일</div>
        <div className="text-[#8c8c8c] text-sm font-medium font-['Pretendard'] leading-tight">17:00</div>
      </div>
      <div className="justify-start items-center gap-0.5 inline-flex">
        <div className="text-[#8c8c8c] text-sm font-medium font-['Pretendard'] leading-tight">멤버</div>
        <div className="text-[#8c8c8c] text-sm font-medium font-['Pretendard'] leading-tight">50 / 100</div>
      </div>
    </div>
  );
};

export default HorizontalList;
