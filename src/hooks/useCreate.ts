import { submitOneTimeClubData, submitRegularClubData } from "@/app/(pages)/(club)/club/_api/clubSubmission";
import { EggPopForm } from "@/types/eggpop.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./utils/queryKeys";
import { EggClubForm } from "@/types/eggclub.types";

export const useCreatePop = () => {
  const queryClient = useQueryClient();

  // 모임 생성 mutation
  const { mutateAsync: createPop, isPending } = useMutation({
    mutationFn: async (formData: EggPopForm) => {
      // 모임 데이터 저장
      await submitOneTimeClubData(formData);
    },
    onSuccess: (data) => {
      // 모임 리스트 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.pop.all });

      // 탑텐 리스트 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.pop.tenList(10) });

      // 특정 카테고리의 모임 리스트 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.pop.byCategory(data.main_category_id) });

      // 에그팝 상세정보 페이지 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.pop.detail(data.egg_pop_id) });

      // 호스트 정보 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.user.hostInfo(data.user_id) });
    }
  });

  return { createPop, isPending };
};

export const useCreateClub = () => {
  const queryClient = useQueryClient();

  // 모임 생성 mutation
  const { mutateAsync: createClub, isPending } = useMutation({
    mutationFn: async (formData: EggClubForm) => {
      // 모임 데이터 저장
      return await submitRegularClubData(formData);
    },
    onSuccess: (data) => {
      // 모임 리스트 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.club.all });

      // 탑텐 리스트 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.club.tenList(10) });

      // 특정 카테고리의 모임 리스트 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.club.byCategory(data.main_category_id) });

      // 에그팝 상세정보 페이지 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.club.detail(data.egg_club_id) });
    }
  });

  return { createClub, isPending };
};

// export const useCreateDay = () => {
//   const queryClient = useQueryClient();

//   // 이미지 업로드 mutation
//   const { mutateAsync: uploadClubImage } = useMutation({
//     mutationFn: uploadImage
//   });

//   // 모임 생성 mutation
//   const { mutateAsync: createClub, isPending } = useMutation({
//     mutationFn: async (formData: EggDay) => {
//       let finalFormData = { ...formData };

//       if (formData.egg_day_image instanceof File) {
//         const ImageUrl = await uploadClubImage(formData.egg_day_image);

//         finalFormData = {
//           ...finalFormData,
//           egg_day_image: ImageUrl
//         };
//       }

//       // 모임 데이터 저장
//       return await submitRegularClubData(finalFormData);
//     },
//     onSuccess: (data) => {
//       // 모임 리스트 관련 쿼리 무효화
//       queryClient.invalidateQueries({ queryKey: queryKeys.day.all });

//       // 특정 카테고리의 모임 리스트 무효화
//       queryClient.invalidateQueries({ queryKey: queryKeys.day.byClub(data.egg_club_id) });
//     }
//   });

//   return { createClub, isPending };
// };
