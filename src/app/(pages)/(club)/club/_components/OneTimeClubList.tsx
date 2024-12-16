"use client";

import { useEffect, useState } from "react";
import { getOneTimeClub } from "../_api/supabase";
import { format, parseISO } from "date-fns";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { EggPopForm } from "@/types/features/club/eggpop.types";

// 주소 커스텀 함수
const customAddress = (address: string) => {
  const withoutNumber = address.replace(/\[\d+\]\s*/, "");
  const parts = withoutNumber.split(" ");
  return parts.slice(0, 2).join(" ");
};

// 날짜 커스텀 함수
const customDate = (date: string) => {
  try {
    const parsedDate = parseISO(date);
    return format(parsedDate, "yy/MM/d");
  } catch (error) {
    console.error("Invalid date format", error);
    return "Invalid date";
  }
};

const OneTimeClubList = () => {
  const [list, setList] = useState<EggPopForm[]>([]);

  // const settings = {
  //   // dots: true,
  //   infinite: list.length > 3,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  //   // autoplay: true,
  //   centerMode: true,
  //   centerPadding: "7px"
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOneTimeClub();
        setList(data);
      } catch (error) {
        console.error("일회성모임 리스트 가져오는 중 오류가 발생했습니다", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="slider-container mt-[18px] w-[360px] ml-[17px] ">
      {/* <Slider {...settings}> */}
      {list?.map((club) => (
        <Link href={`/club/one-time-club-sub/${club.egg_pop_id}`} key={club.egg_pop_id} className="w-[380px] h-[240px]">
          <div className="relative ">
            <div
              className="relative flex justify-end items-center "
              style={{
                width: "160px",
                height: "160px",
                padding: "112px 0px 0px 112px",
                borderRadius: "12px",
                background: `url(${club.egg_pop_image}) lightgray 50% / cover no-repeat`,
                display: "flex",
                alignItems: "center"
              }}
            />
          </div>

          <div className="flex w-[160px] flex-col items-start gap-[4px] mt-[8px]">
            <div className="flex w-[160px] h-[23px] flex-col items-start gap-1">
              <div
                className="flex py-[2px] px-[8px] justify-center items-center
                 rounded-[128px] bg-[#fdb800]"
              >
                <p className="font-pretendard text-[10px] not-italic font-normal">에그팝</p>
              </div>
            </div>
            <div className="w-[160px]">
              <p
                className="font-pretendard text-[16px] font-[600] overflow-hidden text-overflow-ellipsis"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  alignSelf: "stretch",
                  color: "var(--Gray-scale-900, #0D0D0D)",
                  lineHeight: "135%"
                }}
              >
                {club.egg_pop_name}
              </p>
            </div>
            <div className="mt-2 text-center">
              <p className="text-[11px]">{customAddress(club.egg_pop_location)}</p>
              <p className="text-[11px]">{customDate(club.egg_pop_date_time)}</p>
            </div>
          </div>
        </Link>
      ))}
      {/* </Slider> */}
    </div>
  );
};

export default OneTimeClubList;
