import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import pool from "@/lib/db";
import { getCurrentUserFromCookies } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUserFromCookies();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const [invitations] = await pool.query<RowDataPacket[]>(
    `SELECT slug, created_at, updated_at FROM invitations WHERE user_id = ? ORDER BY updated_at DESC`,
    [user.userId]
  );

  const [rsvps] = await pool.query<RowDataPacket[]>(
    `SELECT id, invitation_slug, name, email, attending, meal, message, created_at
     FROM rsvps
     WHERE owner_user_id = ?
     ORDER BY created_at DESC`,
    [user.userId]
  );

  return NextResponse.json({
    user: { id: user.userId, name: user.name, email: user.email },
    invitations,
    rsvps,
  });
}
