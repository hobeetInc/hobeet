import { EggPopProps } from "@/types/eggpop.types";

const ClubTitle = ({ formData, setFormData }: EggPopProps) => {
  return (
    <div>
      <h1 className="mb-4">모임의 제목을 작성해 주세요</h1>
      <input
        type="text"
        maxLength={36}
        value={formData.one_time_club_name}
        onChange={(e) =>
          setFormData({
            ...formData,
            one_time_club_name: e.target.value
          })
        }
        className="border-2 border-black mt-4 w-[358px] h-[48px] p-2"
      />
      <div className="text-sm text-gray-500">{formData.one_time_club_name.length} / 36</div>
    </div>
  );
};

export default ClubTitle;
