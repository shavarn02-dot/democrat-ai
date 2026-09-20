"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,calc(100%-32px))]" aria-label="Primary navigation">
      <div className="flex h-14 items-center justify-between px-4 rounded-2xl glass-panel shadow-2xl shadow-black/60 border border-white/10">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Democrat.ai home">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 p-[1px]">
            <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1">
            Democrat<span className="text-sky-400">.ai</span>
            <span className="ml-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-medium">3.0</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
          <Link href="#pipeline" className="hover:text-white transition-colors duration-200">Pipeline</Link>
          <Link href="#platforms" className="hover:text-white transition-colors duration-200">Platforms</Link>
          <Link href="#bento" className="hover:text-white transition-colors duration-200">Architecture</Link>
          <Link href="#governance" className="hover:text-white transition-colors duration-200">Human Gate</Link>
        </nav>

        {/* Right Status + CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Groq 70B Online</span>
          </div>

          <Link
            href="/auth/login"
            className="hidden sm:inline-flex text-xs font-medium text-slate-300 hover:text-white transition-colors px-2 py-1"
          >
            Sign in
          </Link>

          <Link
            href="/auth/login"
            className="cred-glow-button flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl"
          >
            <span>Launch App</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
