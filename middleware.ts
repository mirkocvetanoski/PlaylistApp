import { NextResponse, NextRequest } from "next/server";

const signedinPages = ["/", "/playlist", "/library"];

export default function middleware(request: NextRequest) {
  if (signedinPages.find((p) => p === request.nextUrl.pathname)) {
    const token = [...request.cookies].length;

    if (!token) {
      return NextResponse.rewrite(new URL("/signin", request.url));
    }
  }
}
