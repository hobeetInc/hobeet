"use client";

import Image from "next/image";
import Text from "@/components/uiComponents/TextComponents/Text";
import { useRouter } from "next/navigation";
import Tag from "@/components/uiComponents/TagComponents/Tag";
import { Icon } from "@/components/uiComponents/IconComponents/Icon";
import { CustomAddress } from "@/utils/CustomAddress";
import { customDateFormat, customDateNotWeek } from "@/utils/CustomDate";
import { useAuthStore } from "@/store/authStore";
import { usePayments } from "@/hooks/usePayment";

const EggDayPayDetail = () => {
  const router = useRouter();
  const userId = useAuthStore((state) => state.userId);

  const { dayPayments, isLoading, isError } = usePayments(userId);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에그팝 결제 정보 처리 중 오류</div>;

  return (
    <div className="mx-4 mb-4">
      {dayPayments.data?.map((notification) => (
        <div
          key={notification.egg_day.egg_day_id}
          onClick={() => {
            router.push(`/club/regular-club-sub/${notification.egg_club_id}/create/${notification.egg_day.egg_day_id}`);
          }}
          className="flex flex-col w-full h-[163px] border-b border-solid border-gray-100 mb-[32px]"
        >
          <div className="h-[35px] py-2 justify-start items-center gap-2.5 inline-flex">
            <Text variant="subtitle-14"> {customDateFormat(notification.egg_day_kakaopay_create_at)}</Text>
          </div>

          <div className="w-[358px] h-[88px] justify-start items-center gap-2 inline-flex mt-2">
            <div className="h-[88px] justify-start items-center gap-2 inline-flex">
              <Image
                src={notification.egg_day.egg_day_image}
                alt="payList"
                width={88}
                height={88}
                className="w-[88px] h-[88px] relative bg-gray-100 rounded-xl"
              />
            </div>
            <div className="w-[248px] py-0.5 flex-col justify-start items-start gap-0.5 inline-flex">
              <Tag tagName="eggday" />

              <Text variant="subtitle-14">{notification.egg_day.egg_day_name}</Text>
              <div className="pt-[3px] justify-start items-center gap-2 inline-flex">
                <div className="justify-start items-center gap-1 flex">
                  <div className="w-4 h-4 justify-center items-center flex">
                    <Icon name="location" />
                  </div>

                  <Text variant="body_medium-14" className="text-gray-400">
                    {CustomAddress(notification.egg_day.egg_day_location)}
                  </Text>
                </div>

                <Text variant="body_medium-14" className="text-gray-400">
                  {customDateNotWeek(notification.egg_day.egg_day_date_time).date}
                </Text>
                <Text variant="body_medium-14" className="text-gray-400">
                  {customDateNotWeek(notification.egg_day.egg_day_date_time).time}
                </Text>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EggDayPayDetail;
