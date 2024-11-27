import { useRef, useEffect, useState } from "react";
import { Icon } from "@/components/uiComponents/atoms/icons/Icon";
import { cn } from "@/utils/cn/util";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatInput = ({ newMessage, setNewMessage, handleSendMessage }: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [sendIconColor, setSentIconColor] = useState<boolean>(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = Math.min(scrollHeight, 120) + "px";
    }
  }, [newMessage]);

  return (
    <div className={cn("fixed bottom-0 left-0 right-0 bg-white border-t ")}>
      <div className={cn("p-2")}>
        <div className={cn("flex items-center")}>
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
              "focus:outline-none  transition duration-200",
              "min-h-[36px] max-h-[120px] content-center resize-none",
              "overflow-y-auto text-body-14",
              "min-w-[316px]"
            )}
            placeholder="메시지를 입력하세요."
            style={{ lineHeight: "1.5" }}
          />
          <button
            type="button"
            onClick={handleSendMessage}
            className={cn(
              "w-[35px] h-[35px] ml-4 rounded-full flex items-center justify-center",
              sendIconColor ? "bg-primary-400" : "bg-gray-50"
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
