// import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL("/", request.url));
  return await updateSession(request);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/signin/:path*",
    "/mypage/:path*",
    "/chat/:path*",
    "/myclublist/:path*",
    "/club",
    "/club/one-time/:path*",
    "/club/regular-time/:path*",
    // "/club/regular-club-sub/:clubId/create/:path*",
    // "/club/regular-club-sub/:path*/create/:path*",
    "/kakaopay/paymentConfirm/:path*",
    "/kakaopay/isSuccess/:path*",
    "/kakaopay/success/:path*",
    "/approvemembers/:path*"
  ]
};
