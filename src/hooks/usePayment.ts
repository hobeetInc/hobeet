import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./utils/queryKeys";
import { getEggDayPayList, getEggPopPayList } from "@/app/(pages)/(mypage)/_api/fecthMyPayList";

export const usePayments = (userId: string) => {
  const popPayments = useQuery({
    queryKey: queryKeys.pop.payments(userId),
    queryFn: getEggPopPayList
  });

  const dayPayments = useQuery({
    queryKey: queryKeys.day.payments(userId),
    queryFn: getEggDayPayList
  });

  return {
    popPayments,
    dayPayments,
    isLoading: popPayments.isLoading || dayPayments.isLoading,
    isError: popPayments.isError || dayPayments.isError
  };
};
