"use client";

import { useEffect, useState } from "react";
import { deleteWishList, getWishList, submitWishList } from "../../../_api/supabase";
import Image from "next/image";
import { useAuth } from "@/app/store/AuthContext";
import { WishList } from "../../../_types/ClubForm";
import { useRouter } from "next/navigation";

type WishListHeartProps = {
  regularClubId: number;
};

const WishListHeart = ({ regularClubId }: WishListHeartProps) => {
  const [isWished, setIsWished] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId } = useAuth();
  const router = useRouter();

  // 초기 위시리스트 상태 확인
  useEffect(() => {
    const checkWishListStatus = async () => {
      try {
        const wishData: WishList = await getWishList({
          r_c_id: regularClubId,
          user_id: userId
        });

        setIsWished(!!wishData);
      } catch (error) {
        console.error("위시리스트 불러오기 중 오류 발생:", error);
        setIsWished(false);
      }
    };

    if (userId) {
      checkWishListStatus();
    }
  }, [regularClubId, userId]);

  const toggleWishList = async () => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다");
      router.push("/signin");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      // 위시리스트에서 제거
      if (isWished) {
        await deleteWishList({
          r_c_id: regularClubId,
          user_id: userId
        });

        setIsWished(false);
      } else {
        await submitWishList({ r_c_id: regularClubId, user_id: userId });
        setIsWished(true);
      }
    } catch (error) {
      console.error("위시리스트 토글 중 오류 발생:", error);

      // 에러 발생 시 이전 상태로 되돌리기
      setIsWished((prev) => !prev);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={toggleWishList} disabled={isLoading} className="relative w-6 h-6">
      <Image
        src={isWished ? "/asset/Icon/Icon-Heart.png" : "/asset/Icon/Heart-Outline.png"}
        alt={isWished ? "찜됨" : "찜하기"}
        width={24}
        height={24}
        className={`w-full h-full transition-opacity ${isLoading ? "opacity-50" : "opacity-100"}`}
      />
    </button>
  );
};

export default WishListHeart;