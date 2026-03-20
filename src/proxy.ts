import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "luvite.fun";

const MAIN_DOMAINS = [
  "luvite.fun",
  "www.luvite.fun",
  "luvite.in",
  "www.luvite.in",
  "localhost:3000",
];

export default function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname;

  // Auth guard for protected routes
  if (pathname.startsWith("/editor") || pathname.startsWith("/profile")) {
    const hasAuthCookie = Boolean(request.cookies.get("luvite_auth")?.value);
    if (!hasAuthCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Check if this is a main domain (no rewrite needed)
  const isMainDomain = MAIN_DOMAINS.some(
    (d) => hostname === d || hostname === `www.${d}`
  );

  if (isMainDomain) {
    return NextResponse.next();
  }

  // Check if this is a subdomain of the root domain (e.g. john-jane.luvite.fun)
  const isSubdomain =
    hostname.endsWith(`.${ROOT_DOMAIN}`) ||
    hostname.endsWith(".localhost:3000");

  if (isSubdomain) {
    const slug = hostname.split(".")[0];
    if (slug && slug !== "www") {
      url.pathname = `/invite/${slug}${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // Everything else is treated as a custom domain
  // Rewrite to /invite/_domain?host=<hostname>
  // The invite page will look up the domain in the database
  if (pathname === "/" || pathname === "") {
    url.pathname = "/invite/_domain";
    url.searchParams.set("host", hostname.replace(/:\d+$/, "").toLowerCase());
    return NextResponse.rewrite(url);
  }

  // For non-root paths on custom domains (e.g. /api/rsvps), let them through
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
