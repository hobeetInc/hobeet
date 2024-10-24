import { MAIN_CATEGORIES, SUB_CATEGORIES } from "../_types/ClubForm";

interface CategoryProps {
  isOpen: number | null;
  onSubSelect: (mainId: number, subId: number) => void;
  onToggle: (id: number) => void;
  selectedSubId: number | null;
}

const Category = ({ isOpen, onSubSelect, onToggle, selectedSubId }: CategoryProps) => {
  const getSubCategory = (mainId: number) => {
    return SUB_CATEGORIES.filter((sub) => sub.m_c_id === mainId);
  };

  return (
    <div>
      <h1 className="mb-4">반짝모임 주제를 선택하세요</h1>
      <div className="flex flex-col gap-2">
        {MAIN_CATEGORIES.map((main) => (
          <button onClick={() => onToggle(main.m_c_id)} className="next-box bg-gray-100" key={main.m_c_id}>
            {main.m_c_name}
            <br />
            <br />
            {isOpen === main.m_c_id &&
              getSubCategory(main.m_c_id).map((sub) => (
                <button
                  key={sub.s_c_id}
                  onClick={(e) => {
                    e.stopPropagation(); // 상위 버튼 클릭 방지
                    onSubSelect(main.m_c_id, sub.s_c_id);
                  }}
                  className={`border-2 border-black p-1 m-1 
                  ${selectedSubId === sub.s_c_id && "bg-blue-200"}`}
                >
                  {sub.s_c_name}
                </button>
              ))}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
