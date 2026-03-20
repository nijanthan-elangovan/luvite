import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import HelpCenter from "@/components/HelpCenter";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luvite.fun";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Luvite - Luxury E-Invitations",
    template: "%s | Luvite",
  },
  description:
    "Create stunning, interactive digital invitations for weddings and events with our 3D parallax editor.",
  applicationName: "Luvite",
  keywords: [
    "wedding invitation",
    "digital invitation",
    "e-invites",
    "RSVP",
    "event invitation",
    "Luvite",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Luvite",
    title: "Luvite - Luxury E-Invitations",
    description:
      "Create stunning, interactive digital invitations for weddings and events.",
    images: [
      {
        url: "/next.svg",
        width: 1200,
        height: 630,
        alt: "Luvite Invitations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luvite - Luxury E-Invitations",
    description:
      "Create stunning, interactive digital invitations for weddings and events.",
    images: ["/next.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#C8A45D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {children}
        <HelpCenter />
      </body>
    </html>
  );
}
