type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-9">
      <div className="w-full h-1 bg-gray-200 rounded-full">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-in-out ${
            totalSteps === 7 ? "bg-primary-500" : "bg-primary-900"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
