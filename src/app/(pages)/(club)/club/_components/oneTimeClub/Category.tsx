"use client";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { fetchMainCategories, fetchSubCategories } from "../../_api/supabase";
import { EggPopProps } from "@/types/eggpop.types";
import { MainCategory, SubCategory } from "@/types/category.types";

const Category = ({ formData, setFormData }: EggPopProps) => {
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
      <h1 className="text-header-18 mb-6 h-11">어떤 주제로 시작해볼까?</h1>
      <div className="flex flex-col gap-2">
        {mainCategories?.map((main) => (
          <div
            key={main.main_category_id}
            onClick={() => handleCategoryToggle(main.main_category_id)}
            className="h-[72px] p-3 rounded-xl border border-solid border-[#d9d9d9] justify-start items-center inline-flex hover:cursor-pointer"
          >
            <div className="grow shrink basis-0 text-[#0c0c0c] text-base font-semibold font-['Pretendard'] leading-snug">
              {main.main_category_name}
            </div>
            <div className="p-3 justify-start items-center flex">
              <IoIosArrowDown />

              {/* <div className="w-6 h-6 pl-[5px] pr-[5.50px] pt-2 pb-[8.50px] justify-center items-center flex" /> */}
            </div>
          </div>

          // <div
          //   onClick={() => handleCategoryToggle(main.main_category_id)}
          //   className="next-box bg-gray-100 cursor-pointer"
          //   key={main.main_category_id}
          // >
          //   {main.main_category_name}
          //   <br />
          //   <br />
          //   {openCategoryId === main.main_category_id &&
          //     getSubCategory(main.main_category_id).map((sub) => (
          //       <button
          //         key={sub.sub_category_id}
          //         onClick={(e) => {
          //           e.stopPropagation(); // 상위 버튼 클릭 방지
          //           handleSubCategorySelect(main.main_category_id, sub.sub_category_id);
          //         }}
          //         className={`border-2 border-black p-1 m-1
          //         ${formData.sub_category_id === sub.sub_category_id && "bg-blue-200"}`}
          //       >
          //         {sub.sub_category_name}
          //       </button>
          //     ))}
          // </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
