import { EggClubChattingMember, EggClubId } from "@/types/eggclubchat.types";

// 정기 모임 입장 함수(자동 가입시)
export async function RegularClubChatRoomRecruiterEntrance(club: EggClubId) {
  try {
    const response = await fetch(`/api/regularClubChattingRoom?egg_club_id=${club.egg_club_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("정기 모임 정보를 가져오는 데 실패했습니다.");
    }

    const data: EggClubChattingMember = await response.json();
    // console.log(data);

    const postResponse = await fetch("/api/chatRoomRecruiterEntrance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ EggClubChattingMember: data })
    });

    if (!postResponse.ok) {
      throw new Error("채팅방 입장 처리 중 오류가 발생했습니다.");
    }

    await postResponse.json();
    // console.log(chatRoomRecruiterEntrance);
  } catch (error) {
    console.error("처리 중 오류가 발생했습니다: ", error);
  }
}
interface ClubParams {
  egg_club_id: number; // 또는 string (clubId의 타입에 따라)
  user_id: string;
}

//승인 시 채팅방 입장 함수
export async function RegularClubApproveChatRoomRecruiterEntrance(params: ClubParams) {
  try {
    const response = await fetch(`/api/regularClubChattingRoom?eggclubid=${params.egg_club_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("정기 모임 정보를 가져오는 데 실패했습니다.");
    }

    const data: EggClubChattingMember = await response.json();
    // console.log(data);

    const postResponse = await fetch("/api/chatRoomApproveRecruiterEntrance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        regularClubMember: data,
        user_id: params.user_id
      })
    });

    if (!postResponse.ok) {
      throw new Error("채팅방 입장 처리 중 오류가 발생했습니다.");
    }

    await postResponse.json();
    // console.log(chatRoomRecruiterEntrance);
  } catch (error) {
    console.error("처리 중 오류가 발생했습니다: ", error);
  }
}
