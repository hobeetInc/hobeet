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
  matcher: ["/signin/:path*", "/mypage/:path* ", "/chat/:path*", "/myclublist/:path*"]
};
