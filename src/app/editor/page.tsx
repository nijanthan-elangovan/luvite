"use client";

import { Puck, type Data, type Plugin } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { puckConfig } from "@/lib/puck.config";
import { templates, type Template } from "@/lib/templates";
import { useCallback, useEffect, useRef, useState, type MutableRefObject } from "react";
import { useToast } from "@/components/Toast";

const INITIAL_DATA: Data = {
  root: { props: {} },
  content: [],
  zones: {},
};

type User = { id: number; name: string; email: string };

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ═══════════════════ Templates Plugin ═══════════════════ */

function TemplatesSidebarContent({ onSelect }: { onSelect: (tpl: Template) => void }) {
  return (
    <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ fontSize: 12, color: "#666", margin: 0 }}>Click a template to load it.</p>
      {templates.map((tpl) => (
        <div
          key={tpl.id}
          onClick={() => onSelect(tpl)}
          style={{
            cursor: "pointer",
            borderRadius: 10,
            border: "1px solid #e5e5e5",
            overflow: "hidden",
            transition: "box-shadow 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
        >
          <img src={tpl.thumbnail} alt={tpl.name} style={{ width: "100%", height: 110, objectFit: "cover", display: "block" }} />
          <div style={{ padding: "8px 10px" }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{tpl.name}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 3, lineHeight: 1.4 }}>
              {tpl.description.slice(0, 80)}...
            </div>
            <div style={{ display: "flex", gap: 4, marginTop: 5, flexWrap: "wrap" }}>
              {tpl.tags.map((tag) => (
                <span key={tag} style={{ fontSize: 9, padding: "1px 6px", borderRadius: 20, background: "#f5f0e8", color: "#a08540", textTransform: "capitalize" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function createTemplatesPlugin(onSelect: (tpl: Template) => void): Plugin {
  return {
    name: "templates",
    label: "Templates",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </svg>
    ),
    render: () => <TemplatesSidebarContent onSelect={onSelect} />,
  };
}

/* ═══════════════════ Profile Dropdown ═══════════════════ */

function ProfileDropdown({ user, onLogout }: { user: User | null; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "#C9A84C",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "var(--font-display), serif",
        }}
        title={user?.email || "Profile"}
      >
        {user?.name?.charAt(0).toUpperCase() || "U"}
      </button>

      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "100%",
          marginTop: 6,
          background: "#fff",
          border: "1px solid #e5e5e5",
          borderRadius: 10,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          zIndex: 200,
          minWidth: 180,
          overflow: "hidden",
        }}>
          {user && (
            <div style={{ padding: "12px 14px", borderBottom: "1px solid #f0f0f0" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{user.name}</div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{user.email}</div>
            </div>
          )}
          <a href="/profile" style={{ display: "block", padding: "10px 14px", fontSize: 13, color: "#333", textDecoration: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f5f5f5"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
          >
            Profile & RSVPs
          </a>
          <a href="/" style={{ display: "block", padding: "10px 14px", fontSize: 13, color: "#333", textDecoration: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f5f5f5"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
          >
            Home
          </a>
          <button
            type="button"
            onClick={onLogout}
            style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", fontSize: 13, color: "#dc2626", background: "none", border: "none", borderTop: "1px solid #f0f0f0", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#fef2f2"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════ Three-Dot Menu ═══════════════════ */

function ThreeDotMenu({ onDelete, onDuplicate }: { onDelete: () => void; onDuplicate: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          background: "none",
          border: "1px solid #e0e0e0",
          borderRadius: 6,
          padding: "5px 7px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          lineHeight: 1,
        }}
        title="More actions"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#555">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "100%",
          marginTop: 4,
          background: "#fff",
          border: "1px solid #e5e5e5",
          borderRadius: 8,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          zIndex: 200,
          minWidth: 150,
          overflow: "hidden",
        }}>
          {[
            { label: "Duplicate", action: () => { onDuplicate(); setOpen(false); } },
            { label: "Delete", action: () => { onDelete(); setOpen(false); }, danger: true },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "9px 14px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: 13,
                color: (item as { danger?: boolean }).danger ? "#dc2626" : "#333",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = (item as { danger?: boolean }).danger ? "#fef2f2" : "#f5f5f5"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════ Slug Field (stable) ═══════════════════ */

function SlugField({
  slugRef,
  publishNotice,
  isPublishing,
  onCopyLink,
}: {
  slugRef: MutableRefObject<string>;
  publishNotice: { type: "success" | "error" | "info"; text: string } | null;
  isPublishing: boolean;
  onCopyLink: () => void;
}) {
  const [local, setLocal] = useState(slugRef.current);
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "luvite.fun";
  const normalized = normalizeSlug(local);
  const statusColor =
    publishNotice?.type === "error"
      ? "#dc2626"
      : publishNotice?.type === "success"
        ? "#15803d"
        : "#7c6a2f";

  // Sync from outside (e.g. loading a slug, duplicate)
  useEffect(() => {
    const interval = setInterval(() => {
      if (slugRef.current !== local) setLocal(slugRef.current);
    }, 200);
    return () => clearInterval(interval);
  });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>
        Invite link name
      </label>
      <input
        type="text"
        value={local}
        onChange={(e) => {
          const next = e.currentTarget.value;
          setLocal(next);
          slugRef.current = next;
        }}
        placeholder="meera-arjun"
        style={{
          border: "1px solid #d1d5db",
          borderRadius: 8,
          padding: "9px 10px",
          fontSize: 13,
          outline: "none",
        }}
      />
      {local && !/^[a-z0-9-]*$/.test(local) && (
        <div style={{ fontSize: 11, color: "#d97706" }}>
          Only lowercase letters, numbers, and hyphens allowed
        </div>
      )}
      <div style={{ fontSize: 12, color: "#6b7280" }}>
        Your invite will be visible at:
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ fontSize: 12, color: "#9ca3af", flex: 1 }}>
          https://{normalized || "meera-arjun"}.{rootDomain}
        </div>
        {normalized && (
          <button
            type="button"
            onClick={onCopyLink}
            style={{
              background: "none",
              border: "1px solid #d1d5db",
              borderRadius: 6,
              padding: "3px 8px",
              cursor: "pointer",
              fontSize: 11,
              color: "#6b7280",
            }}
          >
            Copy
          </button>
        )}
      </div>
      {publishNotice ? (
        <div style={{ fontSize: 12, color: statusColor }}>
          {isPublishing && (
            <span style={{ display: "inline-block", width: 12, height: 12, border: "2px solid #d1d5db", borderTopColor: statusColor, borderRadius: "50%", animation: "spin 0.8s linear infinite", marginRight: 6, verticalAlign: "middle" }} />
          )}
          {publishNotice.text}
        </div>
      ) : null}
    </div>
  );
}

/* ═══════════════════ Custom Domain Field ═══════════════════ */

function CustomDomainField({ slugRef }: { slugRef: MutableRefObject<string> }) {
  const [domain, setDomain] = useState("");
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cnameTarget = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "luvite.fun";

  // Load current domain on mount
  useEffect(() => {
    const slug = slugRef.current;
    if (!slug) { setLoaded(true); return; }
    fetch(`/api/domains?slug=${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.customDomain) {
          setDomain(data.customDomain);
          setVerified(data.domainVerified);
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function saveDomain() {
    const slug = slugRef.current;
    if (!slug) { setError("Publish your invitation first"); return; }
    setError(null);
    setChecking(true);
    try {
      const res = await fetch("/api/domains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, domain: domain.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save domain");
        return;
      }
      setDomain(data.customDomain || "");
      setVerified(data.domainVerified || false);
      if (!data.domainVerified) {
        setError("Domain saved but DNS not verified yet. Add the CNAME record and check again.");
      }
    } catch {
      setError("Network error");
    } finally {
      setChecking(false);
    }
  }

  async function recheckDNS() {
    const slug = slugRef.current;
    if (!slug) return;
    setError(null);
    setChecking(true);
    try {
      const res = await fetch("/api/domains", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (res.ok) {
        setVerified(data.domainVerified);
        if (!data.domainVerified) {
          setError("CNAME not found yet. It can take up to 48 hours for DNS to propagate.");
        }
      }
    } catch {
      setError("Network error");
    } finally {
      setChecking(false);
    }
  }

  async function removeDomain() {
    const slug = slugRef.current;
    if (!slug) return;
    setChecking(true);
    try {
      await fetch(`/api/domains?slug=${encodeURIComponent(slug)}`, { method: "DELETE" });
      setDomain("");
      setVerified(false);
      setError(null);
    } catch {
      setError("Failed to remove");
    } finally {
      setChecking(false);
    }
  }

  if (!loaded) return null;

  return (
    <div style={{ display: "grid", gap: 8, marginTop: 4, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
      <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>
        Custom domain (optional)
      </label>
      <div style={{ display: "flex", gap: 6 }}>
        <input
          type="text"
          value={domain}
          onChange={(e) => { setDomain(e.target.value); setError(null); }}
          placeholder="invite.yoursite.com"
          style={{
            flex: 1,
            border: "1px solid #d1d5db",
            borderRadius: 8,
            padding: "8px 10px",
            fontSize: 13,
            outline: "none",
          }}
        />
        <button
          type="button"
          onClick={saveDomain}
          disabled={checking || !domain.trim()}
          style={{
            border: "none",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 12,
            fontWeight: 600,
            cursor: checking ? "wait" : "pointer",
            background: "#C9A84C",
            color: "#fff",
            opacity: checking || !domain.trim() ? 0.6 : 1,
          }}
        >
          {checking ? "..." : "Save"}
        </button>
      </div>

      {domain && (
        <div style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: verified ? "#16a34a" : "#eab308",
          }} />
          <span style={{ color: verified ? "#16a34a" : "#92400e" }}>
            {verified ? "Verified and active" : "Pending DNS verification"}
          </span>
          {!verified && (
            <button
              type="button"
              onClick={recheckDNS}
              disabled={checking}
              style={{ background: "none", border: "none", color: "#C9A84C", cursor: "pointer", fontSize: 12, fontWeight: 600, textDecoration: "underline" }}
            >
              Re-check
            </button>
          )}
          <button
            type="button"
            onClick={removeDomain}
            disabled={checking}
            style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: 12, marginLeft: "auto" }}
          >
            Remove
          </button>
        </div>
      )}

      {!verified && domain && (
        <div style={{ fontSize: 11, color: "#6b7280", background: "#f9fafb", borderRadius: 8, padding: "8px 10px", lineHeight: 1.5 }}>
          Add a <strong>CNAME</strong> record in your DNS settings:
          <div style={{ marginTop: 4, fontFamily: "monospace", fontSize: 11, color: "#374151" }}>
            {domain.split(".")[0]} &rarr; <strong>{cnameTarget}</strong>
          </div>
        </div>
      )}

      {error && (
        <div style={{ fontSize: 12, color: "#dc2626" }}>{error}</div>
      )}
    </div>
  );
}

/* ═══════════════════ Main Page ═══════════════════ */

export default function AdminPage() {
  const slugRef = useRef("");
  const [initialData, setInitialData] = useState<Data>(INITIAL_DATA);
  const [publishNotice, setPublishNotice] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (res) => {
        if (!res.ok) { window.location.href = "/login?next=/editor"; return null; }
        return res.json();
      })
      .then((data) => { if (data?.user) setUser(data.user); })
      .catch(() => { window.location.href = "/login?next=/editor"; });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get("template");
    if (templateId) {
      const tpl = templates.find((t) => t.id === templateId);
      if (tpl) {
        setInitialData(tpl.data);
        setEditorKey((k) => k + 1);
        setIsLoading(false);
        return;
      }
    }
    const s = params.get("slug");
    if (s) {
      slugRef.current = s;
      fetch(`/api/invitations?slug=${encodeURIComponent(s)}&ownerOnly=1`)
        .then((r) => (r.ok ? r.json() : null))
        .then((inv) => {
          if (inv?.data) {
            setInitialData(inv.data);
            setEditorKey((k) => k + 1);
          } else {
            toast("error", "Invitation not found or not owned by you");
          }
        })
        .catch(() => toast("error", "Failed to load invitation"))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [toast]);

  function loadTemplate(tpl: Template) {
    setInitialData(tpl.data);
    setEditorKey((k) => k + 1);
    toast("success", `Template loaded: ${tpl.name}`);
  }

  const handlePublish = useCallback(
    async (data: Data) => {
      const finalSlug = normalizeSlug(slugRef.current);
      if (!finalSlug) {
        toast("error", "Enter an invite link name before publishing");
        setPublishNotice({ type: "error", text: "Add your invite link name first." });
        return;
      }
      setIsPublishing(true);
      setPublishNotice({ type: "info", text: "Publishing..." });
      slugRef.current = finalSlug;
      try {
        const res = await fetch("/api/invitations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: finalSlug, data }),
        });
        if (res.ok) {
          const host = window.location.hostname;
          const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "luvite.fun";
          const url =
            host === "localhost"
              ? `/invite/${finalSlug}`
              : `https://${finalSlug}.${rootDomain}`;
          setPublishNotice({ type: "success", text: `Live at: ${url}` });
          toast("success", "Invitation published!");
        } else {
          const p = await res.json().catch(() => ({}));
          const msg = p.error || "Could not publish. Please try again.";
          setPublishNotice({ type: "error", text: msg });
          toast("error", msg);
        }
      } catch {
        toast("error", "Network error. Check your connection and try again.");
        setPublishNotice({ type: "error", text: "Network error." });
      } finally {
        setIsPublishing(false);
      }
    },
    [toast]
  );

  async function handleDelete() {
    const s = normalizeSlug(slugRef.current);
    if (!s || !confirm(`Delete "${s}"? This can't be undone.`)) return;
    try {
      const res = await fetch(`/api/invitations?slug=${encodeURIComponent(s)}`, { method: "DELETE" });
      if (res.ok) {
        setInitialData(INITIAL_DATA);
        slugRef.current = "";
        setEditorKey((k) => k + 1);
        toast("success", "Invitation deleted");
      } else {
        toast("error", "Failed to delete invitation");
      }
    } catch {
      toast("error", "Network error. Could not delete.");
    }
  }

  function handleDuplicate() {
    slugRef.current = slugRef.current ? `${slugRef.current}-copy` : "copy";
    toast("info", "Duplicated. Change the link name, then publish.");
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // continue to redirect even if logout fails
    }
    window.location.href = "/login";
  }

  function handleCopyLink() {
    const finalSlug = normalizeSlug(slugRef.current);
    if (!finalSlug) {
      toast("error", "Set an invite link name first");
      return;
    }
    const host = window.location.hostname;
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "luvite.fun";
    const url =
      host === "localhost"
        ? `${window.location.origin}/invite/${finalSlug}`
        : `https://${finalSlug}.${rootDomain}`;
    navigator.clipboard.writeText(url).then(
      () => toast("success", "Link copied to clipboard"),
      () => toast("error", "Could not copy link"),
    );
  }

  const templatesPlugin = createTemplatesPlugin(loadTemplate);

  if (isLoading) {
    return (
      <div style={{ height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 32, height: 32, border: "3px solid #e5e5e5", borderTopColor: "#C9A84C", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto" }} />
          <p style={{ marginTop: 12, color: "#888", fontSize: 14 }}>Loading editor...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          minHeight: 48,
          padding: "0 12px",
          borderBottom: "1px solid #e5e5e5",
          background: "#fff",
          overflow: "visible",
          zIndex: 20,
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", marginRight: 2 }}>
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="#C9A84C" />
            <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700" fontFamily="serif">L</text>
          </svg>
        </a>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, overflow: "visible" }}>
          <ThreeDotMenu onDelete={handleDelete} onDuplicate={handleDuplicate} />
          <ProfileDropdown user={user} onLogout={handleLogout} />
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        <Puck
          key={editorKey}
          config={{
            ...puckConfig,
            root: {
              label: "Invite",
              ...(puckConfig.root || {}),
              fields: {
                title: { type: "text", label: "Invite Title" },
                slug: {
                  type: "custom",
                  label: "Invite Link",
                  render: () => (
                    <SlugField
                      slugRef={slugRef}
                      publishNotice={publishNotice}
                      isPublishing={isPublishing}
                      onCopyLink={handleCopyLink}
                    />
                  ),
                },
                customDomain: {
                  type: "custom",
                  label: "Custom Domain",
                  render: () => <CustomDomainField slugRef={slugRef} />,
                },
              },
            },
          }}
          data={initialData}
          onChange={(data) => setInitialData(data)}
          onPublish={handlePublish}
          plugins={[templatesPlugin]}
        />
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
