import { User } from "./user.types";

// 에그클럽 채팅방 생성을 위한 에그클럽 아이디 타입
export interface EggClubId {
  egg_club_id: number;
}

// 에그클럽 채팅 타입
export interface BaseEggClubChatting {
  admin: boolean;
  egg_club_id: number;
  egg_club_member_id: number;
  egg_day_chatting_id: number;
  egg_day_chatting_room_id: number;
}

// 에그클럽 채팅 멤버 타입
export interface EggClubChattingMember {
  egg_club_id: number;
  egg_club_member_id: number;
  egg_club_participation_request_id: number;
  user_id: string;
  egg_day_chatting: EggClubChatting[];
}

// 에그클럽 메세지 타입
export interface EggClubChatMessage {
  egg_day_chatting_message_content: string;
  egg_day_chatting_message_create_at: string;
}

// 에그클럽 채팅방 타입
export interface EggClubChattingRoom {
  user_id: string;
  egg_club_id: number;
  egg_day_chatting_room_id: number;
  egg_day_chatting_room_name: string;
  egg_club_image: string;
  egg_club_name: string;
  last_message: string;
  last_message_time: string;
  last_message_time_value: string;
  active: boolean;
  egg_day_chatting: EggDayChatting[];
}
interface EggDayChatting {
  count: number;
}

// Chatting이 EggClubChatting을 확장
export interface EggClubChatting extends BaseEggClubChatting {
  active: boolean;
  egg_day_chatting_room: EggClubChattingRoom;
  egg_day_chatting_message: EggClubChatMessage[];
}

// 에그클럽 타입
interface EggClub {
  main_category_id: number;
  sub_category_id: number;
  user_id: string;
  egg_club_id: number;
  egg_club_age?: number | null;
  egg_club_name: string;
  egg_club_image: string;
  egg_club_gender?: string | null;
  egg_club_approval: boolean;
  egg_club_create_at: string;
  egg_club_introduction: string;
  egg_club_people_limited?: number | null;
}

// 에그클럽 멤버 타입
interface EggClubMember {
  egg_club_member_id: number;
  user_id: string;
  egg_club_id: number;
  egg_day_chatting: EggClubChatting[];
  egg_club: EggClub;
}

// 데이터 응답값 타입
export interface ApiResponse {
  data: EggClubMember[];
}

// 에그클럽 채팅 콘텍스트 타입
export interface EggClubChatContextType {
  roomName: string;
  isLoading: boolean;
  egg_day_chatting_id?: number;
  egg_club_id?: number;
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
  egg_club_id: number;
  egg_club_member_id: {
    egg_club_id: number;
    egg_club_member_id: number;
    egg_club_participation_request_status: string;
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
    egg_day_chatting_id: number;
    egg_day_chatting_room_id: number;
  };
};

// 에그클럽 상세 정보 타입
export interface EggClubChatInfo {
  egg_day_chatting_id: number;
  egg_club_member_id: number;
  egg_club_id: number;
  chat_room_entry_time: string;
}

// 확장된 에그클럽 메세지 타입
export type ExtendEggClubMessage = {
  egg_day_chatting_message_id: number;
  egg_day_chatting_id: number;
  egg_day_chatting_room_id: number;
  egg_club_member_id: number;
  egg_club_id: number;
  user: User;
  user_id: string;
  egg_day_chatting_message_content: string;
  egg_day_chatting_message_create_at: string;
};

export interface EggClubChatRoom {
  egg_day_chatting_room_id: number;
  egg_day_chatting_room_name: string;
}

// 에그클럽 타입들...(아직 이름 못바꿈)
export interface Chatting {
  egg_day_chatting_id: number;
  egg_day_chatting_room_id: number;
  egg_day_chatting_room: EggClubChatRoom;
  egg_day_chatting_message: EggClubChatMessage[];
}

export interface RegularClub {
  egg_day_id: number;
  egg_day_name: string;
  egg_day_image: string;
}

export interface Member {
  egg_club_member_id: number;
  user_id: string;
  egg_club_id: number;
  egg_day_chatting: Chatting[];
  egg_club: RegularClub;
}

// export type chattingRoom = {
//   r_c_n_chatting_room_id: number;
//   r_c_n_chatting_room_name: string;
// };
