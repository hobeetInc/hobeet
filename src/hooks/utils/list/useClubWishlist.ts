import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addClubToWishList,
  getClubWishListStatus,
  removeClubFromWishList
} from "@/app/(pages)/(club)/club/_api/wishlist";
import { useAuthStore } from "@/store/authStore";
import { queryKeys } from "../queryKeys";

interface WishListHeartProps {
  egg_club_id: number;
}

export const useClubWishlist = ({ egg_club_id }: WishListHeartProps) => {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.userId);

  const queryKey = [queryKeys.clubWishlist, egg_club_id, userId];

  const { data: isWished, isLoading } = useQuery({
    queryKey,
    queryFn: () => getClubWishListStatus({ egg_club_id, user_id: userId }),
    enabled: !!userId,
    retry: false // 재시도 방지 추가
  });

  const { mutateAsync: addWishlist } = useMutation({
    mutationFn: addClubToWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: queryKeys.club.tenList(10) });
    }
  });

  const { mutateAsync: removeWishlist } = useMutation({
    mutationFn: removeClubFromWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: queryKeys.club.tenList(10) });
    }
  });

  return { isWished, isLoading, addWishlist, removeWishlist };
};
