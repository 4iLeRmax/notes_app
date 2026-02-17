import { NextRequest, NextResponse } from "next/server";
import { getCookieCache } from "better-auth/cookies";
import { getSession } from "./lib/actions/auth";

export async function proxy(request: NextRequest) {
  const session = await getSession();
  // const session = await getCookieCache(request)

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*"],
};
