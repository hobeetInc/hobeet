import Image from "next/image";
import CrewList from "./CrewList";
import WishListHeart from "./WishListHeart";
import { HomeContentProps } from "@/types/eggclub.types";

const HomeContent = ({
  clubInfo,
  hostInfo,
  crewMembers,
  egg_club_id,
  notificationData,
  stringCategory
}: HomeContentProps) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <Image src={clubInfo.egg_club_image} alt={clubInfo.egg_club_name} width={100} height={100} className="w-full" />
      </div>

      <div className="flex flex-col gap-10 p-4">
        <div className="flex flex-col gap-4 mt-4">
          <p className="text-[13px]">{stringCategory}</p>

          <div className="flex justify-between">
            <h1 className="font-bold text-[23px]">{clubInfo.egg_club_name}</h1>
            <WishListHeart egg_club_id={clubInfo.egg_club_id} />
          </div>
          <p>
            맴버 {crewMembers.length} / {clubInfo.egg_club_people_limited}
          </p>

          <p>이 모임의 호스트</p>
          <div className="flex flex-col gap-10">
            <div className="flex justify-first items-center gap-4 pb-5 border-b-2 border-solid">
              <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full ">
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
              <p>{clubInfo.egg_club_introduction}</p>
            </div>
          </div>
        </div>

        <CrewList
          crewMembers={crewMembers}
          clubId={egg_club_id}
          clubHostId={clubInfo.user_id}
          notificationData={notificationData}
        />
      </div>
    </>
  );
};

export default HomeContent;
