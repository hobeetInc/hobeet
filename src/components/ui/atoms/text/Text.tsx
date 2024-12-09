import { cn } from "@/utils/cn/util";
import { cva, type VariantProps } from "class-variance-authority";

const textVariants = cva("font-pretendard", {
  variants: {
    variant: {
      // Body variants (Regular)
      "body-10": "text-[10px] leading-[14.5px]",
      "body-12": "text-[12px] leading-[17.4px]",
      "body-14": "text-[14px] leading-[20.3px]",
      "body-16": "text-[16px] leading-[23.2px]",
      "body-18": "text-[18px] leading-[26.1px]",

      // Body Medium variants
      "body_medium-12": "text-[12px] leading-[17.4px] font-medium",
      "body_medium-14": "text-[14px] leading-[20.3px] font-medium",
      "body_medium-16": "text-[16px] leading-[21.6px] font-medium",
      "body_medium-18": "text-[18px] leading-[24.3px] font-medium",

      // Subtitle variants
      "subtitle-12": "text-[12px] leading-[16.2px] font-semibold",
      "subtitle-14": "text-[14px] leading-[18.9px] font-semibold",
      "subtitle-16": "text-[16px] leading-[21.6px] font-semibold",
      "subtitle-18": "text-[18px] leading-[24.3px] font-semibold",
      "subtitle-20": "text-[20px] leading-[27px] font-semibold",

      // Header variants
      "header-16": "text-[16px] leading-[21.6px] font-bold",
      "header-18": "text-[18px] leading-[24.3px] font-bold",
      "header-20": "text-[20px] leading-[27px] font-bold",
      "header-32": "text-[32px] leading-[43.2px] font-bold"
    }
  },
  defaultVariants: {
    variant: "body-14"
  }
});

interface TextProps extends VariantProps<typeof textVariants> {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const Text: React.FC<TextProps> = ({ children, className, as: Component = "div", variant, ...props }) => {
  return (
    <Component className={cn(textVariants({ variant }), className)} {...props}>
      {children}
    </Component>
  );
};

export default Text;
