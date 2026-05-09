import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeRegistry from "@/components/ThemeRegistry";

export const metadata: Metadata = {
  title: {
    template: "%s | Noire Luxe Collection",
    default: "Noire Luxe Collection — Premium Human Hair Wigs",
  },
  description:
    "Discover luxury human hair wigs, bundles, frontal wigs and closure wigs. 100% premium human hair. Ships across the US.",
  keywords: [
    "human hair wigs",
    "lace front wigs",
    "hair bundles",
    "closure wigs",
    "frontal wigs",
    "luxury wigs",
    "Noire Luxe Collection",
  ],
  authors: [{ name: "Noire Luxe Collection" }],
  creator: "Noire Luxe Collection",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  icons: {
    icon: [{ url: "/images/noire-logo.png", type: "image/png" }],
    apple: [{ url: "/images/noire-logo.png", type: "image/png" }],
    shortcut: "/images/noire-logo.png",
  },
  openGraph: {
    type: "website",
    siteName: "Noire Luxe Collection",
    title: "Noire Luxe Collection — Premium Human Hair Wigs",
    description:
      "Luxury human hair wigs, bundles and frontals. 100% premium quality.",
    locale: "en_US",
    images: [
      {
        url: "/images/noire-logo.png",
        width: 1200,
        height: 630,
        alt: "Noire Luxe Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noire Luxe Collection",
    description: "Luxury human hair wigs, bundles and frontals.",
    images: ["/images/noire-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
