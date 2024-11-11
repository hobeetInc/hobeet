import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn/util";
import { TextareaHTMLAttributes, forwardRef } from "react";

const textareaVariants = cva(
  "min-h-[81px] w-[358px] px-4 py-3 rounded-xl border border-solid border-gray-100 flex flex-col justify-between"
);

const textareaInputVariants = cva(
  "w-full resize-none bg-transparent text-sm font-normal font-['Pretendard'] leading-tight placeholder:text-gray-300 focus:outline-none"
);

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
  className?: string;
  wrapperClassName?: string;
}

const ClubCreateTextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, wrapperClassName, maxLength, ...props }, ref) => {
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement;
      target.style.height = "";
      target.style.height = `${target.scrollHeight}px`;
    };

    return (
      <div className={cn(textareaVariants(), wrapperClassName)}>
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
