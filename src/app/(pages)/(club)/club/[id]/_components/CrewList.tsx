"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getOneTimeMember } from "../../_api/supabase";
import FullScreenModal from "./FullScreenModal";

// CrewList 컴포넌트 props 타입
interface CrewListProps {
  crewMembers: {
    memberId: number;
    userId: string;
    userName: string;
    userImage: string;
  }[];
  clubId: number;
}

const CrewList = ({ crewMembers: initialCrewMembers, clubId }: CrewListProps) => {
  const [crewList, setCrewList] = useState(initialCrewMembers);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // 데이터 새로고침 함수
    const refreshData = async () => {
      try {
        const data = await getOneTimeMember(clubId);

        console.log("이태연", data);

        const newCrewMemebers = data.map((member) => ({
          memberId: member.o_t_c_member_id,
          userId: member.user_id,
          userName: member.user.user_name,
          userImage: member.user.user_profile_img
        }));

        setCrewList(newCrewMemebers);
      } catch (error) {
        console.error("크루인원 가져오는 중 오류:", error);
      }
    };

    // 15분마다 데이터 새로고침
    const intervalid = setInterval(refreshData, 900000);

    refreshData();

    //클린업 함수
    return () => clearInterval(intervalid);
  }, [clubId]);

  // 현재 화면에는 6r개만 표시
  const displayCrew = crewList.slice(0, 8);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="font-extrabold text-[20px]">{`참여중인 크루원 ${crewList.length}명`}</h1>
          <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-black">
            더보기 ➡️
          </button>
        </div>
        <div className="grid grid-cols-8 grid-flow-col gap-2 w-full">
          {displayCrew?.map((member) => (
            <div key={member.userId}>
              <div className="relative w-[37px] h-[37px] overflow-hidden rounded-full">
                <Image
                  src={member.userImage}
                  alt={member.userName}
                  width={37}
                  height={37}
                  className="w-full h-full object-cover border-2 border-black"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <FullScreenModal crewList={crewList} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default CrewList;
