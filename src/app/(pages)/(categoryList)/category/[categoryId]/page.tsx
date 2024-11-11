"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSubCategory } from "../../_api/supabase";
import CategoryList from "../../_components/CategoryList";
import { SubCategory } from "@/types/category.types";


const CategoryPage = () => {
  const params = useParams();
  const categoryId = Number(params.categoryId);

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        setLoading(true);
        const res = await getSubCategory(categoryId);
        if (res) {
          setSubCategories(res);
        } else {
          setError("하위 카테고리를 불러오지 못했습니다.");
        }
      } catch (error) {
        setError(`API 호출 중 오류가 발생했습니다. ${error}`);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchSubCategory();
    }
  }, [categoryId]);
  // console.log(subCategories);

  if (loading) {
    return <div className="flex items-center justify-center w-full h-36">로딩 중...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center w-full h-36 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex fixed w-full h-auto overflow-x-auto p-4 gap-2 bg-white z-10">
        <button
          onClick={() => setSelectedCategory(0)}
          className={`flex-shrink-0 py-2 px-3 rounded-lg transition-colors ${
            selectedCategory === 0 ? "bg-[#FDB800] text-white" : "bg-[#F2F2F2]"
          }`}
        >
          전체
        </button>
        {subCategories.map((subCategory) => (
          <button
            key={subCategory.sub_category_id}
            onClick={() => setSelectedCategory(subCategory.sub_category_id)}
            className={`flex-shrink-0 py-2 px-3 rounded-lg transition-colors ${
              selectedCategory === subCategory.sub_category_id ? "bg-[#FDB800] text-white" : "bg-[#F2F2F2] "
            }`}
          >
            {subCategory.sub_category_name}
          </button>
        ))}
      </div>
      <div className="flex-1 mt-16 overflow-y-auto">
        <CategoryList categoryId={categoryId} selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default CategoryPage;
