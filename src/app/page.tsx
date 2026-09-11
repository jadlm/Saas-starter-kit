import Link from "next/link";

const wired = [
  {
    id: "auth",
    title: "Accounts",
    detail:
      "Email + password out of the box, session handling via NextAuth, and a slot for Google or GitHub OAuth when you need it.",
  },
  {
    id: "billing",
    title: "Billing",
    detail:
      "Stripe Checkout for subscriptions, a webhook that keeps status in sync, and a billing page that reflects the real state.",
  },
  {
    id: "data",
    title: "Data",
    detail:
      "Prisma schema for users, sessions, and subscriptions, pointed at Postgres. Add your own models and run one migration.",
  },
  {
    id: "ship",
    title: "Shipping",
    detail:
      "A Dockerfile and compose file that build a standalone Next.js output next to Postgres. One command, running locally or on a server.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-ink bg-blueprint bg-grid">
      {/* Nav */}
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <span className="font-mono text-sm tracking-tight text-paper">
            foundry<span className="text-signal">/</span>starter
          </span>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/login" className="text-muted transition hover:text-paper">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="border border-signal px-3 py-1.5 text-paper transition hover:bg-signal hover:text-ink"
            >
              Get the kit
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-20">
        <div className="max-w-2xl">
          <p className="font-mono text-sm text-cyan">next.js · postgres · stripe · docker</p>
          <h1 className="mt-4 text-5xl leading-[1.1] text-paper">
            The weekend of setup, already done.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Foundry is a Next.js codebase with accounts, subscriptions, and a
            dashboard already wired to a database. Clone it, rename it, add
            the feature your product actually needs.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/signup"
              className="bg-signal px-5 py-3 font-medium text-ink transition hover:bg-signal-dim"
            >
              Start building
            </Link>
            <span className="font-mono text-sm text-muted">npm install &amp; go</span>
          </div>
        </div>
      </section>

      {/* Wired up — schematic list */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl text-paper">What&apos;s already wired</h2>
          <div className="mt-10 grid gap-px overflow-hidden border border-line md:grid-cols-2">
            {wired.map((item) => (
              <div key={item.id} className="bg-ink-raised p-6">
                <p className="font-mono text-xs text-signal">{item.id}</p>
                <h3 className="mt-2 text-lg text-paper">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl text-paper">One license, every project</h2>
          <div className="mt-8 flex max-w-sm flex-col border border-line bg-ink-raised p-8">
            <p className="font-mono text-sm text-cyan">solo license</p>
            <p className="mt-3 text-4xl text-paper">
              $79 <span className="text-base text-muted">one-time</span>
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              <li>Full source, no attribution required</li>
              <li>Unlimited personal &amp; client projects</li>
              <li>Free updates for 12 months</li>
            </ul>
            <Link
              href="/signup"
              className="mt-8 bg-signal py-3 text-center font-medium text-ink transition hover:bg-signal-dim"
            >
              Buy the starter kit
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-muted">
          Foundry Starter Kit
        </div>
      </footer>
    </main>
  );
}
