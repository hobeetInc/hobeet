// components/ui/Input/index.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn/util";
import { InputHTMLAttributes, forwardRef } from "react";
import useScreenSizeStore from "@/store/useScreenSizeStore";

const inputVariants = cva(
  "h-12 pl-5 bg-gray-50 rounded-lg text-sm font-normal placeholder:text-gray-300 focus:outline-none",
  {
    variants: {
      isLarge: {
        true: "w-[656px]",
        false: "w-[358px]"
      }
    },
    defaultVariants: {
      isLarge: false
    }
  }
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  className?: string;
}

const ClubCreateInput = forwardRef<HTMLInputElement, InputProps>(({ className, placeholder, ...props }, ref) => {
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  return (
    <input
      ref={ref}
      className={cn(inputVariants({ isLarge: isLargeScreen }), className)}
      placeholder={placeholder}
      {...props}
    />
  );
});

ClubCreateInput.displayName = "Input";

export default ClubCreateInput;
