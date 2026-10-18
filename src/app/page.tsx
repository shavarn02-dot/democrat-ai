import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/layout/footer";
import { publicSiteOrigin } from "@/lib/site-origin";

const origin = publicSiteOrigin();

export const metadata: Metadata = {
  title: "Democrat.ai — Social, with more context",
  description: "Plan social content from one place, then turn a public post link into context for your AI workflow. India-first social media management, with Social Link Intelligence on the roadmap.",
  keywords: [
    "social media management India",
    "social media scheduling",
    "social media automation",
    "AI social media tools",
    "Social Link Intelligence",
    "MCP for social media",
  ],
  ...(origin ? { alternates: { canonical: new URL("/", origin).href } } : {}),
  openGraph: {
    ...(origin ? { url: new URL("/", origin).href } : {}),
    type: "website",
    siteName: "Democrat.ai",
    locale: "en_IN",
    title: "Democrat.ai — Social, with more context",
    description: "Plan social content from one place. Give AI agents more context about the posts and conversations behind a public link.",
    ...(origin ? { images: [{ url: new URL("/social-preview.png", origin).href, width: 1440, height: 980, alt: "Democrat.ai homepage concept showing its publishing desk" }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Democrat.ai — Social, with more context",
    description: "An India-first social workspace concept, with Social Link Intelligence on the roadmap.",
    ...(origin ? { images: [new URL("/social-preview.png", origin).href] } : {}),
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Democrat.ai",
    description: "An India-first social media workspace concept for planning posts and giving AI agents context about public social links. Social publishing and MCP integrations are planned, not live.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Can I connect my social accounts now?", acceptedAnswer: { "@type": "Answer", text: "Not in this preview. Managed OAuth connections for Instagram, YouTube, Facebook, X and LinkedIn are planned. Signing in to Democrat.ai is separate from connecting a social publishing account." } },
      { "@type": "Question", name: "Does this demo fetch a post when I paste a link?", acceptedAnswer: { "@type": "Answer", text: "No. The homepage interaction uses fictional sample data in your browser and does not send your URL to a platform or AI service. A future MCP flow will return only content the relevant platform makes available and permits the service to access." } },
      { "@type": "Question", name: "What is the expected pricing?", acceptedAnswer: { "@type": "Answer", text: "The business model is planned around a free tier and a 30-day trial with limited credits. Early paid-plan expectations are about ₹149–₹299 per month, with metered credits on every plan and no unlimited tier. These are estimates, not an active offer." } },
      { "@type": "Question", name: "Will an AI agent publish on my behalf?", acceptedAnswer: { "@type": "Answer", text: "MCP and REST connections are on the product roadmap. The homepage shows the intended interaction; no agent connection or social publishing action is live here." } },
    ],
  },
];

export default function Home() {
  return (
    <div className="hp-home">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
      {structuredData.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      ))}
    </div>
  );
}
