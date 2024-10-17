"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="flex items-center bg-red-400 px-4 py-2 rounded-sm hover:bg-red-500"
      onClick={async () => {
        await signOut({
          redirect: true,
        });
      }}
    >
      Sign Out
    </button>
  );
}
