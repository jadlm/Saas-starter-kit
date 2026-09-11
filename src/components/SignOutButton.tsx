"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="mt-2 font-mono text-xs text-signal hover:underline"
    >
      sign out
    </button>
  );
}
