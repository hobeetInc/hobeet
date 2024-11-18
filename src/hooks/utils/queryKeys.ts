export const queryKeys = {
  clubWishlist: "clubWishlist",
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
};
