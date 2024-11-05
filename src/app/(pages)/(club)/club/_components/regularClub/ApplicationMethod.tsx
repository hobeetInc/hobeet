import { EggClubProps } from "@/types/eggclub.types";

const ApplicationMethod = ({ formData, setFormData }: EggClubProps) => {
  const methods = [
    {
      id: "approval",
      value: true,
      text: "모임장의 승인 후 참여가 가능해요"
    },
    {
      id: "immediate",
      value: false,
      text: "모임장의 승인 없이 참여가 가능해요"
    }
  ];

  const handleMethod = (value: boolean) => {
    setFormData({ ...formData, regular_club_approval: value });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>신청 방식을 선택해주세요</h1>
      <div className="flex flex-col gap-2">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleMethod(method.value)}
            className={`border-2 border-black h-[57px] ${
              formData.regular_club_approval === method.value ? "bg-blue-100" : ""
            }`}
          >
            {method.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ApplicationMethod;
