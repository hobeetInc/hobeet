import { cn } from "@/utils/cn/util";
import { cva, type VariantProps } from "class-variance-authority";
import Text from "@/components/ui/atoms/text/Text";
import useScreenSizeStore from "@/store/useScreenSizeStore";

const buttonVariants = cva(
  "flex justify-center items-center px-[10px] py-[14px] disabled:bg-gray-100 disabled:text-gray-500",
  {
    variants: {
      colorType: {
        black: "bg-gray-800 text-white",
        orange: "bg-primary-500 text-gray-900",
        yellow: "bg-primary-300 text-gray-900"
      },
      borderType: {
        circle: "rounded-[25px]",
        rectangle: "rounded-[8px]"
      },
      sizeType: {
        large: "",
        small: "w-[174px] h-[50px]",
        web: "w-[480px] h-[50px]",
        largeWeb: "w-full max-w-[656px] h-[50px]"
      }
    },
    defaultVariants: {
      borderType: "circle",
      sizeType: "large"
    }
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ children, colorType, borderType, sizeType, className, ...props }: ButtonProps) => {
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  return (
    <button
      className={cn(
        buttonVariants({ colorType, borderType, sizeType }),
        sizeType === "large" && (isLargeScreen ? "w-[1024px] max-w-[1024px]" : "w-full max-w-[358px]"),
        className
      )}
      {...props}
    >
      <Text variant="subtitle-16">{children}</Text>
    </button>
  );
};
