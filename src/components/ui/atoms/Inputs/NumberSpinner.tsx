import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FaMinus, FaPlus } from "react-icons/fa";
import Text from "@/components/ui/atoms/text/Text";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

interface SpinnerProps {
  max: number;
  min?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const NumberSpinner = ({ max, min = 2, value, onChange, className }: SpinnerProps) => {
  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div
      className={cn(
        "h-12 px-5 rounded-xl border border-solid border-[#f2f2f2] justify-between items-center inline-flex",
        className
      )}
    >
      <div className="w-12 h-12 justify-center items-center gap-2.5 flex">
        <button
          onClick={handleDecrease}
          disabled={value <= min}
          className="w-4 h-4 flex justify-center items-center disabled:opacity-50"
        >
          <FaMinus className="w-4 h-4" />
        </button>
      </div>

      <div className="justify-start items-center gap-2 flex">
        <Text variant="subtitle-14">{String(value).padStart(2, "0")}</Text>
        <Text variant="subtitle-14">명</Text>
      </div>

      <div className="w-12 h-12 justify-center items-center gap-2.5 flex">
        <button
          onClick={handleIncrease}
          disabled={value >= max}
          className="w-4 h-4 flex justify-center items-center disabled:opacity-50"
        >
          <FaPlus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NumberSpinner;
