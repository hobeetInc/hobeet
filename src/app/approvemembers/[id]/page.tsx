// "use client";

// import { useState, useEffect } from "react";
// import { createClient } from "@/utils/supabase/client";
// import { RegularClubChatRoomRecruiterEntrance } from "../(pages)/(chat)/_components/regularClub/RegularClubChatRoomRecruiterEntrance";

// export interface ParticipationRequest {
//   r_c_participation_request_id: number;
//   r_c_id: number;
//   user_id: {
//     user_id: string;
//     user_name: string;
//   };
//   r_c_participation_request_status: "pending" | "approved" | "rejected";
// }

// export default function ApproveMembersPage({ clubId }: { clubId: number }) {
//   const [requests, setRequests] = useState<ParticipationRequest[]>([]);
//   const supabase = createClient();
//   clubId = 29; // 상세페이지 생성 협의(어떻게 받아올 것인지 클럽아이디)
//   useEffect(() => {
//     const fetchPendingRequests = async () => {
//       const { data, error } = await supabase
//         .from("r_c_participation_request")
//         .select(`*,user_id("*")`)
//         .eq("r_c_participation_request_status", "pending")
//         .eq("r_c_id", clubId);
//       console.log("클럽아이디", data);
//       if (error) {
//         console.error("Error fetching pending requests:", error);
//       } else if (data) {
//         const mappedData: ParticipationRequest[] = data as ParticipationRequest[];
//         setRequests(mappedData);
//       }
//     };

//     fetchPendingRequests();
//   }, [clubId]);

//   const approveMember = async (requestId: number) => {
//     const { data, error } = await supabase
//       .from("r_c_participation_request")
//       .update({ r_c_participation_request_status: "active" })
//       .eq("r_c_participation_request_id", requestId)
//       .select("*")
//       .single();
//     console.log("data", data);
//     if (!error) {
//       setRequests((prev) => prev.filter((req) => req.r_c_participation_request_id !== requestId));
//       const { error } = await supabase.from("r_c_member").insert({
//         user_id: data.user_id,
//         r_c_id: data.r_c_id,
//         r_c_participation_request_id: data.r_c_participation_request_id,
//         regular_club_request_status: "active"
//       });
//       if (!error) {
//         RegularClubChatRoomRecruiterEntrance({ r_c_id: clubId }); // 모임원 채팅방 입장(가입 승인 시)
//         alert("가입이 승인 되었습니다.");
//       }
//     } else {
//       alert("승인 처리 중 오류가 발생했습니다.");
//     }
//   };

//   const rejectMember = async (requestId: number) => {
//     // 요청 상태를 "rejected"로 변경하여 가입 거부
//     const { error } = await supabase
//       .from("r_c_participation_request")
//       .update({ r_c_participation_request_status: "rejected" })
//       .eq("r_c_participation_request_id", requestId);

//     if (!error) {
//       setRequests((prev) => prev.filter((req) => req.r_c_participation_request_id !== requestId));
//       alert("가입이 거부되었습니다.");
//     } else {
//       alert("거부 처리 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <div>
//       <h2>모임 가입 요청 승인</h2>
//       {requests.map((req) => (
//         <div key={req.r_c_participation_request_id}>
//           <span>{req.user_id.user_name}</span>
//           <button onClick={() => approveMember(req.r_c_participation_request_id)}>승인하기</button>
//           <button onClick={() => rejectMember(req.r_c_participation_request_id)}>거부하기</button>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { RegularClubChatRoomRecruiterEntrance } from "../../(pages)/(chat)/_components/regularClub/RegularClubChatRoomRecruiterEntrance";
import Image from "next/image";
import { useParams } from "next/navigation";

export interface ParticipationRequest {
  r_c_participation_request_id: number;
  r_c_id: number;
  user_id: {
    user_id: string;
    user_name: string;
    user_profile_img: string;
  };
  r_c_participation_request_status: "pending" | "active" | "rejected";
}

