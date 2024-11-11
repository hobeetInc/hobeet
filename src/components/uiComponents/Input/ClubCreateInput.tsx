// components/ui/Input/index.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn/util";
import { InputHTMLAttributes, forwardRef } from "react";

const inputVariants = cva(
  "w-full h-12 pl-5 bg-gray-50 rounded-lg text-sm font-normal placeholder:text-gray-300 focus:outline-none"
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  className?: string;
}

const ClubCreateInput = forwardRef<HTMLInputElement, InputProps>(({ className, placeholder, ...props }, ref) => {
  return <input ref={ref} className={cn(inputVariants(), className)} placeholder={placeholder} {...props} />;
});

ClubCreateInput.displayName = "Input";

export default ClubCreateInput;
