import { createClient } from "@/utils/supabase/client";

export async function ChatRoomExit(egg_day_chatting_id: number, clubCheck: boolean) {
  const supabase = createClient();
  console.log(egg_day_chatting_id);

  if (!clubCheck) {
    try {
      const { data } = await supabase
        .from("egg_day_chatting")
        .select("admin")
        .eq("egg_day_chatting_id", egg_day_chatting_id)

        .single();

      if (data?.admin) {
        return false;
      } else {
        const { data, error } = await supabase
          .from("egg_day_chatting")
          .update({ active: false })
          .eq("egg_day_chatting_id", egg_day_chatting_id)
          .single();

        if (error) throw error;

        return data;
      }
    } catch (error) {
      console.error("채팅방 퇴장 처리 중 오류가 발생했습니다:", error);
      throw new Error("채팅방 퇴장 처리 중 오류가 발생했습니다.");
    }
  } else {
    try {
      const { data } = await supabase
        .from("egg_pop_chatting_room_member")
        .select("admin")
        .eq("egg_pop_chatting_room_member_id", egg_day_chatting_id)

        .single();

      if (data.admin) {
        return false;
      } else {
        const { data, error } = await supabase
          .from("egg_pop_chatting_room_member")
          .update({ active: false })
          .eq("egg_pop_chatting_room_member_id", egg_day_chatting_id)
          .single();

        if (error) throw error;

        return data;
      }
    } catch (error) {
      console.error("채팅방 퇴장 처리 중 오류가 발생했습니다:", error);
      throw new Error("채팅방 퇴장 처리 중 오류가 발생했습니다.");
    }
  }
}
