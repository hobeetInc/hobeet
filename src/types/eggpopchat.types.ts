import { User } from "./user.types";

// 에그팝 채팅방 생성을 위한 에그팝 아이디 타입
export interface EggPopId {
  egg_pop_id: number;
}

// 에그팝 채팅 타입
interface BaseEggPopChatting {
  admin: boolean;
  egg_pop_id: number;
  egg_pop_member_id: number;
  egg_pop_chatting_room_member_id: number;
  egg_pop_chatting_room_id: number;
}

// 애그팝 채팅 멤버 타입
export interface EggPopChattingMember {
  egg_pop_id: number;
  egg_pop_member_id: number;
  user_id: string;
  egg_pop_chatting_room_member: EggPopChatting[];
}

// 채팅 메세지 타입
interface EggPopChatMessage {
  egg_pop_chatting_room_message_content: string;
  created_at: string;
}

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
}

// 확장된 EggPopChatting 타입
export interface EggPopChatting extends BaseEggPopChatting {
  active: boolean;
  egg_pop_chatting_room: EggPopChattingRoom;
  egg_pop_chatting_room_message: EggPopChatMessage[];
}

// 에그팝 타입
interface EggPop {
  main_category_id: number;
  sub_category_id: number;
  user_id: string;
  egg_pop_id: number;
  egg_pop_age?: number | null;
  egg_pop_name: string;
  egg_pop_image: string;
  egg_pop_gender?: string | null;
  egg_pop_create_at: string;
  egg_pop_introduction: string;
  egg_pop_people_limited?: number | null;
}

// 에그팝 멤버 타입
interface EggPopMember {
  egg_pop_member_id: number;
  user_id: string;
  egg_pop_id: number;
  egg_pop_chatting_room_member: EggPopChatting[];
  egg_pop: EggPop;
}

// 데이터 응답값 타입
export interface ApiResponse {
  data: EggPopMember[];
}

// 에그팝 채팅 콘텍스트 타입
export interface EggPopChatContextType {
  roomName: string;
  isLoading: boolean;
  egg_pop_chatting_room_id?: number;
  egg_pop_id?: number;
}

// 에그팝 레이아웃 props 타입
export interface LayoutProps {
  children: React.ReactNode;
  params: {
    chatRoomId: string;
  };
}

// 에그팝 채팅 멤버 상세정보 타입
export type EggPopChattingMemberInfo = {
  active: boolean;
  admin: boolean;
  egg_pop_id: number;
  egg_pop_member_id: {
    egg_pop_id: number;
    egg_pop_member_id: number;
    user_id: {
      user_age: number;
      user_create_at: string;
      user_email: string;
      user_gender: string;
      user_id: string;
      user_name: string;
      user_profile_img: string;
      user_roletype: boolean;
    };
    egg_pop_chatting_room_member_id: number;
    egg_pop_chatting_room_id: number;
  };
};

// 에그팝 클럽 정보
export type EggPopChatInfo = {
  egg_pop_chatting_room_member_id: number;
  egg_pop_member_id: number;
  egg_pop_id: number;
  created_at: string;
};

// 에그팝 채팅 메세지 확장된 버전
export type ExtendEggPopMessage = {
  egg_pop_chatting_room_message_id: number;
  egg_pop_chatting_room_member_id: number;
  egg_pop_chatting_room_id: number;
  egg_pop_member_id: number;
  egg_pop_id: number;
  user: User;
  user_id: string;
  egg_pop_chatting_room_message_content: string;
  created_at: string;
};

export type EggPopChatRoom = {
  egg_pop_chatting_room_id: number;
  egg_pop_chatting_room_name: string;
};

// 에그팝 타입들...(아직 이름 못바꿈)
export interface OneTimeClub {
  egg_pop_id: number;
  egg_pop_name: string;
  egg_pop_image: string;
}

export interface OneTimeMember {
  egg_pop_member_id: number;
  user_id: string;
  egg_pop_id: number;
  egg_pop_chatting_room_member: OneTimeChatting[];
  egg_pop: OneTimeClub;
}

export interface OneTimeChatting {
  egg_pop_chatting_room_member_id: number;
  egg_pop_chatting_room_id: number;
  egg_pop_chatting_room: EggPopChatRoom;
  egg_pop_chatting_room_message: OneTimeChatMessage[];
}
export interface OneTimeChatMessage {
  egg_pop_chatting_room_message_content: string;
  created_at: string;
}
