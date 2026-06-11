import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/actions/auth";

export async function proxy(request: NextRequest) {
  console.log("proxy");

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/notes", request.url));
  }

  if (request.headers.get("next-action")) {
    return NextResponse.next();
  }

  if (!(await getSession("proxy"))) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/notes/:path*",
    "/labels",
    "/labels/:path*",
    // "/((?!api|_next/static|_next/image|.*\\.png$).*)"
  ],
};
