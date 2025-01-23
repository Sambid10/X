import NextAuth from "next-auth";
import authConfig from "@/auth-config";
import { API_ROUTES,UPLOADTHING_API,PROTECTED_ROUTE,DEFAULT_REDIRECT_URL } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.includes(API_ROUTES);
  const isUploadthingRoute = nextUrl.pathname.includes(UPLOADTHING_API);
  const isProtectedRoute = nextUrl.pathname === PROTECTED_ROUTE;
 
  const isHomeRoute = nextUrl.pathname === "/";
  const LOGGEDOUTROUTE="/"
  if (isApiAuthRoute || isUploadthingRoute) {
    return undefined;
  }
  if (isLoggedIn && isHomeRoute) {
    return Response.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));
  }

  // Redirect unauthenticated users from protected routes to login or home page
  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(new URL(LOGGEDOUTROUTE, nextUrl));
  }

  return undefined
  }
);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

// middleware.ts

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export default function middleware(request: NextRequest) {
//     const requestHeaders = new Headers(request.headers);
//     requestHeaders.set('next-url', request.nextUrl.pathname);

//     return NextResponse.next({
//         request: {
//             headers: requestHeaders,
//         },
//     });
// }

// export const config = {
//     matcher: [
//         '/((?!api|_next/static|_next/image|favicon.ico).*)',
//     ],
// };