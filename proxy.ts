import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const pathnameActual = req.nextUrl.pathname;
  console.log("el pathname actual: ", pathnameActual)
  // COOKIE de autenticación
  const authCookie = req.cookies.get("asfales-admin");

 // Rutas públicas
const publicPaths = ['/login', '/register', '/forgot-password'];
  // -----------------------------
  // 1️⃣ Si el usuario NO está logueado y entra a rutas no publicas → lo mandamos a login
  // -----------------------------
  if (!publicPaths.includes(pathnameActual) && !authCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // -----------------------------
  // 2️⃣ Si el usuario ESTÁ logueado y entra a /login → lo mandamos al dashboard
  // -----------------------------
  if (pathnameActual.startsWith("/login") && authCookie) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

   // Si está en raíz "/" → redirigir a login
  if (pathnameActual === '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

     // Si está en raíz "/" → redirigir a login
  if (pathnameActual === '/' && authCookie) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

// Aplicar middleware solo a rutas importantes
export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard/:path*",
    "/usuarios/:path*",
    "/roles/:path*",
    "/settings/:path*",
  ],
};
