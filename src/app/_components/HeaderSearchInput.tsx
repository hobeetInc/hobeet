"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";

const HeaderSearchInput = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative h-full w-[620px]">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="검색어를 입력해주세요"
        className="w-full h-11 px-5 py-3 rounded-[22px] outline-primary-400 bg-gray-50 placeholder:text-sm placeholder:text-gray-400"
      />
      <div className="absolute right-5 top-2 w-7 h-7 flex items-center justify-center">
        {searchValue ? (
          <button type="button" onClick={() => setSearchValue("")} className="">
            <IoMdCloseCircle className="w-5 h-5" />
          </button>
        ) : (
          <button type="submit">
            <CiSearch className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default HeaderSearchInput;
