import { BellOutLineIcon, ChatOutLineIcon, HomeOutLineIcon, Location, RocketIcon, WishHeart } from "./Icons";

type IconType = "home" | "chat" | "bell" | "heart" | "rocket" | "location";

interface IconProps {
  name: IconType;
}

const ICON_MAP = {
  home: HomeOutLineIcon,
  chat: ChatOutLineIcon,
  bell: BellOutLineIcon,
  heart: WishHeart,
  rocket: RocketIcon,
  location: Location
} as const;

export function Icon({ name }: IconProps) {
  const IconComponent = ICON_MAP[name];
  return <IconComponent />;
}
