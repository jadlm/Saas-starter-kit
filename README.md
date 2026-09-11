# Foundry — SaaS Starter Kit

Next.js 14 (App Router) + TypeScript + Tailwind, with accounts, Stripe
subscriptions, a Postgres/Prisma schema, and Docker already wired together.
Clone it, rename it, build the feature that makes your product different.

## Stack

- **Next.js 14** (App Router, Server Components)
- **NextAuth** — email/password out of the box, OAuth slot ready
- **Prisma + PostgreSQL** — User, Session, Subscription models
- **Stripe** — Checkout for subscriptions + webhook sync
- **Tailwind CSS** — no component library lock-in
- **Docker + docker-compose** — app + Postgres, one command

## Quick start

```bash
cp .env.example .env      # fill in DATABASE_URL, NEXTAUTH_SECRET, Stripe keys
npm install
npm run db:push           # create tables from prisma/schema.prisma
npm run dev
```

Generate a `NEXTAUTH_SECRET` with `openssl rand -base64 32`.

## Run with Docker

```bash
cp .env.example .env
docker compose up --build
```

This starts the app on `:3000` and Postgres on `:5432`.

## Stripe setup

1. Create a Product + recurring Price in the Stripe dashboard, copy the price ID into `STRIPE_PRICE_ID_PRO`.
2. Forward webhooks locally: `stripe listen --forward-to localhost:3000/api/stripe/webhook`, copy the printed signing secret into `STRIPE_WEBHOOK_SECRET`.
3. `/dashboard/billing` calls `/api/stripe/checkout` to start a Checkout session; the webhook keeps `Subscription.status` current.

## Project structure

```
src/
  app/
    (auth)/login, signup        # auth pages
    dashboard/                  # protected, redirects to /login if signed out
    api/auth/...                # NextAuth + registration
    api/stripe/...              # checkout + webhook
  lib/                          # prisma, stripe, auth config
  components/
prisma/schema.prisma
Dockerfile
docker-compose.yml
```

## Extending it

- **Add an OAuth provider**: drop `GoogleProvider(...)` or `GitHubProvider(...)` into `src/lib/auth.ts`.
- **Add a model**: edit `prisma/schema.prisma`, run `npm run db:push`.
- **Change the plan**: swap `STRIPE_PRICE_ID_PRO` or extend the checkout route to accept multiple price IDs.
- **Restyle**: all design tokens (colors, fonts) live in `tailwind.config.ts` — the "blueprint" theme is a starting point, not a constraint.

---

## Notes for selling this on Payhip

A few things worth doing before you list it:

- **Record a 60–90s demo** (signup → dashboard → Stripe checkout) — for a
  dev tool, a screen recording sells harder than screenshots.
- **List what's *not* included** as clearly as what is (e.g. "no OAuth
  providers pre-configured, no email sending, no admin panel") — sets
  expectations and reduces refund requests.
- **Price anchor**: starter kits like this typically sell $39–$99 one-time.
  $79 is a reasonable middle price for something with billing + auth wired.
- **Deliver as a .zip of the repo** minus `node_modules` and `.next` (already
  excluded via `.gitignore` — just zip the folder as-is).
- Consider a short **CHANGELOG.md** so early buyers can see you're
  maintaining it — recurring updates are a common reason people pay more
  for a boilerplate over a free GitHub template.

# Saas-starter-kit
