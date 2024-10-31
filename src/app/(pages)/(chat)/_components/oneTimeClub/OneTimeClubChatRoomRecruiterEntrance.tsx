type clubId = {
  one_time_club_id: number;
};

type oneTimeClubMember = {
  one_time_club_id: number;
  one_time_member_id: number;
  user_id: string;
  one_time_club_chatting_member: Chatting[];
};

type Chatting = {
  admin: boolean;
  one_time_club_id: number;
  one_time_member_id: number;
  one_time_club_chatting_room_member_id: number;
  one_time_club_chatting_room_id: number;
};

// 일회성 모임 입장 함수
export async function OneTimeClubChatRoomRecruiterEntrance(club: clubId) {
  try {
    const response = await fetch(`/api/oneTimeClubChattingRoom?one_time_club_id=${club.one_time_club_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("일회성 모임 정보를 가져오는 데 실패했습니다.");
    }

    const data: oneTimeClubMember = await response.json();
    // console.log(data);

    const postResponse = await fetch("/api/oneTimeChatRoomRecruiterEntrance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ oneTimeClubMember: data })
    });

    if (!postResponse.ok) {
      throw new Error("채팅방 입장 처리 중 오류가 발생했습니다.");
    }

    const oneTimeChatRoomRecruiterEntrance = await postResponse.json();
    console.log(oneTimeChatRoomRecruiterEntrance);
  } catch (error) {
    console.error("처리 중 오류가 발생했습니다: ", error);
  }
}
