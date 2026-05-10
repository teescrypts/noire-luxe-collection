import { getPublicSettings } from "@/actions/settings.actions";
import AboutView from "@/components/dashboard/AboutView";

export const metadata = { title: "About Us" };

export default async function AboutPage() {
  const settings = await getPublicSettings();
  return <AboutView storeInfo={settings.storeInfo} />;
}
