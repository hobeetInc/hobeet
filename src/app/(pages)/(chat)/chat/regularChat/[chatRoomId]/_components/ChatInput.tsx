"use client";
import { useRef, useEffect, useState } from "react";
import { Icon } from "@/components/ui/atoms/icons/Icon";
import { cn } from "@/utils/cn/util";
import useScreenSizeStore from "@/store/useScreenSizeStore";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatInput = ({ newMessage, setNewMessage, handleSendMessage }: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [sendIconColor, setSentIconColor] = useState<boolean>(false);
  const isLargeScreen = useScreenSizeStore((state) => state.isLargeScreen);

  // 텍스트영역 높이 자동조절
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = Math.min(scrollHeight, 120) + "px";
    }
  }, [newMessage]);

  return (
    <div className={`fixed  bottom-0 left-0 right-0 bg-white border-t ${isLargeScreen ? "justify-self-center	" : ""}`}>
      <div className={cn("p-4", isLargeScreen ? "w-[1024px]" : "w-full")}>
        <div className="flex items-center">
          <textarea
            ref={textareaRef}
            value={newMessage}
            onChange={(e) => {
              setSentIconColor(e.target.value.length > 0);
              const lines = e.target.value.split("\n");
              if (lines.length <= 5) {
                setNewMessage(e.target.value);
              }
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            rows={1}
            maxLength={100}
            className={cn(
              "flex-grow p-2 border-gray-300 bg-gray-50 rounded-[20px]",
              "focus:outline-none transition duration-200",
              "min-h-[37px] max-h-[120px]",
              "content-center resize-none overflow-y-auto",
              "text-body-14 min-w-[316px]"
            )}
            placeholder="메시지를 입력하세요."
          />
          <button
            type="button"
            onClick={handleSendMessage}
            className={cn(
              "w-[40px] h-[40px] ml-4 rounded-full",
              "flex items-center justify-center",
              sendIconColor ? "bg-primary-400" : "bg-gray-50",
              "text-white"
            )}
          >
            <Icon name="rocket" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
