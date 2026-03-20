import type { Metadata } from "next";
import type { RowDataPacket } from "mysql2";
import pool from "@/lib/db";
import InviteClient from "../[slug]/InviteClient";
import type { Data } from "@puckeditor/core";

async function getInvitationByDomain(
  host: string
): Promise<{ data: Data; slug: string } | null> {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT slug, data FROM invitations WHERE custom_domain = ? AND domain_verified = 1 LIMIT 1",
      [host]
    );

    if (!rows.length) return null;

    const raw = rows[0].data;
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return { data: parsed as Data, slug: rows[0].slug };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ host?: string }>;
}): Promise<Metadata> {
  const { host } = await searchParams;
  if (!host) return { title: "Invitation Not Found" };

  const result = await getInvitationByDomain(host);
  if (!result) return { title: "Invitation Not Found" };

  const content = (result.data as { content?: Array<{ type?: string; props?: Record<string, unknown> }> })?.content || [];
  const hero = content.find((item) => item.type === "Hero3D")?.props || {};

  const title = String(hero.heading || "").trim() || `Invitation | ${result.slug}`;
  const description =
    String(hero.subheading || "").trim() ||
    "You are invited. Open this invitation for event details and RSVP.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Luvite",
    },
  };
}

export default async function CustomDomainInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ host?: string }>;
}) {
  const { host } = await searchParams;

  if (!host) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-charcoal">
            Invitation Not Found
          </h1>
          <p className="mt-4 text-charcoal/60">
            This domain is not connected to any invitation.
          </p>
          <a
            href="https://luvite.fun"
            className="mt-6 inline-block rounded-full border border-gold/30 px-6 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-white"
          >
            Visit Luvite
          </a>
        </div>
      </div>
    );
  }

  const result = await getInvitationByDomain(host);

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-charcoal">
            Domain Not Connected
          </h1>
          <p className="mt-4 text-charcoal/60">
            This domain isn&apos;t linked to a Luvite invitation yet, or DNS
            hasn&apos;t been verified.
          </p>
          <a
            href="https://luvite.fun"
            className="mt-6 inline-block rounded-full border border-gold/30 px-6 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-white"
          >
            Visit Luvite
          </a>
        </div>
      </div>
    );
  }

  return <InviteClient data={result.data} />;
}
