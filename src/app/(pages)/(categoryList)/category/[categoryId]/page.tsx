"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllMainCategory, getSubCategory } from "../../_api/supabase";
import CategoryList from "../../_components/CategoryList";
import { MainCategory, SubCategory } from "@/types/utils/category.types";
import EggPopCategoryList from "../../_components/EggPopCategoryList";
import LoadingSpinner from "@/components/ui/atoms/LoadingSpinner";

const CategoryPage = () => {
  const params = useParams();
  const categoryId = Number(params.categoryId);

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        if (categoryId === 0) {
          const res = await getAllMainCategory();
          if (res) setMainCategories(res);
        } else {
          const res = await getSubCategory(categoryId);
          if (res) setSubCategories(res);
        }
      } catch (error) {
        setError(`API 호출 중 오류가 발생했습니다. ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categoryId]);

  const getButtonStyle = (isSelected: boolean, categoryId: number) => {
    if (!isSelected) return "bg-[#F2F2F2]";
    return categoryId === 0 ? "bg-[#262626] text-white" : "bg-[#FDB800] text-white";
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="flex items-center justify-center w-full h-36 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex fixed w-full overflow-x-auto scrollbar-hide bg-white z-10 mb-10 ml-4 pt-3">
        <button
          onClick={() => setSelectedCategory(0)}
          className={`flex-shrink-0 py-2 px-3 mr-3 rounded-lg transition-colors ${getButtonStyle(
            selectedCategory === 0,
            categoryId
          )}`}
        >
          전체
        </button>
        {categoryId === 0
          ? mainCategories.map((mainCategory) => (
              <button
                key={mainCategory.main_category_id}
                onClick={() => setSelectedCategory(mainCategory.main_category_id)}
                className={`flex-shrink-0 py-2 px-3 mr-3 rounded-lg transition-colors ${getButtonStyle(
                  selectedCategory === mainCategory.main_category_id,
                  categoryId
                )}`}
              >
                {mainCategory.main_category_name}
              </button>
            ))
          : subCategories.map((subCategory) => (
              <button
                key={subCategory.sub_category_id}
                onClick={() => setSelectedCategory(subCategory.sub_category_id)}
                className={`flex-shrink-0 py-2 px-3 mr-3 rounded-lg transition-colors ${getButtonStyle(
                  selectedCategory === subCategory.sub_category_id,
                  categoryId
                )}`}
              >
                {subCategory.sub_category_name}
              </button>
            ))}
      </div>
      <div className="flex-1 mt-12 overflow-y-auto scrollbar-hide">
        {categoryId === 0 ? (
          <EggPopCategoryList selectedCategory={selectedCategory} />
        ) : (
          <CategoryList categoryId={categoryId} selectedCategory={selectedCategory} />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
