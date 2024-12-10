import { submitOneTimeClubData, submitRegularClubData } from "@/app/(pages)/(club)/club/_api/clubSubmission";
import { EggPopForm } from "@/types/features/club/eggpop.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/utils/queryKeys";
import { EggClubForm } from "@/types/features/club/eggclub.types";
import { EggDayRequired } from "@/types/features/club/eggday.types";
import { submitRegularClubNotification } from "@/app/(pages)/(club)/club/_api/notifications";

export const useCreatePop = () => {
  const queryClient = useQueryClient();

  // 모임 생성 mutation
  const { mutateAsync: createPop, isPending } = useMutation({
    mutationFn: async (formData: EggPopForm) => {
      const data = await submitOneTimeClubData(formData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pop.all });

      queryClient.invalidateQueries({ queryKey: queryKeys.pop.tenList(10) });

      queryClient.invalidateQueries({ queryKey: queryKeys.categoryList.all });

      queryClient.invalidateQueries({
        queryKey: queryKeys.categoryList.list(data.main_category_id, data.sub_category_id)
      });
    }
  });

  return { createPop, isPending };
};

export const useCreateClub = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createClub, isPending } = useMutation({
    mutationFn: async (formData: EggClubForm) => {
      const data = await submitRegularClubData(formData);

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.club.all });

      queryClient.invalidateQueries({ queryKey: queryKeys.club.tenList(10) });

      queryClient.invalidateQueries({ queryKey: queryKeys.categoryList.all });

      queryClient.invalidateQueries({
        queryKey: queryKeys.categoryList.list(data.main_category_id, data.sub_category_id)
      });
    }
  });

  return { createClub, isPending };
};

export const useCreateDay = () => {
  const queryClient = useQueryClient();

  // 모임 생성 mutation
  const { mutateAsync: createDay, isPending } = useMutation({
    mutationFn: async (formData: EggDayRequired) => {
      const data = await submitRegularClubNotification(formData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.day.byClub(data.egg_club_id) });
    }
  });

  return { createDay, isPending };
};
