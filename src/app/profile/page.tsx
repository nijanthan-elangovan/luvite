"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/Toast";

type User = { id: number; name: string; email: string };
type Invitation = { slug: string; custom_domain: string | null; domain_verified: number; created_at: string; updated_at: string };
type RSVP = {
  id: number;
  invitation_slug: string;
  name: string;
  email: string;
  attending: string;
  meal: string;
  message: string;
  created_at: string;
};

type Tab = "invitations" | "rsvps" | "settings";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("invitations");
  const { toast } = useToast();

  function loadProfile() {
    setLoading(true);
    setError(null);
    fetch("/api/profile")
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 401) {
            window.location.href = "/login?next=/profile";
            return null;
          }
          throw new Error("Failed to load profile");
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setUser(data.user);
        setInvitations(data.invitations || []);
        setRsvps(data.rsvps || []);
      })
      .catch((e) => {
        const msg = e instanceof Error ? e.message : "Failed to load";
        setError(msg);
        toast("error", msg);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadProfile(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const tabs: { key: Tab; label: string }[] = [
    { key: "invitations", label: `Invitations (${invitations.length})` },
    { key: "rsvps", label: `RSVPs (${rsvps.length})` },
    { key: "settings", label: "Settings" },
  ];

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Top bar */}
        <div className="flex items-center gap-3">
          <a
            href="/editor"
            className="flex items-center gap-1.5 rounded-full border border-gold/30 px-4 py-2 text-sm font-medium text-gold transition hover:bg-gold/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            Editor
          </a>
          <a
            href="/"
            className="rounded-full border border-gold/30 px-4 py-2 text-sm font-medium text-gold transition hover:bg-gold/5"
          >
            Home
          </a>
        </div>

        {/* Profile header */}
        <div className="rounded-xl border border-gold/20 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-charcoal">Profile</h1>
              {loading ? (
                <div className="mt-2 h-4 w-48 animate-pulse rounded bg-gold/10" />
              ) : user ? (
                <p className="mt-1 text-charcoal/60">
                  {user.name} &middot; {user.email}
                </p>
              ) : null}
            </div>
            <a
              href="/editor"
              className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-white transition hover:bg-gold-dark"
            >
              + New Invitation
            </a>
          </div>
          {error && (
            <div className="mt-3 flex items-center gap-3">
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={loadProfile}
                className="text-sm font-medium text-gold hover:underline"
              >
                Try again
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl border border-gold/20 bg-white p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition ${
                tab === t.key
                  ? "bg-gold text-white shadow-sm"
                  : "text-charcoal/60 hover:bg-gold/5 hover:text-charcoal"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="rounded-xl border border-gold/20 bg-white p-6">
          {loading ? (
            <div className="space-y-4 py-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 animate-pulse rounded-lg bg-gold/5" />
              ))}
            </div>
          ) : (
            <>
              {tab === "invitations" && <InvitationsTab invitations={invitations} />}
              {tab === "rsvps" && <RSVPsTab rsvps={rsvps} />}
              {tab === "settings" && <SettingsTab user={user} />}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function InvitationsTab({ invitations }: { invitations: Invitation[] }) {
  const { toast } = useToast();

  function copyLink(slug: string) {
    const host = typeof window !== "undefined" ? window.location.hostname : "";
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "luvite.fun";
    const url =
      host === "localhost"
        ? `${window.location.origin}/invite/${slug}`
        : `https://${slug}.${rootDomain}`;
    navigator.clipboard.writeText(url).then(
      () => toast("success", "Link copied!"),
      () => toast("error", "Could not copy link"),
    );
  }

  if (invitations.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-charcoal/50">No invitations yet.</p>
        <p className="mt-1 text-sm text-charcoal/40">Create one to get started &mdash; pick a template or build from scratch.</p>
        <a
          href="/editor"
          className="mt-4 inline-block rounded-full bg-gold px-6 py-2 text-sm font-semibold text-white"
        >
          Create Your First
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gold/20 text-charcoal/60">
            <th className="py-2.5 font-medium">Slug</th>
            <th className="py-2.5 font-medium">Custom Domain</th>
            <th className="py-2.5 font-medium">Last Updated</th>
            <th className="py-2.5 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((inv) => (
            <tr key={inv.slug} className="border-b border-gold/10 last:border-0">
              <td className="py-3 font-medium text-charcoal">{inv.slug}</td>
              <td className="py-3 text-charcoal/60">
                {inv.custom_domain ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${
                        inv.domain_verified ? "bg-emerald-500" : "bg-amber-400"
                      }`}
                    />
                    <span>{inv.custom_domain}</span>
                  </span>
                ) : (
                  <span className="text-charcoal/30">&mdash;</span>
                )}
              </td>
              <td className="py-3 text-charcoal/60">{new Date(inv.updated_at).toLocaleString()}</td>
              <td className="flex gap-3 py-3">
                <a href={`/editor?slug=${inv.slug}`} className="text-gold hover:underline">
                  Edit
                </a>
                <a href={`/invite/${inv.slug}`} className="text-gold hover:underline">
                  View
                </a>
                <button
                  onClick={() => copyLink(inv.slug)}
                  className="text-gold hover:underline"
                >
                  Copy Link
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RSVPsTab({ rsvps }: { rsvps: RSVP[] }) {
  if (rsvps.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-charcoal/50">No RSVP submissions yet.</p>
        <p className="mt-1 text-sm text-charcoal/40">Share your invitation link with guests to start collecting responses.</p>
      </div>
    );
  }

  const attending = rsvps.filter((r) => r.attending === "yes").length;
  const declined = rsvps.filter((r) => r.attending === "no").length;
  const maybe = rsvps.filter((r) => r.attending === "maybe").length;

  return (
    <div>
      {/* Summary stats */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-emerald-50 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{attending}</p>
          <p className="text-xs text-emerald-600/70">Attending</p>
        </div>
        <div className="rounded-lg bg-red-50 p-4 text-center">
          <p className="text-2xl font-bold text-red-500">{declined}</p>
          <p className="text-xs text-red-500/70">Declined</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{maybe}</p>
          <p className="text-xs text-amber-600/70">Maybe</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gold/20 text-charcoal/60">
              <th className="py-2.5 font-medium">Invitation</th>
              <th className="py-2.5 font-medium">Guest</th>
              <th className="py-2.5 font-medium">Email</th>
              <th className="py-2.5 font-medium">Status</th>
              <th className="py-2.5 font-medium">Meal</th>
              <th className="py-2.5 font-medium">Message</th>
              <th className="py-2.5 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((rsvp) => (
              <tr key={rsvp.id} className="border-b border-gold/10 last:border-0">
                <td className="py-3 text-charcoal/60">{rsvp.invitation_slug || "-"}</td>
                <td className="py-3 font-medium text-charcoal">{rsvp.name}</td>
                <td className="py-3 text-charcoal/60">{rsvp.email}</td>
                <td className="py-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      rsvp.attending === "yes"
                        ? "bg-emerald-100 text-emerald-700"
                        : rsvp.attending === "no"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {rsvp.attending === "yes" ? "Attending" : rsvp.attending === "no" ? "Declined" : "Maybe"}
                  </span>
                </td>
                <td className="py-3 text-charcoal/60">{rsvp.meal || "-"}</td>
                <td className="max-w-[200px] truncate py-3 text-charcoal/60">{rsvp.message || "-"}</td>
                <td className="py-3 text-charcoal/60">{new Date(rsvp.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsTab({ user }: { user: User | null }) {
  const [loggingOut, setLoggingOut] = useState(false);
  const { toast } = useToast();

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      toast("error", "Logout failed, redirecting anyway");
    }
    window.location.href = "/login";
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-bold text-charcoal">Account</h3>
        {user && (
          <div className="mt-3 space-y-2 text-sm">
            <p><span className="text-charcoal/50">Name:</span> <span className="text-charcoal">{user.name}</span></p>
            <p><span className="text-charcoal/50">Email:</span> <span className="text-charcoal">{user.email}</span></p>
          </div>
        )}
      </div>

      <hr className="border-gold/10" />

      <div>
        <h3 className="font-display text-lg font-bold text-charcoal">Danger Zone</h3>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="mt-3 rounded-full border border-red-300 px-5 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
        >
          {loggingOut ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
}
