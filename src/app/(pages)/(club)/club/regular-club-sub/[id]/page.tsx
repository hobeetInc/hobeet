import { fetchSubCategories, getRegularClubNotification, getRegularMember } from "../../_api/supabase";
import TabLayout from "./_components/TabLayout";
import ClubHeader from "./_components/ClubHeader";
import HomeContent from "./_components/HomeContent";
import RegularNotification from "./_components/RegularNotification";
import { SubCategory } from "@/types/category.types";
import { getEggClub, Member, MemberInfo } from "@/types/eggclub.types";
import { InSertEggDay } from "@/types/eggday.types";

const OneTimeClubSubpage = async ({ params }: { params: { id: string } }) => {
  const regularClubId = Number(params.id);

  const [memberData, notificationData, subCategories] = (await Promise.all([
    getRegularMember(regularClubId),
    getRegularClubNotification(regularClubId),
    fetchSubCategories()
  ])) as [Member[], InSertEggDay[], SubCategory[]];

  // 클럽 정보만 추출
  const clubInfo: getEggClub = memberData[0]?.regular_club;
  // console.log("클럽인포:", clubInfo);

  // 일치하는 카테고리 찾기
  const matchCategory = subCategories.find((category) => category.s_c_id === clubInfo.s_c_id);
  const stringCategory = matchCategory?.s_c_name;

  // 참여 크루 정보 추출
  const crewMembers: MemberInfo[] = memberData.map((member) => ({
    memberId: member.r_c_member_id,
    userId: member.user_id,
    userName: member.user.user_name,
    userImage: member.user.user_profile_img
  }));

  console.log("Hmm...", crewMembers);
  // 호스트 정보 추출
  const hostInfo = crewMembers.find((member) => member.userId === clubInfo.user_id);

  return (
    <div className="container">
      <ClubHeader clubInfo={clubInfo} />

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
        <RegularNotification notificationData={notificationData} crewMembers={crewMembers} />
      </TabLayout>
    </div>
  );
};

export default OneTimeClubSubpage;
