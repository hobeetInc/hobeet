import { getCategoryList, getUserId } from "../_api/supabase";
import { useQuery } from "@tanstack/react-query";

import { VerticalContentsListLargeEggClub } from "@/components/ui/organisms/lists/VerticalContentsListLarge";
import Link from "next/link";
import { queryKeys } from "@/hooks/utils/queryKeys";
import { EggClubForm } from "@/types/features/commerce/cardlist.types";

// 카테고리 리스트 props
interface CategoryListProps {
  categoryId: number;
  selectedCategory: number;
}

const CategoryList = ({ categoryId, selectedCategory }: CategoryListProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.categoryList.list(categoryId, selectedCategory),
    queryFn: () => getCategoryList(categoryId, selectedCategory),
    enabled: !!categoryId
  });

  const { data: userId } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserId(),
    enabled: true
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  const isWishedByUser = (club: EggClubForm) => {
    if (!userId) return false;
    return club.wish_list?.some((wish) => wish.user_id === userId) || false;
  };

  return (
    <>
      <div>
        <div className="flex py-2 px-4 gap-[10px] mt-[28px]">
          <p className="text-[14px] font-[500px] leading-[145%]">전체 {data?.length}</p>
        </div>
      </div>
      <div className="w-[390px] grid-cols-2 grid place-items-center px-4 pt-4 gap-2 mb-5">
        {data?.map((club) => (
          <Link key={club.egg_club_id} href={`/club/regular-club-sub/${club.egg_club_id}`}>
            <div className="flex flex-col">
              <VerticalContentsListLargeEggClub
                eggClub={club}
                hostName={club.user.user_name}
                hostImage={club.user.user_profile_img}
                memberCount={club.egg_club_member[0].count}
                isWished={isWishedByUser(club)}
                wishListCount={club.wish_list.length}
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoryList;
