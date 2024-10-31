// import { Metadata } from "next";
import Image from "next/image";
import { getRegularMember } from "../../_api/supabase";
import { getRegularClub, Member } from "./_types/Crews";
import CrewList from "./_components/CrewList";

type CrewInfo = {
  memberId: number;
  userId: string;
  userName: string;
  userImage: string;
};

const OneTimeClubSubpage = async ({ params }: { params: { id: string } }) => {
  const regularClubId = Number(params.id);
  const data: Member[] = await getRegularMember(regularClubId);

  // 임시 확인용
  console.log("데이터:", data);

  // 클럽 정보만 추출
  const clubInfo: getRegularClub = data[0]?.regular_club;
  // console.log("클럽인포:", clubInfo);

  // 참여 크루 정보 추출
  const crewMembers: CrewInfo[] = data.map((member) => ({
    memberId: member.r_c_member_id,
    userId: member.user_id,
    userName: member.user.user_name,
    userImage: member.user.user_profile_img
  }));

  // 호스트 정보 추출
  const hostInfo = crewMembers.find((member) => member.userId === clubInfo.user_id);

  // 임시 확인용
  // console.log("클럽 정보 아이디", clubInfo.user_id);
  console.log("참여 크루", crewMembers);
  // console.log("호스트 정보", hostInfo);

  return (
    <div className="container">
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
    </div>
  );
};

export default OneTimeClubSubpage;
