import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/editor") || pathname.startsWith("/profile")) {
    const hasAuthCookie = Boolean(request.cookies.get("luvite_auth")?.value);
    if (!hasAuthCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Extract subdomain: e.g. "ankit-priya.luvite.in" -> "ankit-priya"
  // In development, support "slug.localhost:3000" pattern
  const mainDomains = ["luvite.fun", "www.luvite.fun", "luvite.in", "www.luvite.in", "localhost:3000"];
  const isMainDomain = mainDomains.some(
    (d) => hostname === d || hostname === `www.${d}`
  );

  if (isMainDomain) {
    return NextResponse.next();
  }

  // Extract slug from subdomain
  const slug = hostname.split(".")[0];

  if (slug && slug !== "www") {
    url.pathname = `/invite/${slug}${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
