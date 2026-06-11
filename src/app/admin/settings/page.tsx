import { checkAuth } from "@/app/actions/admin";
import { redirect } from "next/navigation";
import { getSettings } from "@/lib/data";
import { SettingsEditor } from "@/components/admin/SettingsEditor";

export default async function AdminSettingsPage() {
  if (!(await checkAuth())) redirect("/admin/login");
  const settings = await getSettings();
  
  return (
    <div>
      <SettingsEditor settings={settings} />
    </div>
  );
}
