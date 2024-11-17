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
  }
} as const;
