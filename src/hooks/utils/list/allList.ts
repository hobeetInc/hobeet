import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { getAllOneTimeClub, getAllRegularClubList } from "@/app/(pages)/(club)/club/_api/clubLists";

// 모든 에그팝 리스트 보여주기
export const useEggPopAllList = () => {
  return useQuery({
    queryKey: queryKeys.pop.all,
    queryFn: async () => {
      try {
        const data = await getAllOneTimeClub();
        return data;
      } catch (error) {
        console.error("에그팝 모든 리스트를 불러오지 못하였습니다: ", error);
        throw error;
      }
    }
  });
};

// 모든 에그클럽 리스트 보여주기
export const useEggClubAllList = () => {
  return useQuery({
    queryKey: queryKeys.club.all,
    queryFn: async () => {
      try {
        const data = await getAllRegularClubList();
        return data;
      } catch (error) {
        console.error("에그클럽 모든 리스트를 불러오지 못하였습니다: ", error);
        throw error;
      }
    }
  });
};
