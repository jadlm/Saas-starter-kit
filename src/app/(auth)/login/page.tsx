"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", { redirect: false, email, password });
    setLoading(false);

    if (res?.error) {
      setError("That email and password don't match an account.");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink bg-blueprint bg-grid px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-line bg-ink-raised p-8">
        <p className="font-mono text-xs text-signal">sign in</p>
        <h1 className="mt-2 text-2xl text-paper">Welcome back</h1>

        <label className="mt-6 block text-sm text-muted">
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
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p className="mt-6 text-sm text-muted">
          No account?{" "}
          <Link href="/signup" className="text-cyan hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </main>
  );
}
