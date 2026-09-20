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
}
