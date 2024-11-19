import { Tables } from "./database.types";
import { User } from "./user.types";

export type EggPop = Tables<"egg_pop">;

// 채팅방 타입
export interface EggPopChattingRoom {
  user_id: string;
  egg_pop_id: number;
  egg_pop_chatting_room_id: number;
  egg_pop_chatting_room_name: string;
  egg_pop_image: string;
  egg_pop_name: string;
  last_message: string;
  last_message_time: string;
  last_message_time_value: string;
  active: boolean;
  egg_pop_chatting_room_member: Array<{ count: number }>;
}

// 에그팝 채팅 콘텍스트 타입
export interface EggPopChatContextType {
  roomName: string;
  isLoading: boolean;
  egg_pop_chatting_room_member_id?: number;
  egg_pop_id?: number;
}

// 에그팝 레이아웃 props 타입
export interface LayoutProps {
  children: React.ReactNode;
  params: {
    chatRoomId: string;
  };
}

// TODO : 따로 타입 변경했음... 변경 필요
// 에그팝 채팅 멤버 상세정보 타입
export interface EggPopChattingMemberInfo extends Tables<"egg_pop_chatting_room_member"> {
  egg_pop_member: {
    egg_pop_id: number;
    egg_pop_member_id: number;
    user_id: string;
    user: User;
  };
}

export interface EggPopChatInfo {
  egg_pop_chatting_room_name: string;
  user_id: string;
  active: boolean;
  admin: boolean;
  created_at: string;
  egg_pop_chatting_room_id: number;
  egg_pop_chatting_room_member_id: number;
  egg_pop_id: number;
  egg_pop_member_id: number;
  egg_pop_chatting_room: Tables<"egg_pop_chatting_room">;
}
