import { getPublicSettings } from "@/actions/settings.actions";
import CheckoutView from "@/components/store/CheckoutView";

export const metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const settings = await getPublicSettings();

  return (
    <CheckoutView
      shippingRates={settings.shippingRates.filter((r: any) => r.enabled)}
      pickupEnabled={settings.pickup.enabled}
      pickupInstructions={settings.pickup.instructions}
      freeShipping={settings.freeShipping}
    />
  );
}
