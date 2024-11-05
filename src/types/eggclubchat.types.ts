import { User } from "./user.types";

// 에그클럽 채팅방 생성을 위한 에그클럽 아이디 타입
export interface EggClubId {
  r_c_id: number;
}

// 에그클럽 채팅 타입
export interface BaseEggClubChatting {
  admin: boolean;
  r_c_id: number;
  r_c_member_id: number;
  r_c_n_chatting_id: number;
  r_c_n_chatting_room_id: number;
}

// 에그클럽 채팅 멤버 타입
export interface EggClubChattingMember {
  r_c_id: number;
  r_c_member_id: number;
  r_c_participation_request_id: number;
  user_id: string;
  r_c_n_chatting: EggClubChatting[];
}

// 에그클럽 메세지 타입
interface EggClubChatMessage {
  r_c_n_chatting_message_content: string;
  r_c_n_chatting_message_create_at: string;
}

// 에그클럽 채팅방 타입
export interface EggClubChattingRoom {
  user_id: string;
  regular_club_id: number;
  r_c_n_chatting_room_id: number;
  r_c_n_chatting_room_name: string;
  regular_club_image: string;
  regular_club_name: string;
  last_message: string;
  last_message_time: string;
  last_message_time_value: string;
  active: boolean;
}

// Chatting이 EggClubChatting을 확장
export interface EggClubChatting extends BaseEggClubChatting {
  active: boolean;
  r_c_n_chatting_room: EggClubChattingRoom;
  r_c_n_chatting_message: EggClubChatMessage[];
}

// 에그클럽 타입
interface EggClub {
  m_c_id: number;
  s_c_id: number;
  user_id: string;
  regular_club_id: number;
  regular_club_age?: number | null;
  regular_club_name: string;
  regular_club_image: string;
  regular_club_gender?: string | null;
  regular_club_approval: boolean;
  regular_club_create_at: string;
  regular_club_introduction: string;
  regular_club_people_limited?: number | null;
}

// 에그클럽 멤버 타입
interface EggClubMember {
  r_c_member_id: number;
  user_id: string;
  r_c_id: number;
  r_c_n_chatting: EggClubChatting[];
  regular_club: EggClub;
}

// 데이터 응답값 타입
export interface ApiResponse {
  data: EggClubMember[];
}

// 에그클럽 채팅 콘텍스트 타입
export interface EggClubChatContextType {
  roomName: string;
  isLoading: boolean;
  r_c_n_chatting_id?: number;
  regular_club_id?: number;
}

// 에그클럽 레이아웃 프롭스
export interface LayoutProps {
  children: React.ReactNode;
  params: {
    chatRoomId: string;
  };
}

// 에그클럽 채팅방 멤버 상세 정보 타입
export type EggClubChattingMemberInfo = {
  active: boolean;
  admin: boolean;
  r_c_id: number;
  r_c_member_id: {
    r_c_id: number;
    r_c_member_id: number;
    regular_club_request_status: string;
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
    r_c_n_chatting_id: number;
    r_c_n_chatting_room_id: number;
  };
};

// 에그클럽 상세 정보 타입
export interface EggClubChatInfo {
  r_c_n_chatting_id: number;
  r_c_member_id: number;
  r_c_id: number;
  chat_room_entry_time: string;
}

// 확장된 에그클럽 메세지 타입
export type ExtendEggClubMessage = {
  r_c_n_chatting_message_id: number;
  r_c_n_chatting_id: number;
  r_c_n_chatting_room_id: number;
  r_c_member_id: number;
  r_c_id: number;
  user: User;
  user_id: string;
  r_c_n_chatting_message_content: string;
  r_c_n_chatting_message_create_at: string;
};

//정기적 모임
export interface ChatMessage {
  r_c_n_chatting_message_content: string;
  r_c_n_chatting_message_create_at: string;
}

export interface EggClubChatRoom {
  r_c_n_chatting_room_id: number;
  r_c_n_chatting_room_name: string;
}

export interface Chatting {
  r_c_n_chatting_id: number;
  r_c_n_chatting_room_id: number;
  r_c_n_chatting_room: EggClubChatRoom;
  r_c_n_chatting_message: ChatMessage[];
}

export interface RegularClub {
  regular_club_id: number;
  regular_club_name: string;
  regular_club_image: string;
}

export interface Member {
  r_c_member_id: number;
  user_id: string;
  r_c_id: number;
  r_c_n_chatting: Chatting[];
  regular_club: RegularClub;
}

export type chattingRoom = {
  r_c_n_chatting_room_id: number;
  r_c_n_chatting_room_name: string;
};
