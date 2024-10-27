"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { RegularProps } from "../../_types/ClubForm";

const ImageUpload = ({ formData, setFormData }: RegularProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다");
        return;
      }
    }

    // el.type.startsWith("image/") <- 이미지 파일인지 체크
    if (!file?.type.startsWith("image/")) {
      alert("이미지 파일만 업로드가 가능합니다");
      return;
    }

    // 이미지 미리보기용 URL 생성
    const previewImageUrl = URL.createObjectURL(file);
    setPreviewUrl(previewImageUrl);

    // formData에 File 객체 저장
    setFormData({ ...formData, regular_club_image: file });
  };

  const handleDeleteImage = () => {
    setPreviewUrl(null);
    setFormData({ ...formData, regular_club_image: null });

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; //input 값 초기화
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/png, image/jpeg" />
        {previewUrl && (
          <div>
            <Image src={previewUrl} alt="모임대표이미지" width={300} height={200} />
            <button onClick={handleDeleteImage} className="border-2 border-black p-1 my-2">
              이미지 삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
