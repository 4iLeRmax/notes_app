import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/actions/auth";

export async function proxy(request: NextRequest) {
  // Redirect root path to /notes
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/notes", request.url));
  }

  if (request.headers.get("next-action")) {
    return NextResponse.next();
  }
  if (!(await getSession())) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/notes/:path*",
    // "/labels",
    // "/labels/:path*",
    // "/((?!api|_next/static|_next/image|.*\\.png$).*)"
  ],
};
