import { BellOutLineIcon, ChatOutLineIcon, HomeOutLineIcon } from "./icons";

type IconType = "home" | "chat" | "bell" | "clapperBoard";

interface IconProps {
  name: IconType;
}

const ICON_MAP = {
  home: HomeOutLineIcon,
  chat: ChatOutLineIcon,
  bell: BellOutLineIcon
} as const;

export function Icon({ name }: IconProps) {
  const IconComponent = ICON_MAP[name];
  return <IconComponent />;
}
