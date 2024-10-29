"use client";

import { useEffect, useState } from "react";
import { getRegularClubList } from "../_api/supabase";
import { RegularClubForm } from "../_types/ClubForm";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tables } from "@/database.types";

type RegularClub = Tables<"regular_club">;

const RegularClubList = () => {
  const [list, setList] = useState<RegularClubForm[]>([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: RegularClub[] = await getRegularClubList();

        // 데이터 임시 확인ㅇㅇ
        console.log("데이터!!!", data);

        setList(data);
      } catch (error) {
        console.error("일회성모임 리스트 가져오는 중 오류가 발생했습니다", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="slider-container">
      <h1 className="font-extrabold text-[20px] my-10">정기적 모임 신규 리스트</h1>

      <Slider {...settings}>
        {list?.map((club) => (
          <div key={club.regular_club_name} className="h-[200px]">
            <div>
              {typeof club.regular_club_image === "string" && (
                <Image
                  src={club.regular_club_image}
                  alt={club.regular_club_name}
                  width={158}
                  height={158}
                  style={{ width: "158px", height: "130px" }}
                  className="object-cover"
                />
              )}
            </div>
            <div className="mt-4 flex flex-col justify-center items-center">
              <h1 className="font-bold text-[13px]">{club.regular_club_name}</h1>
              {/* <div className="mt-2">
                <p className="text-[11px]">{customAddress(club.regular)}</p>
                <p className="text-[11px]">{customDate(club.one_time_club_date_time)}</p>
              </div> */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RegularClubList;