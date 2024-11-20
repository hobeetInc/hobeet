import { uploadImage } from "@/app/(pages)/(club)/club/_api/clubSubmission";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
  const { mutateAsync: uploadClubImage } = useMutation({
    mutationFn: uploadImage
  });

  return uploadClubImage;
};
