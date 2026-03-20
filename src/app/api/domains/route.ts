import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2";
import { getCurrentUserFromCookies } from "@/lib/auth";
import dns from "dns/promises";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "luvite.fun";

function sanitizeDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/:\d+$/, "");
}

async function verifyCNAME(domain: string): Promise<boolean> {
  try {
    const records = await dns.resolveCname(domain);
    return records.some(
      (r) =>
        r.toLowerCase() === ROOT_DOMAIN ||
        r.toLowerCase() === `${ROOT_DOMAIN}.` ||
        r.toLowerCase().endsWith(`.${ROOT_DOMAIN}`)
    );
  } catch {
    return false;
  }
}

// GET /api/domains?slug=xxx — get domain info for an invitation
export async function GET(request: NextRequest) {
  const user = await getCurrentUserFromCookies();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT slug, custom_domain, domain_verified, user_id FROM invitations WHERE slug = ?",
    [slug]
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  if (Number(rows[0].user_id) !== user.userId) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    slug: rows[0].slug,
    customDomain: rows[0].custom_domain || null,
    domainVerified: Boolean(rows[0].domain_verified),
    cnameTarget: ROOT_DOMAIN,
  });
}

// POST /api/domains  { slug, domain } — set or update custom domain
export async function POST(request: NextRequest) {
  const user = await getCurrentUserFromCookies();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { slug, domain } = body;

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  // Verify ownership
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT user_id FROM invitations WHERE slug = ?",
    [slug]
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: "invitation not found" }, { status: 404 });
  }
  if (Number(rows[0].user_id) !== user.userId) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  // Remove domain
  if (!domain) {
    await pool.query(
      "UPDATE invitations SET custom_domain = NULL, domain_verified = 0 WHERE slug = ?",
      [slug]
    );
    return NextResponse.json({ status: "removed" });
  }

  const clean = sanitizeDomain(domain);

  if (!clean || clean.length < 4 || !clean.includes(".")) {
    return NextResponse.json({ error: "Enter a valid domain (e.g. invite.yoursite.com)" }, { status: 400 });
  }

  // Block luvite's own domains
  if (clean === ROOT_DOMAIN || clean.endsWith(`.${ROOT_DOMAIN}`)) {
    return NextResponse.json(
      { error: "You can't use a luvite.fun subdomain as a custom domain" },
      { status: 400 }
    );
  }

  // Check if domain is already taken by another invitation
  const [existing] = await pool.query<RowDataPacket[]>(
    "SELECT slug FROM invitations WHERE custom_domain = ? AND slug != ?",
    [clean, slug]
  );
  if (existing.length > 0) {
    return NextResponse.json(
      { error: "This domain is already connected to another invitation" },
      { status: 409 }
    );
  }

  // Verify CNAME
  const verified = await verifyCNAME(clean);

  await pool.query(
    "UPDATE invitations SET custom_domain = ?, domain_verified = ? WHERE slug = ?",
    [clean, verified ? 1 : 0, slug]
  );

  return NextResponse.json({
    customDomain: clean,
    domainVerified: verified,
    cnameTarget: ROOT_DOMAIN,
  });
}

// PUT /api/domains  { slug } — re-check DNS verification
export async function PUT(request: NextRequest) {
  const user = await getCurrentUserFromCookies();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { slug } = body;

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT custom_domain, user_id FROM invitations WHERE slug = ?",
    [slug]
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  if (Number(rows[0].user_id) !== user.userId) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (!rows[0].custom_domain) {
    return NextResponse.json({ error: "no custom domain set" }, { status: 400 });
  }

  const verified = await verifyCNAME(rows[0].custom_domain);

  await pool.query(
    "UPDATE invitations SET domain_verified = ? WHERE slug = ?",
    [verified ? 1 : 0, slug]
  );

  return NextResponse.json({
    customDomain: rows[0].custom_domain,
    domainVerified: verified,
    cnameTarget: ROOT_DOMAIN,
  });
}

// DELETE /api/domains?slug=xxx — remove custom domain
export async function DELETE(request: NextRequest) {
  const user = await getCurrentUserFromCookies();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT user_id FROM invitations WHERE slug = ?",
    [slug]
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  if (Number(rows[0].user_id) !== user.userId) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  await pool.query(
    "UPDATE invitations SET custom_domain = NULL, domain_verified = 0 WHERE slug = ?",
    [slug]
  );

  return NextResponse.json({ status: "removed" });
}
