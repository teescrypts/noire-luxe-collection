"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface Props {
  clientSecret: string;
  children: React.ReactNode;
}

export default function StripeProvider({ clientSecret, children }: Props) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#C9A227",
            colorBackground: "#FFFFFF",
            colorText: "#0A0A0A",
            colorDanger: "#B4547A",
            fontFamily: '"Inter", "Helvetica Neue", sans-serif',
            spacingUnit: "4px",
            borderRadius: "4px",
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}
