import { cn } from "@/utils/cn/util";
import { cva, type VariantProps } from "class-variance-authority";

const textVariants = cva("text-black font-pretendard", {
  variants: {
    variant: {
      // Body variants (Regular)
      "body-10": "text-body-10",
      "body-12": "text-body-12",
      "body-14": "text-body-14",
      "body-16": "text-body-16",
      "body-18": "text-body-18",

      // Body Medium variants
      "body_medium-12": "text-body_medium-12",
      "body_medium-14": "text-body_medium-14",
      "body_medium-16": "text-body_medium-16",
      "body_medium-18": "text-body_medium-18",

      // Subtitle variants
      "subtitle-12": "text-subtitle-12",
      "subtitle-14": "text-subtitle-14",
      "subtitle-16": "text-subtitle-16",
      "subtitle-18": "text-subtitle-18",
      "subtitle-20": "text-subtitle-20",

      // Header variants
      "header-16": "text-header-16",
      "header-18": "text-header-18",
      "header-20": "text-header-20",
      "header-32": "text-header-32"
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

export const Text = ({ children, variant, className, as: Component = "span" }: TextProps) => {
  return <Component className={cn(textVariants({ variant }), className)}>{children}</Component>;
};
