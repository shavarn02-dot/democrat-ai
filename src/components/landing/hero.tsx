"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Layers,
  Copy,
  Check,
  Terminal,
  MessageSquare
} from "lucide-react";
import { WorkflowVisual } from "@/components/landing/workflow-visual";
import { cn } from "@/lib/utils";

const SAMPLE_SOURCES = [
  {
    id: "stripe",
    title: "Stripe Annual Letter: The GDP of the Internet",
    url: "https://stripe.com/annual-updates/2025",
    author: "Patrick & John Collison",
    hook: "Global commerce infrastructure is shifting from payment acceptance to automated financial intelligence.",
  },
  {
    id: "pg",
    title: "Paul Graham: How to Do Great Work",
    url: "https://paulgraham.com/greatwork.html",
    author: "Paul Graham",
    hook: "If you want to do great work, look for ideas that seem ambitious, messy, and slightly crazy to incumbents.",
  },
  {
    id: "nvidia",
    title: "NVIDIA Compute Architecture & Blackwell Acceleration",
    url: "https://nvidia.com/research/blackwell-arch",
    author: "Architecture Research Group",
    hook: "Token throughput per watt has improved 30x, transforming inference economics forever.",
  },
];

export function Hero() {
  const [selectedSource, setSelectedSource] = useState(SAMPLE_SOURCES[0]);
  const [activeAngle, setActiveAngle] = useState<"founder" | "tech" | "contrarian">("founder");
  const [activePlatform, setActivePlatform] = useState<"linkedin" | "twitter" | "reddit" | "slack">("linkedin");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard?.writeText(
      `Democrat.ai breakdown of: ${selectedSource.title}\n\n${selectedSource.hook}`
    );
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-[#030712] text-slate-100">
      {/* Background Ambient Glow & Radial Vignette */}
      <div className="absolute inset-0 bg-grid-tech -z-20 opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-sky-500/15 via-indigo-500/10 to-transparent blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Eyebrow + Headline (CRED / Razorpay aesthetic) */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs font-mono text-sky-400 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>DEMOCRAT.AI 3.0 · REASONING CONTENT PIPELINE</span>
            <span className="text-sky-300 font-bold px-1.5 py-0.2 rounded bg-sky-400/20 text-[10px]">NEW</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
            Turn Any Raw Source Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
              High-Signal Distribution.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Stop jumping between disconnected tabs and generic chatbots. Democrat.ai extracts authoritative facts, applies tailored editorial frameworks, and synthesizes channel-native content for LinkedIn, 𝕏, Reddit, and Slack.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/auth/login"
              className="cred-glow-button flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold shadow-xl active:scale-95"
            >
              <span>Start Free with GitHub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#interactive-demo"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-sm font-medium text-slate-200 transition backdrop-blur-md shadow-sm active:scale-95"
            >
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>Interactive Playground</span>
            </a>
          </div>

          {/* Trust Telemetry Pill Row (Razorpay style) */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> &lt;400ms Groq Inference
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Supabase RLS Governance
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Layers className="w-3.5 h-3.5 text-sky-400" /> Multi-Platform Grammar
            </span>
          </div>
        </div>

        {/* INTERACTIVE PLAYGROUND (Notion + Slack + Razorpay experience) */}
        <div id="interactive-demo" className="relative mb-20 scroll-mt-28">
          <div className="rounded-2xl border border-white/10 glass-panel shadow-2xl p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-[#090d19]/90 to-[#040711]">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-sky-400 uppercase font-semibold block">
                  LIVE INTERACTIVE STUDIO
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Test the pipeline without signing in
                </h3>
              </div>

              {/* Angle Switcher Pills */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10">
                {[
                  { id: "founder", label: "Founder Lens" },
                  { id: "tech", label: "Technical Breakdown" },
                  { id: "contrarian", label: "Contrarian Take" },
                ].map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setActiveAngle(a.id as "founder" | "tech" | "contrarian")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                      activeAngle === a.id
                        ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar & Preset Selector */}
            <div className="mt-6 space-y-4">
              <div className="flex flex-col sm:row gap-3">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300">
                  <span className="text-slate-500">INPUT:</span>
                  <span className="truncate text-white font-medium">{selectedSource.url}</span>
                </div>
                <div className="flex gap-2">
                  {SAMPLE_SOURCES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSource(s)}
                      className={cn(
                        "px-3 py-2 rounded-xl text-xs font-medium border transition",
                        selectedSource.id === s.id
                          ? "bg-white/10 border-sky-400/50 text-white"
                          : "bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {s.id === "stripe" ? "Stripe" : s.id === "pg" ? "Paul Graham" : "NVIDIA"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Platform Output Simulation */}
              <div className="rounded-xl border border-white/10 bg-[#070b16] p-5">
                {/* Platform Tabs (Slack + Notion style) */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2 overflow-x-auto">
                    {[
                      { id: "linkedin", label: "LinkedIn Post", badge: "Professional" },
                      { id: "twitter", label: "𝕏 Thread Hook", badge: "High Velocity" },
                      { id: "reddit", label: "Reddit r/SaaS", badge: "Community" },
                      { id: "slack", label: "Slack Executive Brief", badge: "Internal" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setActivePlatform(p.id as "linkedin" | "twitter" | "reddit" | "slack")}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition",
                          activePlatform === p.id
                            ? "bg-white/10 text-white border border-white/20"
                            : "text-slate-400 hover:text-slate-200"
                        )}
                      >
                        <span>{p.label}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 text-xs transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                {/* Rendered Preview Card */}
                <div className="space-y-4">
                  {activePlatform === "linkedin" && (
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                          D
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            Democrat.ai <span className="text-[10px] text-sky-400 font-mono">· Automated Insight</span>
                          </div>
                          <div className="text-[10px] text-slate-400">Synthesized from {selectedSource.title}</div>
                        </div>
                      </div>

                      <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
                        <p className="font-semibold text-white">
                          {activeAngle === "founder" && "The real moat isn't building faster; it's communicating with surgical clarity."}
                          {activeAngle === "tech" && "Architecture update: how latency reduction fundamentally alters unit economics."}
                          {activeAngle === "contrarian" && "Why 95% of teams deploying generative AI will produce zero measurable enterprise value."}
                        </p>
                        <p className="text-slate-400">{selectedSource.hook}</p>
                        <p className="text-sky-400 text-xs font-mono">
                          #ProductGrowth #Engineering #SaaSArchitecture #FounderLens
                        </p>
                      </div>
                    </div>
                  )}

                  {activePlatform === "twitter" && (
                    <div className="p-4 rounded-xl bg-black border border-white/10 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs">
                          𝕏
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white">Democrat.ai</span>
                          <span className="text-[10px] text-slate-500 ml-1">@democrat_ai · 1m</span>
                        </div>
                      </div>

                      <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2">
                        <p className="font-medium">
                          Most teams try to publish everywhere by copy-pasting the same link. That kills reach.<br /><br />
                          Here is the 3-step reasoning framework extracted from <span className="text-sky-400">{selectedSource.title}</span> 🧵👇
                        </p>
                      </div>
                    </div>
                  )}

                  {activePlatform === "reddit" && (
                    <div className="p-4 rounded-xl bg-[#0e111a] border border-orange-500/20 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="font-bold text-orange-400">r/SaaS</span>
                        <span>·</span>
                        <span>Posted by u/content_architect</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        [Breakdown] {selectedSource.title}: What builders actually need to know
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {selectedSource.hook} After digesting the core findings, here are the 3 non-obvious takeaways for technical founders...
                      </p>
                    </div>
                  )}

                  {activePlatform === "slack" && (
                    <div className="p-4 rounded-xl bg-[#091222] border border-sky-500/20 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] text-sky-400 font-mono">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>#leadership-intel · Democrat Bot</span>
                      </div>
                      <div className="text-xs text-slate-200 space-y-1">
                        <p className="font-bold text-white">⚡ Executive Digest: {selectedSource.title}</p>
                        <p className="text-slate-400">{selectedSource.hook}</p>
                        <p className="text-[11px] text-emerald-400 font-mono">Status: Ready for review and social dispatch</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Living Pipeline Visualizer (CRED / Razorpay style) */}
        <div id="pipeline" className="scroll-mt-24">
          <WorkflowVisual />
        </div>
      </div>
    </section>
  );
}
