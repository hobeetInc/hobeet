"use client";
import { createClient } from "@/utils/supabase/client";

export async function ChatRoomExit(r_c_n_chatting_id: number, clubCheck: boolean) {
  const supabase = createClient();
  if (clubCheck) {
    try {
      const { data } = await supabase
        .from("r_c_n_chatting")
        .select("admin")
        .eq("r_c_n_chatting_id", r_c_n_chatting_id)
        .single();
      console.log(data);

      if (data?.admin) {
        return false;
      } else {
        const { data, error } = await supabase
          .from("r_c_n_chatting")
          .update({ active: false })
          .eq("r_c_n_chatting_id", r_c_n_chatting_id)
          .single();

        if (error) throw error;
        console.log(data);

        return data;
      }
    } catch (error) {
      console.error("채팅방 퇴장 처리 중 오류가 발생했습니다:", error);
      throw new Error("채팅방 퇴장 처리 중 오류가 발생했습니다.");
    }
  }
}
