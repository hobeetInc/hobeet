"use client";

import Image from "next/image";
import { useAuth } from "@/store/AuthContext";
import { useRouter } from "next/navigation";
import { useClubWishlist } from "@/hooks";

interface WishListHeartProps {
  egg_club_id: number;
}

const WishListHeart = ({ egg_club_id }: WishListHeartProps) => {
  const { userId } = useAuth();
  const router = useRouter();

  const { isWished, isLoading, addWishlist, removeWishlist } = useClubWishlist({ egg_club_id });

  const hasWished = Boolean(isWished);

  const toggleWishList = async () => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다");
      router.push("/signin");
      return;
    }

    if (isLoading) return;

    try {
      // 위시리스트에서 제거
      if (hasWished) {
        await removeWishlist({
          egg_club_id: egg_club_id,
          user_id: userId
        });
      } else {
        await addWishlist({ egg_club_id: egg_club_id, user_id: userId });
      }
    } catch (error) {
      console.error("위시리스트 토글 중 오류 발생:", error);
    }
  };

  return (
    <button onClick={toggleWishList} disabled={isLoading} className="relative w-6 h-6">
      <Image
        src={hasWished ? "/asset/Icon/Heart-Filled.svg" : "/asset/Icon/Heart-Outline.png"}
        alt={hasWished ? "찜됨" : "찜하기"}
        width={24}
        height={24}
        className={`w-full h-full transition-opacity ${isLoading ? "opacity-50" : "opacity-100"}`}
      />
    </button>
  );
};

export default WishListHeart;
