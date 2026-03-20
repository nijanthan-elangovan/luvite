"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Article {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  date: string;
  content: React.ReactNode;
}

const AUTHOR = {
  name: "Nijanthan Elangovan",
  role: "Founder, Luvite",
  slug: "nijanthan",
};

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const icons = {
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  edit: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" /><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
    </svg>
  ),
  upload: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" />
    </svg>
  ),
  layout: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  image: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
    </svg>
  ),
  music: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
    </svg>
  ),
  globe: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  Articles                                                           */
/* ------------------------------------------------------------------ */

const articles: Article[] = [
  {
    id: "about",
    title: "What is Luvite?",
    description: "An overview of Luvite, what you can build with it, and the tools it gives you.",
    category: "Getting Started",
    date: "2026-03-04",
    icon: icons.info,
    content: (
      <>
        <p>
          Luvite is a digital invitation platform. You design your invitation in a visual editor, publish it, and share a link with your guests. No coding, no PDFs, no printing.
        </p>
        <h3>How it works</h3>
        <p>
          You sign up, open the editor, and drag blocks onto a canvas to build your invitation. When you&apos;re done, you publish it. Luvite gives you a link like <code>john-and-jane.luvite.fun</code> that you can send to anyone.
        </p>
        <h3>What you get</h3>
        <ul>
          <li><strong>Visual editor</strong> &mdash; Pick from 15+ blocks (hero images, countdowns, timelines, maps, RSVP forms) and drop them onto a canvas.</li>
          <li><strong>3D parallax</strong> &mdash; Some blocks support layered parallax that moves on scroll and hover.</li>
          <li><strong>Portrait cutout</strong> &mdash; Upload a photo and Luvite removes the background on your device. Nothing gets uploaded to a third-party server.</li>
          <li><strong>RSVP tracking</strong> &mdash; Drop an RSVP form into your invitation. Guests fill it out, and you see responses on your dashboard.</li>
          <li><strong>Templates</strong> &mdash; Don&apos;t want to start from scratch? Pick a template and change whatever you want.</li>
          <li><strong>Your own link</strong> &mdash; Every invitation gets a custom subdomain. You choose the slug.</li>
          <li><strong>Background music</strong> &mdash; Add an audio track. Luvite handles browser autoplay rules so it works on mobile too.</li>
          <li><strong>Venue map</strong> &mdash; Embed a Google Map so guests know where to go.</li>
        </ul>
        <h3>Who it&apos;s for</h3>
        <p>
          Weddings are the main use case, but it works for any event &mdash; engagements, birthdays, anniversaries, housewarmings. If you need to send people an invitation and collect RSVPs, Luvite handles it.
        </p>
      </>
    ),
  },
  {
    id: "editor",
    title: "Build your invitation in the editor",
    description: "Open the editor, add blocks, change settings, and preview your design.",
    category: "Creating Invitations",
    date: "2026-03-05",
    icon: icons.edit,
    content: (
      <>
        <p>
          The editor is where you put your invitation together. You work with blocks &mdash; each block is a section of your invitation (a hero image, a countdown, a gallery, etc.). You drag them in, arrange them, and tweak the settings until it looks right.
        </p>
        <h3>Open the editor</h3>
        <p>
          Sign in and select <strong>Create Invitation</strong>, or go to <code>/editor</code> directly. If you picked a template, it opens with everything already in place &mdash; you just modify what you need.
        </p>
        <h3>Know the layout</h3>
        <p>The editor has three areas:</p>
        <ul>
          <li><strong>Left panel</strong> &mdash; Your block library. This is where all the available blocks live.</li>
          <li><strong>Canvas (center)</strong> &mdash; A live preview of your invitation. What you see here is what your guests see.</li>
          <li><strong>Right panel</strong> &mdash; Settings for the selected block. Select a block on the canvas and its options show up here.</li>
        </ul>
        <h3>Add a block</h3>
        <p>Drag a block from the left panel and drop it onto the canvas. It snaps into position. Here&apos;s what&apos;s available:</p>
        <ul>
          <li><strong>Hero3D</strong> &mdash; A header section with parallax layers</li>
          <li><strong>ParallaxDiorama</strong> &mdash; Layered image that shifts on scroll and hover</li>
          <li><strong>PortraitCutout</strong> &mdash; Photo with AI background removal</li>
          <li><strong>Countdown</strong> &mdash; Timer counting down to your event</li>
          <li><strong>InteractiveTimeline</strong> &mdash; A timeline that animates as you scroll</li>
          <li><strong>RSVPForm</strong> &mdash; A form where guests confirm attendance</li>
          <li><strong>PhotoGallery</strong> &mdash; Swipeable image carousel</li>
          <li><strong>EventCard / ScheduleCard</strong> &mdash; Event info and schedule layout</li>
          <li><strong>FloatingHearts / FloatingPetals</strong> &mdash; Animated particles</li>
          <li><strong>AudioEngine</strong> &mdash; Background music player</li>
          <li><strong>GoogleMap</strong> &mdash; Embedded map of your venue</li>
          <li><strong>QuoteBlock</strong> &mdash; A styled text quote</li>
          <li><strong>FontLoader</strong> &mdash; Loads a custom Google Font for your invitation</li>
        </ul>
        <h3>Change block settings</h3>
        <p>
          Select any block on the canvas. The right panel shows its settings: text, colors, images, animation speed, fonts, and so on. Changes show up on the canvas immediately.
        </p>
        <h3>Reorder and remove blocks</h3>
        <p>Drag blocks up or down on the canvas to reorder them. To delete a block, select it and hit the delete button.</p>
        <h3>Good to know</h3>
        <ul>
          <li>Put the Hero block at the top &mdash; it&apos;s the first thing guests see.</li>
          <li>Put the RSVP form near the bottom, after all the event details.</li>
          <li>If you want a custom font, add FontLoader as the first block.</li>
        </ul>
      </>
    ),
  },
  {
    id: "publish",
    title: "Publish and share your invitation",
    description: "Choose a link, go live, and send the invitation to your guests.",
    category: "Creating Invitations",
    date: "2026-03-06",
    icon: icons.upload,
    content: (
      <>
        <p>When your invitation looks the way you want, publish it to make it available at a public link.</p>
        <h3>Pick your link</h3>
        <p>
          In the editor&apos;s right panel, find the <strong>Invite Link</strong> section. Type a slug &mdash; something like <code>john-and-jane</code>. This becomes your URL:
        </p>
        <ul>
          <li><code>john-and-jane.luvite.fun</code></li>
          <li><code>luvite.fun/invite/john-and-jane</code></li>
        </ul>
        <p>Stick to lowercase letters, numbers, and hyphens. Short slugs are easier to share.</p>
        <h3>Publish</h3>
        <p>Select <strong>Publish</strong> in the sidebar. Your invitation saves to the server and the link goes live right away.</p>
        <h3>Send it out</h3>
        <p>Copy the link and send it however works best &mdash; WhatsApp, email, Instagram DM, a text. The invitation works on any device with a browser.</p>
        <h3>Make changes after publishing</h3>
        <p>Go back to the editor, update what you need, and publish again. The URL stays the same, so you don&apos;t need to re-send the link.</p>
        <h3>Manage your invitations</h3>
        <p>Your <strong>Profile</strong> page lists all your invitations. From there you can:</p>
        <ul>
          <li>Copy the link</li>
          <li>Open the editor to make changes</li>
          <li>Check RSVP responses</li>
          <li>Delete an invitation</li>
        </ul>
      </>
    ),
  },
  {
    id: "rsvp",
    title: "Collect RSVPs from your guests",
    description: "Add an RSVP form to your invitation and see who's coming from your dashboard.",
    category: "Features",
    date: "2026-03-07",
    icon: icons.users,
    content: (
      <>
        <p>Luvite has a built-in RSVP form you can add to any invitation. Guests fill it out on the invitation page itself &mdash; no separate form link, no spreadsheet.</p>
        <h3>Add the form</h3>
        <p>In the editor, drag the <strong>RSVPForm</strong> block from the left panel onto your canvas. It works best near the bottom, after you&apos;ve shown the event details and venue.</p>
        <h3>Set it up</h3>
        <p>Select the RSVP block and adjust the settings in the right panel:</p>
        <ul>
          <li><strong>Heading</strong> &mdash; The text at the top of the form. Something like &quot;Let us know if you can make it&quot; works well.</li>
          <li><strong>Meal options</strong> &mdash; Add choices if you need dietary preferences (vegetarian, non-vegetarian, etc.).</li>
          <li><strong>Colors</strong> &mdash; Match the form to the rest of your invitation.</li>
        </ul>
        <h3>What guests fill in</h3>
        <ul>
          <li>Name</li>
          <li>Email</li>
          <li>Attending (yes / no / maybe)</li>
          <li>Meal preference (if you set up options)</li>
          <li>A message (optional)</li>
        </ul>
        <h3>You need to publish first</h3>
        <p>The form shows up in the editor preview, but it won&apos;t save responses until you publish the invitation. Once published, every submission gets linked to your account.</p>
        <h3>Check responses</h3>
        <p>Open your <strong>Profile</strong> page. You&apos;ll see each response with the guest&apos;s name, email, attendance status, meal choice, and any message they left.</p>
        <h3>Good to know</h3>
        <ul>
          <li>Each invitation tracks RSVPs separately, so you can run multiple events at once.</li>
          <li>Try adding a Countdown block right above the form &mdash; it gives guests a sense of when they need to respond.</li>
        </ul>
      </>
    ),
  },
  {
    id: "templates",
    title: "Start from a template",
    description: "Browse pre-built designs and customize them instead of starting from a blank canvas.",
    category: "Getting Started",
    date: "2026-03-08",
    icon: icons.layout,
    content: (
      <>
        <p>If you don&apos;t want to build an invitation from scratch, templates are the fastest way to get started. Each template is a complete invitation with blocks already arranged and styled.</p>
        <h3>Browse templates</h3>
        <p>Go to the <strong>Templates</strong> page from the landing page or the navigation. You&apos;ll see a grid of pre-built designs. Each one targets a different style &mdash; minimal, classic, bold, city-themed, and so on.</p>
        <h3>Use a template</h3>
        <p>Select a template and it opens in the editor with all its blocks pre-loaded. From there, the workflow is the same as building from scratch:</p>
        <ul>
          <li>Change text, colors, and images to match your event</li>
          <li>Remove blocks you don&apos;t need</li>
          <li>Add new blocks if something is missing</li>
          <li>Reorder sections however you like</li>
        </ul>
        <h3>What you can change</h3>
        <p>Everything. Templates are just a starting point. Every block, every color, every piece of text is fully editable. You&apos;re not locked into the original layout.</p>
        <h3>Can I switch templates later?</h3>
        <p>Not directly &mdash; loading a new template replaces the current canvas. If you want to try a different template, do it before you spend time customizing. Once you&apos;ve put work into a design, it&apos;s easier to tweak what you have than to start over.</p>
      </>
    ),
  },
  {
    id: "parallax",
    title: "Use parallax and 3D effects",
    description: "Add depth to your invitation with Hero3D and ParallaxDiorama blocks.",
    category: "Features",
    date: "2026-03-09",
    icon: icons.image,
    content: (
      <>
        <p>Two blocks in Luvite support 3D parallax: <strong>Hero3D</strong> and <strong>ParallaxDiorama</strong>. They layer images on top of each other and shift them at different speeds when guests scroll or move their mouse. The result is a sense of depth that flat designs don&apos;t have.</p>
        <h3>Hero3D</h3>
        <p>This is your main header block. It supports multiple image layers stacked on top of each other, with text overlaid. As guests scroll or hover, the layers move at different rates.</p>
        <p>To use it:</p>
        <ul>
          <li>Drag <strong>Hero3D</strong> onto the canvas (usually at the very top)</li>
          <li>Upload your layer images in the right panel &mdash; background, midground, and foreground</li>
          <li>Set your heading text, subheading, and colors</li>
          <li>Adjust the parallax intensity if the default feels too strong or too subtle</li>
        </ul>
        <h3>ParallaxDiorama</h3>
        <p>This block works like a scene in a shadowbox. You provide multiple image layers and they shift relative to each other on both scroll and mouse hover. It&apos;s good for creating a focal-point section in the middle of your invitation.</p>
        <ul>
          <li>Drag <strong>ParallaxDiorama</strong> onto the canvas</li>
          <li>Upload your layers &mdash; each layer has its own depth setting</li>
          <li>Preview by scrolling and hovering on the canvas</li>
        </ul>
        <h3>Performance</h3>
        <p>Both blocks use GPU-accelerated CSS transforms, so they run smoothly on modern phones and laptops. Keep your images reasonably sized (under 1MB each) for the best loading speed.</p>
      </>
    ),
  },
  {
    id: "music",
    title: "Add background music",
    description: "Set up the AudioEngine block and handle autoplay across different browsers.",
    category: "Features",
    date: "2026-03-10",
    icon: icons.music,
    content: (
      <>
        <p>You can add a background audio track to your invitation using the <strong>AudioEngine</strong> block. It plays music when guests open your invitation, with controls to pause or mute.</p>
        <h3>Add the block</h3>
        <p>Drag <strong>AudioEngine</strong> from the block library onto your canvas. Position doesn&apos;t matter much for this one &mdash; it renders as a small floating player, not a full-width section.</p>
        <h3>Set the audio</h3>
        <p>In the right panel, paste a URL to your audio file. MP3 works best for compatibility. You can also adjust:</p>
        <ul>
          <li><strong>Volume</strong> &mdash; Default playback volume</li>
          <li><strong>Loop</strong> &mdash; Whether the track repeats when it ends</li>
          <li><strong>Autoplay</strong> &mdash; Luvite tries to autoplay the audio when the page loads</li>
        </ul>
        <h3>Browser autoplay rules</h3>
        <p>Most browsers block audio autoplay until the user interacts with the page (a tap, a scroll, a click). Luvite handles this automatically &mdash; it waits for the first interaction, then starts playback with a fade-in so it&apos;s not jarring.</p>
        <p>On some browsers, especially mobile Safari, there may be a short delay before audio starts. This is normal and expected.</p>
        <h3>File hosting</h3>
        <p>Luvite doesn&apos;t host audio files. You&apos;ll need to provide a direct link to an MP3. Services like Google Drive (with a direct download link), Dropbox, or any static file host work fine.</p>
      </>
    ),
  },
  {
    id: "custom-domain",
    title: "How custom links work",
    description: "Understand subdomains, slugs, and how your invitation URL is structured.",
    category: "Getting Started",
    date: "2026-03-03",
    icon: icons.globe,
    content: (
      <>
        <p>Every published invitation gets its own URL. You control the slug (the unique part of the address), and Luvite handles the rest.</p>
        <h3>URL structure</h3>
        <p>When you set a slug like <code>sarah-and-mike</code>, your invitation is accessible at two URLs:</p>
        <ul>
          <li><code>sarah-and-mike.luvite.fun</code> &mdash; Subdomain format. Shorter, cleaner.</li>
          <li><code>luvite.fun/invite/sarah-and-mike</code> &mdash; Path format. Works the same way.</li>
        </ul>
        <p>Both point to the same invitation. Use whichever you prefer when sharing.</p>
        <h3>Choosing a good slug</h3>
        <ul>
          <li>Use lowercase letters, numbers, and hyphens only</li>
          <li>Keep it short &mdash; easier to type and share</li>
          <li>Make it recognizable &mdash; your names or event name works well</li>
          <li>Slugs must be unique across all of Luvite &mdash; if someone already took yours, try adding a date or location</li>
        </ul>
        <h3>Can I change the slug later?</h3>
        <p>Yes. Open the editor, change the slug in the sidebar, and publish again. The old URL will stop working and the new one takes over. You&apos;ll need to re-share the updated link with your guests.</p>
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const categories = Array.from(new Set(articles.map((a) => a.category)));

function searchArticles(query: string) {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q),
  );
}

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

  const otherArticles = activeArticle
    ? articles.filter((a) => a.id !== activeArticle.id)
    : [];

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-gold/10 px-8 py-5">
        <Link href="/" className="font-display text-2xl font-bold text-gold">
          Luvite
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/help"
            onClick={(e) => {
              if (activeArticle) {
                e.preventDefault();
                setActiveArticle(null);
                setQuery("");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="text-sm font-medium text-gold transition-colors"
          >
            Help Center
          </Link>
          <Link href="/templates" className="text-sm text-charcoal/60 transition-colors hover:text-charcoal">
            Templates
          </Link>
          <Link href="/login" className="rounded-full border border-gold/30 px-5 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-white">
            Login
          </Link>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {activeArticle ? (
          /* ---- Article view with sidebar ---- */
          <motion.div
            key={activeArticle.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Breadcrumb */}
            <div className="border-b border-gold/10 bg-cream/50 px-8 py-4">
              <div className="mx-auto max-w-6xl">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="flex items-center gap-2 text-sm text-charcoal/50 transition-colors hover:text-gold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  All articles
                </button>
              </div>
            </div>

            {/* Article + sidebar */}
            <div className="mx-auto flex max-w-6xl gap-12 px-8 py-12">
              {/* Main content */}
              <article className="min-w-0 flex-1">
                <div className="mb-3 text-xs font-medium tracking-wider uppercase text-gold">
                  {activeArticle.category}
                </div>
                <h1 className="font-display text-3xl font-bold text-charcoal md:text-4xl">
                  {activeArticle.title}
                </h1>

                {/* Author + date */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">
                    NE
                  </div>
                  <div className="text-sm text-charcoal/50">
                    <Link href="/help/author/nijanthan" className="font-medium text-charcoal/70 hover:text-gold">
                      {AUTHOR.name}
                    </Link>
                    <span className="mx-1.5">&middot;</span>
                    <span>{formatDate(activeArticle.date)}</span>
                  </div>
                </div>

                <div className="mt-5 h-px w-16 bg-gold/30" />

                <div className="help-article mt-10 text-base leading-relaxed text-charcoal/75">
                  {activeArticle.content}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="hidden w-72 shrink-0 lg:block">
                <div className="sticky top-8">
                  <h3 className="text-xs font-semibold tracking-wider uppercase text-charcoal/40">
                    More articles
                  </h3>
                  <div className="mt-4 space-y-1">
                    {otherArticles.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => {
                          setActiveArticle(a);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="group flex w-full items-start gap-3 rounded-xl border border-transparent px-4 py-3.5 text-left transition-all hover:border-gold/15 hover:bg-cream/60"
                      >
                        <span className="mt-0.5 shrink-0 text-gold/60 transition-colors group-hover:text-gold">
                          {a.icon}
                        </span>
                        <div className="min-w-0">
                          <span className="text-sm font-medium text-charcoal group-hover:text-gold">
                            {a.title}
                          </span>
                          <p className="mt-0.5 text-xs text-charcoal/35">
                            {formatDate(a.date)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-gold/10 pt-5">
                    <h3 className="text-xs font-semibold tracking-wider uppercase text-charcoal/40">
                      Written by
                    </h3>
                    <Link
                      href="/help/author/nijanthan"
                      className="mt-3 flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-cream/60"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold">
                        NE
                      </div>
                      <div>
                        <div className="text-sm font-medium text-charcoal">{AUTHOR.name}</div>
                        <div className="text-xs text-charcoal/40">{AUTHOR.role}</div>
                      </div>
                    </Link>
                  </div>

                  <button
                    onClick={() => {
                      setActiveArticle(null);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="mt-6 flex items-center gap-2 text-sm text-charcoal/40 transition-colors hover:text-gold"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Browse all articles
                  </button>
                </div>
              </aside>
            </div>

            {/* Mobile: related articles */}
            <div className="mx-auto max-w-6xl border-t border-gold/10 px-8 py-10 lg:hidden">
              <h3 className="text-xs font-semibold tracking-wider uppercase text-charcoal/40">
                More articles
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {otherArticles.slice(0, 4).map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setActiveArticle(a);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center gap-3 rounded-xl border border-gold/10 px-5 py-4 text-left transition-all hover:border-gold/30 hover:shadow-sm"
                  >
                    <span className="text-gold">{a.icon}</span>
                    <span className="text-sm font-medium text-charcoal">{a.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* ---- Home view ---- */
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
                Help <span className="text-gold">Center</span>
              </motion.h1>
              <motion.p
                className="mx-auto mt-4 max-w-md text-charcoal/50"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Guides and answers to get you up and running.
              </motion.p>

              {/* Search */}
              <motion.div
                className="mx-auto mt-8 max-w-xl"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute top-1/2 left-4 -translate-y-1/2 text-charcoal/30">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search for a topic..."
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
                        transition={{ duration: 0.4, delay: gi * 0.1 + i * 0.08 }}
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
                          <p className="mt-2 text-xs text-charcoal/30">
                            {formatDate(article.date)}
                          </p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto mt-1 shrink-0 text-charcoal/20 transition-colors group-hover:text-gold">
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
                    No results for &quot;{query}&quot;
                  </p>
                  <button onClick={() => setQuery("")} className="mt-3 text-sm text-gold hover:underline">
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
