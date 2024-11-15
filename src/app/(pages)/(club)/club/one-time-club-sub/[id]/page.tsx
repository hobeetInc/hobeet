import Image from "next/image";
import { getOneTimeMember } from "../../_api/supabase";
import CrewList from "./_components/CrewList";
import PopHeader from "./_components/PopHeader";
import { EggMember, GetEggPop, MemberInfo } from "@/types/안끝난거/eggpop.types";
import { ProfileImageLarge } from "@/components/uiComponents/ProfileImageLarge";
import Text from "@/components/uiComponents/TextComponents/Text";
import Tag from "@/components/uiComponents/TagComponents/Tag";

const OneTimeClubSubpage = async ({ params }: { params: { id: string } }) => {
  const oneTimeClubId = Number(params.id);
  const data: EggMember[] = await getOneTimeMember(oneTimeClubId);

  // 클럽 정보만 추출
  const clubInfo: GetEggPop = data[0]?.egg_pop;

  // 날짜 커스텀
  const date = clubInfo.egg_pop_date_time;
  const currentDate = new Date(date);
  const addZero = (num: number) => String(num).padStart(2, "0");

  // 오전/오후 판단
  const hours = currentDate.getHours();
  const ampm = hours >= 12 ? "오후" : "오전";
  const displayHours = hours % 12 || 12;

  const formDate = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월 ${currentDate.getDate()}일 ${ampm} ${displayHours}:${addZero(currentDate.getMinutes())}`;

  // 장소 커스텀
  const location = clubInfo.egg_pop_location;
  const currentLocation = location.split(" ").slice(1).join(" ");

  // 참가비 커스텀
  const tax = clubInfo.egg_pop_tax;
  const currentTax = tax === 0 ? "X" : tax.toLocaleString() + "원";

  // console.log("택스", tax);

  // 성별 커스텀
  const gender = (gender: null | string) => {
    if (gender === null) {
      return "누구나";
    } else if (gender === "남성") {
      return "남성만";
    } else {
      return "여성만";
    }
  };

  // 나이 커스텀
  const age = (age: number) => {
    if (age === 100) {
      return "제한 없음";
    } else if (age === 50) {
      return "50대";
    } else if (age === 49) {
      return "40대";
    } else if (age === 39) {
      return "30대";
    } else if (age === 29) {
      return "20대";
    } else if (age === 19) {
      return "10대";
    }
  };

  // 인원 제한 커스텀
  const limited = (limit: number) => {
    if (limit === 100) {
      return "최대 100명";
    } else {
      return `최대 ${limit}명`;
    }
  };

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
          {/* 여기  */}

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
                나이
              </Text>
              <Text variant="body-14">{age(clubInfo.egg_pop_age)}</Text>
            </div>
            <div className="self-stretch justify-start items-start gap-[16px] inline-flex">
              <Text variant="subtitle-14" className="w-[40px]">
                성별
              </Text>
              <Text variant="body-14">{gender(clubInfo.egg_pop_gender)}</Text>
            </div>
            <div className="self-stretch justify-start items-start gap-[16px] inline-flex">
              <Text variant="subtitle-14" className="w-[40px]">
                인원
              </Text>
              <Text variant="body-14">{limited(clubInfo.egg_pop_people_limited)}</Text>
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

        {/* 여기 */}

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

export default OneTimeClubSubpage;
