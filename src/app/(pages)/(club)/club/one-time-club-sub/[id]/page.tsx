import Image from "next/image";
import { getOneTimeMember } from "../../_api/supabase";
import CrewList from "./_components/CrewList";
import PopHeader from "./_components/PopHeader";
import { EggMember, GetEggPop, MemberInfo } from "@/types/eggpop.types";

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
    <div>
      <PopHeader clubInfo={clubInfo} />
      <div className="flex flex-col w-full">
        <Image src={clubInfo.egg_pop_image} alt={clubInfo.egg_pop_name} width={100} height={100} className="w-full" />
      </div>

      <div className="flex flex-col gap-10 p-4">
        <div className="flex flex-col mt-4">
          <p className="text-[13px]">에그팝</p>

          <div className="flex justify-between">
            <h1 className="font-bold text-[23px] mt-4">{clubInfo.egg_pop_name}</h1>
            <p>♡</p>
          </div>

          <div className="flex justify-first items-center gap-2 mt-2 border-b-4 border-red-600 mb-7 pb-4">
            <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full">
              <Image
                src={hostInfo?.userImage || ""}
                alt={hostInfo?.userName || "호스트"}
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <div className="flex ">
                <p>{hostInfo?.userName}</p>
                <p className="text-[13px]">에그장</p>
              </div>
              <p className="text-[13px]">참여도</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold mb-2">상세 정보</h1>
            <p>일시: {formDate}</p>
            <p>장소: {currentLocation}</p>
            <p>나이: {clubInfo.egg_pop_age}세 이하</p>
            <p>성별: {gender(clubInfo.egg_pop_gender)}</p>
            <p>인원: {limited(clubInfo.egg_pop_people_limited)}</p>
            <p>참가비: {currentTax}</p>
          </div>

          <div className="flex flex-col gap-2 mt-10">
            <h1 className="text-[20px] font-semibold">모임 소개</h1>
            <p>{clubInfo.egg_pop_introduction}</p>
          </div>
        </div>

        <CrewList crewMembers={crewMembers} clubId={oneTimeClubId} clubHostId={clubInfo.user_id} />
      </div>
    </div>
  );
};

export default OneTimeClubSubpage;
