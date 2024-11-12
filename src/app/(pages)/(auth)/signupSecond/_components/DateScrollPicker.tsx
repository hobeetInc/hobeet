import { Button } from "@/components/uiComponents/Button/ButtonCom";
import React, { useState, useRef } from "react";

const DateScrollPicker = ({ values, selectedValue, onSelect, suffix = "", onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollPosition = container.scrollTop;
      const itemHeight = 40;
      const selectedIndex = Math.round(scrollPosition / itemHeight);
      onSelect(values[selectedIndex] || values[0]);
    }
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches ? e.touches[0].clientY : e.clientY);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;

    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - startY;
    setOffsetY(deltaY);

    if (deltaY > 100) {
      setIsVisible(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (offsetY > 100) {
      setIsVisible(false);
      onClose();
    } else {
      setOffsetY(0);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg z-50"
      style={{
        transform: `translateY(${offsetY}px)`,
        transition: isDragging ? "none" : "transform 0.3s ease-out"
      }}
    >
      <div
        className="w-full py-4 cursor-grab active:cursor-grabbing"
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div className="w-16 h-1 mx-auto bg-gray-100 rounded-full" />
      </div>

      <div className="relative">
        <div className="absolute w-full py-4 mx-4 h-10 bg-gray-50 rounded-[8px] top-1/2 -translate-y-1/2 pointer-events-none" />
        <div
          ref={containerRef}
          className="h-40 overflow-auto relative scrollbar-hide"
          onScroll={handleScroll}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch"
          }}
        >
          <div className="py-16">
            {values.map((value) => (
              <div
                key={value}
                className={`h-10 flex items-center justify-center text-lg
                  ${value === selectedValue ? "text-gray-900 font-subtitle-16" : "text-gray-400"}`}
              >
                {value}&nbsp;
                {suffix}
              </div>
            ))}
          </div>
        </div>
      </div>
<div className="justify-items-center">
      <Button
        onClick={() => {
          onSelect(selectedValue);
          onClose();
        }}
        className="w-full py-3 bg-primary-500 text-subtitle-16  rounded-[8px] mx-4 text-white font-medium my-12 hover:bg-primary-500 transition-colors"
      >
        선택완료
      </Button>
</div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default DateScrollPicker;
