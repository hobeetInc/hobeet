"use client";

import Tag from "@/components/uiComponents/TagComponents/Tag";
import Text from "@/components/uiComponents/TextComponents/Text";
import { FullScreenModalProps } from "@/types/안끝난거/eggclub.types";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";

const FullScreenModal = ({ crewList, isOpen, onClose }: FullScreenModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="h-screen flex flex-col">
        <div className="flex items-center justify-start h-[48px]">
          <button onClick={onClose} className="w-12 h-full flex items-center justify-center">
            <IoIosArrowBack className="w-6 h-6" />
          </button>
          <Text variant="header-16" className="flex-1 text-center">
            전체 에그즈
          </Text>
        </div>

        <div className="w-[390px] h-9 px-4 py-2 justify-start items-center gap-2.5 inline-flex">
          <Text variant="body_medium-14">{`총 ${crewList.length}명`}</Text>
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

          {/* 
          <div key={member.userId} className="flex items-center gap-2 mb-4">
                <div className="relative w-[37px] h-[37px] overflow-hidden rounded-full">
                  <Image
                    src={member.userImage}
                    alt={member.userName}
                    width={37}
                    height={37}
                    className="w-full h-full object-cover border-2 border-black"
                  />
                </div>

                <div className="flex flex-col gap-1 justify-center">
                  <div className="flex gap-2">
                    <p>{member.userName}</p>
                    <p className="text-[13px]">{index === 0 ? "에그장" : "에그즈"}</p>
                  </div>
                  <p className="text-[13px]">참여도</p>
                </div>
              </div> */}
        </div>

        {/* <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-10">
          <div>
            <div className="w-[390px] h-9 px-4 py-2 justify-start items-center gap-2.5 inline-flex">
              <Text variant="body_medium-14">{`총 ${crewList.length}명`}</Text>
            </div>

            {crewList?.map((member, index) => (
              <div key={member.userId} className="flex items-center gap-2 mb-4">
                <div className="relative w-[37px] h-[37px] overflow-hidden rounded-full">
                  <Image
                    src={member.userImage}
                    alt={member.userName}
                    width={37}
                    height={37}
                    className="w-full h-full object-cover border-2 border-black"
                  />
                </div>

                <div className="flex flex-col gap-1 justify-center">
                  <div className="flex gap-2">
                    <p>{member.userName}</p>
                    <p className="text-[13px]">{index === 0 ? "에그장" : "에그즈"}</p>
                  </div>
                  <p className="text-[13px]">참여도</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FullScreenModal;
