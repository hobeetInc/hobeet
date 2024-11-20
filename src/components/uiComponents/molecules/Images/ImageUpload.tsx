// components/ui/ImageUpload/index.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn/util";
import { IoAdd } from "react-icons/io5";

const imageUploadVariants = cva("w-[88px] h-[88px] relative rounded-xl transition-colors", {
  variants: {
    variant: {
      default: "bg-gray-100",
      error: "bg-red-200"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

interface ImageUploadProps extends VariantProps<typeof imageUploadVariants> {
  className?: string;
  error?: boolean;
}

const ImageUpload = ({ className, error }: ImageUploadProps) => {
  return (
    <div className={cn(imageUploadVariants({ variant: error ? "error" : "default" }), className)}>
      <IoAdd className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8" />
    </div>
  );
};

export default ImageUpload;
