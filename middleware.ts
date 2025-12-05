import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // COOKIE de autenticación
  const authCookie = req.cookies.get("asfales-admin");

  // Rutas protegidas del admin
  const protectedRoutes = ["/dashboard", "/usuarios", "/roles", "/settings"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // -----------------------------
  // 1️⃣ Si el usuario NO está logueado y entra a rutas privadas → lo mandamos a login
  // -----------------------------
  if (isProtected && !authCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // -----------------------------
  // 2️⃣ Si el usuario ESTÁ logueado y entra a /login → lo mandamos al dashboard
  // -----------------------------
  if (pathname.startsWith("/login") && authCookie) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Aplicar middleware solo a rutas importantes
export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/usuarios/:path*",
    "/roles/:path*",
    "/settings/:path*",
  ],
};
