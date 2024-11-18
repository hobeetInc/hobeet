import Image from "next/image";
import React from "react";
import { getNotificationData, getNotificationMember } from "../../../../_api/supabase";
import CrewList from "./_components/CrewList";
import DayHeader from "./_components/DayHeader";
import Text from "@/components/uiComponents/TextComponents/Text";
import { ProfileImageLarge } from "@/components/uiComponents/ProfileImageLarge";
import Tag from "@/components/uiComponents/TagComponents/Tag";

export const revalidate = 0; // 페이지 상단에 추가

interface SubSubPageProps {
  params: {
    id: string;
    subId: string;
  };
}

const SubSubPage = async ({ params }: SubSubPageProps) => {
  const { id, subId } = params;
  const secondId = Number(subId);
  const clubId = Number(id);

  try {
    const data = await getNotificationData(clubId);

    const clubInfo = data.find((club) => club.egg_day_id === secondId);

    if (!clubInfo) {
      throw new Error("Club information not found");
    }

    const member = await getNotificationMember(secondId);

    // 날짜 커스텀
    const date = clubInfo.egg_day_date_time;
    const currentDate = new Date(date);
    const addZero = (num: number) => String(num).padStart(2, "0");

    const hours = currentDate.getHours();
    const ampm = hours >= 12 ? "오후" : "오전";
    const displayHours = hours % 12 || 12;

    const formDate = `${currentDate.getFullYear()}년 ${
      currentDate.getMonth() + 1
    }월 ${currentDate.getDate()}일 ${ampm} ${displayHours}:${addZero(currentDate.getMinutes())}`;

    const location = clubInfo.egg_day_location || "";
    const currentLocation = location.split(" ").slice(1).join(" ");

    const tax = clubInfo.egg_day_tax ?? 0;
    const currentTax = tax === 0 ? "X" : tax.toLocaleString() + "원";

    const crewMembers = member.map((member) => ({
      memberId: member.egg_day_id,
      userId: member.user_id,
      userName: member.user.user_name,
      userImage: member.user.user_profile_img
    }));

    const hostInfo = crewMembers.find((member) => member.userId === clubInfo.user_id);

    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full h-[48px] fixed top-0 right-0 left-0 z-50 bg-white">
          <DayHeader clubInfo={clubInfo} />
        </div>

        <div className="flex overflow-hidden w-[390px] h-[332px] relative bg-gray-100 mb-6 mt-12">
          <Image
            src={clubInfo.egg_day_image}
            alt={clubInfo.egg_day_name}
            width={390}
            height={332}
            className="w-[390px] h-[332px] object-cover"
          />
        </div>

        <div className="w-full flex-col justify-start items-start gap-8 px-4 inline-flex">
          <div className="self-stretch flex-col justify-start items-start gap-5 flex">
            {/* 여기  */}

            <div className="self-stretch flex-col justify-start items-start gap-1 flex">
              <Tag tagName="eggday" />
              <div className="self-stretch justify-start items-center gap-1.5 inline-flex">
                <Text variant="subtitle-20"> {clubInfo.egg_day_name}</Text>
                <div className="w-8 h-8 justify-center items-center flex">
                  <div className="w-8 h-8 relative flex-col justify-start items-start flex" />
                </div>
              </div>
            </div>
            <div className="w-[252px] justify-start items-center gap-3 inline-flex">
              <ProfileImageLarge image={hostInfo?.userImage} />
              <div className="w-[133px] flex-col justify-start items-start gap-1 inline-flex">
                <div className="self-stretch justify-start items-center gap-2 inline-flex">
                  <Text variant="subtitle-16">{hostInfo?.userName}</Text>
                  <Tag tagName="eggmaster" variant="day" />
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[0px] border border-solid border-gray-50"></div>
          <div className="self-stretch h-[140px] flex-col justify-start items-start gap-4 flex">
            <div className="self-stretch h-6 flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch justify-start items-center gap-2 inline-flex">
                <Text variant="subtitle-18">상세 정보</Text>
              </div>
            </div>
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch justify-start items-start gap-[16px] inline-flex">
                <Text variant="subtitle-14" className="w-[40px]">
                  일시
                </Text>
                <Text variant="body-14">{formDate}</Text>
              </div>
              <div className="self-stretch justify-start items-start gap-[16px] inline-flex">
                <Text variant="subtitle-14" className="w-[40px]">
                  장소
                </Text>
                <Text variant="body-14">{currentLocation}</Text>
              </div>
              <div className="self-stretch justify-start items-start gap-[16px] inline-flex">
                <Text variant="subtitle-14" className="w-[40px]">
                  참가비
                </Text>
                <Text variant="body-14">{currentTax}</Text>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[0px] border border-solid border-gray-50"></div>

          <CrewList
            crewMembers={crewMembers}
            clubId={clubId}
            clubHostId={clubInfo.user_id}
            clubInfo={clubInfo}
            secondId={secondId}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading club information:", error);
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">오류가 발생했습니다</h1>
        <p>모임 정보를 불러오는 중 문제가 발생했습니다.</p>
      </div>
    );
  }
};

export default SubSubPage;
