import { getCategoryList, getUserId } from "../_api/supabase";
import { useQuery } from "@tanstack/react-query";

import { VerticalContentsListLargeEggClub } from "@/components/ui/organisms/lists/VerticalContentsListLarge";
import Link from "next/link";
import { queryKeys } from "@/hooks/utils/queryKeys";
import { EggClubForm } from "@/types/features/commerce/cardlist.types";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import { BigVerticalContentsEggClubList } from "@/components/ui/organisms/lists/BigVerticalContentsList";
import Text from "@/components/ui/atoms/text/Text";

// 카테고리 리스트 props
interface CategoryListProps {
  categoryId: number;
  selectedCategory: number;
}

const CategoryList = ({ categoryId, selectedCategory }: CategoryListProps) => {
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

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
    <div className={`${isLargeScreen ? "px-5" : "px-4"}`}>
      <div>
        <div className="flex py-2 gap-[10px] mt-[28px]">
          <Text variant="body_medium-14">전체 {data?.length}</Text>
        </div>
      </div>
      <div
        className={` ${
          isLargeScreen
            ? "w-full flex flex-wrap gap-x-6 gap-y-[68px] mb-[176px]"
            : "w-[390px] grid-cols-2 grid place-items-center pt-4 gap-2 mb-5"
        }`}
      >
        {data?.map((club) => (
          <Link key={club.egg_club_id} href={`/club/regular-club-sub/${club.egg_club_id}`}>
            <div className="">
              {isLargeScreen ? (
                <BigVerticalContentsEggClubList
                  eggClub={club}
                  hostName={club.user.user_name}
                  hostImage={club.user.user_profile_img}
                  memberCount={club.egg_club_member[0].count}
                  isWished={isWishedByUser(club)}
                  wishListCount={club.wish_list.length}
                />
              ) : (
                <VerticalContentsListLargeEggClub
                  eggClub={club}
                  hostName={club.user.user_name}
                  hostImage={club.user.user_profile_img}
                  memberCount={club.egg_club_member[0].count}
                  isWished={isWishedByUser(club)}
                  wishListCount={club.wish_list.length}
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
