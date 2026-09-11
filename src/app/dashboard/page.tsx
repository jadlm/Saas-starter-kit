import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id: string })?.id;
  const subscription = userId
    ? await prisma.subscription.findUnique({ where: { userId } })
    : null;

  return (
    <div>
      <p className="font-mono text-xs text-signal">overview</p>
      <h1 className="mt-2 text-3xl text-paper">
        Welcome, {session?.user?.name?.split(" ")[0] ?? "there"}
      </h1>
      <p className="mt-2 text-muted">
        This is where your product&apos;s real content goes. Everything around it
        — auth, layout, billing — is already handled.
      </p>

      <div className="mt-10 grid max-w-md gap-px overflow-hidden border border-line">
        <div className="bg-ink-raised p-6">
          <p className="text-sm text-muted">Plan status</p>
          <p className="mt-1 text-lg text-paper">
            {subscription?.status === "active" ? "Pro — active" : "Free"}
          </p>
        </div>
      </div>
    </div>
  );
}
