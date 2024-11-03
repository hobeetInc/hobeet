import { fetchSubCategories, getRegularClubNotification, getRegularMember } from "../../_api/supabase";
import { getRegularClub, Member, SCategory } from "./_types/Crews";
import { InSertRegularClubNotification } from "./create/_types/subCreate";
import TabLayout from "./_components/TabLayout";
import HomeContent from "./_components/HomeContent";
import RegularNotification from "./_components/RegularNotification";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type CrewInfo = {
  memberId: number;
  userId: string;
  userName: string;
  userImage: string;
};

const OneTimeClubSubpage = async ({ params }: { params: { id: string } }) => {
  const regularClubId = Number(params.id);

  const [memberData, notificationData, subCategories] = (await Promise.all([
    getRegularMember(regularClubId),
    getRegularClubNotification(regularClubId),
    fetchSubCategories()
  ])) as [Member[], InSertRegularClubNotification[], SCategory[]];

  // const data: Member[] = await

  // const clubList: RegularClubNotification[] =

  // 임시 확인용
  // console.log("데이터:", data);

  // 클럽 정보만 추출
  const clubInfo: getRegularClub = memberData[0]?.regular_club;
  // console.log("클럽인포:", clubInfo);

  // 일치하는 카테고리 찾기
  const matchCategory = subCategories.find((category) => category.s_c_id === clubInfo.s_c_id);
  const stringCategory = matchCategory?.s_c_name;
  console.log("일치 카테고리!!!!!!!", stringCategory);

  // 참여 크루 정보 추출
  const crewMembers: CrewInfo[] = memberData.map((member) => ({
    memberId: member.r_c_member_id,
    userId: member.user_id,
    userName: member.user.user_name,
    userImage: member.user.user_profile_img
  }));

  // 호스트 정보 추출
  const hostInfo = crewMembers.find((member) => member.userId === clubInfo.user_id);

  // 임시 확인용
  // console.log("클럽 정보 아이디", clubInfo.user_id);
  // console.log("참여 크루", crewMembers);
  // console.log("호스트 정보", hostInfo);

  console.log("클럽리스트:", notificationData);

  return (
    <div className="container">
      <div className="flex justify-between items-center h-[48px] p-4 relative">
        <Link href={"/"} className="absolute left-4">
          <ChevronLeft />
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold">
          {clubInfo.regular_club_name.length > 8
            ? `${clubInfo.regular_club_name.slice(0, 8)}...`
            : clubInfo.regular_club_name}
        </h1>
        <Link href={`/club/regular-club-sub/${regularClubId}/create`}>+</Link>
      </div>

      <TabLayout>
        {/* props를 통해 데이터 전달 */}
        <HomeContent
          clubInfo={clubInfo}
          hostInfo={hostInfo}
          crewMembers={crewMembers}
          regularClubId={regularClubId}
          notificationData={notificationData}
          stringCategory={stringCategory}
        />
        <RegularNotification notificationData={notificationData} />
      </TabLayout>
    </div>
  );
};

export default OneTimeClubSubpage;
