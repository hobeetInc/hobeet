import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn/util";
import { forwardRef, ReactNode } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import useScreenSizeStore from "@/store/useScreenSizeStore";

const inputVariants = cva(
  "w-[358px] h-12 pl-5 bg-gray-50 rounded-lg justify-start items-center inline-flex overflow-hidden",
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

interface SearchInputProps extends VariantProps<typeof inputVariants> {
  className?: string;
  children: ReactNode;
  hasValue?: boolean;
  onClear?: (e: React.MouseEvent) => void;
}

const SearchInput = forwardRef<HTMLDivElement, SearchInputProps>(
  ({ className, children, hasValue, onClear, ...props }, ref) => {
    const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);
    return (
      <div className={cn(inputVariants({ isLarge: isLargeScreen }), className)} ref={ref} {...props}>
        {children}
        <div className="justify-start items-center flex">
          <div className="pr-3 py-3 justify-start items-center flex">
            {hasValue ? (
              <button type="button" onClick={onClear} className="flex items-center justify-center">
                <IoMdCloseCircle className="w-6 h-6 text-gray-300" />
              </button>
            ) : (
              <CiSearch className="w-6 h-6 text-gray-300" />
            )}
          </div>
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
