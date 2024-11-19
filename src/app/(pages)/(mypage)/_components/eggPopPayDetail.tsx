"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Text from "@/components/uiComponents/TextComponents/Text";
import Tag from "@/components/uiComponents/TagComponents/Tag";
import { Icon } from "@/components/uiComponents/IconComponents/Icon";
import { customDateFormat, customDateNotWeek } from "@/utils/CustomDate";
import { CustomAddress } from "@/utils/CustomAddress";
import { useAuthStore } from "@/store/authStore";
import { usePayments } from "@/hooks/usePayment";

const EggPopPayDetail = () => {
  const router = useRouter();
  const userId = useAuthStore((state) => state.userId);

  const { popPayments, isLoading, isError } = usePayments(userId);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에그팝 결제 정보 처리 중 오류</div>;

  return (
    <div className="mx-4 mb-4">
      {popPayments.data?.map((oneTimeClub) => (
        <div
          key={oneTimeClub.egg_pop.egg_pop_id}
          onClick={() => {
            router.push(`/club/one-time-club-sub/${oneTimeClub.egg_pop.egg_pop_id}`);
          }}
          className="flex flex-col w-full h-[163px] border-b border-solid border-gray-100 mb-[32px]"
        >
          <div className="h-[35px] justify-start items-center gap-2.5 inline-flex">
            <Text variant="subtitle-14"> {customDateFormat(oneTimeClub.egg_pop_kakaopay_create_at)}</Text>
          </div>

          <div className="w-[358px] h-[88px] justify-start items-center gap-2 inline-flex mt-2">
            <div className="h-[88px] justify-start items-center gap-2 inline-flex">
              <Image
                src={oneTimeClub.egg_pop.egg_pop_image}
                alt="payList"
                width={88}
                height={88}
                className="w-[88px] h-[88px] relative bg-gray-100 rounded-xl"
              />
            </div>
            <div className="w-[248px] py-0.5 flex-col justify-start items-start gap-0.5 inline-flex">
              <Tag tagName="eggpop" />

              <Text variant="subtitle-14">{oneTimeClub.egg_pop.egg_pop_name}</Text>
              <div className="pt-[3px] justify-start items-center gap-2 inline-flex">
                <div className="justify-start items-center gap-1 flex">
                  <div className="w-4 h-4 justify-center items-center flex">
                    <Icon name="location" />
                  </div>

                  <Text variant="body_medium-14" className="text-gray-400">
                    {CustomAddress(oneTimeClub.egg_pop.egg_pop_location)}
                  </Text>
                </div>

                <Text variant="body_medium-14" className="text-gray-400">
                  {customDateNotWeek(oneTimeClub.egg_pop.egg_pop_date_time).date}
                </Text>
                <Text variant="body_medium-14" className="text-gray-400">
                  {customDateNotWeek(oneTimeClub.egg_pop.egg_pop_date_time).time}
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
