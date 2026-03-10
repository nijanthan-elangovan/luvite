import type { Metadata } from "next";
import type { RowDataPacket } from "mysql2";
import pool from "@/lib/db";
import InviteClient from "./InviteClient";

type InviteData = {
  content?: Array<{ type?: string; props?: Record<string, unknown> }>;
};

function normalizeImageUrl(image: string | null | undefined) {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${process.env.NEXT_PUBLIC_SITE_URL || "https://luvite.in"}${image.startsWith("/") ? image : `/${image}`}`;
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT data FROM invitations WHERE slug = ? LIMIT 1",
    [slug]
  );

  const parsed = rows.length
    ? (typeof rows[0].data === "string"
        ? JSON.parse(rows[0].data)
        : rows[0].data)
    : null;

  const { title, description, image } = extractInviteMeta(parsed, slug);
  const canonical = `${process.env.NEXT_PUBLIC_SITE_URL || "https://luvite.in"}/invite/${slug}`;

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
  return <InviteClient slug={slug} />;
}
