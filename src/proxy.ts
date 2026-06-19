// import { NextRequest, NextResponse } from "next/server";
// import { getSession } from "./lib/actions/auth";

// export async function proxy(request: NextRequest) {
//   console.log("proxy");

//   if (request.headers.get("next-action")) {
//     return NextResponse.next();
//   }

//   if (!(await getSession("proxy"))) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   if (
//     request.nextUrl.pathname === "/" ||
//     request.nextUrl.pathname === "/labels"
//   ) {
//     return NextResponse.redirect(new URL("/notes", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",
//     "/notes",
//     "/notes/:path*",
//     "/labels",
//     "/labels/:path*",
//     // "/((?!api|_next/static|_next/image|.*\\.png$).*)"
//   ],
// };
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/actions/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("proxy targeting:", pathname);

  if (request.headers.get("next-action")) {
    return NextResponse.next();
  }
  const authRoutes = [
    "/sign-in",
    "/sign-up",
    "/send-email",
    "/reset-password",
    "/find-account",
  ];

  const isAuthRoute = authRoutes.includes(pathname);

  const hasSession = await getSession("proxy");

  if (hasSession && isAuthRoute) {
    return NextResponse.redirect(new URL("/notes", request.url));
  }

  if (!hasSession && !isAuthRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname === "/labels"
  ) {
    return NextResponse.redirect(new URL("/notes", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/notes",
    "/notes/:path*",
    "/labels",
    "/labels/:path*",

    "/sign-in",
    "/sign-up",
    "/send-email",
    "/reset-password",
    "/find-account",
  ],
};
