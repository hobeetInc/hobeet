import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./utils/queryKeys";
import { fetchUserProfile } from "@/app/(pages)/(mypage)/_api/fetchProfile";
import { fetchUserProvider, uploadProfileImage } from "@/app/(pages)/(mypage)/_api/profileEdit";

export const useProfile = (userId: string) => {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: queryKeys.user.profile(userId),
    queryFn: () => fetchUserProfile(userId)
  });

  const providerQuery = useQuery({
    queryKey: queryKeys.user.provider(),
    queryFn: fetchUserProvider
  });

  const uploadImageMutation = useMutation({
    mutationFn: (params: { userId: string; file: File }) => uploadProfileImage(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile(userId) });
    }
  });

  return {
    profileQuery,
    providerQuery,
    uploadImageMutation
  };
};
