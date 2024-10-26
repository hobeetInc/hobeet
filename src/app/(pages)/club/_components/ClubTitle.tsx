import { CategoryProps } from "../_types/ClubForm";

export const ClubTitle = ({ formData, setFormData }: CategoryProps) => {
  return (
    <div>
      <h1 className="mb-4">모임의 제목을 작성해 주세요</h1>
      <input
        type="text"
        value={formData.one_time_club_name}
        onChange={(e) =>
          setFormData({
            ...formData,
            one_time_club_name: e.target.value
          })
        }
        className="border-2 border-black mt-4 w-[358px] h-[48px] p-2"
      />
    </div>
  );
};
