interface TabBarProps {
  activeTab: boolean;
  onTabChange: (newActiveTab: boolean) => void;
  vlaue: string;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange, vlaue }) => {
  const getTabText = (tabType: boolean) => {
    if (vlaue === "myclub") {
      return tabType ? "내가 에그장" : "내가 에그즈";
    } else if (vlaue === "mychat") {
      return tabType ? "에그클럽" : "에그팝";
    }
    return "";
  };

  return (
    <div className="h-11 px-4 pt-2.5 border-b border-gray-50 flex">
      <button className="w-[179px] text-base font-pretendard relative" onClick={() => onTabChange(true)}>
        <span
          className={`text-center text-base font-pretendard relative ${
            activeTab === true ? "text-gray-900 text-body-16" : "text-gray-300 font-pretendard"
          }`}
        >
          {getTabText(true)}
        </span>
        {activeTab === true && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500" />}
      </button>

      <button className="w-[179px] text-base font-pretendard relative" onClick={() => onTabChange(false)}>
        <span
          className={`text-center text-base font-pretendard relative ${
            activeTab === false ? "text-gray-900 text-body-16" : "text-gray-300 font-pretendard"
          }`}
        >
          {getTabText(false)}
        </span>
        {activeTab === false && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500" />}
      </button>
    </div>
  );
};

export default TabBar;
