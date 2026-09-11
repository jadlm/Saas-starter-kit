"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    await signIn("credentials", { redirect: false, email, password });
    setLoading(false);
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink bg-blueprint bg-grid px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-line bg-ink-raised p-8">
        <p className="font-mono text-xs text-signal">create account</p>
        <h1 className="mt-2 text-2xl text-paper">Start building</h1>

        <label className="mt-6 block text-sm text-muted">
          Name
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border border-line bg-ink px-3 py-2 text-paper outline-none focus:border-cyan"
          />
        </label>

        <label className="mt-4 block text-sm text-muted">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-line bg-ink px-3 py-2 text-paper outline-none focus:border-cyan"
          />
        </label>

        <label className="mt-4 block text-sm text-muted">
          Password
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-line bg-ink px-3 py-2 text-paper outline-none focus:border-cyan"
          />
        </label>

        {error && <p className="mt-4 text-sm text-signal">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-signal py-2.5 font-medium text-ink transition hover:bg-signal-dim disabled:opacity-50"
        >
          {loading ? "Creating…" : "Create account"}
        </button>

        <p className="mt-6 text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
