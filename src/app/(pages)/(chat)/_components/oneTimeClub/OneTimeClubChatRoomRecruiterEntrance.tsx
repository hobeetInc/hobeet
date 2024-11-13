import { EggPopChattingMember, EggPopId } from "@/types/eggpopchat.types";

// 일회성 모임 입장 함수
export async function OneTimeClubChatRoomRecruiterEntrance(egg_pop_id: EggPopId) {
  // console.log(one_time_club_id.one_time_club_id, "야야야 이재호 야야야 이재호");

  try {
    // console.log("야양야야야 죄지민 여기 왔다가냐??");

    const response = await fetch(
      `https://www.eggfriends.site/api/oneTimeClubChattingRoom?egg_pop_id=${egg_pop_id.egg_pop_id}`,
      {
        method: "GET"
      });
// const response = await fetch(`http://localhost:3000/api/oneTimeClubChattingRoom?egg_pop_id=${egg_pop_id.egg_pop_id}`, {
//   method: "GET"
// });

    if (!response.ok) {
      throw new Error("일회성 모임 정보를 가져오는 데 실패했습니다.");
    }

    const data: EggPopChattingMember = await response.json();
    // console.log("data!!!!", data);

    // const postResponse = await fetch("http://localhost:3000/api/oneTimeChatRoomRecruiterEntrance", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ EggPopChattingMember: data })
    // });

    const postResponse = await fetch("https://www.eggfriends.site/api/oneTimeChatRoomRecruiterEntrance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ EggPopChattingMember: data })
    });

    if (!postResponse.ok) {
      throw new Error("채팅방 입장 처리 중 오류가 발생했습니다.");
    }

    await postResponse.json();
  } catch (error) {
    console.error("처리 중 오류가 발생했습니다: ", error);
  }
}
