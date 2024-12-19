import Skeleton from "@/components/ui/atoms/Skeleton";
import useScreenSizeStore from "@/store/useScreenSizeStore";

const OneTimeClubSkeleton = () => {
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  if (isLargeScreen) {
    return (
      <div className="relative mx-auto px-5">
        <div className="w-[984px] h-[383px]">
          <div className="w-full h-full flex gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-[228px] flex flex-col gap-3">
                <Skeleton className="w-full h-[228px]" />
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-1/2 h-4" />
                <div className="flex items-center gap-2 mt-2">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-20 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scrollbar-hide h-[330px]">
      <div className="inline-flex items-center px-4 pt-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="mr-4 w-[160px] h-[311px] flex flex-col gap-2">
            <Skeleton className="w-full h-[160px]" />
            <Skeleton className="w-3/4 h-5" />
            <Skeleton className="w-1/2 h-4" />
            <div className="flex items-center gap-2 mt-1">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-16 h-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OneTimeClubSkeleton;
