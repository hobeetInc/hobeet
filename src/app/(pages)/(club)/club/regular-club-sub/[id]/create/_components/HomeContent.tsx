import Image from "next/image";

import CrewList from "../../_components/CrewList";
import { getRegularClub } from "../../_types/Crews";

type CrewInfo = {
  memberId: number;
  userId: string;
  userName: string;
  userImage: string;
};
type HomeContentProps = {
  clubInfo: getRegularClub;
  hostInfo: CrewInfo | undefined;
  crewMembers: CrewInfo[];
  regularClubId: number;
};

const HomeContent = ({ clubInfo, hostInfo, crewMembers, regularClubId }: HomeContentProps) => (
  <>
    <div className="flex flex-col w-full">
      <Image
        src={clubInfo.regular_club_image}
        alt={clubInfo.regular_club_name}
        width={100}
        height={100}
        className="w-full"
      />
    </div>

    <div className="flex flex-col gap-10 p-4">
      <div className="flex flex-col gap-4 mt-4">
        <p className="text-[13px]">에그클럽</p>

        <div className="flex justify-between">
          <h1 className="font-bold text-[23px]">{clubInfo.regular_club_name}</h1>
          <p>♡</p>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex justify-first items-center gap-4">
            <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full">
              <Image
                src={hostInfo?.userImage || ""}
                alt={hostInfo?.userName || "호스트"}
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <div className="flex gap-2">
                <p>{hostInfo?.userName}</p>
                <p className="text-[13px]">에그장</p>
              </div>

              <p className="text-[13px]">참여도</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-[20px] font-semibold">모임 소개</h1>
            <p>{clubInfo.regular_club_introduction}</p>
          </div>
        </div>
      </div>

      <CrewList
        crewMembers={crewMembers}
        clubId={regularClubId}
        // hostInfo={hostInfo || crewMembers[0]}
        clubHostId={clubInfo.user_id}
      />
    </div>
  </>
);

export default HomeContent;
