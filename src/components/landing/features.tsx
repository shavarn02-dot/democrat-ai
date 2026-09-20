"use client";

import { ArrowDownRight, Bot, Layers3, PenLine, ScanText, Send, Wand2 } from "lucide-react";

const capabilities = [
  ["01", "Understand", "Extract the source, structure the ideas and identify the signal worth distributing.", ScanText],
  ["02", "Generate", "Turn the same idea into distinct platform-native drafts and angles.", PenLine],
  ["03", "Optimize", "Shape tone, SEO, hashtags and formatting around the destination.", Wand2],
  ["04", "Create", "Pair the copy with a visual direction instead of treating images as an afterthought.", Layers3],
  ["05", "Distribute", "Review, approve and move publish-ready content into your workflow.", Send],
  ["06", "Learn", "Keep the entire content operation visible so the next iteration gets faster.", Bot],
] as const;

export function Features() {
  return (
    <>
      <section id="workflow" className="border-b border-foreground/10 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <span className="text-xs font-semibold uppercase tracking-[.22em] text-accent">The operating loop</span>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Content moves.<br />Your team shouldn&apos;t.</h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">One source becomes a coordinated stream of channel-specific assets. The interface keeps every stage visible without turning the workflow into a boring stepper.</p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium">Explore the system <ArrowDownRight className="h-4 w-4 text-accent" /></div>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-accent via-foreground/10 to-transparent" />
              <div className="space-y-4">
                {capabilities.map(([number, title, description, Icon], index) => (
                  <article key={number} className="group relative grid gap-5 rounded-3xl border border-foreground/10 bg-card/70 p-6 pl-14 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                    <span className="absolute left-4 top-6 grid h-5 w-5 place-items-center rounded-full border border-accent/40 bg-background text-[9px] font-bold text-accent shadow-[0_0_0_5px_hsl(var(--background))]">{number}</span>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-muted transition-transform duration-500 group-hover:rotate-6 group-hover:bg-accent/10">
                      <Icon className="h-5 w-5 transition-colors group-hover:text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
                    </div>
                    <div className="hidden text-xs text-muted-foreground sm:block">stage {index + 1}</div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[.22em] text-accent">Built for distribution</span>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Less formatting.<br />More publishing.</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {["Platform-native previews", "Visual-first generation", "Human approval loop"].map((title, i) => (
              <div key={title} className="group min-h-64 rounded-[28px] border border-foreground/10 bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">0{i + 1}</span>
                  <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent)/.8)]" />
                </div>
                <h3 className="mt-16 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{[
                  "Every destination gets its own visual grammar instead of one generic card.",
                  "Treat the generated visual as part of the message, not a separate deliverable.",
                  "Edit, approve or reject with the same control surface as generation."
                ][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
