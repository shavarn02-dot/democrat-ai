"use client";

import {
  Globe,
  Wand2,
  Target,
  Pencil,
  CheckCircle,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Any URL Works",
    description:
      "YouTube, Instagram, Twitter, Reddit, blogs - paste any link and we'll extract the content.",
  },
  {
    icon: Wand2,
    title: "AI Extraction",
    description:
      "Our AI understands the core message, key points, and context of any content.",
  },
  {
    icon: Target,
    title: "6 Content Angles",
    description:
      "Professional, beginner-friendly, founder perspective, technical, casual, or thought leadership.",
  },
  {
    icon: Pencil,
    title: "Platform-Optimized",
    description:
      "LinkedIn posts, Twitter threads, Reddit discussions, Facebook updates, blog articles.",
  },
  {
    icon: CheckCircle,
    title: "Review & Approve",
    description:
      "Full control over generated content. Edit, approve, or regenerate until it's perfect.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "From URL to publishable content in under 30 seconds. No more hours of reformatting.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            How Democrat.ai Works
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Three simple steps to transform your content for every platform
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group rounded-xl border bg-card p-6 transition-all hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border bg-muted/30 p-8 sm:p-12">
          <div className="grid items-center gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold">
                Step 1: Paste Your URL
              </h3>
              <p className="mb-4 text-muted-foreground">
                Drop in any link from YouTube, Twitter, Instagram, Reddit, or a
                blog post. Our AI fetches and understands the content.
              </p>
              <h3 className="mb-4 text-2xl font-bold">
                Step 2: Choose Your Angle
              </h3>
              <p className="mb-4 text-muted-foreground">
                Professional? Casual? Thought leadership? Pick the voice that
                matches your brand.
              </p>
              <h3 className="mb-4 text-2xl font-bold">
                Step 3: Pick a Platform
              </h3>
              <p className="text-muted-foreground">
                LinkedIn, Twitter, Reddit, Facebook, or Blog - we optimize
                length, format, and hashtags for each.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-xl border bg-card p-6 shadow-lg">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 rounded bg-muted" />
                  <div className="h-4 w-1/2 rounded bg-muted" />
                  <div className="h-10 w-full rounded bg-primary/20" />
                  <div className="flex gap-2">
                    <div className="h-8 flex-1 rounded bg-primary/10" />
                    <div className="h-8 flex-1 rounded bg-primary/10" />
                    <div className="h-8 flex-1 rounded bg-primary/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
