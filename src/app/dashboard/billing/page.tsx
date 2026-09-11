"use client";

import { useState } from "react";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    setLoading(false);
    if (data.url) window.location.href = data.url;
  }

  return (
    <div>
      <p className="font-mono text-xs text-signal">billing</p>
      <h1 className="mt-2 text-3xl text-paper">Subscription</h1>
      <p className="mt-2 max-w-md text-muted">
        Upgrading opens Stripe Checkout. The webhook updates your plan status
        the moment payment completes — nothing to poll.
      </p>

      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="mt-8 bg-signal px-5 py-3 font-medium text-ink transition hover:bg-signal-dim disabled:opacity-50"
      >
        {loading ? "Redirecting…" : "Upgrade to Pro"}
      </button>
    </div>
  );
}
