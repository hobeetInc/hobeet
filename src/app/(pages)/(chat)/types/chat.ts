//정기적 모임
export interface ChatMessage {
  r_c_n_chatting_message_content: string;
  r_c_n_chatting_message_create_at: string;
}

export interface ChatRoom {
  r_c_n_chatting_room_id: number;
  r_c_n_chatting_room_name: string;
}

export interface Chatting {
  r_c_n_chatting_id: number;
  r_c_n_chatting_room_id: number;
  r_c_n_chatting_room: ChatRoom;
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

//일회성 모임
export type OneTimeChatRoom = {
  one_time_club_chatting_room_id: number;
  one_time_club_chatting_room_name: string;
};
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
  one_time_club_chatting_room: OneTimeChatRoom;
  one_time_club_chatting_room_message: OneTimeChatMessage[];
}
export interface OneTimeChatMessage {
  one_time_club_chatting_room_message_content: string;
  created_at: string;
}
