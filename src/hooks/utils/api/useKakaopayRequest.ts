import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/utils/queryKeys";
import { fetchClubData, fetchRegularClubId } from "@/app/(pages)/(kakaopay)/kakaopay/_api/fetchClub";
import { fetchPaymentData } from "@/app/(pages)/(kakaopay)/kakaopay/_api/fetchPayment";
import { fetchPaymentClubData } from "@/app/(pages)/(kakaopay)/kakaopay/_api/fetchPaymentClub";

export const useKakaopayRequest = (userId: string, clubId: string, isOneTimeClub: boolean) => {
  const clubQuery = useQuery({
    queryKey: queryKeys.payment.club(clubId, isOneTimeClub),
    queryFn: () => fetchClubData(clubId, isOneTimeClub)
  });

  const paymentQuery = useQuery({
    queryKey: queryKeys.payment.paymentInfo(userId, clubId, isOneTimeClub),
    queryFn: () => fetchPaymentData(userId, clubId, isOneTimeClub)
  });

  const paymentClubQuery = useQuery({
    queryKey: queryKeys.payment.paymentClub(clubId, isOneTimeClub),
    queryFn: () => fetchPaymentClubData(clubId, isOneTimeClub)
  });

  const regularClubIdQuery = useQuery({
    queryKey: queryKeys.payment.regularClubId(clubId),
    queryFn: () => fetchRegularClubId(clubId),
    enabled: !isOneTimeClub
  });

  return {
    clubQuery,
    paymentQuery,
    paymentClubQuery,
    regularClubIdQuery,
    isLoading:
      clubQuery.isLoading ||
      paymentQuery.isLoading ||
      paymentClubQuery.isLoading ||
      (!isOneTimeClub && regularClubIdQuery.isLoading),
    isError:
      clubQuery.isError ||
      paymentQuery.isError ||
      paymentClubQuery.isError ||
      (!isOneTimeClub && regularClubIdQuery.isError)
  };
};
