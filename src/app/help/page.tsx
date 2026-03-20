"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Articles                                                           */
/* ------------------------------------------------------------------ */

interface Article {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  content: React.ReactNode;
}

const articles: Article[] = [
  {
    id: "about",
    title: "About Luvite & Features",
    description:
      "Learn what Luvite is, what you can create, and the full list of features available to you.",
    category: "Getting Started",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    content: (
      <>
        <p>
          <strong>Luvite</strong> is a luxury digital invitation platform that
          lets you create stunning, interactive e-invitations for weddings and
          events — no coding required.
        </p>

        <h3>What can you create?</h3>
        <p>
          Beautiful digital invitations with interactive elements like animated
          timelines, countdown timers, photo galleries, RSVP forms, and even 3D
          parallax effects. Each invitation gets its own shareable link.
        </p>

        <h3>Features</h3>
        <ul>
          <li>
            <strong>Drag-and-drop editor</strong> — Build your invitation
            visually using our block-based editor. Pick from 15+ building blocks
            and arrange them however you like.
          </li>
          <li>
            <strong>3D Parallax effects</strong> — Add depth with multi-layer
            parallax heroes and diorama effects that respond to scroll and hover.
          </li>
          <li>
            <strong>AI Portrait Cutout</strong> — Upload a portrait photo and
            our on-device AI removes the background automatically — no external
            upload needed.
          </li>
          <li>
            <strong>RSVP Management</strong> — Embed an RSVP form directly in
            your invitation. Track guest responses from your profile dashboard.
          </li>
          <li>
            <strong>Templates</strong> — Start from a professionally designed
            template and customize every detail.
          </li>
          <li>
            <strong>Custom subdomain</strong> — Share via a personalized link
            like <code>your-name.luvite.fun</code>.
          </li>
          <li>
            <strong>Background music</strong> — Set the mood with audio that
            handles browser autoplay gracefully.
          </li>
          <li>
            <strong>Google Maps</strong> — Embed your venue so guests can easily
            find their way.
          </li>
          <li>
            <strong>Countdown timer</strong> — Build excitement with a live
            countdown to your event.
          </li>
          <li>
            <strong>Animated decorations</strong> — Floating hearts, petals, and
            more to add a magical touch.
          </li>
        </ul>

        <h3>Who is Luvite for?</h3>
        <p>
          Anyone planning a wedding, engagement party, birthday celebration,
          anniversary, or any event where you want to impress your guests with a
          beautiful digital invitation.
        </p>
      </>
    ),
  },
  {
    id: "editor",
    title: "How to Use the Editor",
    description:
      "A complete walkthrough of the drag-and-drop editor — adding blocks, configuring them, and previewing your design.",
    category: "Creating Invitations",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
      </svg>
    ),
    content: (
      <>
        <p>
          The Luvite editor is a visual drag-and-drop builder where you compose
          your invitation from pre-built blocks. Here&apos;s everything you need
          to know.
        </p>

        <h3>Opening the Editor</h3>
        <p>
          Log in to your account and click <strong>Create Invitation</strong>,
          or go directly to <code>/editor</code>. You can also pick a template
          from the Templates page — it will open in the editor pre-filled.
        </p>

        <h3>The Interface</h3>
        <ul>
          <li>
            <strong>Left sidebar</strong> — The block library. Browse all
            available components here.
          </li>
          <li>
            <strong>Center canvas</strong> — Your live preview. This is exactly
            what your guests will see.
          </li>
          <li>
            <strong>Right sidebar</strong> — Block settings. When you select a
            block, its configuration options appear here.
          </li>
        </ul>

        <h3>Adding Blocks</h3>
        <p>
          Drag any block from the left sidebar into the canvas. Blocks snap into
          place vertically. Available blocks include:
        </p>
        <ul>
          <li>
            <strong>Hero3D</strong> — A hero section with 3D parallax layers and
            customizable text
          </li>
          <li>
            <strong>ParallaxDiorama</strong> — Multi-layer scroll + hover
            parallax effect
          </li>
          <li>
            <strong>PortraitCutout</strong> — Upload a photo and AI removes the
            background
          </li>
          <li>
            <strong>Countdown</strong> — Animated countdown to your event date
          </li>
          <li>
            <strong>InteractiveTimeline</strong> — Scroll-triggered love story
            timeline
          </li>
          <li>
            <strong>RSVPForm</strong> — Guest response form
          </li>
          <li>
            <strong>PhotoGallery</strong> — Image carousel
          </li>
          <li>
            <strong>EventCard / ScheduleCard</strong> — Event details and
            schedule
          </li>
          <li>
            <strong>FloatingHearts / FloatingPetals</strong> — Animated particle
            decorations
          </li>
          <li>
            <strong>AudioEngine</strong> — Background music
          </li>
          <li>
            <strong>GoogleMap</strong> — Embedded venue map
          </li>
          <li>
            <strong>QuoteBlock</strong> — Styled quote or testimonial
          </li>
          <li>
            <strong>FontLoader</strong> — Load custom Google Fonts
          </li>
        </ul>

        <h3>Configuring Blocks</h3>
        <p>
          Click on any block in the canvas to select it. The right sidebar will
          show its settings — text content, colors, images, animation speed,
          font choices, and more. Every field updates the preview in real-time.
        </p>

        <h3>Reordering & Deleting</h3>
        <p>
          Drag blocks up or down within the canvas to change their order. To
          remove a block, select it and use the delete button that appears.
        </p>

        <h3>Tips</h3>
        <ul>
          <li>Start with a Hero block at the top to make a strong first impression.</li>
          <li>Place the RSVP form near the bottom, after all event details.</li>
          <li>Use the FontLoader block at the very top if you want a custom font across your invitation.</li>
          <li>The canvas is a live preview — what you see is what your guests get.</li>
        </ul>
      </>
    ),
  },
  {
    id: "publish",
    title: "How to Publish Your Invitation",
    description:
      "Set your custom link, publish your invitation, and share it with your guests.",
    category: "Creating Invitations",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
    ),
    content: (
      <>
        <p>
          Publishing makes your invitation live and accessible to anyone with
          the link. Here&apos;s how to do it step by step.
        </p>

        <h3>Step 1: Choose Your Slug</h3>
        <p>
          In the editor&apos;s right sidebar, look for the{" "}
          <strong>Invite Link</strong> section. Enter a custom slug — this is
          the unique identifier for your invitation. For example, if you enter{" "}
          <code>john-and-jane</code>, your invitation will be available at:
        </p>
        <ul>
          <li>
            <code>john-and-jane.luvite.fun</code> (subdomain)
          </li>
          <li>
            <code>luvite.fun/invite/john-and-jane</code> (direct path)
          </li>
        </ul>
        <p>
          Use lowercase letters, numbers, and hyphens. Keep it short and
          memorable.
        </p>

        <h3>Step 2: Hit Publish</h3>
        <p>
          Click the <strong>Publish</strong> button in the sidebar. Your
          invitation is saved to the server and immediately goes live. You&apos;ll
          see a confirmation with your shareable link.
        </p>

        <h3>Step 3: Share with Guests</h3>
        <p>
          Copy your invitation link and share it however you like — WhatsApp,
          email, Instagram, text message, or even a QR code. Anyone with the
          link can view your invitation on any device.
        </p>

        <h3>Updating a Published Invitation</h3>
        <p>
          Need to make changes? Just go back to the editor, make your edits, and
          publish again. The same URL updates with your latest design — no need
          to re-share the link.
        </p>

        <h3>Managing Your Invitations</h3>
        <p>
          Visit your <strong>Profile</strong> page to see all your published
          invitations. From there you can:
        </p>
        <ul>
          <li>View each invitation&apos;s link</li>
          <li>Open the editor to make changes</li>
          <li>See RSVP responses</li>
          <li>Delete an invitation if needed</li>
        </ul>
      </>
    ),
  },
  {
    id: "rsvp",
    title: "How to Create an RSVP Form",
    description:
      "Add a guest response form to your invitation and track who's attending from your dashboard.",
    category: "Features",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    ),
    content: (
      <>
        <p>
          The RSVP block lets your guests respond directly from the invitation
          page. No external forms or spreadsheets needed.
        </p>

        <h3>Adding the RSVP Form</h3>
        <p>
          In the editor, find <strong>RSVPForm</strong> in the block list on the
          left sidebar and drag it onto your canvas. We recommend placing it
          toward the bottom of your invitation, after all event details and the
          venue map.
        </p>

        <h3>Configuring the Form</h3>
        <p>Click on the RSVP block to see its settings in the right sidebar:</p>
        <ul>
          <li>
            <strong>Heading text</strong> — Customize the title, e.g.,
            &quot;Will you be joining us?&quot; or &quot;Kindly Respond&quot;
          </li>
          <li>
            <strong>Meal options</strong> — Set up dietary preference choices for
            your guests (vegetarian, non-vegetarian, etc.)
          </li>
          <li>
            <strong>Colors and styling</strong> — Match the form&apos;s
            appearance to your invitation&apos;s design theme
          </li>
        </ul>

        <h3>What Guests See</h3>
        <p>Your guests will fill out:</p>
        <ul>
          <li>Their name</li>
          <li>Email address</li>
          <li>Whether they&apos;re attending (yes / no / maybe)</li>
          <li>Meal preference (if configured)</li>
          <li>An optional personal message</li>
        </ul>

        <h3>Important: Publish First</h3>
        <p>
          The RSVP form only collects responses once your invitation is
          published. In the editor preview, the form is visible but won&apos;t
          submit. Make sure to publish so responses are saved and linked to your
          account.
        </p>

        <h3>Viewing Responses</h3>
        <p>
          Go to your <strong>Profile</strong> page to see all RSVP responses.
          Each response shows:
        </p>
        <ul>
          <li>Guest name and email</li>
          <li>Attendance status</li>
          <li>Meal preference</li>
          <li>Personal message</li>
          <li>Submission time</li>
        </ul>

        <h3>Tips</h3>
        <ul>
          <li>
            Each published invitation has its own separate RSVP tracking — you
            can manage multiple events independently.
          </li>
          <li>
            Responses appear in your dashboard in real-time as guests submit
            them.
          </li>
          <li>
            Consider adding a Countdown block above the RSVP form to create
            urgency.
          </li>
        </ul>
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Category grouping                                                  */
/* ------------------------------------------------------------------ */

const categories = Array.from(new Set(articles.map((a) => a.category)));

/* ------------------------------------------------------------------ */
/*  Search helper                                                      */
/* ------------------------------------------------------------------ */

function searchArticles(query: string) {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q),
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const filtered = query.trim() ? searchArticles(query) : articles;
  const groupedByCategory = categories
    .map((cat) => ({
      name: cat,
      items: filtered.filter((a) => a.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-gold/10 px-8 py-5">
        <Link
          href="/"
          className="font-display text-2xl font-bold text-gold"
        >
          Luvite
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/templates"
            className="text-sm text-charcoal/60 transition-colors hover:text-charcoal"
          >
            Templates
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-gold/30 px-5 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-white"
          >
            Login
          </Link>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {activeArticle ? (
          /* ---- Article View ---- */
          <motion.div
            key={activeArticle.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Breadcrumb bar */}
            <div className="border-b border-gold/10 bg-cream/50 px-8 py-4">
              <div className="mx-auto max-w-3xl">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="flex items-center gap-2 text-sm text-charcoal/50 transition-colors hover:text-gold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Back to Help Center
                </button>
              </div>
            </div>

            {/* Article content */}
            <article className="mx-auto max-w-3xl px-8 py-12">
              <div className="mb-3 text-xs font-medium tracking-wider uppercase text-gold">
                {activeArticle.category}
              </div>
              <h1 className="font-display text-3xl font-bold text-charcoal md:text-4xl">
                {activeArticle.title}
              </h1>
              <p className="mt-3 text-lg text-charcoal/50">
                {activeArticle.description}
              </p>
              <div className="mt-2 h-px w-16 bg-gold/30" />

              <div className="help-article mt-10 text-base leading-relaxed text-charcoal/75">
                {activeArticle.content}
              </div>

              {/* Bottom navigation */}
              <div className="mt-16 border-t border-gold/10 pt-8">
                <p className="mb-4 text-sm font-medium text-charcoal/40">
                  Related articles
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {articles
                    .filter((a) => a.id !== activeArticle.id)
                    .slice(0, 2)
                    .map((a) => (
                      <button
                        key={a.id}
                        onClick={() => {
                          setActiveArticle(a);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="flex items-center gap-3 rounded-xl border border-gold/10 px-5 py-4 text-left transition-all hover:border-gold/30 hover:shadow-sm"
                      >
                        <span className="text-gold">{a.icon}</span>
                        <span className="text-sm font-medium text-charcoal">
                          {a.title}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            </article>
          </motion.div>
        ) : (
          /* ---- Home View ---- */
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Hero */}
            <section className="bg-gradient-to-b from-cream/80 to-transparent px-4 pt-20 pb-16 text-center">
              <motion.h1
                className="font-display text-4xl font-bold text-charcoal md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                How can we <span className="text-gold">help</span>?
              </motion.h1>
              <motion.p
                className="mx-auto mt-4 max-w-md text-charcoal/50"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Find guides and answers to help you create the perfect
                invitation.
              </motion.p>

              {/* Search */}
              <motion.div
                className="mx-auto mt-8 max-w-xl"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-charcoal/30"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-full border border-gold/20 bg-white py-4 pr-6 pl-12 text-charcoal shadow-sm outline-none transition-all placeholder:text-charcoal/30 focus:border-gold/40 focus:shadow-md"
                  />
                </div>
              </motion.div>
            </section>

            {/* Articles grid */}
            <section className="mx-auto max-w-4xl px-8 pb-24">
              {groupedByCategory.map((group, gi) => (
                <div key={group.name} className={gi > 0 ? "mt-14" : ""}>
                  <h2 className="font-display text-lg font-bold text-charcoal">
                    {group.name}
                  </h2>
                  <div className="mt-1 h-px w-10 bg-gold/30" />

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {group.items.map((article, i) => (
                      <motion.button
                        key={article.id}
                        onClick={() => {
                          setActiveArticle(article);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="group flex items-start gap-4 rounded-2xl border border-gold/10 bg-white p-6 text-left shadow-sm transition-all hover:border-gold/25 hover:shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: gi * 0.1 + i * 0.08,
                        }}
                      >
                        <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/8 text-gold transition-colors group-hover:bg-gold/15">
                          {article.icon}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display text-sm font-bold text-charcoal group-hover:text-gold">
                            {article.title}
                          </h3>
                          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-charcoal/50">
                            {article.description}
                          </p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-auto mt-1 shrink-0 text-charcoal/20 transition-colors group-hover:text-gold"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-charcoal/40">
                    No articles found for &quot;{query}&quot;
                  </p>
                  <button
                    onClick={() => setQuery("")}
                    className="mt-3 text-sm text-gold hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-gold/10 px-4 py-8 text-center text-sm text-charcoal/40">
        &copy; 2026 Luvite. Crafted with love.
      </footer>
    </main>
  );
}
