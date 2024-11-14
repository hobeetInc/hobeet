"use client";

import Tag from "@/components/uiComponents/TagComponents/Tag";
import Text from "@/components/uiComponents/TextComponents/Text";
import { FullScreenModalProps } from "@/types/eggpop.types";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";

const FullScreenModal = ({ crewList, isOpen, onClose }: FullScreenModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="flex justify-center items-center w-full">
        <div onClick={onClose} className="h-12 w-12 p-3 inline-flex">
          <IoIosArrowBack className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="flex-1 text-center pr-7">
          <Text variant="header-16">참여 에그즈</Text>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-16 w-ful justify-center items-center">
        <div className="px-4 w-[390px] flex-col justify-start items-start gap-4 inline-flex">
          <div className="self-stretch h-6 flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 text-[#0c0c0c] text-lg font-semibold font-['Pretendard'] leading-normal">
                결제 내역
              </div>
            </div>
          </div>
          <div className="self-stretch h-[76px] flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-center gap-4 inline-flex">
              <Text variant="body-14">일시</Text>

              <Text variant="subtitle-14">YYYY년 MM월 DD일(W) 오후 HH:MM </Text>
            </div>
            <div className="self-stretch justify-start items-center gap-4 inline-flex">
              <Text variant="body-14">총 인원</Text>

              <Text variant="body-14">00명</Text>
            </div>
            <div className="self-stretch justify-start items-center gap-4 inline-flex">
              <Text variant="subtitle-14">총 금액</Text>

              <Text variant="body-14">10,000원</Text>
            </div>
          </div>
        </div>

        <div className="self-stretch h-[0px] border border-solid border-gray-50"></div>

        <div className="w-[390px] h-9 px-4 justify-start items-center inline-flex">
          <Text variant="subtitle-18">참여 에그즈</Text>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="w-[390px] px-4 flex-col justify-start items-start inline-flex gap-4">
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
                  <Text variant="subtitle-16">{member.userName}</Text>

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
