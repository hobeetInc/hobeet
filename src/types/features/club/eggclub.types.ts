import { SetStateAction } from "react";
import { User } from "../user/user.types";
import { Tables } from "../../core/database.types";

export type EggClub = Tables<"egg_club">;
// 위시리스트 타입(Get)
export type WishList = Tables<"wish_list">;

// 정기적 모임 타입
export interface EggClubForm extends EggClub {
  user: Pick<Tables<"user">, "user_name" | "user_profile_img">;
  egg_club_member: { count: number }[];
  wish_list: WishList[];
}

export interface EggClubFormWithImageFile extends Omit<EggClubForm, "egg_club_image"> {
  egg_club_image: File;
}

export type EggClubProps = {
  formData: EggClubFormWithImageFile;
  setFormData: React.Dispatch<SetStateAction<EggClubFormWithImageFile>>;
};

export type MemberTypeProps = EggClubProps & {
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedAge: string;
  setSelectedAge: (value: string) => void;
};

// 위시리스트 타입(Insert)
export type WishListData = Omit<WishList, "wish_list_id">;

export interface Member {
  egg_club_member_id: number;
  user_id: string;
  egg_club_id: number;
  egg_club_participation_request_id: number;
  egg_club_participation_request_status: string;
  egg_club: EggClub;
  user: User;
}

// 클럽 헤더 props
export type ClubHeaderProps = {
  clubInfo: EggClub;
};

// 유저 상태 정보
export type UserStatus = "not_applied" | "pending" | "active";

export type InsertMember = Tables<"egg_club_member">;
