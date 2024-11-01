export interface getRegularClub {
  m_c_id: number;
  s_c_id: number;
  user_id: string;
  pending_members: [];
  regular_club_id: number;
  approved_members: [];
  regular_club_age: number | null;
  regular_club_name: string;
  regular_club_image: string;
  regular_club_gender: string | null;
  regular_club_approval: boolean;
  regular_club_create_at: string;
  regular_club_introduction: string;
  regular_club_people_limited: number;
}

export interface User {
  user_name: string;
  user_profile_img: string;
}

export interface Member {
  r_c_member_id: number;
  user_id: string;
  r_c_id: number;
  r_c_participation_request_id: number;
  regular_club_request_status: string;
  regular_club: getRegularClub;
  user: User;
}
