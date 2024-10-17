import SignOutButton from "@/components/SignOutButton";
import { getSession } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }
  return (
    <div className="flex flex-col gap-5">
      <header className="flex justify-end p-5">
        <SignOutButton />
      </header>
      <main className="flex justify-center px-5 pb-10">{children}</main>
    </div>
  );
}
