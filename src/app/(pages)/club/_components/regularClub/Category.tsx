"use client";

import { useEffect, useState } from "react";
import { MainCategory, RegularProps, SubCategory } from "../../_types/ClubForm";
import { fetchMainCategories, fetchSubCategories } from "../../_api/supabase";

const Category = ({ formData, setFormData }: RegularProps) => {
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const mainData = await fetchMainCategories();
      const subData = await fetchSubCategories();

      // 확인용
      console.log("수퍼베이스!!", mainData);
      console.log("수퍼베이스!!", subData);

      setMainCategories(mainData);
      setSubCategories(subData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // 카테고리 토글 함수
  const handleCategoryToggle = (categoryId: number) => {
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
  };

  // 중분류 카테고리 선택
  const handleSubCategorySelect = (mainId: number, subId: number) => {
    setFormData({
      ...formData,
      m_c_id: mainId,
      s_c_id: subId
    });
  };

  const getSubCategory = (mainId: number) => {
    return subCategories?.filter((sub) => sub.m_c_id === mainId);
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div>
      <h1 className="mb-4">반짝모임 주제를 선택하세요</h1>
      <div className="flex flex-col gap-2">
        {mainCategories?.map((main) => (
          <div
            onClick={() => handleCategoryToggle(main.m_c_id)}
            className="next-box bg-gray-100 cursor-pointer"
            key={main.m_c_id}
          >
            {main.m_c_name}
            <br />
            <br />
            {openCategoryId === main.m_c_id &&
              getSubCategory(main.m_c_id).map((sub) => (
                <button
                  key={sub.s_c_id}
                  onClick={(e) => {
                    e.stopPropagation(); // 상위 버튼 클릭 방지
                    handleSubCategorySelect(main.m_c_id, sub.s_c_id);
                  }}
                  className={`border-2 border-black p-1 m-1 
                  ${formData.s_c_id === sub.s_c_id && "bg-blue-200"}`}
                >
                  {sub.s_c_name}
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
