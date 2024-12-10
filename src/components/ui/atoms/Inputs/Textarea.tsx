import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn/util";
import { TextareaHTMLAttributes, forwardRef } from "react";
import useScreenSizeStore from "@/store/useScreenSizeStore";

const textareaVariants = cva(
  `min-h-[81px] px-4 py-3 rounded-xl border border-solid border-gray-100 flex flex-col justify-between`,
  {
    variants: {
      isLarge: {
        true: "w-[656px] h-[111px] mb-[195px]",
        false: "w-[358px]"
      }
    },
    defaultVariants: {
      isLarge: false
    }
  }
);

const textareaInputVariants = cva(
  "w-full resize-none bg-transparent text-sm font-normal font-['Pretendard'] leading-tight placeholder:text-gray-300 focus:outline-none"
);

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> {
  className?: string;
  wrapperClassName?: string;
  value: string;
  maxLength: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

const ClubCreateTextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, wrapperClassName, maxLength, ...props }, ref) => {
    const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement;
      target.style.height = "";
      target.style.height = `${target.scrollHeight}px`;
    };

    return (
      <div className={cn(textareaVariants({ isLarge: isLargeScreen }), wrapperClassName)}>
        <textarea
          ref={ref}
          className={cn(textareaInputVariants(), className)}
          maxLength={maxLength}
          onInput={handleInput}
          {...props}
        />
        {maxLength && (
          <div className="flex justify-end">
            <div className="text-sm text-gray-500">
              {props.value?.toString().length || 0} / {maxLength}
            </div>
          </div>
        )}
      </div>
    );
  }
);

ClubCreateTextArea.displayName = "TextArea";

export default ClubCreateTextArea;
