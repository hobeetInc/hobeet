// 에그팝 가입 버튼 props
export interface JoinClubButtonProps {
  clubId: number;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

// 에그클럽 가입 버튼 props
export interface EggClubJoinButtonProps {
  clubId: number;
  onSuccess?: (currentMembers?: number) => void;
  onError?: (message: string) => void;
  className?: string;
}
