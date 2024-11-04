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
export async function OneTimeClubChatRoomRecruiterEntrance(one_time_club_id: clubId) {
  console.log(one_time_club_id.one_time_club_id, "야야야 이재호 야야야 이재호");

  try {
    console.log("야양야야야 죄지민 여기 왔다가냐??");

    const response = await fetch(
      `http://localhost:3000/api/oneTimeClubChattingRoom?one_time_club_id=${one_time_club_id.one_time_club_id}`,
      {
        method: "GET"
      }
    );

    if (!response.ok) {
      throw new Error("일회성 모임 정보를 가져오는 데 실패했습니다.");
    }

    const data: oneTimeClubMember = await response.json();
    console.log("data!!!!", data);

    const postResponse = await fetch("http://localhost:3000/api/oneTimeChatRoomRecruiterEntrance", {
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
