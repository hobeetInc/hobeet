import React from "react";

const CategorySlider = () => {
  return (
    <div className="relative w-full max-w-[390px] mx-auto">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="inline-flex items-center gap-[6px] px-4 py-2">
          <div className="flex w-[77px] flex-col justify-center items-center gap-[4px] flex-shrink-0">
            <div className="flex w-[67px] h-[64px] p-2 justify-center items-center rounded-[32px] bg-[#fff1cc]">
              <img src="/asset/Category icon_voltage.png" alt="에그팝" className="w-12 h-12" />
            </div>
            <div className="self-stretch text-center text-xs leading-[135%]">
              <p className="font-pretendard">에그팝</p>
            </div>
          </div>

          <div className="flex w-[77px] flex-col justify-center items-center gap-[4px] flex-shrink-0">
            <div className="flex w-[67px] h-[64px] p-2 justify-center items-center rounded-[32px] bg-[#fff1cc]">
              <img src="/asset/Category icon_airplane.png" alt="아웃도어/여행" className="w-12 h-12" />
            </div>
            <div className="self-stretch text-center text-xs leading-[135%]">
              <p className="font-pretendard">아웃도어/여행</p>
            </div>
          </div>

          <div className="flex w-[77px] flex-col justify-center items-center gap-[4px] flex-shrink-0">
            <div className="flex w-[67px] h-[64px] p-2 justify-center items-center rounded-[32px] bg-[#fff1cc]">
              <img src="/asset/Category icon_tennis.png" alt="운동/스포츠관람" className="w-12 h-12" />
            </div>
            <div className="self-stretch text-center text-xs leading-[135%]">
              <p className="font-pretendard">운동/스포츠관람</p>
            </div>
          </div>

          <div className="flex w-[77px] flex-col justify-center items-center gap-[4px] flex-shrink-0">
            <div className="flex w-[67px] h-[64px] p-2 justify-center items-center rounded-[32px] bg-[#fff1cc]">
              <img src="/asset/Category icon_hot-beverage.png" alt="사교/인맥" className="w-12 h-12" />
            </div>
            <div className="self-stretch text-center text-xs leading-[135%]">
              <p className="font-pretendard">사교/인맥</p>
            </div>
          </div>

          <div className="flex w-[77px] flex-col justify-center items-center gap-[4px] flex-shrink-0">
            <div className="flex w-[67px] h-[64px] p-2 justify-center items-center rounded-[32px] bg-[#fff1cc]">
              <img src="/asset/Category icon_guitar.png" alt="문화/공연/축제" className="w-12 h-12" />
            </div>
            <div className="self-stretch text-center text-xs leading-[135%]">
              <p className="font-pretendard">문화/공연/축제</p>
            </div>
          </div>

          <div className="flex w-[77px] flex-col justify-center items-center gap-[4px] flex-shrink-0">
            <div className="flex w-[67px] h-[64px] p-2 justify-center items-center rounded-[32px] bg-[#fff1cc]">
              <img src="/asset/Category icon_clapper-board.png" alt="사진/영상" className="w-12 h-12" />
            </div>
            <div className="self-stretch text-center text-xs leading-[135%]">
              <p className="font-pretendard">사진/영상</p>
            </div>
          </div>

          <div className="flex w-[77px] flex-col justify-center items-center gap-[4px] flex-shrink-0">
            <div className="flex w-[67px] h-[64px] p-2 justify-center items-center rounded-[32px] bg-[#fff1cc]">
              <img src="/asset/Category icon_woman-dancing.png" alt="댄스/무용" className="w-12 h-12" />
            </div>
            <div className="self-stretch text-center text-xs leading-[135%]">
              <p className="font-pretendard">댄스/무용</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
