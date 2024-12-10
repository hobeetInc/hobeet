export interface FullScreenModalProps {
  crewList: {
    memberId: number;
    userId: string;
    userName: string;
    userImage: string;
  }[];
  isOpen: boolean;
  onClose: () => void;
}
