"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";

interface HeaderSearchInputProps {
  variant?: "header" | "page";
  className?: string;
  onClear?: () => void;
}

const HeaderSearchInput = ({ variant = "page", className = "", onClear }: HeaderSearchInputProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [searchValue, setSearchValue] = useState(initialQuery);

  useEffect(() => {
    setSearchValue(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleClear = () => {
    setSearchValue("");
    router.push("/search");
    onClear?.(); // props로 받은 함수 실행
  };

  // 웹 버전
  if (variant === "header") {
    return (
      <form onSubmit={handleSubmit} className={`relative h-full w-[620px] ${className}`}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="검색어를 입력해주세요"
          className="w-full h-11 px-5 py-3 rounded-[22px] outline-primary-400 bg-gray-50 placeholder:text-sm placeholder:text-gray-400"
        />
        <div className="absolute right-5 top-2 w-7 h-7 flex items-center justify-center">
          {searchValue ? (
            <button type="button" onClick={handleClear}>
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
  }

  // 모바일 버전
  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center w-full bg-[#f2f2f2] rounded-[22px] py-2 px-5 ${className}`}
    >
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="w-full h-[15px] bg-transparent outline-none text-[14px] font-[400px] placeholder:text-[#a6a6a6]"
      />
      {searchValue.length > 0 && (
        <button type="button" onClick={handleClear}>
          <IoMdCloseCircle className="w-5 h-5" color="#A6A6A6" />
        </button>
      )}
      <button type="submit" className="flex items-center justify-center ml-2 flex-shrink-0">
        <CiSearch className="w-5 h-5" color="#A6A6A6" />
      </button>
    </form>
  );
};

export default HeaderSearchInput;
