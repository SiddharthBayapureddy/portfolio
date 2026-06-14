import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { SettingsEditor } from "@/components/admin/SettingsEditor";

export default async function AdminSettingsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("site_settings").select("*");
  
  const settings: Record<string, string> = {};
  if (data) {
    data.forEach(item => {
      settings[item.key] = item.value;
    });
  }

  const cookieStore = await cookies();
  const secret = cookieStore.get("admin_secret")?.value;
  
  return (
    <div>
      <SettingsEditor settings={settings} adminSecret={secret} />
    </div>
  );
}
