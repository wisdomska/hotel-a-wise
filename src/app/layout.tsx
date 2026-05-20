import type { Metadata } from "next";
import { Newsreader, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hotel-a-wise.vercel.app"),
  title: {
    default: "Hotel A-Wise — Affordable Luxury in Accra",
    template: "%s | Hotel A-Wise",
  },
  description:
    "Experience exquisite accommodations, premium amenities and great service tailored to exceed your expectations — at a refreshingly affordable price.",
  openGraph: {
    title: "Hotel A-Wise",
    description: "Affordable luxury and comfort in Accra.",
    url: "https://hotel-a-wise.vercel.app",
    siteName: "Hotel A-Wise",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel A-Wise",
    description: "Affordable luxury and comfort in Accra.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
