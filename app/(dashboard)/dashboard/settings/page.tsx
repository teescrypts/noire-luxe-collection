import { getSettings } from "@/actions/settings.actions";
import DashboardSettings from "@/components/dashboard/DashboardSettings";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const settings = await getSettings();
  return <DashboardSettings initialSettings={settings} />;
}
