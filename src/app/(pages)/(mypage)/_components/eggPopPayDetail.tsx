"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Text from "@/components/ui/atoms/text/Text";
import Tag from "@/components/ui/atoms/tags/Tag";
import { Icon } from "@/components/ui/atoms/icons/Icon";
import { customDateFormat, customDateNotWeek } from "@/utils/CustomDate";
import { CustomAddress } from "@/utils/CustomAddress";
import { useAuthStore } from "@/store/authStore";
import { usePayments } from "@/hooks/utils/api/usePayment";
import useScreenSizeStore from "@/store/useScreenSizeStore";
import LoadingSpinner from "@/components/ui/atoms/LoadingSpinner";

const EggPopPayDetail = () => {
  const router = useRouter();
  const userId = useAuthStore((state) => state.userId);
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  const { popPayments, isLoading, isError } = usePayments(userId);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>에그팝 결제 정보 처리 중 오류</div>;

  return (
    <div className="relative">
      {popPayments.data.length === 0 ? (
        <Text variant="subtitle-14" className="text-gray-500 ml-[16px] mt-[10px]">
          에그팝 결제 내역이 없습니다.
        </Text>
      ) : (
        <div className="mx-4 mb-4">
          {popPayments.data?.map((oneTimeClub) => (
            <div
              key={oneTimeClub.egg_pop.egg_pop_id}
              onClick={() => {
                router.push(`/club/one-time-club-sub/${oneTimeClub.egg_pop.egg_pop_id}`);
              }}
              className="flex flex-col w-full h-[163px] border-b border-solid border-gray-100 mb-[32px] lg:h-[192px]"
            >
              <div className="h-[35px] justify-start items-center gap-2.5 inline-flex">
                <Text variant={isLargeScreen ? "subtitle-16" : "subtitle-14"}>
                  {customDateFormat(oneTimeClub.egg_pop_kakaopay_create_at)}
                </Text>
              </div>

              <div className="w-[358px] h-[88px] justify-start items-center gap-2 inline-flex mt-2 lg:ml-[164px]">
                <div className="h-[88px] justify-start items-center gap-2 inline-flex lg:w-[144px] lg:h-[144px] lg:mr-2">
                  <div className="relative w-[88px] h-[88px] lg:w-[144px] lg:h-[144px]">
                    <Image
                      src={oneTimeClub.egg_pop.egg_pop_image}
                      alt="payList"
                      fill
                      className="object-cover bg-gray-100 rounded-xl"
                    />
                  </div>
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
      )}
    </div>
  );
};

export default EggPopPayDetail;
