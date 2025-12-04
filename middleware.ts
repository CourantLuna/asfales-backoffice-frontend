import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  const isAuth = !!token;
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");

//   if (!isAuth && !isAuthPage) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/", "/reservas/:path*", "/itinerarios/:path*"],
};
