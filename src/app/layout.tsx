import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Democrat.ai — AI Content Distribution System",
  description:
    "Turn one source into platform-native content for LinkedIn, X, Reddit, Facebook, and editorial channels—with human review built in.",
  keywords: [
    "content repurposing",
    "AI content",
    "social media",
    "LinkedIn",
    "Twitter",
    "content creation",
  ],
  openGraph: {
    title: "Democrat.ai — AI Content Distribution System",
    description:
      "One source. Platform-native content. Human-approved distribution.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(geistSans.variable, geistMono.variable)}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Democrat.ai - AI-Powered Content Repurposing",
  description:
    "Transform one piece of content into platform-ready posts for LinkedIn, Twitter, Reddit, Facebook, and blogs. Free AI-powered content repurposing for creators and founders.",
  keywords: [
    "content repurposing",
    "AI content",
    "social media",
    "LinkedIn",
    "Twitter",
    "content creation",
  ],
  openGraph: {
    title: "Democrat.ai - AI-Powered Content Repurposing",
    description:
      "Paste a URL. Choose your angle. Get platform-ready content in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(geistSans.variable, geistMono.variable)}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
