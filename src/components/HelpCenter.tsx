"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
}

const articles: Article[] = [
  {
    id: "about",
    title: "About Luvite & Features",
    icon: "✦",
    content: (
      <>
        <p>
          <strong>Luvite</strong> is a luxury digital invitation platform that
          lets you create stunning, interactive e-invitations for weddings and
          events — no coding required.
        </p>
        <h4>Key Features</h4>
        <ul>
          <li>
            <strong>Drag-and-drop editor</strong> — Build your invitation
            visually using our block-based editor powered by Puck.
          </li>
          <li>
            <strong>3D Parallax effects</strong> — Add depth to your invitation
            with multi-layer parallax heroes and diorama effects that respond to
            scroll and hover.
          </li>
          <li>
            <strong>AI Portrait Cutout</strong> — Upload a portrait photo and
            our on-device AI will remove the background automatically.
          </li>
          <li>
            <strong>RSVP Management</strong> — Embed an RSVP form directly in
            your invitation and track guest responses from your dashboard.
          </li>
          <li>
            <strong>Templates</strong> — Start from a pre-built design and
            customize every detail to match your style.
          </li>
          <li>
            <strong>Custom subdomain</strong> — Share your invitation via a
            personalized link like <code>your-name.luvite.fun</code>.
          </li>
          <li>
            <strong>Background music</strong> — Set the mood with audio that
            gracefully handles browser autoplay restrictions.
          </li>
          <li>
            <strong>Google Maps</strong> — Embed your venue location so guests
            can easily find their way.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "editor",
    title: "How to Use the Editor",
    icon: "✎",
    content: (
      <>
        <p>
          The Luvite editor is a visual drag-and-drop builder. Here&apos;s how
          to get started:
        </p>
        <h4>1. Open the Editor</h4>
        <p>
          Log in to your account and click <strong>Create Invitation</strong> or
          navigate to <code>/editor</code>. You can also start from a template
          on the Templates page.
        </p>
        <h4>2. Add Blocks</h4>
        <p>
          Use the left sidebar to browse available blocks. Drag any block into
          the canvas to add it to your invitation. Available blocks include:
        </p>
        <ul>
          <li>
            <strong>Hero3D</strong> — A hero section with 3D parallax layers
          </li>
          <li>
            <strong>Countdown</strong> — An animated countdown to your event
            date
          </li>
          <li>
            <strong>InteractiveTimeline</strong> — A scroll-triggered love story
            timeline
          </li>
          <li>
            <strong>PhotoGallery</strong> — A carousel of your photos
          </li>
          <li>
            <strong>RSVPForm</strong> — A guest response form
          </li>
          <li>
            <strong>FloatingHearts / FloatingPetals</strong> — Animated
            decorative particles
          </li>
          <li>And many more...</li>
        </ul>
        <h4>3. Configure Blocks</h4>
        <p>
          Click on any block in the canvas to select it. The right sidebar will
          show its settings — colors, text, images, animation options, and more.
          Edit the fields to customize the block to your liking.
        </p>
        <h4>4. Reorder & Delete</h4>
        <p>
          Drag blocks up or down in the canvas to reorder them. Select a block
          and press the delete button to remove it.
        </p>
        <h4>5. Preview</h4>
        <p>
          The editor canvas shows a live preview as you build. What you see is
          what your guests will see.
        </p>
      </>
    ),
  },
  {
    id: "publish",
    title: "How to Publish Your Invitation",
    icon: "↗",
    content: (
      <>
        <p>
          Once you&apos;re happy with your invitation, publishing it makes it
          live and shareable.
        </p>
        <h4>1. Set Your Slug</h4>
        <p>
          In the editor sidebar, find the <strong>Invite Link</strong> section.
          Enter a custom slug (e.g., <code>john-and-jane</code>). This will
          become your invitation&apos;s URL:{" "}
          <code>john-and-jane.luvite.fun</code>.
        </p>
        <h4>2. Publish</h4>
        <p>
          Click the <strong>Publish</strong> button in the sidebar. Your
          invitation will be saved to the server and become publicly accessible
          at your custom URL.
        </p>
        <h4>3. Share the Link</h4>
        <p>
          Copy your invitation link and share it with your guests via WhatsApp,
          email, social media, or any messaging app. Anyone with the link can
          view your invitation.
        </p>
        <h4>4. Update Anytime</h4>
        <p>
          You can go back to the editor at any time to make changes. Just edit
          and re-publish — the same URL will be updated with your latest design.
        </p>
        <h4>5. Manage from Dashboard</h4>
        <p>
          Visit your <strong>Profile</strong> page to see all your published
          invitations, view RSVP responses, and manage your invites.
        </p>
      </>
    ),
  },
  {
    id: "rsvp",
    title: "How to Add an RSVP Form",
    icon: "♡",
    content: (
      <>
        <p>
          The RSVP block lets your guests respond to your invitation directly
          from the page.
        </p>
        <h4>1. Add the RSVPForm Block</h4>
        <p>
          In the editor, find <strong>RSVPForm</strong> in the block list and
          drag it into your canvas. We recommend placing it near the bottom of
          your invitation.
        </p>
        <h4>2. Configure the Form</h4>
        <p>Click on the RSVP block to customize it:</p>
        <ul>
          <li>
            <strong>Heading</strong> — Change the title (e.g., &quot;Will you be
            joining us?&quot;)
          </li>
          <li>
            <strong>Meal options</strong> — Configure dietary preference choices
            for your guests
          </li>
          <li>
            <strong>Colors & styling</strong> — Match the form to your
            invitation&apos;s design
          </li>
        </ul>
        <h4>3. Publish Your Invitation</h4>
        <p>
          The RSVP form only collects responses once your invitation is
          published. Make sure to publish so the form is active and connected to
          your account.
        </p>
        <h4>4. View Responses</h4>
        <p>
          Go to your <strong>Profile</strong> page to see all RSVP responses.
          You&apos;ll see each guest&apos;s name, email, attendance status, meal
          preference, and any personal message they left.
        </p>
        <h4>Tips</h4>
        <ul>
          <li>
            You can have multiple invitations, each with its own RSVP tracking.
          </li>
          <li>
            Responses are linked to your account — you&apos;ll see them in your
            dashboard as soon as guests submit.
          </li>
        </ul>
      </>
    ),
  },
];

export default function HelpCenter() {
  const [open, setOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => {
          setOpen((o) => !o);
          if (open) setActiveArticle(null);
        }}
        className="fixed right-6 bottom-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white shadow-lg transition-colors hover:bg-gold-dark"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close help" : "Open help"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="help"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed right-6 bottom-24 z-[9999] flex h-[520px] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gold px-6 py-5">
              {activeArticle ? (
                <button
                  onClick={() => setActiveArticle(null)}
                  className="mb-1 flex items-center gap-1 text-xs text-white/70 transition-colors hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  All Articles
                </button>
              ) : null}
              <h2 className="font-display text-lg font-bold text-white">
                {activeArticle ? activeArticle.title : "Help Center"}
              </h2>
              {!activeArticle && (
                <p className="mt-1 text-sm text-white/70">
                  Find answers to common questions
                </p>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeArticle ? (
                  <motion.div
                    key={activeArticle.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.15 }}
                    className="help-article px-6 py-5 text-sm leading-relaxed text-charcoal/80"
                  >
                    {activeArticle.content}
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.15 }}
                    className="p-4"
                  >
                    {articles.map((article) => (
                      <button
                        key={article.id}
                        onClick={() => setActiveArticle(article)}
                        className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition-colors hover:bg-cream"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-lg text-gold">
                          {article.icon}
                        </span>
                        <div>
                          <span className="font-display text-sm font-semibold text-charcoal">
                            {article.title}
                          </span>
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
                          className="ml-auto shrink-0 text-charcoal/30"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-gold/10 px-6 py-3 text-center text-xs text-charcoal/40">
              Powered by Luvite
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
