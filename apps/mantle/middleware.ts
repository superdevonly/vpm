import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("privy-token")?.value;

  const isAuth = !!token;
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/gallery") ||
    req.nextUrl.pathname.startsWith("/app") ||
    req.nextUrl.pathname.startsWith("/live");

  if (isAuthPage) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return null;
  }
}
