import { BellOutLineIcon, ChatOutLineIcon, HomeOutLineIcon, WhiteEgg, WishHeart, YellowEgg } from "./icons";

type IconType = "home" | "chat" | "bell" | "heart" | "whiteEgg" | "yellowEgg";

interface IconProps {
  name: IconType;
}

const ICON_MAP = {
  home: HomeOutLineIcon,
  chat: ChatOutLineIcon,
  bell: BellOutLineIcon,
  heart: WishHeart,
  whiteEgg: WhiteEgg,
  yellowEgg: YellowEgg
} as const;

export function Icon({ name }: IconProps) {
  const IconComponent = ICON_MAP[name];
  return <IconComponent />;
}
