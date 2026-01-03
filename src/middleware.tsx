import type { NextRequest } from "next/server";
import { ROUTES } from "./utils/constants";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("x-token")?.value;

  const authRoutes = Object.values(ROUTES.AUTH);
  const currentPath = request.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(currentPath);

  // If token exists and user tries to access a public (auth) route, redirect to home
  if (token && isAuthRoute) {
    return Response.redirect(new URL("/", request.url));
  }

  // If no token and user tries to access a private route, redirect to login
  if (!token && !isAuthRoute) {
    return Response.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
  }

  // Otherwise, allow request to continue
  return;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
