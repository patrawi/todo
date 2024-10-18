import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

import { ROOT } from "./lib/constant";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    console.log(req.nextUrl);
    const isAuth = !!token;

    if (!isAuth) {
      return Response.redirect(new URL("/api/auth/signin", req.nextUrl));
    }
    if (isAuth && req.nextUrl.pathname === ROOT) {
      return Response.redirect(new URL(`/${token.name}`, req.nextUrl));
    }

    return null;
  },

  {
    pages: {
      signIn: "/api/auth/signin",
    },

    callbacks: {
      authorized({ token }) {
        if (token) return true;
        return false;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
