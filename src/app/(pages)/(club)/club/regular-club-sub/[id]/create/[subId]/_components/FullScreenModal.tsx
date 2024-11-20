"use client";

import Tag from "@/components/uiComponents/atoms/tags/Tag";
import Text from "@/components/uiComponents/atoms/text/Text";
import { FullScreenModalProps } from "@/types/core/common.types";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

const FullScreenModal = ({ crewList, isOpen, onClose }: FullScreenModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="flex items-center justify-between h-[60px] w-full">
        <button onClick={onClose} className="w-12 h-full flex items-center justify-center">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 text-center">
          <Text variant="header-16">전체 에그즈</Text>
        </div>
        <div className="w-12"></div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="px-4 h-[116px] flex-col justify-start items-start gap-4 inline-flex">
          <div className="self-stretch h-6 flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 text-[#0c0c0c] text-lg font-semibold font-['Pretendard'] leading-normal">
                결제 내역
              </div>
            </div>
          </div>
          <div className="self-stretch h-[76px] flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-center gap-4 inline-flex">
              <div className="w-10 text-[#0c0c0c] text-sm font-semibold font-['Pretendard'] leading-[18.90px]">
                일시
              </div>
              <div className="w-[230px] text-[#0c0c0c] text-sm font-normal font-['Pretendard'] leading-tight">
                YYYY년 MM월 DD일(W) 오후 HH:MM{" "}
              </div>
            </div>
            <div className="self-stretch justify-start items-center gap-4 inline-flex">
              <div className="w-10 text-[#0c0c0c] text-sm font-semibold font-['Pretendard'] leading-[18.90px]">
                총 인원
              </div>
              <div className="w-[230px] text-[#0c0c0c] text-sm font-normal font-['Pretendard'] leading-tight">00명</div>
            </div>
            <div className="self-stretch justify-start items-center gap-4 inline-flex">
              <div className="w-10 text-[#0c0c0c] text-sm font-semibold font-['Pretendard'] leading-[18.90px]">
                총 금액
              </div>
              <div className="w-[230px] text-[#0c0c0c] text-sm font-normal font-['Pretendard'] leading-tight">
                10,000원
              </div>
            </div>
          </div>
        </div>

        <div className="self-stretch h-[0px] border border-solid border-[#f2f2f2]"></div>

        <div className="w-[390px] h-9 px-4 py-2 justify-start items-center gap-2.5 inline-flex">
          <Text variant="subtitle-18">참여 에그즈</Text>
        </div>

        <div className="w-[390px] h-[616px] px-4 flex-col justify-start items-start gap-6 inline-flex">
          {crewList?.map((member, index) => (
            <div key={member.userId} className="self-stretch justify-start items-center gap-3 inline-flex">
              <div className="relative w-[37px] h-[37px] overflow-hidden rounded-full">
                <Image
                  src={member.userImage}
                  alt={member.userName}
                  width={37}
                  height={37}
                  className="w-full h-full object-cover border-2 border-black"
                />
              </div>
              <div className="w-[200px] flex-col justify-center items-start gap-1 inline-flex">
                <div className="self-stretch justify-start items-center gap-2 inline-flex">
                  <div className="text-[#0c0c0c] text-base font-semibold font-['Pretendard'] leading-snug">
                    {member.userName}
                  </div>
                  {index === 0 ? <Tag tagName="eggmaster" variant="black" /> : <Tag tagName="eggz" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullScreenModal;
