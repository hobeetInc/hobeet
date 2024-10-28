import { RegularProps } from "../../_types/ClubForm";

const ClubTitle = ({ formData, setFormData }: RegularProps) => {
  return (
    <div>
      <h1>모임의 제목을 작성해 주세요</h1>
      <input
        type="text"
        value={formData.regular_club_name}
        onChange={(e) =>
          setFormData({
            ...formData,
            regular_club_name: e.target.value
          })
        }
        className="border-2 border-black mt-4 w-[358px] h-[48px] p-2"
      />
    </div>
  );
};

export default ClubTitle;
