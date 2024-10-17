import { getSession } from "@/lib/utils/auth";
import { type Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Root page 🌳",
};

export default async function RootPage() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="grid gap-4 text-center">
        <h3 className="text-2xl font-semibold">
          Hello To my verfy first project
        </h3>
        <p className="text-sm">To use the app you need to sign in</p>
        <button className="bg-white text-black hover:bg-slate-300">
          <Link href="/api/auth/signin">Go to the sign in page</Link>
        </button>
      </div>
    </div>
  );
}
