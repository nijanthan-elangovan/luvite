import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import pool from "@/lib/db";

async function ensureRsvpSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS rsvps (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      invitation_slug VARCHAR(255) NULL,
      owner_user_id BIGINT UNSIGNED NULL,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(200) NOT NULL,
      attending VARCHAR(20) NOT NULL,
      meal VARCHAR(60) NULL,
      message TEXT NULL,
      source_path VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_invitation_slug (invitation_slug),
      INDEX idx_owner_user_id (owner_user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  try {
    await pool.query("ALTER TABLE rsvps ADD COLUMN invitation_slug VARCHAR(255) NULL");
  } catch {}
  try {
    await pool.query("ALTER TABLE rsvps ADD COLUMN owner_user_id BIGINT UNSIGNED NULL");
  } catch {}
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, attending, meal, message, sourcePath, invitationSlug } =
    body ?? {};

  if (!name || !email) {
    return NextResponse.json(
      { error: "name and email are required" },
      { status: 400 }
    );
  }

  await ensureRsvpSchema();

  let ownerUserId: number | null = null;
  if (invitationSlug) {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT user_id FROM invitations WHERE slug = ? LIMIT 1",
      [String(invitationSlug)]
    );
    if (rows.length && rows[0].user_id) {
      ownerUserId = Number(rows[0].user_id);
    }
  }

  await pool.query(
    `INSERT INTO rsvps (invitation_slug, owner_user_id, name, email, attending, meal, message, source_path)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      invitationSlug ? String(invitationSlug) : null,
      ownerUserId,
      String(name),
      String(email),
      String(attending || "yes"),
      String(meal || ""),
      String(message || ""),
      String(sourcePath || ""),
    ]
  );

  return NextResponse.json({ status: "saved" });
}
