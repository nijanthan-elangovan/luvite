"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6">
        <span className="font-display text-2xl font-bold text-gold">
          Luvite
        </span>
        <Link
          href="/login"
          className="rounded-full border border-gold/30 px-5 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-white"
        >
          Login / Create Invitation
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <motion.p
          className="mb-4 text-sm tracking-[0.3em] uppercase text-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Luxury Digital Invitations
        </motion.p>

        <motion.h1
          className="font-display max-w-3xl text-5xl font-bold leading-tight text-charcoal md:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Your love story,
          <br />
          <span className="text-gold">beautifully told</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-lg text-lg text-charcoal/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Create stunning 3D interactive e-invitations for weddings and events.
          Drag, drop, publish — it&apos;s that simple.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <Link
            href="/login"
            className="rounded-full bg-gold px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gold-dark hover:shadow-xl"
          >
            Start Creating
          </Link>
          <Link
            href="/templates"
            className="rounded-full border border-gold/30 px-8 py-3 text-sm text-gold transition-colors hover:bg-gold/5"
          >
            Browse Templates
          </Link>
        </motion.div>

        {/* Floating decorative circles */}
        <motion.div
          className="absolute top-[20%] right-[8%] hidden h-40 w-40 rounded-full border border-gold/10 md:block"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[6%] hidden h-28 w-28 rounded-full border border-gold/10 md:block"
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-bold text-charcoal md:text-4xl">
            Why <span className="text-gold">Luvite</span>?
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-gold" />

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {[
              {
                title: "3D Parallax Editor",
                desc: "Drag-and-drop luxury blocks with real-time 3D hover effects and smooth reveal animations.",
              },
              {
                title: "Interactive Timeline",
                desc: "Tell your love story with a scroll-triggered animated journey that captivates your guests.",
              },
              {
                title: "Background Music",
                desc: "Set the mood with auto-fading audio that gracefully handles browser autoplay restrictions.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                className="rounded-xl border border-gold/15 bg-white/80 p-8 text-center shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <h3 className="font-display text-xl font-bold text-charcoal">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/10 px-4 py-8 text-center text-sm text-charcoal/40">
        &copy; 2026 Luvite. Crafted with love.
      </footer>
    </main>
  );
}
