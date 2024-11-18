export const queryKeys = {
  clubWishlist: "clubWishlist",
  pop: {
    all: ["pop"] as const,
    tenList: (limit: number) => ["pop", "list", limit] as const,
    byCategory: (categoryId: number) => ["pop", categoryId] as const,
    detail: (popId: number) => ["pop", "detail", popId] as const
  },
  club: {
    all: ["club"] as const,
    tenList: (limit: number) => ["club", "list", limit] as const,
    byCategory: (categoryId: number) => ["club", categoryId] as const,
    detail: (clubId: number) => ["club", "detail", clubId] as const
  },
  day: {
    all: ["day"] as const,
    byClub: (clubId: number) => ["day", clubId] as const
  },
  user: {
    detail: (userId: string) => ["user", userId] as const,
    hostInfo: (hostId: string) => ["user", "host", hostId] as const
  },
  oneTimeChat: {
    all: ["oneTimeChat"] as const,
    eggPopId: (roomId: string) => [...queryKeys.oneTimeChat.all, "egg_pop_id", roomId] as const,
    memberData: (userId: string, eggPopId: number) =>
      [...queryKeys.oneTimeChat.all, "memberData", userId, eggPopId] as const,
    chatInfo: (roomId: string) => [...queryKeys.oneTimeChat.all, "chatInfo", roomId] as const,
    messages: (roomId: string, createdAt?: string) =>
      [...queryKeys.oneTimeChat.all, "oneTimeMessages", roomId, createdAt] as const
  },
  regularChat: {
    all: ["regularChat"] as const,
    eggClubId: (roomId: string) => [...queryKeys.regularChat.all, "egg_club_id", roomId] as const,
    memberData: (userId: string) => [...queryKeys.regularChat.all, "memberData", userId] as const,
    chatInfo: (roomId: string) => [...queryKeys.regularChat.all, "chatInfo", roomId] as const,
    messages: (roomId: string, entryTime?: string) => [...queryKeys.regularChat.all, "messages", roomId, entryTime]
  },
  categoryList: {
    all: ["categoryList"] as const,
    list: (categoryId: number, selectedCategory: number) =>
      [...queryKeys.categoryList.all, categoryId, selectedCategory] as const
  }
} as const;
