import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { getRegularClubNotification } from "@/app/(pages)/(club)/club/_api/notifications";

// 모든 에그클럽 리스트 보여주기
export const useEggDayList = (clubId: number) => {
  return useQuery({
    queryKey: queryKeys.day.byClub(clubId),
    queryFn: async () => {
      try {
        const data = await getRegularClubNotification(clubId);
        return data;
      } catch (error) {
        console.error("에그데이 모든 리스트를 불러오지 못하였습니다: ", error);
        throw error;
      }
    }
  });
};
