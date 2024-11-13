"use client";

import { useQuery } from "@tanstack/react-query";
import { addHours, format, parseISO } from "date-fns";
import { getEggPopPayList } from "../_api/supabase";
import Image from "next/image";
import { EggPopIdInfo } from "@/types/mypage.types";
import { useRouter } from "next/navigation";
import Text from "@/components/uiComponents/TextComponents/Text";
import Tag from "@/components/uiComponents/TagComponents/Tag";
import { Icon } from "@/components/uiComponents/IconComponents/Icon";

const EggPopPayDetail = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<EggPopIdInfo[]>({
    queryKey: ["eggPopPayData"],
    queryFn: getEggPopPayList
  });

  console.log("이거 결제정보:", data);

  const customAddress = (address: string) => {
    const withoutNumber = address?.replace(/\[\d+\]\s*/, "");
    const parts = withoutNumber?.split(" ");
    return parts?.slice(0, 2).join(" ");
  };

  const customDateFormat = (dateString: string | null | undefined) => {
    if (!dateString) {
      console.log("데이트", dateString);
      return "날짜 정보 없음";
    }

    try {
      const parsedDate = parseISO(dateString);
      return format(parsedDate, "yyyy. MM. dd");
    } catch (error) {
      console.error("날짜 포멧팅 실패:", dateString, error);
      return "유효하지 않은 날짜 형식";
    }
  };

  type DateTimeFormat = {
    date: string;
    time: string;
  };

  const customDate = (dateString: string | null | undefined): DateTimeFormat => {
    if (!dateString) {
      return {
        date: "유효하지 않은 날짜",
        time: "유효하지 않은 시간"
      };
    }

    try {
      const parsedDate = parseISO(dateString);
      const adjustedDate = addHours(parsedDate, 9);
      return {
        date: format(adjustedDate, "MM월 dd일"),
        time: format(adjustedDate, "HH:mm")
      };
    } catch (error) {
      console.error("날짜 포멧팅 실패:", dateString, error);
      return {
        date: "유효하지 않은 날짜",
        time: "유효하지 않은 시간"
      };
    }
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div className="mx-4 mb-4">
      {data?.map((oneTimeClub) => (
        <div
          key={oneTimeClub.egg_pop_id.egg_pop_id}
          onClick={() => {
            router.push(`/club/one-time-club-sub/${oneTimeClub.egg_pop_id.egg_pop_id}`);
          }}
          className="flex flex-col w-full h-[163px] border-b border-solid border-gray-100 mb-[32px]"
        >
          <div className="h-[35px] justify-start items-center gap-2.5 inline-flex">
            <Text variant="subtitle-14"> {customDateFormat(oneTimeClub.egg_pop_kakaopay_create_at)}</Text>
          </div>

          <div className="w-[358px] h-[88px] justify-start items-center gap-2 inline-flex mt-2">
            <div className="h-[88px] justify-start items-center gap-2 inline-flex">
              <Image
                src={oneTimeClub.egg_pop_id.egg_pop_image}
                alt="payList"
                width={88}
                height={88}
                className="w-[88px] h-[88px] relative bg-gray-100 rounded-xl"
              />
            </div>
            <div className="w-[248px] py-0.5 flex-col justify-start items-start gap-0.5 inline-flex">
              <Tag tagName="eggpop" />

              <Text variant="subtitle-14">{oneTimeClub.egg_pop_id.egg_pop_name}</Text>
              <div className="pt-[3px] justify-start items-center gap-2 inline-flex">
                <div className="justify-start items-center gap-1 flex">
                  <div className="w-4 h-4 justify-center items-center flex">
                    <Icon name="location" />
                  </div>

                  <Text variant="body_medium-14" className="text-gray-400">
                    {customAddress(oneTimeClub.egg_pop_id.egg_pop_location)}
                  </Text>
                </div>

                <Text variant="body_medium-14" className="text-gray-400">
                  {customDate(oneTimeClub.egg_pop_id.egg_pop_date_time).date}
                </Text>
                <Text variant="body_medium-14" className="text-gray-400">
                  {customDate(oneTimeClub.egg_pop_id.egg_pop_date_time).time}
                </Text>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EggPopPayDetail;

{
  /* <div className="egg-day-pay-list">
{data?.map((oneTimeClub) => (
  <Link
    href={`/club/one-time-club-sub/${oneTimeClub.egg_pop_id.egg_pop_id}`}
    key={oneTimeClub.egg_pop_id.egg_pop_id}
  >
    <div key={oneTimeClub.egg_pop_id.egg_pop_id} className="oneTimeClub-card my-4 mb-[64px]">
      <div className="h-[35px] py-2 justify-start items-center gap-2.5 inline-flex">
        <div className="text-black text-sm font-semibold font-['Pretendard'] leading-[18.90px]">
          {customDateFormat(oneTimeClub.egg_pop_kakaopay_create_at)}
        </div>
      </div>

      <div className="h-[88px] justify-start items-center gap-2 inline-flex">
        <Image
          src={oneTimeClub.egg_pop_id.egg_pop_image}
          alt="payList"
          width={88}
          height={88}
          className="w-[88px] h-[88px] relative bg-[#d9d9d9] rounded-xl"
        />
        <div>
          <div className="inline-flex px-2 py-0.5 bg-primary-500 rounded-[124px] text-[10px] text-gray-900 font-pretendard font-normal leading-[14.50px]">
            에그팝
          </div>
          <h3 className="text-sm font-semibold mt-2">{oneTimeClub.egg_pop_id.egg_pop_name}</h3>
          <div className="flex items-center mt-1 text-gray-400 text-sm">
            <span>
              <Image src={"/asset/Icon/Icon-Location.png"} alt="지도" width={16} height={16} />
            </span>
            <span className="ml-1">{customAddress(oneTimeClub.egg_pop_id.egg_pop_location)}</span>
            <span className="ml-2">{customDate(oneTimeClub.egg_pop_id.egg_pop_date_time)}</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
))}
</div> */
}
