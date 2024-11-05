import { FC } from "react";
import { getCategoryList } from "../_api/supabase";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface CategoryListProps {
  categoryId: number;
  selectedCategory: number;
}

const CategoryList: FC<CategoryListProps> = ({ categoryId, selectedCategory }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categoryList", categoryId, selectedCategory],
    queryFn: () => getCategoryList(categoryId, selectedCategory),
    enabled: !!categoryId
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // console.log(data);

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <>
      <div>
        <div className="flex w-[390px] py-2 px-4 gap-[10px] mt-[28px]">
          <p className="text-[14px] font-[500px] leading-[145%]">전체 {data?.length}</p>
        </div>
      </div>
      <div className="flex items-start content-start gap-10 self-stretch flex-wrap">
        {data?.map((club) => (
          <div key={club.regular_club_id} className="flex flex-col w-[174px] h-[306px]">
            <div className="flex-shrink-0 w-[174px] h-[174px] rounded-[18px] bg-[#d9d9d9] overflow-hidden">
              <Image
                width={174}
                height={174}
                src={club.regular_club_image}
                alt={club.regular_club_name}
                className="w-full h-full rounded-[18px] object-cover"
              />
            </div>
            <div className="flex w-[174px] flex-col items-start gap-[8px]">
              <div className="flex py-[2px] px-[8px] justify-center items-center rounded-[128px] bg-[#262626]">
                <p className="font-pretendard text-[10px] leading-[14.5px] not-italic font-normal text-[#ffffff]">
                  에그클럽
                </p>
              </div>
              <p className="text-[18px] font-semibold leading-[24.3px] mt-[12px]">{club.regular_club_name}</p>
              <div className="flex items-center gap-2 self-stretch">
                <div className="flex w-[22px] h-[22px] justify-center items-center rounded-full overflow-hidden">
                  <Image
                    src={club.user_id.user_profile_img}
                    alt="profile"
                    width={22}
                    height={22}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex max-w-[160px] items-center gap-[2px]">
                  <p className="overflow-hidden leading-[20.3px] text-[#8c8c8c] text-ellipsis font-pretendard text-[14px] font-[500px]">
                    {club.user_id.user_name}
                  </p>
                  <p className="font-pretendard text-[14px] ml-[8px] leading-[20.3px] text-[#8c8c8c] font-[500px]">
                    멤버
                  </p>
                  <p className="font-pretendard text-[14px] ml-[2px] leading-[20.3px] text-[#8c8c8c] font-[500px]">
                    {club.r_c_member[0].count} / {club.regular_club_people_limited}
                  </p>
                </div>
              </div>
              <div className="flex pt-[10.5px] items-center gap-[2px]">
                <Image
                  width={16}
                  height={16}
                  src="/asset/Icon/Icon-Heart.png"
                  alt="Heart"
                  className="flex w-4 h-4 justify-center items-center"
                />
                <p className="text-[#8c8c8c] font-pretendard text-[12px] font-[400px] leading-[17.4px]">
                  {club.wish_list[0].count > 100 ? "100+" : club.wish_list[0].count}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryList;
