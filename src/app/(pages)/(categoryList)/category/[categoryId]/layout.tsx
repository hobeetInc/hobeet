"use client";

import Text from "@/components/uiComponents/atoms/text/Text";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";
import { MainCategory } from "@/types/utils/category.types";

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: {
    categoryId: string;
  };
}

export default function CategoryLayout({ children, params }: CategoryLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<MainCategory[]>([]);
  const currentCategory = params.categoryId;
  const router = useRouter();

  const supabase = createClient();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("main_category").select("*");
      setCategories(data);
    };
    fetchCategories();
  }, [currentCategory]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col w-full h-screen fixed">
      <header className="flex justify-between items-center h-12 relative px-4 ">
        <div className="flex items-center space-x-2" onClick={() => router.back()}>
          <HiOutlineChevronLeft className="w-6 h-6" />
        </div>
        <div className="flex-1 flex justify-center">
          <h1 onClick={toggleModal} className="cursor-pointer flex items-center">
            <Text variant="header-16" className="ml-10">
              {
                categories.filter((category) => category.main_category_id === Number(currentCategory))[0]
                  ?.main_category_name
              }
              {currentCategory === "0" && "에그팝"}
            </Text>
            <span className="ml-2">
              {isModalOpen ? <IoIosArrowUp className="w-6 h-6" /> : <IoIosArrowDown className="w-6 h-6" />}
            </span>
          </h1>
          {isModalOpen && (
            <div className="absolute top-12 bg-white min-w-[358px] ml-[30px] rounded-[8px] border border-solid border-gray-50 shadow-lg z-50 justify-items-center">
              <div className="w-[358px] h-36 px-[0.50px] bg-white rounded-lg border-2 border-gray-50 grid grid-cols-3 grid-rows-3 gap-0.5">
                <div className="w-[119px] h-12 p-2 bg-white border-r border-b border-solid border-gray-100 justify-center items-center gap-2 flex">
                  <Text variant="body_medium-12" className="text-gray-900">
                    에그팝
                  </Text>
                </div>
                <Link href={`/category/${categories[0].main_category_id}`}>
                  <div className="w-[119px] h-12 p-2 bg-white border-r border-b border-solid border-gray-100 justify-center items-center gap-2 flex">
                    <Text variant="body_medium-12" className="text-gray-900">
                      {categories[0].main_category_name}
                    </Text>
                  </div>
                </Link>
                <Link href={`/category/${categories[1].main_category_id}`}>
                  <div className="w-[119px] h-12 p-2 bg-white border-b border-gray-100 border-solid justify-center items-center gap-2 flex">
                    <Text variant="body_medium-12" className="text-gray-900">
                      {categories[1].main_category_name}
                    </Text>
                  </div>
                </Link>
                <Link href={`/category/${categories[2].main_category_id}`}>
                  <div className="w-[119px] h-12 p-2 bg-white border-r border-b border-gray-100 border-solid justify-center items-center gap-2 flex">
                    <Text variant="body_medium-12" className="text-gray-900">
                      {categories[2].main_category_name}
                    </Text>
                  </div>
                </Link>
                <Link href={`/category/${categories[3].main_category_id}`}>
                  <div className="w-[119px] h-12 p-2 bg-white border-r border-b border-gray-100 border-solid justify-center items-center gap-2 flex">
                    <Text variant="body_medium-12" className="text-gray-900">
                      {categories[3].main_category_name}
                    </Text>
                  </div>
                </Link>
                <Link href={`/category/${categories[4].main_category_id}`}>
                  <div className="w-[119px] h-12 p-2 bg-white border-b border-gray-100 justify-center border-solid items-center gap-2 flex">
                    <Text variant="body_medium-12" className="text-gray-900">
                      {categories[4].main_category_name}
                    </Text>
                  </div>
                </Link>
                <Link href={`/category/${categories[5].main_category_id}`}>
                  <div className="w-[119px] h-12 p-2 bg-white border-r border-gray-100 justify-center border-solid items-center gap-2 flex">
                    <Text variant="body_medium-12" className="text-gray-900">
                      {categories[5].main_category_name}
                    </Text>
                  </div>
                </Link>
                <div className="w-[119px] h-12 p-2 bg-white border-r border-gray-100 justify-center border-solid items-center gap-2 flex">
                  <Text variant="body_medium-12" className="text-gray-300">
                    곧 생겨요!
                  </Text>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => router.push("/club")} className="w-6 h-6 flex items-center justify-center">
            <BsPlusLg className="w-6 h-6" />
          </button>
          <button onClick={() => router.push("/search")} className="w-6 h-6 flex items-center justify-center">
            <IoSearchOutline className="w-6 h-6" />
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-hidden overflow-y-auto scrollbar-hide">{children}</div>
    </div>
  );
}
