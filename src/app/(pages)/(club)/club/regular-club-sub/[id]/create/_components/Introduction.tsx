"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/ui/molecules/Images/ImageUpload";
import Text from "@/components/ui/atoms/text/Text";
import ClubCreateInput from "@/components/ui/atoms/Inputs/ClubCreateInput";
import ClubCreateTextArea from "@/components/ui/atoms/Inputs/Textarea";
import { EggDayProps } from "@/types/features/club/eggday.types";

const Introduction = ({ formData, setFormData }: EggDayProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 마운트 시 또는 formData의 이미지가 변경될 때 미리보기 생성
  useEffect(() => {
    if (formData.egg_day_image instanceof File) {
      const url = URL.createObjectURL(formData.egg_day_image);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [formData.egg_day_image]);

  // 이미지 선택 시 처리하는 함수
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
    setFormData({ ...formData, egg_day_image: file });
  };

  return (
    <div>
      <Text variant="header-18" className="flex items-center mb-6 h-11">
        에그데이를 소개해볼까요?
      </Text>
      {/* <h1 className="mb-4">모임을 소개해주세요</h1> */}
      <div className="flex flex-col gap-8">
        <label htmlFor="image-upload" className="w-[88px] h-[88px] cursor-pointer">
          <input
            id="image-upload"
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/png, image/jpeg"
            className="hidden"
          />
          {previewUrl ? (
            <div className="overflow-hidden rounded-xl">
              <Image
                src={previewUrl}
                alt="모임대표이미지"
                width={88}
                height={88}
                className="w-[88px] h-[88px] object-cover rounded-xl"
              />
            </div>
          ) : (
            <ImageUpload />
          )}
        </label>

        <div className="flex flex-col gap-2">
          <Text variant="body_medium-16">모임의 제목은 무엇인가요?</Text>
          <ClubCreateInput
            type="text"
            maxLength={36}
            value={formData.egg_day_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                egg_day_name: e.target.value
              })
            }
            placeholder="제목을 입력해주세요(최대 글자 36자)"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Text variant="body_medium-16">어떤 모임인가요?</Text>

          <ClubCreateTextArea
            value={formData.egg_day_content}
            maxLength={290}
            onChange={(e) => setFormData({ ...formData, egg_day_content: e.target.value })}
            placeholder="모임 소개를 작성해주세요"
          />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
