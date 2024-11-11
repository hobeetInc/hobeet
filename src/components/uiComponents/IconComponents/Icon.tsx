import { BellOutLineIcon, ChatOutLineIcon, HomeOutLineIcon, RocketIcon, WishHeart } from "./Icons";

type IconType = "home" | "chat" | "bell" | "heart" | "rocket";

interface IconProps {
  name: IconType;
}

const ICON_MAP = {
  home: HomeOutLineIcon,
  chat: ChatOutLineIcon,
  bell: BellOutLineIcon,
  heart: WishHeart,
  rocket: RocketIcon
} as const;

export function Icon({ name }: IconProps) {
  const IconComponent = ICON_MAP[name];
  return <IconComponent />;
}
