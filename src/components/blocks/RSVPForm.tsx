"use client";

import { useEffect, useState } from "react";

export interface RSVPFormProps {
  title?: string;
  buttonText?: string;
  successMessage?: string;
  showMealOptions?: boolean;
}

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "luvite.fun";

function resolveInvitationSlug() {
  if (typeof window === "undefined") return "";

  // Check URL path first (/invite/slug)
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  if (pathParts[0] === "invite" && pathParts[1] && pathParts[1] !== "_domain") {
    return pathParts[1];
  }

  const hostname = window.location.hostname;
  const mainDomains = ["luvite.fun", "www.luvite.fun", "luvite.in", "www.luvite.in", "localhost"];
  const isMainDomain = mainDomains.some((domain) => hostname === domain || hostname === `${domain}:3000`);

  if (!isMainDomain) {
    // Check if it's a subdomain of luvite
    if (hostname.endsWith(`.${ROOT_DOMAIN}`) || hostname.endsWith(".localhost")) {
      return hostname.split(".")[0] || "";
    }
    // Custom domain — slug is unknown, will be resolved via API
    return "";
  }

  return "";
}

function useResolvedSlug() {
  const [slug, setSlug] = useState(() => resolveInvitationSlug());

  useEffect(() => {
    // If slug is empty and we're on a custom domain, look it up
    if (slug) return;
    if (typeof window === "undefined") return;

    const hostname = window.location.hostname;
    const mainDomains = ["luvite.fun", "www.luvite.fun", "luvite.in", "www.luvite.in", "localhost"];
    const isMainDomain = mainDomains.some((d) => hostname === d || hostname === `${d}:3000`);
    const isSubdomain = hostname.endsWith(`.${ROOT_DOMAIN}`) || hostname.endsWith(".localhost");

    if (isMainDomain || isSubdomain) return;

    // This is a custom domain — resolve via API
    fetch(`/api/invitations?slugByDomain=${encodeURIComponent(hostname)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.slug) setSlug(data.slug);
      })
      .catch(() => {});
  }, [slug]);

  return slug;
}

export default function RSVPForm({
  title = "RSVP",
  buttonText = "Submit",
  successMessage = "Thanks for your RSVP!",
  showMealOptions = false,
}: RSVPFormProps) {
  const resolvedSlug = useResolvedSlug();
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      attending: String(formData.get("attending") || "yes"),
      meal: String(formData.get("meal") || ""),
      message: String(formData.get("message") || ""),
      sourcePath: typeof window !== "undefined" ? window.location.pathname : "",
      invitationSlug: resolvedSlug,
    };

    try {
      setIsSaving(true);

      const response = await fetch("/api/rsvps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save RSVP");
      }

      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Failed to save RSVP"
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 580,
        margin: "0 auto",
        padding: 24,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.35)",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.32), rgba(255,255,255,0.14))",
        backdropFilter: "blur(14px)",
        boxShadow: "0 12px 30px rgba(17,24,39,0.16)",
      }}
    >
      <h3 style={{ margin: "0 0 16px", fontSize: 28, lineHeight: 1.2 }}>{title}</h3>

      {submitted ? (
        <p style={{ margin: "0 0 8px", color: "#166534", fontWeight: 700 }}>
          {successMessage}
        </p>
      ) : null}

      {error ? (
        <p style={{ margin: "0 0 8px", color: "#b91c1c", fontWeight: 600 }}>{error}</p>
      ) : null}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <input
          name="name"
          placeholder="Your name"
          required
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #d1d5db",
            background: "rgba(255,255,255,0.85)",
          }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #d1d5db",
            background: "rgba(255,255,255,0.85)",
          }}
        />

        <select
          name="attending"
          defaultValue="yes"
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #d1d5db",
            background: "rgba(255,255,255,0.85)",
          }}
        >
          <option value="yes">Attending</option>
          <option value="maybe">Maybe</option>
          <option value="no">Not attending</option>
        </select>

        {showMealOptions ? (
          <select
            name="meal"
            defaultValue=""
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #d1d5db",
              background: "rgba(255,255,255,0.85)",
            }}
          >
            <option value="">Meal preference</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        ) : null}

        <textarea
          name="message"
          placeholder="Message (optional)"
          rows={3}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #d1d5db",
            resize: "vertical",
            background: "rgba(255,255,255,0.85)",
          }}
        />

        <button
          type="submit"
          disabled={isSaving}
          style={{
            border: 0,
            borderRadius: 10,
            padding: "10px 14px",
            fontWeight: 700,
            cursor: isSaving ? "not-allowed" : "pointer",
            background: "#111827",
            color: "#fff",
            opacity: isSaving ? 0.7 : 1,
          }}
        >
          {isSaving ? (
            <>
              <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "rsvp-spin 0.7s linear infinite", verticalAlign: "middle", marginRight: 8 }} />
              Saving...
              <style>{`@keyframes rsvp-spin { to { transform: rotate(360deg); } }`}</style>
            </>
          ) : buttonText}
        </button>
      </form>
    </section>
  );
}
