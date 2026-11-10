import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { RevealProvider } from "@/components/Reveal";
import { site } from "@/lib/site";

// The logo's own faces: Cormorant Garamond for the name and every
// title, Jost for the small tracked capitals and the reading text.
const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  fallback: ["Georgia", "serif"],
  src: [
    { path: "./fonts/Cormorant-latin.woff2", style: "normal", weight: "300 700" },
    { path: "./fonts/Cormorant-italic-latin.woff2", style: "italic", weight: "300 700" },
  ],
});

const jost = localFont({
  variable: "--font-jost",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  src: [{ path: "./fonts/Jost-latin.woff2", style: "normal", weight: "300 600" }],
});

export const metadata: Metadata = {
  title: { default: "Jurassic Seafarms | Oysters of the Jurassic Coast", template: "%s | Jurassic Seafarms" },
  description: `${site.tagline}. Oysters, mussels and Sugar Kelp grown in Portland Harbour.`,
  // Mock-up: kept out of search.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <SmoothScroll />
        <RevealProvider />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-night focus:px-5 focus:py-3 focus:text-ivory">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
