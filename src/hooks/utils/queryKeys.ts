export const queryKeys = {
  clubWishlist: "clubWishlist",
  pop: {
    all: ["pop"] as const,
    tenList: (limit: number) => ["pop", "list", limit] as const,
    byCategory: (mainId: number, subId: number) => ["pop", mainId, subId] as const,
    payments: (userId: string) => ["pop", "payments", userId] as const
  },
  club: {
    all: ["club"] as const,
    tenList: (limit: number) => ["club", "list", limit] as const
  },
  day: {
    byClub: (clubId: number) => ["day", clubId] as const,
    payments: (userId: string) => ["day", "payments", userId] as const
  },
  user: {
    detail: (userId: string) => ["user", userId] as const,
    hostInfo: (hostId: string) => ["user", "host", hostId] as const,
    profile: (userId: string) => ["user", "profile", userId] as const,
    provider: () => ["user", "provider"] as const,
    wishlist: (userId: string) => ["user", "wishlist", userId] as const
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
  },
  payment: {
    club: (clubId: string, isOneTimeClub: boolean) => ["payment", "club", clubId, isOneTimeClub] as const,
    paymentInfo: (userId: string, clubId: string, isOneTimeClub: boolean) =>
      ["payment", "info", userId, clubId, isOneTimeClub] as const,
    paymentClub: (clubId: string, isOneTimeClub: boolean) => ["payment", "clubDetails", clubId, isOneTimeClub] as const,
    regularClubId: (clubId: string) => ["payment", "regularClubId", clubId] as const
  }
} as const;
