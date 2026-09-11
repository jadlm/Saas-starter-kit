import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-ink">
      <aside className="w-56 border-r border-line p-6">
        <span className="font-mono text-sm text-paper">
          foundry<span className="text-signal">/</span>
        </span>
        <nav className="mt-10 flex flex-col gap-1 text-sm">
          <Link href="/dashboard" className="px-3 py-2 text-muted transition hover:bg-ink-raised hover:text-paper">
            Overview
          </Link>
          <Link href="/dashboard/billing" className="px-3 py-2 text-muted transition hover:bg-ink-raised hover:text-paper">
            Billing
          </Link>
        </nav>
        <div className="mt-10 border-t border-line pt-4">
          <p className="truncate text-xs text-muted">{session.user?.email}</p>
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
