export interface User {
  user_id: string;
  user_name: string;
  user_profile_img: string;
}

export interface OneTimeClub {
  one_time_club_id: number;
  one_time_club_name: string;
  one_time_club_location: string;
  one_time_club_date_time: string;
  one_time_club_image: string;
  one_time_people_limited: number;
  user_id: string;
}

export interface RegularClub {
  regular_club_id: number;
  regular_club_name: string;
  regular_club_image: string;
  regular_club_people_limited: number;
  user_id: string;
  approved_members: string[];
}
