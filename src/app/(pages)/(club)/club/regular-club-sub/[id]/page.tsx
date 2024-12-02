import { fetchSubCategories, getRegularClubNotification, getRegularMember } from "../../_api/supabase";
import TabLayout from "./_components/TabLayout";
import ClubHeader from "./_components/ClubHeader";
import HomeContent from "./_components/HomeContent";
import RegularNotification from "./_components/RegularNotification";
import { MemberInfo } from "@/types/features/user/user.types";
import { StoreInitializer } from "./_components/StoreInitializer";

const RegularTimeClubSubPage = async ({ params }: { params: { id: string } }) => {
  const regularClubId = Number(params.id);

  const [memberData, notificationData, subCategories] = await Promise.all([
    getRegularMember(regularClubId),
    getRegularClubNotification(regularClubId),
    fetchSubCategories()
  ]);

  if (!memberData?.length || !memberData[0]?.egg_club) {
    return <div>Loading...</div>;
  }

  // 클럽 정보만 추출
  const clubInfo = memberData[0]?.egg_club;

  // 일치하는 카테고리 찾기
  const matchCategory = subCategories.find((category) => category.sub_category_id === clubInfo?.sub_category_id);
  const stringCategory = matchCategory?.sub_category_name;

  // 참여 크루 정보 추출
  const crewMembers: MemberInfo[] = memberData.map((member) => ({
    memberId: member.egg_club_member_id,
    userId: member.user_id,
    userName: member.user.user_name,
    userImage: member.user.user_profile_img
  }));

  // 호스트 정보 추출
  const hostInfo = crewMembers.find((member) => member.userId === clubInfo.user_id);

  return (
    <div className="mt-12">
      <StoreInitializer
        clubInfo={clubInfo}
        hostInfo={hostInfo}
        crewMembers={crewMembers}
        notificationData={notificationData}
        stringCategory={stringCategory}
      />

      <div className="fixed top-0 right-0 left-0 bg-white z-50">
        <ClubHeader />
      </div>

      <TabLayout>
        <HomeContent />
        <RegularNotification />
      </TabLayout>
    </div>
  );
};

export default RegularTimeClubSubPage;
