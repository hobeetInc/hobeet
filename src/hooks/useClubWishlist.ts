import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./utils/queryKeys";
import { WishListHeartProps } from "@/types/eggclub.types";
import {
  addClubToWishList,
  getClubWishListStatus,
  removeClubFromWishList
} from "@/app/(pages)/(club)/club/_api/wishlist";
import { useAuth } from "@/store/AuthContext";

export const useClubWishlist = ({ egg_club_id }: WishListHeartProps) => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const queryKey = [queryKeys.clubWishlist, egg_club_id, userId];

  const { data: isWished, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getClubWishListStatus({ egg_club_id, user_id: userId }),
    enabled: !!userId
  });

  const { mutateAsync: addWishlist } = useMutation({
    mutationFn: addClubToWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    }
  });

  const { mutateAsync: removeWishlist } = useMutation({
    mutationFn: removeClubFromWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    }
  });

  return { isWished, isLoading, addWishlist, removeWishlist };
};
