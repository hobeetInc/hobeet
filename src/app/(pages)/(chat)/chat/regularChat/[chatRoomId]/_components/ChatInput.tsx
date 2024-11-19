import { useRef, useEffect, useState } from "react";
import { Icon } from "@/components/uiComponents/IconComponents/Icon";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatInput = ({ newMessage, setNewMessage, handleSendMessage }: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [sendIconColor, setSentIconColor] = useState<boolean>(false);

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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="p-4">
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
            className="flex-grow p-2 border-gray-300 bg-gray-50 rounded-[20px] focus:outline-none focus:ring-2 transition duration-200 min-h-[48px] max-h-[120px] content-center resize-none overflow-y-auto text-body-14"
            placeholder="메시지를 입력하세요..."
          />
          <button
            type="button"
            onClick={handleSendMessage}
            className={`w-[40px] h-[40px] ml-4 ${
              sendIconColor ? "bg-primary-400" : "bg-gray-50"
            } text-white rounded-full flex items-center justify-center`}
          >
            <Icon name="rocket" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
