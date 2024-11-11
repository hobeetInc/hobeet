import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn/util";
import { forwardRef, ReactNode } from "react";
import { CiSearch } from "react-icons/ci";

const inputVariants = cva(
  "w-[358px] h-12 pl-5 bg-gray-50 rounded-lg justify-start items-center inline-flex overflow-hidden"
);

interface SearchInputProps extends VariantProps<typeof inputVariants> {
  className?: string;
  children: ReactNode;
}

const SearchInput = forwardRef<HTMLDivElement, SearchInputProps>(({ className, children, ...props }) => {
  return (
    <div className={cn(inputVariants(), className)} {...props}>
      {children}
      <div className="justify-start items-center flex">
        <div className="pr-3 py-3 justify-start items-center flex">
          <CiSearch className="w-6 h-6 text-gray-300" />
        </div>
      </div>
    </div>
  );
});

SearchInput.displayName = "SearchInput";

export default SearchInput;
