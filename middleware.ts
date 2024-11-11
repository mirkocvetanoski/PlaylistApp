import { NextResponse } from "next/server";

const signedinPages = ["/", "/playlist", "/library"];

export default function middleware(req) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const [...cookies] = req.cookies;

    let token: string;

    if ([...cookies].length > 0) {
      token = cookies[0][1].value;
    } else {
      token = "";
    }

    if (token === "") {
      const url = req.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.rewrite(url);
    }
  }
}
