import { cookies } from "next/headers";
import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { checkAuth, logout } from "@/app/actions/admin";
import LoginPage from "./LoginPage";
import { AdminProvider } from "@/components/admin/AdminProvider";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const isAuth = await checkAuth();

  if (!isAuth) {
    return <LoginPage />;
  }

  const cookieStore = await cookies();
  const secret = cookieStore.get("admin_secret")?.value;

  return (
    <AdminProvider secret={secret}>
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
          <div className="flex gap-6 items-center">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <nav className="flex gap-4">
              <Link href="/admin" prefetch={true} className="text-sm text-muted-foreground hover:text-foreground">Posts</Link>
              <Link href="/admin/projects" prefetch={true} className="text-sm text-muted-foreground hover:text-foreground">Projects</Link>
              <Link href="/admin/experiences" prefetch={true} className="text-sm text-muted-foreground hover:text-foreground">Experiences</Link>
              <Link href="/admin/skills" prefetch={true} className="text-sm text-muted-foreground hover:text-foreground">Skills</Link>
              <Link href="/admin/settings" prefetch={true} className="text-sm text-muted-foreground hover:text-foreground">Settings</Link>
            </nav>
          </div>
          <form action={logout}>
            <Button variant="outline" type="submit" size="sm">Logout</Button>
          </form>
        </div>
        {children}
      </div>
    </AdminProvider>
  );
}
