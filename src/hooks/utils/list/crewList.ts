import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { getNotificationMember } from "@/app/(pages)/(club)/club/_api/notifications";
import { getOneTimeMember, getRegularMember } from "@/app/(pages)/(club)/club/_api/members";

// 에그데이 크루리스트
export const useEggPopCrewList = (popId: number) => {
  return useQuery({
    queryKey: queryKeys.pop.crewList(popId),
    queryFn: async () => {
      try {
        const data = await getOneTimeMember(popId);

        const newCrewMembers = data.map((member) => ({
          memberId: member.egg_pop_member_id,
          userId: member.user_id,
          userName: member.user.user_name,
          userImage: member.user.user_profile_img
        }));

        return newCrewMembers;
      } catch (error) {
        console.error("에그팝 크루원 목록을 불러오지 못하였습니다.", error);
      }
    },
    refetchInterval: 1000 * 60,
    retry: 3
  });
};

// 에그데이 크루리스트
export const useEggClubCrewList = (clubId: number) => {
  return useQuery({
    queryKey: queryKeys.club.crewList(clubId),
    queryFn: async () => {
      try {
        const memberResult = await getRegularMember(clubId);

        const newCrewMembers = memberResult.map((member) => ({
          memberId: member.egg_club_member_id,
          userId: member.user_id,
          userName: member.user.user_name,
          userImage: member.user.user_profile_img
        }));

        return newCrewMembers;
      } catch (error) {
        console.error("에그클럽 크루원 목록을 불러오지 못하였습니다.", error);
      }
    },
    refetchInterval: 1000 * 60,
    retry: 3
  });
};

// 에그데이 크루리스트
export const useEggDayCrewList = (secondId: number) => {
  return useQuery({
    queryKey: queryKeys.day.crewList(secondId),
    queryFn: async () => {
      try {
        const member = await getNotificationMember(secondId);

        const crewMembers = member.map((member) => ({
          memberId: member.egg_day_id,
          userId: member.user_id,
          userName: member.user.user_name,
          userImage: member.user.user_profile_img
        }));

        return crewMembers;
      } catch (error) {
        console.error("에그데이 크루원 목록을 불러오지 못하였습니다.", error);
      }
    },
    refetchInterval: 1000 * 60,
    retry: 3
  });
};
