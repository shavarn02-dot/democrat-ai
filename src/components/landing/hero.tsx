"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_50%,rgba(120,119,198,0.15),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32 lg:py-40">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 text-sm">
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            <span>AI-Powered Content Repurposing</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Turn One Piece of Content
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Into Every Platform
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Paste a URL. Choose your angle. Get platform-ready content in
            seconds. No design skills needed. No budget required.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2 text-base">
                Start Creating Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="text-base">
                See How It Works
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t pt-10">
            <div>
              <div className="text-3xl font-bold">5+</div>
              <div className="text-sm text-muted-foreground">
                Platforms Supported
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">6</div>
              <div className="text-sm text-muted-foreground">
                Content Angles
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">₹0</div>
              <div className="text-sm text-muted-foreground">Starting Cost</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
