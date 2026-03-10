import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2";
import { getCurrentUserFromCookies } from "@/lib/auth";

async function ensureInvitationsSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS invitations (
      slug VARCHAR(255) NOT NULL PRIMARY KEY,
      data JSON NOT NULL,
      user_id BIGINT UNSIGNED NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  try {
    await pool.query("ALTER TABLE invitations ADD COLUMN user_id BIGINT UNSIGNED NULL");
  } catch {
    // column already exists
  }
}

// GET /api/invitations?slug=xxx&ownerOnly=1
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  const ownerOnly = request.nextUrl.searchParams.get("ownerOnly") === "1";

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  await ensureInvitationsSchema();

  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT slug, data, user_id, created_at, updated_at FROM invitations WHERE slug = ?",
    [slug]
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const row = rows[0];

  if (ownerOnly) {
    const user = await getCurrentUserFromCookies();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    if (row.user_id && Number(row.user_id) !== user.userId) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
  }

  return NextResponse.json({
    slug: row.slug,
    data: typeof row.data === "string" ? JSON.parse(row.data) : row.data,
    userId: row.user_id ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
}

// POST /api/invitations  { slug, data }
export async function POST(request: NextRequest) {
  const user = await getCurrentUserFromCookies();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { slug, data } = body;

  if (!slug || !data) {
    return NextResponse.json(
      { error: "slug and data are required" },
      { status: 400 }
    );
  }

  await ensureInvitationsSchema();

  const sanitizedSlug = String(slug)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-");

  const [existing] = await pool.query<RowDataPacket[]>(
    "SELECT user_id FROM invitations WHERE slug = ? LIMIT 1",
    [sanitizedSlug]
  );

  if (
    existing.length > 0 &&
    existing[0].user_id &&
    Number(existing[0].user_id) !== user.userId
  ) {
    return NextResponse.json(
      { error: "this slug belongs to another user" },
      { status: 403 }
    );
  }

  await pool.query(
    `INSERT INTO invitations (slug, data, user_id) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE data = VALUES(data), user_id = VALUES(user_id)`,
    [sanitizedSlug, JSON.stringify(data), user.userId]
  );

  return NextResponse.json({ slug: sanitizedSlug, status: "published" });
}

// DELETE /api/invitations?slug=xxx
export async function DELETE(request: NextRequest) {
  const user = await getCurrentUserFromCookies();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  await ensureInvitationsSchema();

  const [existing] = await pool.query<RowDataPacket[]>(
    "SELECT user_id FROM invitations WHERE slug = ? LIMIT 1",
    [slug]
  );

  if (existing.length === 0) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  if (existing[0].user_id && Number(existing[0].user_id) !== user.userId) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  await pool.query("DELETE FROM invitations WHERE slug = ?", [slug]);

  return NextResponse.json({ status: "deleted" });
}
