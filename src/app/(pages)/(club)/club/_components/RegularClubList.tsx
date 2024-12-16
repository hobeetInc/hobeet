"use client";

import { useEffect, useState } from "react";
import { getRegularClubList } from "../_api/supabase";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { EggClubForm } from "@/types/features/club/eggclub.types";

const RegularClubList = () => {
  const [list, setList] = useState<EggClubForm[]>([]);

  // const settings = {
  //   infinite: list.length > 3,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   centerMode: true,
  //   centerPadding: "10px"
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRegularClubList();
        setList(data);
      } catch (error) {
        console.error("일회성모임 리스트 가져오는 중 오류가 발생했습니다", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="slider-container slider-container mt-[18px] w-[360px]">
      {/* <Slider {...settings}> */}
      {list?.map((club) => (
        <Link
          href={`/club/regular-club-sub/${club.egg_club_id}`}
          key={club.egg_club_name}
          className="w-[380px] h-[240px]"
        >
          <div className="relative">
            {typeof club.egg_club_image === "string" && (
              <div
                className="relative flex justify-end items-center"
                style={{
                  width: "160px",
                  height: "160px",
                  padding: "112px 0px 0px 112px",
                  borderRadius: "12px",
                  background: `url(${club.egg_club_image}) lightgray 50% / cover no-repeat`,
                  display: "flex",
                  alignItems: "center"
                }}
              ></div>
            )}
            <div className="mt-4 flex flex-col justify-center items-center">
              <h1 className="font-bold text-[13px]">{club.egg_club_name}</h1>
            </div>
          </div>
        </Link>
      ))}
      {/* </Slider> */}
    </div>
  );
};

export default RegularClubList;
