import { BellOutLineIcon, ChatOutLineIcon, HomeOutLineIcon, WishHeart } from "./Icons";

type IconType = "home" | "chat" | "bell" | "heart";

interface IconProps {
  name: IconType;
}

const ICON_MAP = {
  home: HomeOutLineIcon,
  chat: ChatOutLineIcon,
  bell: BellOutLineIcon,
  heart: WishHeart
} as const;

export function Icon({ name }: IconProps) {
  const IconComponent = ICON_MAP[name];
  return <IconComponent />;
}
