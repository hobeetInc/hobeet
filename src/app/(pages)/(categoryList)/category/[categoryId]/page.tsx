"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSubCategory } from "../../_api/supabase";
import CategoryList from "../../_components/CategoryList";

type Category = {
  s_c_id: number;
  m_c_id: number;
  s_c_name: string;
};

const CategoryPage = () => {
  const params = useParams();
  const categoryId = Number(params.categoryId);

  const [subCategories, setSubCategories] = useState<Category[]>([]);
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
  console.log(subCategories);

  if (loading) {
    return <div className="flex items-center justify-center w-full h-36">로딩 중...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center w-full h-36 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="flex w-full max-w-[390px] h-auto overflow-x-auto p-4 gap-2">
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
            key={subCategory.s_c_id}
            onClick={() => setSelectedCategory(subCategory.s_c_id)}
            className={`flex-shrink-0 py-2 px-3 rounded-lg transition-colors ${
              selectedCategory === subCategory.s_c_id ? "bg-[#FDB800] text-white" : "bg-[#F2F2F2] "
            }`}
          >
            {subCategory.s_c_name}
          </button>
        ))}
      </div>
      <CategoryList categoryId={categoryId} selectedCategory={selectedCategory} />
    </>
  );
};

export default CategoryPage;