import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  if (request.cookies.toString().includes("session")) {
    return NextResponse.rewrite(new URL("/", request.url));
  } else {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: ["/"],
};
