import {
  BellOutLineIcon,
  ChatOutLineIcon,
  HomeOutLineIcon,
  LocationIcon,
  WhiteEgg,
  WishHeart,
  YellowEgg
} from "./icons";

type IconType = "home" | "chat" | "bell" | "heart" | "whiteEgg" | "yellowEgg" | "locationIcon";

interface IconProps {
  name: IconType;
}

const ICON_MAP = {
  home: HomeOutLineIcon,
  chat: ChatOutLineIcon,
  bell: BellOutLineIcon,
  heart: WishHeart,
  whiteEgg: WhiteEgg,
  yellowEgg: YellowEgg,
  locationIcon: LocationIcon
} as const;

export function Icon({ name }: IconProps) {
  const IconComponent = ICON_MAP[name];
  return <IconComponent />;
}
