"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPath, setNextPath] = useState("/editor");

  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get("next");
    if (next) setNextPath(next);
  }, []);

  async function submit() {
    setError(null);
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload =
        mode === "login"
          ? { email, password }
          : { name, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Authentication failed");
      }

      router.push(nextPath);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md rounded-2xl border border-gold/20 bg-white p-8 shadow-sm">
        <h1 className="font-display text-3xl font-bold text-charcoal">
          {mode === "login" ? "Login" : "Create account"}
        </h1>
        <p className="mt-2 text-sm text-charcoal/60">
          {mode === "login"
            ? "Sign in to manage your invitation profile"
            : "Create your account to start publishing invitations"}
        </p>

        <div className="mt-6 flex gap-2 rounded-full bg-gold/10 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-full px-3 py-2 text-sm ${mode === "login" ? "bg-gold text-white" : "text-gold"}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 rounded-full px-3 py-2 text-sm ${mode === "register" ? "bg-gold text-white" : "text-gold"}`}
          >
            Register
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          {mode === "register" ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="rounded-lg border border-gold/20 px-3 py-2 outline-none focus:border-gold"
            />
          ) : null}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="rounded-lg border border-gold/20 px-3 py-2 outline-none focus:border-gold"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="rounded-lg border border-gold/20 px-3 py-2 outline-none focus:border-gold"
          />

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
          </button>
        </div>
      </div>
    </main>
  );
}
