import supabase from "@/utils/supabase/client";
import { sanitizeFileName } from "@/utils/sanitizeFileName";

export const uploadProfileImage = async (userId: string, file: File) => {
  const sanitizedFileName = sanitizeFileName(file.name);
  const filePath = `public/${userId}/${sanitizedFileName}`;

  const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return data.publicUrl;
};
