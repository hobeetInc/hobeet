import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./utils/queryKeys";
import {
  addClubToWishList,
  getClubWishListStatus,
  removeClubFromWishList
} from "@/app/(pages)/(club)/club/_api/wishlist";
import { useAuth } from "@/store/AuthContext";

interface WishListHeartProps {
  egg_club_id: number;
}

export const useClubWishlist = ({ egg_club_id }: WishListHeartProps) => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

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
    }
  });

  const { mutateAsync: removeWishlist } = useMutation({
    mutationFn: removeClubFromWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  return { isWished, isLoading, addWishlist, removeWishlist };
};
