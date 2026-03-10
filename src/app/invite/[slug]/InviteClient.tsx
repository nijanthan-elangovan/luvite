"use client";

import { Render, type Data } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { puckConfig } from "@/lib/puck.config";
import { useEffect, useState } from "react";

export default function InviteClient({ slug }: { slug: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/invitations?slug=${encodeURIComponent(slug)}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((inv) => setData(inv.data))
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
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

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <p className="text-sm text-charcoal/40">Loading invitation...</p>
        </div>
      </div>
    );
  }

  return <Render config={puckConfig} data={data} />;
}
