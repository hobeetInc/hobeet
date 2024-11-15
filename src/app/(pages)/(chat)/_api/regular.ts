import { EggClubChatRoom, EggClubChattingMember, EggClubId } from "@/types/eggclubchat.types";

export async function createRegularChatRoomAndEnterAsAdmin(
  egg_club_name: string,
  clubId: number,
  userId: string | null
) {
  try {
    const response = await fetch("/api/createChatRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ egg_club_name, userId, clubId })
    });

    const { data, error }: { data: EggClubChatRoom[] | null; error?: string } = await response.json();

    if (response.ok && data && data.length > 0) {
      const [clubChatRoom] = data;
      await enterChatRoomAsAdmin(clubChatRoom);
    } else {
      console.error("채팅방 생성 실패:", error || "Unknown error");
    }
  } catch (error) {
    console.error("서버 오류:", error);
  }
}

export async function enterChatRoomAsAdmin(clubChatRoom: EggClubChatRoom) {
  try {
    await fetch("/api/chatRoomMeetingPlace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ clubChatRoom })
    });
  } catch (error) {
    console.log(error);
  }
}

export async function enterRegularChatRoom(club: EggClubId) {
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
  } catch (error) {
    console.error("처리 중 오류가 발생했습니다: ", error);
  }
}

interface ClubParams {
  egg_club_id: number;
  user_id: string;
}

export async function enterRegularChatRoomAfterApproval(params: ClubParams) {
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
  } catch (error) {
    console.error("처리 중 오류가 발생했습니다: ", error);
  }
}
