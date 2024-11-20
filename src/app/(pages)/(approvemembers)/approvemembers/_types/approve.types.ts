export interface ParticipationRequest {
  egg_club_participation_request_id: number;
  egg_club_id: number;
  user_id: {
    user_id: string;
    user_name: string;
    user_profile_img: string;
  };
  egg_club_participation_request_status: "pending" | "active";
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface PendingRequestsTabProps {
  requests: ParticipationRequest[];
  onApprove: (requestId: number) => void;
}
