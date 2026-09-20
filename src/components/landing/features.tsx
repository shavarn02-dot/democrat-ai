"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  ShieldCheck,
  Cpu,
  ExternalLink,
  Lock,
  Sparkles
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { VisualStudio } from "@/components/content/visual-studio";
import { cn } from "@/lib/utils";

export function Features() {
  const [tokensPerSec, setTokensPerSec] = useState<number>(480);
  const [governanceStatus, setGovernanceStatus] = useState<"pending" | "approved">("approved");

  return (
    <div className="py-24 space-y-32 bg-[#030712] text-slate-100">
      {/* SECTION 1: Bento Grid Architecture (Inspired by CRED & Razorpay) */}
      <section id="bento" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Engineered for Speed. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                Guaranteed by Governance.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Built on Groq LPUs, Supabase Row Level Security, and modern Cloudflare edge deployment for sub-second execution.
            </p>
          </div>
        </Reveal>

        {/* 4-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Bento Card 1: Sub-Second Groq Engine (Razorpay style) */}
          <div className="lg:col-span-7 rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-sky-500/40 transition duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/20 transition duration-500" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Cpu className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-mono text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  Llama 3.3 70B Versatile
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Sub-Second Reasoning Engine
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Groq LPUs process long-form source articles in hundreds of milliseconds. No sluggish API delays or timeouts—instant deconstruction of arguments and evidence.
              </p>
            </div>

            {/* Interactive Speed Dial (Razorpay style) */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">CURRENT INFERENCE SPEED:</span>
                <span className="text-sky-400 font-bold">{tokensPerSec} tokens/sec</span>
              </div>
              <input
                type="range"
                min="200"
                max="650"
                value={tokensPerSec}
                onChange={(e) => setTokensPerSec(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>Standard LLM (40 t/s)</span>
                <span>Democrat.ai Groq Cluster (480+ t/s)</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Multi-Platform Grammar (Notion style) */}
          <div className="lg:col-span-5 rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between group hover:border-indigo-500/40 transition duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Layers className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-mono text-indigo-400 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  5 Channels Synced
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Platform-Native Grammar
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                LinkedIn needs conversational white space. 𝕏 needs concise hooks. Reddit demands humble authenticity. Democrat.ai never copy-pastes generic prose.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                LinkedIn Posts
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                𝕏 Threads
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                Reddit r/SaaS
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                Slack Briefs
              </span>
            </div>
          </div>

          {/* Bento Card 3: Visual Generation Canvas (CRED style) */}
          <div className="lg:col-span-6 rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between group hover:border-emerald-500/40 transition duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-mono text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  Visual Direction
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Integrated Visual Studio
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Social feeds prioritize imagery. Generate companion graphics, quote cards, and branded banner assets with matching editorial aesthetic.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/40 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-slate-300">Preset: 16:9 Editorial Dark</span>
              </div>
              <span className="text-xs font-mono text-emerald-400">Ready</span>
            </div>
          </div>

          {/* Bento Card 4: Human-in-the-Loop Gate (Slack style) */}
          <div id="governance" className="lg:col-span-6 rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between group hover:border-sky-500/40 transition duration-300 scroll-mt-24">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-mono text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  Supabase RLS Enforced
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Human-in-the-Loop Governance
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Zero rogue posts. Every output enters your private Supabase dashboard in Draft status. You review, edit, approve, or reject before anything touches the outside world.
              </p>
            </div>

            {/* Interactive Approval Simulator */}
            <div className="rounded-xl border border-white/10 bg-black/40 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-slate-200">
                  Draft #042: {governanceStatus === "approved" ? "Approved & Ready" : "Pending Human Review"}
                </span>
              </div>
              <button
                onClick={() => setGovernanceStatus(governanceStatus === "approved" ? "pending" : "approved")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition border",
                  governanceStatus === "approved"
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : "bg-amber-500/20 text-amber-400 border-amber-500/40"
                )}
              >
                {governanceStatus === "approved" ? "Approved ✓" : "Review"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Embedded Visual Studio Canvas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              CREATIVE ENGINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Companion Visual Generation
            </h2>
            <p className="text-sm text-slate-400">
              Tailor aesthetic lighting, typography weight, and aspect ratios directly inside your workspace.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <VisualStudio initialTitle="The Bottleneck is Taste" />
        </Reveal>
      </section>

      {/* SECTION 3: Final Call to Action (CRED style metallic radiant box) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0e1628] to-[#040711] p-10 sm:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <span className="inline-block px-3.5 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs font-mono text-sky-400">
                READY TO SHIP REASONED CONTENT?
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Turn your best insights into your best distribution.
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Join creators, engineering leads, and founders who use Democrat.ai to amplify their work without compromising craft.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/auth/login"
                  className="cred-glow-button flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm shadow-xl active:scale-95"
                >
                  <span>Get Started for Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-6 py-4 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-sm font-medium text-slate-200 transition"
                >
                  <span>Open Workspace</span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
