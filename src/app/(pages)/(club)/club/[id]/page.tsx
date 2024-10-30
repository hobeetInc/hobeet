// import { Metadata } from "next";
import Image from "next/image";
import { getOneTimeMember } from "../_api/supabase";
import CrewList from "./_components/CrewList";
import { GetOneTimeClub, Member } from "./_types/Crews";
import Link from "next/link";

type CrewInfo = {
  memberId: number;
  userId: string;
  userName: string;
  userImage: string;
};

const OneTimeClubSubpage = async ({ params }: { params: { id: string } }) => {
  const oneTimeClubId = Number(params.id);
  const data: Member[] = await getOneTimeMember(oneTimeClubId);

  // 임시 확인용
  //   console.log("데이터:", data);

  // 클럽 정보만 추출
  const clubInfo: GetOneTimeClub = data[0]?.one_time_club;
  console.log("클럽인포:", clubInfo);

  // 날짜 커스텀
  const date = clubInfo.one_time_club_date_time;
  const currentDate = new Date(date);
  const addZero = (num: number) => String(num).padStart(2, "0");
  const formDate = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월 ${currentDate.getDate()}일 / ${currentDate.getHours()}:${addZero(currentDate.getMinutes())}`;

  // 장소 커스텀
  const location = clubInfo.one_time_club_location;
  const currentLocation = location.split(" ").slice(1).join(" ");

  // 참가비 커스텀
  const tax = clubInfo.one_time_tax;
  const currentTax = tax === 0 ? "X" : tax.toLocaleString() + "원";

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
      return "50대 이상";
    } else if (age === 49) {
      return "40대";
    } else if (age === 39) {
      return "30대";
    } else if (age === 29) {
      return "20대";
    } else {
      return "10대";
    }
  };

  // 인원 제한 커스텀
  const limited = (limit: number) => {
    if (limit === 100) {
      return "인원제한 없음";
    } else {
      return limit;
    }
  };

  // 참여 크루 정보 추출
  const crewMembers: CrewInfo[] = data.map((member) => ({
    memberId: member.o_t_c_member_id,
    userId: member.user_id,
    userName: member.user.user_name,
    userImage: member.user.user_profile_img
  }));

  // 호스트 정보 추출
  const hostInfo = crewMembers.find((member) => member.userId === clubInfo.user_id);

  // 임시 확인용
  //   console.log("클럽 정보", clubInfo);
  //   console.log("참여 크루", crewMembers);

  return (
    <div className="container">
      <div className="h-[48px] bg-pink-100 flex items-center px-4">
        <Link href={"/club"} className="w-6 h-6 bg-slate-300 flex items-center justify-center border-4 border-black">
          뒤
        </Link>
      </div>

      <div className="flex flex-col w-full">
        <Image
          src={clubInfo.one_time_image}
          alt={clubInfo.one_time_club_name}
          width={100}
          height={100}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 mt-4">
          <div className="font-bold text-[23px]">{clubInfo.one_time_club_name}</div>
          <div className="flex justify-first items-center gap-2">
            <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full">
              <Image
                src={hostInfo?.userImage || ""}
                alt={hostInfo?.userName || "호스트"}
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>
            <div>{hostInfo?.userName}</div>
          </div>

          <div className="flex flex-col gap-2">
            <p>일시: {formDate}</p>
            <p>장소: {currentLocation}</p>
            <p>나이: {age(clubInfo.one_time_age)}</p>
            <p>성별: {gender(clubInfo.one_time_gender)}</p>
            <p>인원제한: {`${limited(clubInfo.one_time_people_limited)}명`}</p>
            <p>참가비: {currentTax}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-[20px] font-semibold">모임 소개</h1>
            <p>{clubInfo.one_time_club_introduction}</p>
          </div>
        </div>

        <CrewList crewMembers={crewMembers} clubId={oneTimeClubId} />
      </div>

      <button className="w-full h-10 mt-6 bg-slate-300 rounded-lg">참여하기</button>
    </div>
  );
};

export default OneTimeClubSubpage;
