"use client";

import Text from '@/components/uiComponents/TextComponents/Text';
import { CategoryLayoutProps, MainCategoryList } from '@/types/search.types';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from "next/link";
import { GoPlus } from 'react-icons/go';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';

export default function CategoryLayout({ children, params }: CategoryLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<MainCategoryList[]>([]);
  const currentCategory = params.categoryId;
  const router = useRouter();

  const supabase = createClient();
  const fetchCategories = async () => {
    const { data } = await supabase.from('main_category').select('*');
    setCategories(data);
  };
  fetchCategories();

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
            <div className="absolute top-12 bg-[#ffffff]  min-w-[358px] ml-[30px] rounded-[8px] border border-solid border-gray-50 shadow-lg z-50 justify-items-center">
              <ul className="grid grid-cols-3 text-center">
                <li className="cursor-pointer border border-solid border-gray-100 w-full h-full">
                  <Text variant="body_medium-12" className="w-[119px] h-[48px] content-center">
                    에그팝
                  </Text>
                </li>
                {categories.map((category) => (
                  <li
                    key={category.main_category_id}
                    className="cursor-pointer border border-solid border-gray-100 w-full h-full"
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                  >
                    <Link href={`/category/${category.main_category_id}`}>
                      <Text variant="body_medium-12" className="text-gray-900 w-[119px] h-[48px] content-center">
                        {category.main_category_name}
                      </Text>
                    </Link>
                  </li>
                ))}
                <li className="cursor-pointer border border-solid border-gray-100 w-full h-full">
                  <Text variant="body_medium-12" className="text-gray-300 w-[119px] h-[48px] content-center">
                    곧 생겨요!
                  </Text>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => router.push("/club")} className="w-6 h-6 flex items-center justify-center">
            <GoPlus className="w-6 h-6" />
          </button>
          <button onClick={() => router.push("/search")} className="w-6 h-6 flex items-center justify-center">
            <IoSearchOutline className="w-5 h-5" />
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-hidden overflow-y-auto ">{children}</div>
    </div>
  );
}
