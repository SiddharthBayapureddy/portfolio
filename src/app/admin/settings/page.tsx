
import { redirect } from "next/navigation";
import { getSettings } from "@/lib/data";
import { SettingsEditor } from "@/components/admin/SettingsEditor";

export default async function AdminSettingsPage() {

  const settings = await getSettings();
  
  return (
    <div>
      <SettingsEditor settings={settings} />
    </div>
  );
}
