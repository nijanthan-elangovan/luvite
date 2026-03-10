"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { templates, type Template } from "@/lib/templates";

const allTags = Array.from(new Set(templates.flatMap((t) => t.tags)));

export default function TemplatesPage() {
  const [filter, setFilter] = useState<string | null>(null);

  const visible = filter
    ? templates.filter((t) => t.tags.includes(filter))
    : templates;

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-gold/10 px-8 py-5">
        <Link href="/" className="font-display text-2xl font-bold text-gold">
          Luvite
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/editor"
            className="text-sm text-gold hover:underline"
          >
            Editor
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-gold/30 px-5 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-white"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="px-4 pt-16 pb-8 text-center">
        <motion.p
          className="mb-3 text-sm tracking-[0.25em] uppercase text-gold"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Start With a Template
        </motion.p>
        <motion.h1
          className="font-display text-4xl font-bold text-charcoal md:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Beautiful Invitation Templates
        </motion.h1>
        <motion.p
          className="mx-auto mt-4 max-w-lg text-charcoal/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Choose a design, customize every detail in our drag-and-drop editor, and publish in minutes.
        </motion.p>

        {/* Tag filters */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={() => setFilter(null)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              filter === null
                ? "border-gold bg-gold text-white"
                : "border-gold/30 text-gold hover:bg-gold/5"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`rounded-full border px-4 py-1.5 text-sm capitalize transition ${
                filter === tag
                  ? "border-gold bg-gold text-white"
                  : "border-gold/30 text-gold hover:bg-gold/5"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Template grid */}
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {visible.map((tpl, i) => (
            <TemplateCard key={tpl.id} tpl={tpl} index={i} />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-12 text-center text-charcoal/50">
            No templates match this filter.
          </p>
        )}
      </section>

      <footer className="border-t border-gold/10 px-4 py-8 text-center text-sm text-charcoal/40">
        &copy; 2026 Luvite. Crafted with love.
      </footer>
    </main>
  );
}

function TemplateCard({ tpl, index }: { tpl: Template; index: number }) {
  return (
    <motion.div
      className="group overflow-hidden rounded-2xl border border-gold/15 bg-white shadow-sm transition-shadow hover:shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={tpl.thumbnail}
          alt={tpl.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 p-4 opacity-0 transition-opacity group-hover:opacity-100">
          <Link
            href={`/editor?template=${tpl.id}`}
            className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-gold-dark"
          >
            Use Template
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-charcoal">
          {tpl.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
          {tpl.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tpl.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gold/8 px-3 py-0.5 text-xs capitalize text-gold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
