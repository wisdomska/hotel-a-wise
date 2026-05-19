import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hotel-a-wise.vercel.app"),
  title: {
    default: "Hotel A-Wise — Affordable Luxury in Accra",
    template: "%s | Hotel A-Wise",
  },
  description:
    "Experience exquisite accommodations, premium amenities, and warm service at Hotel A-Wise — your gateway to unforgettable memories in Accra.",
  openGraph: {
    title: "Hotel A-Wise",
    description: "Affordable luxury and comfort in Accra. Book your stay at Hotel A-Wise.",
    url: "https://hotel-a-wise.vercel.app",
    siteName: "Hotel A-Wise",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel A-Wise",
    description: "Affordable luxury and comfort in Accra. Book your stay at Hotel A-Wise.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
