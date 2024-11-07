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
  // console.log(user);
  // console.log(request.nextUrl.pathname);

  if (user && request.nextUrl.pathname.startsWith("/signin")) {
    // return NextResponse.redirect(new URL("/", request.url));
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (request.nextUrl.pathname.startsWith("/approvemembers") && user) {
    const clubId = request.nextUrl.pathname.split("/")[3];
    const { data } = await supabase.from("egg_club").select("*").eq("user_id", user.id).eq("egg_club_id", clubId);

    if (!data || data.length === 0) {
      const url = request.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

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

  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/mypage") ||
      request.nextUrl.pathname.startsWith("/chat") ||
      request.nextUrl.pathname.startsWith("/myclublist") ||
      request.nextUrl.pathname.startsWith("/club") ||
      (request.nextUrl.pathname.startsWith("/club/one-time") && request.nextUrl.searchParams.has("step")) ||
      (request.nextUrl.pathname.startsWith("/club/regular-time") && request.nextUrl.searchParams.has("step")) ||
      request.nextUrl.pathname.startsWith("/clubmyclublist") ||
      request.nextUrl.pathname.startsWith("/kakaopay/paymentConfirm") ||
      request.nextUrl.pathname.startsWith("/kakaopay/isSuccess") ||
      request.nextUrl.pathname.startsWith("/kakaopay/success") ||
      request.nextUrl.pathname.startsWith("/chat/onetimeChat") ||
      request.nextUrl.pathname.startsWith("/chat/regularChat") ||
      request.nextUrl.pathname.startsWith("/approvemembers") ||
      request.nextUrl.pathname.match(/^\/club\/regular-club-sub\/[^\/]+\/create/))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
