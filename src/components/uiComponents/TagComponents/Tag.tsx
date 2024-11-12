import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn/util";
import Text from "../TextComponents/Text";

const tagVariants = cva("h-[19px] px-2 py-0.5 rounded-[124px] justify-center items-center inline-flex", {
  variants: {
    type: {
      eggpop: "bg-primary-500 text-gray-900",
      eggclub: "bg-gray-800 text-white",
      eggday: "bg-primary-300 text-gray-900",
      eggz: "bg-primary-300 text-gray-900",
      eggmaster: "",
      default: "bg-gray-200 text-black"
    },
    variant: {
      black: "bg-gray-800 text-white",
      yellow: "bg-primary-500 text-gray-900",
      day: "bg-primary-300 text-gray-900"
    }
  },
  defaultVariants: {
    type: "default"
  }
});

type TagName = "eggpop" | "eggclub" | "eggday" | "eggz" | "eggmaster" | "default";

interface TagProps extends VariantProps<typeof tagVariants> {
  tagName: TagName;
  className?: string;
}

const Tag = ({ tagName, variant, className }: TagProps) => {
  const getDisplayName = (name: TagName) => {
    switch (name) {
      case "eggpop":
        return "에그팝";
      case "eggclub":
        return "에그클럽";
      case "eggday":
        return "에그데이";
      case "eggz":
        return "에그즈";
      case "eggmaster":
        return "에그장";
      default:
        return name;
    }
  };

  return (
    <div
      className={cn(
        tagVariants({
          type: tagName,
          variant: tagName === "eggmaster" ? (variant as "black" | "yellow" | "day") : undefined
        }),
        className
      )}
    >
      <Text variant="body-10">{getDisplayName(tagName)}</Text>
    </div>
  );
};

export default Tag;
