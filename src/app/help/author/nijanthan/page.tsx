"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Same article list (kept in sync with help page)                    */
/* ------------------------------------------------------------------ */

const articles = [
  {
    id: "about",
    title: "What is Luvite?",
    description: "An overview of Luvite, what you can build with it, and the tools it gives you.",
    category: "Getting Started",
    date: "2026-03-04",
  },
  {
    id: "editor",
    title: "Build your invitation in the editor",
    description: "Open the editor, add blocks, change settings, and preview your design.",
    category: "Creating Invitations",
    date: "2026-03-05",
  },
  {
    id: "publish",
    title: "Publish and share your invitation",
    description: "Choose a link, go live, and send the invitation to your guests.",
    category: "Creating Invitations",
    date: "2026-03-06",
  },
  {
    id: "rsvp",
    title: "Collect RSVPs from your guests",
    description: "Add an RSVP form to your invitation and see who's coming from your dashboard.",
    category: "Features",
    date: "2026-03-07",
  },
  {
    id: "templates",
    title: "Start from a template",
    description: "Browse pre-built designs and customize them instead of starting from a blank canvas.",
    category: "Getting Started",
    date: "2026-03-08",
  },
  {
    id: "parallax",
    title: "Use parallax and 3D effects",
    description: "Add depth to your invitation with Hero3D and ParallaxDiorama blocks.",
    category: "Features",
    date: "2026-03-09",
  },
  {
    id: "music",
    title: "Add background music",
    description: "Set up the AudioEngine block and handle autoplay across different browsers.",
    category: "Features",
    date: "2026-03-10",
  },
  {
    id: "custom-domain",
    title: "How custom links work",
    description: "Understand subdomains, slugs, and how your invitation URL is structured.",
    category: "Getting Started",
    date: "2026-03-03",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AuthorPage() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-gold/10 px-8 py-5">
        <Link href="/" className="font-display text-2xl font-bold text-gold">
          Luvite
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/help" className="text-sm font-medium text-gold transition-colors">
            Help
          </Link>
          <Link href="/templates" className="text-sm text-charcoal/60 transition-colors hover:text-charcoal">
            Templates
          </Link>
          <Link href="/login" className="rounded-full border border-gold/30 px-5 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-white">
            Login
          </Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="border-b border-gold/10 bg-cream/50 px-8 py-4">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/help"
            className="flex items-center gap-2 text-sm text-charcoal/50 transition-colors hover:text-gold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Help
          </Link>
        </div>
      </div>

      {/* Author profile */}
      <section className="mx-auto max-w-3xl px-8 pt-16 pb-12">
        <motion.div
          className="flex items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-2xl font-bold text-gold">
            NE
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-charcoal md:text-3xl">
              Nijanthan Elangovan
            </h1>
            <p className="mt-1 text-charcoal/50">Founder, Luvite</p>
          </div>
        </motion.div>

        <motion.p
          className="mt-6 max-w-xl text-charcoal/60 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Building Luvite to make digital invitations feel personal again.
          Writes the help docs, ships the features, fixes the bugs.
        </motion.p>
      </section>

      {/* Articles by this author */}
      <section className="mx-auto max-w-3xl px-8 pb-24">
        <h2 className="font-display text-lg font-bold text-charcoal">
          Articles
        </h2>
        <div className="mt-1 h-px w-10 bg-gold/30" />

        <div className="mt-6 space-y-3">
          {sorted.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                href="/help"
                className="group flex items-start gap-4 rounded-xl border border-gold/10 bg-white px-6 py-5 transition-all hover:border-gold/25 hover:shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-charcoal/35">
                    {article.category}
                    <span className="mx-1.5">&middot;</span>
                    {formatDate(article.date)}
                  </div>
                  <h3 className="mt-1 font-display text-sm font-bold text-charcoal group-hover:text-gold">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-charcoal/50">
                    {article.description}
                  </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-2 shrink-0 text-charcoal/20 group-hover:text-gold">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-sm text-charcoal/35">
          {sorted.length} articles published
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/10 px-4 py-8 text-center text-sm text-charcoal/40">
        &copy; 2026 Luvite. Crafted with love.
      </footer>
    </main>
  );
}
