import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user && request.nextUrl.pathname.startsWith("/signin")) {
    // return NextResponse.redirect(new URL("/", request.url));
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // if (request.nextUrl.pathname.startsWith("/approvemembers") && user) {
  //   const clubId = request.nextUrl.pathname.split("/")[3];
  //   const { data } = await supabase.from("egg_club").select("*").eq("user_id", user.id).eq("egg_club_id", clubId);

  //   if (!data || data.length === 0) {
  //     const url = request.nextUrl.clone();
  //     url.pathname = "/signin";
  //     return NextResponse.redirect(url);
  //   }
  // }

  // if (
  //   request.nextUrl.pathname.startsWith("/club/regular-club-sub") &&
  //   request.nextUrl.pathname.match(/^\/club\/regular-club-sub\/[^\/]+\/create/) &&
  //   user
  // ) {
  //   const clubId = request.nextUrl.pathname.split("/")[5];
  //   const { data } = await supabase.from("egg_club").select("*").eq("user_id", user.id).eq("egg_club_id", clubId);

  //   if (!data || data.length === 0) {
  //     const url = request.nextUrl.clone();
  //     url.pathname = "/signin";
  //     return NextResponse.redirect(url);
  //   }
  // }

  // 보호된 경로 정의
  const PROTECTED_PATHS = [
    "/mypage",
    "/chat",
    "/myclublist",
    "/club",
    "/clubmyclublist",
    "/kakaopay/paymentConfirm",
    "/kakaopay/isSuccess",
    "/kakaopay/success",
    "/chat/onetimeChat",
    "/chat/regularChat",
    "/approvemembers"
  ];

  // 특별한 조건이 필요한 경로 검증
  const hasSpecialConditions = (pathname: string, searchParams: URLSearchParams) => {
    return (
      (pathname.startsWith("/club/one-time") && searchParams.has("step")) ||
      (pathname.startsWith("/club/regular-time") && searchParams.has("step")) ||
      pathname.match(/^\/club\/regular-club-sub\/[^\/]+\/create/)
    );
  };

  // 보호된 경로 검증
  const isProtectedRoute = (pathname: string, searchParams: URLSearchParams) => {
    return PROTECTED_PATHS.some((path) => pathname.startsWith(path)) || hasSpecialConditions(pathname, searchParams);
  };

  if (!user && isProtectedRoute(request.nextUrl.pathname, request.nextUrl.searchParams)) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
