import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { queryKeys } from "./utils/queryKeys";

export const useRegularChat = (roomId: string) => {
  const supabase = createClient();

  return useQuery({
    queryKey: [queryKeys.regularChat, roomId],
    queryFn: async () => {
      try {
        const { data: roomData, error: roomError } = await supabase
          .from("egg_day_chatting_room")
          .select("*")
          .eq("egg_day_chatting_room_id", roomId)
          .single();

        if (roomError) throw roomError;

        return roomData;
      } catch (error) {
        console.error("Error fetching chat data: ", error);
        throw error;
      }
    },
    enabled: !!roomId
  });
};
