import type { Metadata } from "next";
import type { RowDataPacket } from "mysql2";
import pool from "@/lib/db";
import InviteClient from "./InviteClient";
import type { Data } from "@puckeditor/core";

type InviteData = {
  content?: Array<{ type?: string; props?: Record<string, unknown> }>;
};

function normalizeImageUrl(image: string | null | undefined) {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${process.env.NEXT_PUBLIC_SITE_URL || "https://luvite.fun"}${image.startsWith("/") ? image : `/${image}`}`;
}

function extractInviteMeta(data: InviteData | null, slug: string) {
  const content = data?.content || [];

  const hero = content.find((item) => item.type === "Hero3D")?.props || {};
  const headingBlock = content.find((item) => item.type === "Heading")?.props || {};
  const paragraphBlock = content.find((item) => item.type === "Paragraph")?.props || {};
  const imageBlock = content.find((item) => item.type === "Image")?.props || {};

  const title =
    String(hero.heading || "").trim() ||
    String(headingBlock.text || "").trim() ||
    `Invitation | ${slug}`;

  const description =
    String(hero.subheading || "").trim() ||
    String(paragraphBlock.text || "").trim() ||
    "You are invited. Open this invitation for event details and RSVP.";

  const image = normalizeImageUrl(
    (hero.backgroundImage as string | undefined) ||
      (imageBlock.src as string | undefined) ||
      "/next.svg"
  );

  return { title, description, image };
}

async function getInvitationData(slug: string): Promise<Data | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT data FROM invitations WHERE slug = ? LIMIT 1",
    [slug]
  );

  if (!rows.length) return null;

  const raw = rows[0].data;
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return parsed as Data;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let parsed: Data | null = null;
  try {
    parsed = await getInvitationData(slug);
  } catch {
    parsed = null;
  }

  const { title, description, image } = extractInviteMeta(parsed, slug);
  const canonical = `${process.env.NEXT_PUBLIC_SITE_URL || "https://luvite.fun"}/invite/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: "Luvite",
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function InvitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getInvitationData(slug);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-charcoal">
            Invitation Not Found
          </h1>
          <p className="mt-4 text-charcoal/60">
            This invitation link doesn&apos;t exist or has been removed.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-full border border-gold/30 px-6 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-white"
          >
            Create Your Own
          </a>
        </div>
      </div>
    );
  }

  return <InviteClient data={data} />;
}
