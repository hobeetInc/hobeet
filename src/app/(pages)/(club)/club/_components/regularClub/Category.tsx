"use client";

import { useEffect, useState } from "react";
import { fetchMainCategories, fetchSubCategories } from "../../_api/supabase";
import { EggClubProps } from "@/types/eggclub.types";
import { MainCategory, SubCategory } from "@/types/category.types";

const Category = ({ formData, setFormData }: EggClubProps) => {
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const mainData = await fetchMainCategories();
      const subData = await fetchSubCategories();

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
      main_category_id: mainId,
      sub_category_id: subId
    });
  };

  const getSubCategory = (mainId: number) => {
    return subCategories?.filter((sub) => sub.main_category_id === mainId);
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div>
      <h1 className="mb-4">반짝모임 주제를 선택하세요</h1>
      <div className="flex flex-col gap-2">
        {mainCategories?.map((main) => (
          <div
            onClick={() => handleCategoryToggle(main.main_category_id)}
            className="next-box bg-gray-100 cursor-pointer"
            key={main.main_category_id}
          >
            {main.main_category_name}
            <br />
            <br />
            {openCategoryId === main.main_category_id &&
              getSubCategory(main.main_category_id).map((sub) => (
                <button
                  key={sub.sub_category_id}
                  onClick={(e) => {
                    e.stopPropagation(); // 상위 버튼 클릭 방지
                    handleSubCategorySelect(main.main_category_id, sub.sub_category_id);
                  }}
                  className={`border-2 border-black p-1 m-1 
                  ${formData.sub_category_id === sub.sub_category_id && "bg-blue-200"}`}
                >
                  {sub.sub_category_name}
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