const ActiveMembersTab = ({ activeMembers }: { activeMembers: ParticipationRequest[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {activeMembers.map((member) => (
        <div key={member.r_c_participation_request_id} className="flex items-center gap-4">
          <Image
            src={member.user_id.user_profile_img}
            alt={member.user_id.user_name}
            width={158}
            height={158}
            className="w-12 h-12 rounded-full"
          />
          <span>{member.user_id.user_name}</span>
        </div>
      ))}
    </div>
  );
};

const PendingRequestsTab = ({
  requests,
  onApprove
}: {
  requests: ParticipationRequest[];
  onApprove: (requestId: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {requests.map((req) => (
        <div key={req.r_c_participation_request_id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={req.user_id.user_profile_img}
              alt={req.user_id.user_name}
              width={158}
              height={158}
              className="w-12 h-12 rounded-full"
            />
            <span>{req.user_id.user_name}</span>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => onApprove(req.r_c_participation_request_id)}
          >
            승인하기
          </button>
        </div>
      ))}
    </div>
  );
};

export default function ApproveMembersPage() {
  const [requests, setRequests] = useState<ParticipationRequest[]>([]);
  const [activeMembers, setActiveMembers] = useState<ParticipationRequest[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "pending">("active");
  const supabase = createClient();
  const params = useParams();
  const clubId = Number(params.id);
  console.log(clubId);

  // params.clubId = 29; // 상세페이지 생성 협의(어떻게 받아올 것인지 클럽아이디)

  useEffect(() => {
    const fetchPendingAndActiveRequests = async () => {
      const { data: pendingData, error: pendingError } = await supabase
        .from("r_c_participation_request")
        .select(`*,user_id("*")`)
        .eq("r_c_participation_request_status", "pending")
        .eq("r_c_id", clubId);

      const { data: activeData, error: activeError } = await supabase
        .from("r_c_participation_request")
        .select(`*,user_id("*")`)
        .eq("r_c_participation_request_status", "active")
        .eq("r_c_id", clubId);

      if (pendingError || activeError) {
        console.error("Error fetching requests:", pendingError || activeError);
      } else {
        setRequests(pendingData as ParticipationRequest[]);
        setActiveMembers(activeData as ParticipationRequest[]);
      }
    };

    fetchPendingAndActiveRequests();
  }, [clubId]);

  const approveMember = async (requestId: number) => {
    const { data, error } = await supabase
      .from("r_c_participation_request")
      .update({ r_c_participation_request_status: "active" })
      .eq("r_c_participation_request_id", requestId)
      .select("*")
      .single();

    if (!error) {
      setRequests((prev) => prev.filter((req) => req.r_c_participation_request_id !== requestId));
      const { error } = await supabase.from("r_c_member").insert({
        user_id: data.user_id,
        r_c_id: data.r_c_id,
        r_c_participation_request_id: data.r_c_participation_request_id,
        regular_club_request_status: "active"
      });
      if (!error) {
        RegularClubChatRoomRecruiterEntrance({ r_c_id: clubId }); // 모임원 채팅방 입장(가입 승인 시)
        alert("가입이 승인되었습니다.");
      } else {
        alert("승인 처리 중 오류가 발생했습니다.");
      }
    } else {
      alert("승인 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h2>모임 회원 관리</h2>
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded ${activeTab === "active" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("active")}
          >
            전체 회원
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("pending")}
          >
            승인 대기
          </button>
        </div>
        <div>
          {activeTab === "active" && <span>총 {activeMembers.length}명</span>}
          {activeTab === "pending" && <span>총 {requests.length}명</span>}
        </div>
      </div>
      <div>
        {activeTab === "active" && <ActiveMembersTab activeMembers={activeMembers} />}
        {activeTab === "pending" && <PendingRequestsTab requests={requests} onApprove={approveMember} />}
      </div>
    </div>
  );
}
