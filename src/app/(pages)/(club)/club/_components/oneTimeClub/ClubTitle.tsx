import { EggPopProps } from "@/types/eggpop.types";

const ClubTitle = ({ formData, setFormData }: EggPopProps) => {
  console.log("🚀 ~ file: ClubTitle.tsx ~ line 4 ~ ClubTitle ~ formData", formData);
  return (
    <div>
      <h1 className="mb-4">모임의 제목을 작성해 주세요</h1>
      <input
        type="text"
        maxLength={36}
        value={formData.egg_pop_name}
        onChange={(e) =>
          setFormData({
            ...formData,
            egg_pop_name: e.target.value
          })
        }
        className="border-2 border-black mt-4 w-[358px] h-[48px] p-2"
      />
      <div className="text-sm text-gray-500">{formData.egg_pop_name.length} / 36</div>
    </div>
  );
};

export default ClubTitle;
