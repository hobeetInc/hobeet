import useScreenSizeStore from "@/store/useScreenSizeStore";

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);
  return (
    <div className={`w-full ${isLargeScreen ? "mb-10" : "mb-9"}`}>
      <div className="w-full h-1 bg-gray-200 rounded-full">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-in-out ${
            totalSteps === 7 ? "bg-primary-500" : totalSteps === 4 ? "bg-primary-300" : "bg-primary-900"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
