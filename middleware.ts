import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  
  if (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register")
  ) {
    return NextResponse.next();
  }

  
  if (!token) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("message", "login_required");
    return NextResponse.redirect(url);
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/findDoctor", "/booking"], // 🔥 add all protected routes
};