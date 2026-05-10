import { getPublicSettings } from "@/actions/settings.actions";
import ContactView from "@/components/store/ContactView";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Noire Luxe Collection.",
};

export default async function ContactPage() {
  const settings = await getPublicSettings();

  return <ContactView storeInfo={settings.storeInfo} />;
}
