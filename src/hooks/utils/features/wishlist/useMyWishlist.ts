import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/utils/queryKeys";
import { fetchWishlist } from "@/app/(pages)/(mypage)/_api/fetchWishList";

export const useWishlist = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.user.wishlist(userId),
    queryFn: () => fetchWishlist(userId)
  });
};
