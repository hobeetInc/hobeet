"use client"
import Tag from "@/components/uiComponents/TagComponents/Tag";
import Text from "@/components/uiComponents/TextComponents/Text";
import { createClient } from "@/utils/supabase/client";
import { Bell, Home, MessageCircle, Clapperboard } from "lucide-react";
import React from "react";

const ICON_MAP = {
  home: Home,
  chat: MessageCircle,
  bell: Bell,
  clapperBoard: Clapperboard
} as const;

type IconType = "home" | "chat" | "bell" | "clapperBoard";
interface IconProps {
  name: IconType;
}

const Icon = ({ name }: IconProps) => {
  const IconComponent = ICON_MAP[name];
  return <IconComponent className="w-6 h-6" />;
};
  const supabase = createClient();

const loginTest = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: "test1234@naver.com",
    password: "test1234"
  });
  if (error) {
    console.error("Error logging in:", error.message);
  } else {
    console.log("Logged in successfully");
  }
};


const Playground = () => {

  return (
    <>
        <button onClick={loginTest}>
        로그인
      </button>

      <div className="p-8 space-y-8">
        <section>
          <Text as="h2" variant="header-20" className="mb-4">
            Body (Regular)
          </Text>
          <div className="space-y-2">
            <Text variant="body-16" as="h3" className="text-primary-600">
              나는 텍스트
            </Text>
            <Text variant="body-12" className="text-primary-500">
              Body 12 - 본문 텍스트입니다
            </Text>
            <Text variant="body-14">Body 14 - 본문 텍스트입니다</Text>
            <Text variant="body-16">Body 16 - 본문 텍스트입니다</Text>
            <Text variant="body-18">Body 18 - 본문 텍스트입니다</Text>
          </div>
        </section>

        <section>
          <Text as="h2" variant="header-20" className="mb-4">
            Body Medium
          </Text>
          <div className="space-y-2">
            <Text variant="body_medium-12" className="bg-primary-500">
              Body Medium 12 - 본문 텍스트입니다
            </Text>
            <Text variant="body_medium-14">Body Medium 14 - 본문 텍스트입니다</Text>
            <Text variant="body_medium-16">Body Medium 16 - 본문 텍스트입니다</Text>
            <Text variant="body_medium-18">Body Medium 18 - 본문 텍스트입니다</Text>
          </div>
        </section>

        <section>
          <Text as="h2" variant="header-20" className="mb-4">
            Subtitle
          </Text>
          <div className="space-y-2">
            <Text variant="subtitle-12">Subtitle 12 - 부제목 텍스트입니다</Text>
            <Text variant="subtitle-14">Subtitle 14 - 부제목 텍스트입니다</Text>
            <Text variant="subtitle-16">Subtitle 16 - 부제목 텍스트입니다</Text>
            <Text variant="subtitle-18">Subtitle 18 - 부제목 텍스트입니다</Text>
            <Text variant="subtitle-20">Subtitle 20 - 부제목 텍스트입니다</Text>
          </div>
        </section>

        <section>
          <Text as="h2" variant="header-20" className="mb-4">
            Header
          </Text>
          <div className="space-y-2">
            <Text variant="header-16">Header 16 - 헤더 텍스트입니다</Text>
            <Text variant="header-18">Header 18 - 헤더 텍스트입니다</Text>
            <Text variant="header-20">Header 20 - 헤더 텍스트입니다</Text>
            <Text variant="header-32">Header 32 - 헤더 텍스트입니다</Text>
          </div>
        </section>

        <section>
          <Text as="h2" variant="header-20" className="mb-4">
            Icons
          </Text>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Icon name="home" />
              <Text variant="body-16">Home Icon</Text>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="chat" />
              <Text variant="body-16">Chat Icon</Text>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="bell" />
              <Text variant="body-16">Bell Icon</Text>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="clapperBoard" />
              <Text variant="body-16">ClapperBoard Icon</Text>
            </div>
          </div>
        </section>

        <section>
          <Text as="h2" variant="header-20" className="mb-4">
            Tags
          </Text>
          <div className="flex flex-wrap gap-4">
            <Tag tagName="eggpop" />
            <Tag tagName="eggclub" />
            <Tag tagName="eggday" />
            <Tag tagName="eggz" />
            <Tag tagName="eggmaster" variant="black" />
            <Tag tagName="eggmaster" variant="yellow" />
            <Tag tagName="default" />
            <Icon name="bell" />
          </div>
        </section>
      </div>
    </>
  );
};

export default Playground;
