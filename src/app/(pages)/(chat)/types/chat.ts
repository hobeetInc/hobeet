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
