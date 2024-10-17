import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    const isAuth = !!token;

    if (isAuth) {
      Response.redirect(`${req.url}/${token.name}`);
      // if (token.username !== req.nextUrl.pathname.slice(1)) {
      //   return Response.redirect(new URL(`/error`, req.url));
      // }
      return null;
    }
    Response.redirect(`${req.url}/`);
    return null;
  },
  {
    callbacks: {
      async authorized() {
        return true; // without it the code above doesn't work
      },
    },
  }
);
