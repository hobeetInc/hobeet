import Image from "next/image";
import Text from "./text/Text";

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
}

export default function LoadingSpinner({ size = 120, text = "로딩중" }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col justify-center items-center" role="status" aria-live="polite">
      <div className="animate-spin">
        <Image src="/asset/Icon/LoadingIcon.svg" alt="로딩 중..." width={size} height={size} />
      </div>
      <Text variant="subtitle-16" className="text-gray-100 mt-4">
        {text}
      </Text>
    </div>
  );
}
