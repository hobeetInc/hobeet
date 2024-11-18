import { SetStateAction } from "react";
import { Tables } from "./database.types";

export type EggPop = Tables<"egg_pop">;

export type EggPopMember = Tables<"egg_pop_member">;

export interface EggPopForm extends EggPop {
  user: Pick<Tables<"user">, "user_name" | "user_profile_img">;
  egg_pop_member: { count: number }[];
}

export interface EggPopFormWithImageFile extends Omit<EggPopForm, "egg_pop_image"> {
  egg_pop_image: File;
}

// 에그팝 폼 props
export type EggPopProps = {
  formData: EggPopFormWithImageFile;
  setFormData: React.Dispatch<SetStateAction<EggPopFormWithImageFile>>;
};

// 멤버타입 props
export type MemberTypeProps = EggPopProps & {
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedAge: string;
  setSelectedAge: (value: string) => void;
};
