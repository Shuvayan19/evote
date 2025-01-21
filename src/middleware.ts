import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { LOGIN, PUBLIC_ROUTE, ROOT } from "../route";

const { auth } = NextAuth(authConfig);

export async function middleware(Nextrequest: { nextUrl: any }) {
  const { nextUrl } = Nextrequest;
  const session = await auth();
  console.log(session);
  const isAuthenticated = !!session?.user;
  const isPublicRoute =
   (PUBLIC_ROUTE.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT);

    if(!isAuthenticated&&!isPublicRoute){
        return NextResponse.redirect(new URL(LOGIN,nextUrl));
    }
}

export const config = {
  matcher: "/",
};
