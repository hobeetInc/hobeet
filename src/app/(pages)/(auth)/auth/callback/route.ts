import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  // URL 파라미터 추출
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code"); // OAuth 인증 코드
  const next = searchParams.get("next") ?? "/"; // 리다이렉트 URL (기본값은 홈)

  if (code) {
    // Supabase 클라이언트 초기화 및 세션 교환
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 현재 인증된 사용자 정보 조회
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        // 사용자 DB 정보 조회
        const { data: userData, error: userError } = await supabase
          .from("user")
          .select("*")
          .eq("user_email", user.email)
          .single();

        if (userError) {
          console.log("회원 정보 조회 실패", userError);
        }

        // 사용자 상태에 따른 리다이렉트 처리
        if (userData && !userData.user_name) {
          // 신규 회원(이름 없음) -> 추가 정보 입력 페이지로
          return NextResponse.redirect(`${origin}/signupSecond/${userData.user_id}`);
        } else {
          // 기존 회원 -> 사용자 정보 로드 페이지로
          return NextResponse.redirect(`${origin}/auth/callback/InsertUserInfo`);
        }
      }

      // 환경별 리다이렉트 처리
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`http://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // 인증 코드 에러 시 error.tsx로 리다이렉트
  return NextResponse.redirect(`${origin}/error`);
}
