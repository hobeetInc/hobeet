import { User } from "./user.types";

// 에그팝 채팅방 생성을 위한 에그팝 아이디 타입
export interface EggPopId {
  one_time_club_id: number;
}

// 에그팝 채팅 타입
interface BaseEggPopChatting {
  admin: boolean;
  one_time_club_id: number;
  one_time_member_id: number;
  one_time_club_chatting_room_member_id: number;
  one_time_club_chatting_room_id: number;
}

// 애그팝 채팅 멤버 타입
export interface EggPopChattingMember {
  one_time_club_id: number;
  one_time_member_id: number;
  user_id: string;
  one_time_club_chatting_member: EggPopChatting[];
}

// 채팅 메세지 타입
interface EggPopChatMessage {
  one_time_club_chatting_room_message_content: string;
  created_at: string;
}

// 채팅방 타입
export interface EggPopChattingRoom {
  user_id: string;
  one_time_club_id: number;
  one_time_club_chatting_room_id: number;
  one_time_club_chatting_room_name: string;
  one_time_image: string;
  one_time_club_name: string;
  last_message: string;
  last_message_time: string;
  last_message_time_value: string;
  active: boolean;
}

// 확장된 EggPopChatting 타입
export interface EggPopChatting extends BaseEggPopChatting {
  active: boolean;
  one_time_club_chatting_room: EggPopChattingRoom;
  one_time_club_chatting_room_message: EggPopChatMessage[];
}

// 에그팝 타입
interface EggPop {
  m_c_id: number;
  s_c_id: number;
  user_id: string;
  one_time_club_id: number;
  one_time_age?: number | null;
  one_time_club_name: string;
  one_time_image: string;
  one_time_gender?: string | null;
  one_time_create_at: string;
  one_time_club_introduction: string;
  one_time_people_limited?: number | null;
}

// 에그팝 멤버 타입
interface EggPopMember {
  one_time_member_id: number;
  user_id: string;
  one_time_club_id: number;
  one_time_club_chatting_room_member: EggPopChatting[];
  one_time_club: EggPop;
}

// 데이터 응답값 타입
export interface ApiResponse {
  data: EggPopMember[];
}

// 에그팝 채팅 콘텍스트 타입
export interface EggPopChatContextType {
  roomName: string;
  isLoading: boolean;
  one_time_club_chatting_room_id?: number;
  one_time_club_id?: number;
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
  one_time_club_id: number;
  one_time_member_id: {
    o_t_c_id: number;
    o_t_c_member_id: number;
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
    one_time_club_chatting_room_member_id: number;
    one_time_club_chatting_room_id: number;
  };
};

// 에그팝 클럽 정보
export type EggPopChatInfo = {
  one_time_club_chatting_room_member_id: number;
  one_time_member_id: number;
  one_time_club_id: number;
  created_at: string;
};

// 에그팝 채팅 메세지 확장된 버전
export type ExtendEggPopMessage = {
  one_time_club_chatting_room_message_id: number;
  one_time_club_chatting_room_member_id: number;
  one_time_club_chatting_room_id: number;
  one_time_club_member_id: number;
  one_time_club_id: number;
  user: User;
  user_id: string;
  one_time_club_chatting_room_message_content: string;
  created_at: string;
};

export type EggPopChatRoom = {
  one_time_club_chatting_room_id: number;
  one_time_club_chatting_room_name: string;
};

// 에그팝 타입들...(아직 이름 못바꿈)
export interface OneTimeClub {
  one_time_club_id: number;
  one_time_club_name: string;
  one_time_image: string;
}

export interface OneTimeMember {
  o_t_c_member_id: number;
  user_id: string;
  o_t_c_id: number;
  one_time_club_chatting_room_member: OneTimeChatting[];
  one_time_club: OneTimeClub;
}

export interface OneTimeChatting {
  one_time_club_chatting_room_member_id: number;
  one_time_club_chatting_room_id: number;
  one_time_club_chatting_room: EggPopChatRoom;
  one_time_club_chatting_room_message: OneTimeChatMessage[];
}
export interface OneTimeChatMessage {
  one_time_club_chatting_room_message_content: string;
  created_at: string;
}
