import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { getOneTimeClub, getRegularClubList } from "@/app/(pages)/(club)/club/_api/clubLists";

// 메인에서 에그팝 최신순으로 10개 불러오기
export const useEggPopTenList = () => {
  return useQuery({
    queryKey: queryKeys.pop.tenList(10),
    queryFn: async () => {
      try {
        const data = await getOneTimeClub();
        return data;
      } catch (error) {
        console.error("에그팝 10개의 목록을 불러오지 못하였습니다: ", error);
        throw error;
      }
    }
  });
};

// 메인에서 에그클럽 최신순으로 10개 불러오기
export const useEggClubTenList = () => {
  return useQuery({
    queryKey: queryKeys.club.tenList(10),
    queryFn: async () => {
      try {
        const data = await getRegularClubList();
        return data;
      } catch (error) {
        console.error("에그클럽 10개의 목록을 불러오지 못하였습니다: ", error);
        throw error;
      }
    }
  });
};
