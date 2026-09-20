"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="nav-shell" aria-label="Primary navigation">
      <div className="flex h-[62px] items-center justify-between px-3 pl-4">
        <Link href="/" className="group flex items-center gap-3" aria-label="Democrat.ai home">
          <span className="brand-mark"><Sparkles className="relative z-10 h-4 w-4" /></span>
          <span className="text-sm font-semibold tracking-[-.03em]">Democrat<span className="text-[#ff5b3f]">.ai</span></span>
        </Link>
        <nav className="flex items-center gap-8" aria-label="Landing page sections">
          <Link href="#system" className="nav-link">System</Link>
          <Link href="#platforms" className="nav-link">Platforms</Link>
          <Link href="#control" className="nav-link">Control</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/auth/login" className="nav-login px-3 text-xs text-white/60 transition hover:text-white">Log in</Link>
          <Link href="/auth/login" className="signal-button">Start creating <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </div>
      </div>
    </header>
  );
}"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-foreground text-background shadow-lg transition-transform duration-300 group-hover:rotate-3">
            <Sparkles className="h-4 w-4" />
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsl(var(--accent)/.8),transparent_38%)]" />
          </span>
          <span className="font-semibold tracking-[-0.03em]">Democrat<span className="text-accent">.ai</span></span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Product</Link>
          <Link href="#workflow" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Workflow</Link>
          <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Capabilities</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/auth/login" className="hidden sm:block">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link href="/auth/login">
            <Button size="sm" className="group gap-1.5 rounded-full px-4">
              Start creating
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
