import supabase from "@/utils/supabase/client";
import { sanitizeFileName } from "@/utils/sanitizeFileName";

export const uploadProfileImage = async (userId: string, file: File) => {
  const sanitizedFileName = sanitizeFileName(file.name);
  const filePath = `public/${userId}/${sanitizedFileName}`;

  try {
    await supabase.storage.from("avatars").upload(filePath, file);
    const { data } = await supabase.storage.from("avatars").getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error("프로필 이미지 업로드 중 오류가 발생했습니다:", error);
    throw error;
  }
};
