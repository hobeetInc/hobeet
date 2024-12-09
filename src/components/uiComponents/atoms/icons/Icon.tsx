import {
  BellOutLineIcon,
  ChatOutLineIcon,
  HomeOutLineIcon,
  LocationIcon,
  RocketIcon,
  WhiteEgg,
  WishHeart,
  YellowEgg,
  Location,
  SearchIcon,
  EmptySearchIcon,
  EggSpeechBubble
} from "./Icons";

type IconType =
  | "home"
  | "chat"
  | "bell"
  | "heart"
  | "rocket"
  | "whiteEgg"
  | "yellowEgg"
  | "locationIcon"
  | "location"
  | "searchIcon"
  | "emptySearchIcon"
  | "eggSpeechBubble";

interface IconProps {
  name: IconType;
}

const ICON_MAP = {
  home: HomeOutLineIcon,
  chat: ChatOutLineIcon,
  bell: BellOutLineIcon,
  heart: WishHeart,
  rocket: RocketIcon,
  location: Location,
  whiteEgg: WhiteEgg,
  yellowEgg: YellowEgg,
  locationIcon: LocationIcon,
  searchIcon: SearchIcon,
  emptySearchIcon: EmptySearchIcon,
  eggSpeechBubble: EggSpeechBubble
} as const;

export function Icon({ name }: IconProps) {
  const IconComponent = ICON_MAP[name];
  return <IconComponent />;
}
