"use client";

import Link from "next/link";
import { ArrowRight, Check, Link2, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const platforms = ["LinkedIn", "X", "Reddit", "Instagram", "Blog"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-foreground/10">
      <div className="absolute inset-0 grid-sheen opacity-70" />
      <div className="absolute left-[8%] top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute right-[8%] top-40 h-80 w-80 rounded-full bg-foreground/5 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
        <div className="reveal-up max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/75 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_14px_hsl(var(--accent)/.9)]" />
            AI operating system for content distribution
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-0.055em] sm:text-6xl lg:text-[5.6rem]">
            One source.
            <br />
            <span className="text-gradient">Every channel.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Democrat.ai turns a single URL into platform-native content, visuals, SEO and publishing-ready assets — without rebuilding the same idea five times.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/auth/login">
              <Button size="lg" className="group h-12 gap-2 rounded-full px-6 shadow-xl shadow-foreground/10">
                Start creating free
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#workflow">
              <Button size="lg" variant="outline" className="h-12 rounded-full border-foreground/15 bg-background/60 px-6">
                Watch the workflow
              </Button>
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {["No card required", "Platform-native output", "Edit before publishing"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-accent" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-[430px] reveal-up [animation-delay:120ms]">
          <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15 animate-pulse-line" />
          <div className="absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/10" />

          <div className="absolute left-[4%] top-12 w-52 rounded-2xl border border-foreground/10 bg-card/95 p-4 shadow-2xl shadow-foreground/10 backdrop-blur-xl animate-float-orbit">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-foreground text-background"><Link2 className="h-3.5 w-3.5" /></span>
              SOURCE
            </div>
            <div className="truncate rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">youtube.com/watch?v=...</div>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-accent"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> Content understood</div>
          </div>

          <div className="absolute right-[2%] top-20 w-56 rounded-2xl border border-foreground/10 bg-card/95 p-4 shadow-2xl shadow-foreground/10 backdrop-blur-xl animate-float-orbit [animation-delay:1.2s]">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-accent-foreground"><Wand2 className="h-3.5 w-3.5" /></span>
              AI GENERATION
            </div>
            <div className="space-y-2">
              <div className="h-2 w-4/5 rounded-full bg-muted" />
              <div className="h-2 w-3/5 rounded-full bg-muted" />
              <div className="h-2 w-full rounded-full bg-gradient-to-r from-accent/20 via-accent/60 to-accent/20 animate-shimmer" />
            </div>
            <div className="mt-3 text-[10px] text-muted-foreground">Writing 5 platform-native variations…</div>
          </div>

          <div className="absolute bottom-8 left-1/2 w-[min(470px,88%)] -translate-x-1/2 rounded-[28px] border border-foreground/10 bg-card/95 p-4 shadow-[0_28px_80px_-28px_hsl(var(--foreground)/.45)] backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between border-b border-foreground/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold"><Sparkles className="h-3.5 w-3.5 text-accent" /> Distribution map</div>
              <span className="rounded-full bg-accent/10 px-2 py-1 text-[10px] font-medium text-accent">LIVE</span>
            </div>
            <div className="space-y-2">
              {platforms.map((platform, i) => (
                <div key={platform} className="flex items-center gap-3 rounded-xl border border-foreground/8 bg-background/70 px-3 py-2.5">
                  <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_hsl(var(--accent)/.8)]" />
                  <span className="text-xs font-medium">{platform}</span>
                  <div className="ml-auto h-1 w-24 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${72 + i * 5}%` }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">ready</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
