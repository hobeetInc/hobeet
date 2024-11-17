import supabase from "@/utils/supabase/client";
import { sanitizeFileName } from "@/utils/sanitizeFileName";

// 로그인한 사용자의 provider 정보 가져오기
export const fetchUserProvider = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;

  return data.user?.app_metadata.provider;
};

interface UploadImageParams {
  userId: string;
  file: File;
}

// 프로필 이미지 업로드 및 업데이트
export const uploadProfileImage = async ({ userId, file }: UploadImageParams) => {
  const sanitizedFileName = sanitizeFileName(file.name);
  // 파일명에 타임스탬프 추가하여 고유한 이름 보장
  const uniqueFileName = `${Date.now()}_${sanitizedFileName}`;
  const filePath = `public/${userId}/${uniqueFileName}`;

  // 기존 파일이 있다면 삭제
  const { data: existingFiles, error: existingFilesError } = await supabase.storage
    .from("avatars")
    .list(`public/${userId}`);

  if (existingFiles?.length) {
    await Promise.all(
      existingFiles.map((file) => supabase.storage.from("avatars").remove([`public/${userId}/${file.name}`]))
    );
  }

  if (existingFilesError) throw existingFilesError;

  // 새 파일 업로드
  const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl }
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  // 사용자 프로필 정보 업데이트
  const { error: updateError } = await supabase
    .from("user")
    .update({ user_profile_img: publicUrl })
    .eq("user_id", userId);

  if (updateError) throw updateError;

  return publicUrl;
};
