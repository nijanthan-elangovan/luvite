"use client";

import { Puck, type Data, type Plugin } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { puckConfig } from "@/lib/puck.config";
import { templates, type Template } from "@/lib/templates";
import { useCallback, useEffect, useRef, useState } from "react";

const INITIAL_DATA: Data = {
  root: { props: {} },
  content: [],
  zones: {},
};

type User = { id: number; name: string; email: string };
type PublishNotice = { type: "success" | "error" | "info"; text: string } | null;

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
            { label: "Unpublish", action: () => { setOpen(false); } },
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

/* ═══════════════════ Main Page ═══════════════════ */

export default function AdminPage() {
  const [slug, setSlug] = useState("");
  const [initialData, setInitialData] = useState<Data>(INITIAL_DATA);
  const [publishNotice, setPublishNotice] = useState<PublishNotice>(null);
  const [user, setUser] = useState<User | null>(null);
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (res) => {
        if (!res.ok) { window.location.href = "/login?next=/editor"; return null; }
        return res.json();
      })
      .then((data) => { if (data?.user) setUser(data.user); });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get("template");
    if (templateId) {
      const tpl = templates.find((t) => t.id === templateId);
      if (tpl) { setInitialData(tpl.data); setEditorKey((k) => k + 1); return; }
    }
    const s = params.get("slug");
    if (s) {
      setSlug(s);
      fetch(`/api/invitations?slug=${encodeURIComponent(s)}&ownerOnly=1`)
        .then((r) => (r.ok ? r.json() : null))
        .then((inv) => {
          if (inv?.data) { setInitialData(inv.data); setEditorKey((k) => k + 1); }
          else setPublishNotice({ type: "error", text: "Not found or not owned by you" });
        });
    }
  }, []);

  function loadTemplate(tpl: Template) {
    setInitialData(tpl.data);
    setEditorKey((k) => k + 1);
    setPublishNotice({ type: "info", text: `Loaded: ${tpl.name}` });
  }

  const handlePublish = useCallback(
    async (data: Data) => {
      const finalSlug = normalizeSlug(slug);
      if (!finalSlug) {
        setPublishNotice({ type: "error", text: "Add your invite link name first." });
        return;
      }
      setPublishNotice({ type: "info", text: "Publishing your invite..." });
      setSlug(finalSlug);
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
        setPublishNotice({ type: "success", text: `Your invite is live: ${url}` });
      } else {
        const p = await res.json().catch(() => ({}));
        setPublishNotice({ type: "error", text: p.error || "Could not publish. Please try again." });
      }
      
    },
    [slug]
  );

  async function handleDelete() {
    const s = normalizeSlug(slug);
    if (!s || !confirm(`Delete "${s}"?`)) return;
    const res = await fetch(`/api/invitations?slug=${encodeURIComponent(s)}`, { method: "DELETE" });
    if (res.ok) {
      setInitialData(INITIAL_DATA);
      setSlug("");
      setEditorKey((k) => k + 1);
      setPublishNotice({ type: "success", text: "Deleted." });
    } else setPublishNotice({ type: "error", text: "Delete failed." });
    
  }

  function handleDuplicate() {
    setSlug(slug ? `${slug}-copy` : "copy");
    setPublishNotice({ type: "info", text: "Copied. Update the invite link name, then publish." });
    
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  const templatesPlugin = createTemplatesPlugin(loadTemplate);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
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

      <div style={{ flex: 1, minHeight: 0 }}>
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
                  render: ({ value, onChange }) => {
                    const currentValue = typeof value === "string" ? value : "";
                    const shownValue = slug || currentValue;
                    const normalized = normalizeSlug(shownValue);
                    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "luvite.fun";
                    const statusColor =
                      publishNotice?.type === "error"
                        ? "#dc2626"
                        : publishNotice?.type === "success"
                          ? "#15803d"
                          : "#7c6a2f";

                    return (
                      <div style={{ display: "grid", gap: 8 }}>
                        <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>
                          Invite link name
                        </label>
                        <input
                          type="text"
                          value={shownValue}
                          onChange={(e) => {
                            const next = e.currentTarget.value;
                            setSlug(next);
                            onChange(next);
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
                        <div style={{ fontSize: 12, color: "#6b7280" }}>
                          This is where your invite will be visible:
                        </div>
                        <div style={{ fontSize: 12, color: "#9ca3af" }}>
                          https://{normalized || "meera-arjun"}.{rootDomain}
                        </div>
                        {publishNotice ? (
                          <div style={{ fontSize: 12, color: statusColor }}>
                            {publishNotice.text}
                          </div>
                        ) : null}
                      </div>
                    );
                  },
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
    </div>
  );
}

