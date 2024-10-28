"use client";

import { useEffect, useState } from "react";
import { getOneTimeClub } from "../_api/supabase";
import { OneTimeClubForm } from "../_types/ClubForm";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 주소 커스텀 함수
const customAddress = (address: string) => {
  const withoutNumber = address.replace(/\[\d+\]\s*/, "");
  const parts = withoutNumber.split(" ");
  return parts.slice(0, 2).join(" ");
};

// 날짜 커스텀 함수
const customDate = (date: string) => {
  const parts = parseISO(date);
  return format(parts, "yy/MM/d");
};

const OneTimeClubList = () => {
  const [list, setList] = useState<OneTimeClubForm[]>([]);

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
        const data = await getOneTimeClub();

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
      <h1 className="font-extrabold text-[20px] my-10">일회성 모임 신규 리스트</h1>

      <Slider {...settings}>
        {list?.map((club) => (
          <div key={club.one_time_club_id} className="h-[200px]">
            <div>
              {typeof club.one_time_image === "string" && (
                <Image
                  src={club.one_time_image}
                  alt={club.one_time_club_name}
                  width={158}
                  height={158}
                  style={{ width: "158px", height: "130px" }}
                  className="object-cover"
                />
              )}
            </div>
            <div className="mt-4 flex flex-col justify-center items-center">
              <h1 className="font-bold text-[13px]">{club.one_time_club_name}</h1>
              <div className="mt-2">
                <p className="text-[11px]">{customAddress(club.one_time_club_location)}</p>
                <p className="text-[11px]">{customDate(club.one_time_club_date_time)}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OneTimeClubList;
