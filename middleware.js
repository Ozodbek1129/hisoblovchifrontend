import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // Agar token bo'lmasa va login/register sahifasida bo'lmasa → login ga yuboramiz
  if (!token && !req.nextUrl.pathname.startsWith("/login") && !req.nextUrl.pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Agar token bo'lsa va login/register sahifasiga kirsa → home ga yuboramiz
  if (token && (req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
