import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./landing.css";
import { cn } from "@/lib/utils";
import { publicSiteOrigin } from "@/lib/site-origin";

const geistSans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist-sans", weight: "100 900" });
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono", weight: "100 900" });
const origin = publicSiteOrigin();

export const metadata: Metadata = {
  ...(origin ? { metadataBase: origin } : {}),
  title: { default: "Democrat.ai — Social, with more context", template: "%s | Democrat.ai" },
  description: "Plan social content from one place, then turn a public post link into context for your AI workflow.",
  applicationName: "Democrat.ai",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(geistSans.variable, geistMono.variable)}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
