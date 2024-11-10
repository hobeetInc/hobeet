"use client";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { fetchMainCategories, fetchSubCategories } from "../../_api/supabase";
import { EggPopProps } from "@/types/eggpop.types";
import { MainCategory, SubCategory } from "@/types/category.types";
import Text from "@/components/uiComponents/Text/Text";

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

    setFormData({
      ...formData,
      main_category_id: categoryId,
      sub_category_id: 0
    });
  };

  // 중분류 카테고리 선택
  const handleSubCategorySelect = (mainId: number, subId: number) => {
    setFormData({
      ...formData,
      sub_category_id: subId
    });
  };

  const getSubCategory = (mainId: number) => {
    return subCategories?.filter((sub) => sub.main_category_id === mainId);
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div>
      <Text variant="header-18" className="flex items-center mb-6 h-11">
        어떤 주제로 시작해볼까요?
      </Text>
      <div className="flex flex-col gap-2">
        {mainCategories?.map((main) => (
          <div
            key={main.main_category_id}
            onClick={() => handleCategoryToggle(main.main_category_id)}
            className={`w-[358px] rounded-xl border border-solid border-[#d9d9d9] hover:cursor-pointer ${
              formData.main_category_id === 0
                ? "bg-white"
                : openCategoryId === main.main_category_id
                ? "bg-primary-200 border-primary-200"
                : "bg-gray-50 border-gray-50"
            }`}
          >
            {/* 메인 카테고리와 토글 버튼을 포함하는 컨테이너 - 높이 72px로 고정 */}
            <div className="flex justify-between items-center h-[72px] px-3">
              <Text variant="subtitle-16">{main.main_category_name}</Text>
              <div className="w-12 h-12 flex items-center justify-center">
                {openCategoryId === main.main_category_id ? (
                  <IoIosArrowUp className="w-6 h-6" />
                ) : (
                  <IoIosArrowDown className="w-6 h-6" />
                )}
              </div>
            </div>

            {/* 서브 카테고리 컨테이너 */}
            {openCategoryId === main.main_category_id && (
              <div className="grid-cols-3 grid gap-2 p-3 pt-0">
                {getSubCategory(main.main_category_id).map((sub) => (
                  <div
                    key={sub.sub_category_id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubCategorySelect(main.main_category_id, sub.sub_category_id);
                    }}
                    className={`min-w-[106px] h-[43px] px-2 py-3 bg-white rounded-lg border border-solid border-[#d9d9d9] justify-center items-center inline-flex ${
                      formData.sub_category_id === sub.sub_category_id && "border-primary-500"
                    }`}
                  >
                    <Text
                      variant="subtitle-14"
                      className={`${
                        formData.sub_category_id === 0
                          ? "text-primary-900"
                          : formData.sub_category_id === sub.sub_category_id
                          ? "text-primary-500"
                          : "text-gray-300"
                      }`}
                    >
                      {" "}
                      {sub.sub_category_name}
                    </Text>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
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
