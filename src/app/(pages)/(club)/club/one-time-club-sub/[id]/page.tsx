import Image from "next/image";
import { getOneTimeMember } from "../../_api/supabase";
import CrewList from "./_components/CrewList";
import PopHeader from "./_components/PopHeader";
import { ProfileImageLarge } from "@/components/uiComponents/ProfileImageLarge";
import Text from "@/components/uiComponents/TextComponents/Text";
import Tag from "@/components/uiComponents/TagComponents/Tag";
import { MemberInfo } from "@/types/user.types";
import {
  formatterAge,
  formatterDate,
  formatterGender,
  formatterLocation,
  formatterPeopleLimit,
  formatterTax
} from "../../_utils/formatter";

const OneTimeClubSubPage = async ({ params }: { params: { id: string } }) => {
  const oneTimeClubId = Number(params.id);
  const data = await getOneTimeMember(oneTimeClubId);

  // 클럽 정보만 추출
  const clubInfo = data[0]?.egg_pop;

  // 참여 크루 정보 추출
  const crewMembers: MemberInfo[] = data.map((member) => ({
    memberId: member.egg_pop_member_id,
    userId: member.user_id,
    userName: member.user.user_name,
    userImage: member.user.user_profile_img
  }));

  // 호스트 정보 추출
  const hostInfo = crewMembers.find((member) => member.userId === clubInfo.user_id);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full h-[48px] fixed top-0 right-0 left-0 z-50 bg-white">
        <PopHeader clubInfo={clubInfo} />
      </div>

      <div className="flex overflow-hidden w-[390px] h-[332px] relative bg-gray-100 mb-6 mt-12">
        <Image
          src={clubInfo.egg_pop_image}
          alt={clubInfo.egg_pop_name}
          width={390}
          height={332}
          className="w-[390px] h-[332px] object-cover"
        />
      </div>

      <div className="w-full flex-col justify-start items-start gap-8 px-4 inline-flex">
        <div className="self-stretch flex-col justify-start items-start gap-5 flex">
          <div className="self-stretch flex-col justify-start items-start gap-1 flex">
            <Tag tagName="eggpop" />
            <div className="self-stretch justify-start items-center gap-1.5 inline-flex">
              <Text variant="subtitle-20"> {clubInfo.egg_pop_name}</Text>
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
                <Tag tagName="eggmaster" variant="yellow" />
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[0px] border border-solid border-gray-50"></div>
        <div className="self-stretch h-[200px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch h-6 flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-center gap-2 inline-flex">
              <Text variant="subtitle-18">상세 정보</Text>
            </div>
          </div>
          <div className="self-stretch h-40 flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-start gap-[16px] inline-flex">
              <Text variant="subtitle-14" className="w-[40px]">
                일시
              </Text>
              <Text variant="body-14">{formatterDate(clubInfo.egg_pop_date_time)}</Text>
            </div>
            <div className="self-stretch justify-start items-start gap-[16px] inline-flex">
              <Text variant="subtitle-14" className="w-[40px]">
                장소
              </Text>
              <Text variant="body-14">{formatterLocation(clubInfo.egg_pop_location)}</Text>
            </div>
            <div className="self-stretch justify-start items-start gap-[16px] inline-flex">
              <Text variant="subtitle-14" className="w-[40px]">
                나이
              </Text>
              <Text variant="body-14">{formatterAge(clubInfo.egg_pop_age)}</Text>
            </div>
            <div className="self-stretch justify-start items-start gap-[16px] inline-flex">
              <Text variant="subtitle-14" className="w-[40px]">
                성별
              </Text>
              <Text variant="body-14">{formatterGender(clubInfo.egg_pop_gender)}</Text>
            </div>
            <div className="self-stretch justify-start items-start gap-[16px] inline-flex">
              <Text variant="subtitle-14" className="w-[40px]">
                인원
              </Text>
              <Text variant="body-14">{formatterPeopleLimit(clubInfo.egg_pop_people_limited)}</Text>
            </div>
            <div className="self-stretch justify-start items-start gap-[16px] inline-flex">
              <Text variant="subtitle-14" className="w-[40px]">
                참가비
              </Text>
              <Text variant="body-14">{formatterTax(clubInfo.egg_pop_tax)}</Text>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[0px] border border-solid border-gray-50"></div>

        <div className="self-stretch flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch h-6 flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-center gap-2 inline-flex">
              <Text variant="subtitle-18">모임 소개</Text>
            </div>
          </div>

          <Text variant="body-14" className="self-stretch text-gray-800">
            {clubInfo.egg_pop_introduction}
          </Text>
        </div>

        <div className="self-stretch h-[0px] border border-solid border-gray-50"></div>

        <CrewList crewMembers={crewMembers} clubId={oneTimeClubId} clubHostId={clubInfo.user_id} />
      </div>
    </div>
  );
};

export default OneTimeClubSubPage;
