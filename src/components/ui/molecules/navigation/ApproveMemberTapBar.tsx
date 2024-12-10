import useScreenSizeStore from "@/store/useScreenSizeStore";
import { cn } from "@/utils/cn/util";

interface TabBarProps {
  activeTab: boolean;
  onTabChange: (newActiveTab: boolean) => void;
  value: string;
}

export const ApproveMemberTabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange, value }) => {
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  const getTabText = (tabType: boolean) => {
    if (value === "egges") {
      return tabType ? "전체 에그즈" : "승인 대기";
    } else if (value === "eggday") {
      return tabType ? "홈" : "에그데이";
    }
    return "";
  };

  return (
    <div className={cn("w-full border-b border-gray-50 flex", isLargeScreen ? "px-6 pt-4" : "px-4 pt-2.5")}>
      <button
        className={cn("font-medium relative", isLargeScreen ? "text-lg w-[93px]" : "text-base w-[50%]")}
        onClick={() => onTabChange(true)}
      >
        <span
          className={cn(
            "text-center relative",
            isLargeScreen ? "text-lg" : "text-base",
            activeTab === true ? "text-gray-900 text-body-16" : "text-gray-300"
          )}
        >
          {getTabText(true)}
        </span>
        <div
          className={cn(
            "left-0 w-full h-0.5",
            isLargeScreen ? "mt-4" : "mt-3",
            activeTab === true ? "bg-gray-800" : isLargeScreen ? "bg-transparent" : "bg-gray-50"
          )}
        />
      </button>

      <button
        className={cn("font-medium relative", isLargeScreen ? "text-lg w-[93px]" : "text-base w-[50%]")}
        onClick={() => onTabChange(false)}
      >
        <span
          className={cn(
            "text-center relative",
            isLargeScreen ? "text-lg" : "text-base",
            activeTab === false ? "text-gray-900 text-body-16" : "text-gray-300"
          )}
        >
          {getTabText(false)}
        </span>
        <div
          className={cn(
            "left-0 w-full h-0.5",
            isLargeScreen ? "mt-4" : "mt-3",
            activeTab === false ? "bg-gray-800" : isLargeScreen ? "bg-transparent" : "bg-gray-50"
          )}
        />
      </button>
    </div>
  );
};

export default ApproveMemberTabBar;
