import {
  BellOutLineIcon,
  ChatOutLineIcon,
  HomeOutLineIcon,
  LocationIcon,
  RocketIcon,
  WhiteEgg,
  WishHeart,
  YellowEgg
} from "./Icons";

type IconType = "home" | "chat" | "bell" | "heart" | "rocket" | "whiteEgg" | "yellowEgg" | "locationIcon";

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
  locationIcon: LocationIcon,
  rocket: RocketIcon
} as const;

export function Icon({ name }: IconProps) {
  const IconComponent = ICON_MAP[name];
  return <IconComponent />;
}
