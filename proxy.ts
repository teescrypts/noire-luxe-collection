import { NextRequest, NextResponse } from "next/server";
import { verifyTokenEdge } from "@/lib/auth-edge";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/auth"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("noire-auth-token")?.value;
  const user = token ? verifyTokenEdge(token) : null;

  // Protect dashboard — must be admin
  const isDashboard = protectedRoutes.some((r) => pathname.startsWith(r));
  if (isDashboard) {
    if (!user) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect logged in users away from auth page
  const isAuthPage = authRoutes.some((r) => pathname.startsWith(r));
  if (isAuthPage && user) {
    if (user.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth"],
};
