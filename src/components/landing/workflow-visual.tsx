"use client";

import { useEffect, useState } from "react";
import { Check, Play, Pause, Sparkles, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { id: 0, label: "01 / Ingestion", title: "Source Capture", detail: "Extracting thesis & structured arguments" },
  { id: 1, label: "02 / Reasoning", title: "Groq LLM Engine", detail: "Llama 3.3 70B semantic decomposition" },
  { id: 2, label: "03 / Reframe", title: "Editorial Matrix", detail: "Applying Founder & Technical framing" },
  { id: 3, label: "04 / Visual Studio", title: "Asset Generation", detail: "Aspect ratios & editorial typography" },
  { id: 4, label: "05 / Dispatch", title: "Multi-Channel Drafts", detail: "LinkedIn, X thread & Reddit formats" },
];

export function WorkflowVisual() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<"linkedin" | "twitter" | "reddit">("linkedin");

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="product-theater rounded-2xl border border-black/15 bg-[#11110f] text-[#f4f1ea] shadow-2xl overflow-hidden relative">
      {/* Top telemetry control bar */}
      <div className="theater-topbar flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#161614] text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5b3f] animate-pulse" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/60">
            DEMOCRAT / CONTENT OS TELEMETRY
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-2 text-white/70">
            <Radio className="h-3.5 w-3.5 text-[#ff5b3f]" />
            <span>GROQ 70B · 480 TOKENS/S</span>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/10 bg-white/5 hover:bg-white/10 text-white/90 transition text-[10px]"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            <span>{isPlaying ? "PAUSE PIPELINE" : "RUN PIPELINE"}</span>
          </button>
        </div>
      </div>

      {/* Interactive Step Navigator */}
      <div className="grid grid-cols-5 border-b border-white/10 bg-[#141412] text-left">
        {stages.map((stg) => (
          <button
            key={stg.id}
            onClick={() => {
              setActiveStage(stg.id);
              setIsPlaying(false);
            }}
            className={cn(
              "px-3 py-2.5 border-r border-white/10 last:border-r-0 transition-all text-left relative",
              activeStage === stg.id ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
            )}
          >
            <span className="block font-mono text-[9px] uppercase tracking-wider">{stg.label}</span>
            <span className="block font-medium text-xs truncate mt-0.5">{stg.title}</span>
            {activeStage === stg.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5b3f]" />
            )}
          </button>
        ))}
      </div>

      {/* Visual Canvas Stage */}
      <div className="p-6 md:p-8 relative min-h-[360px] flex items-center justify-center">
        {/* Subtle background grid pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          {/* Left Node: Source Signal */}
          <div
            className={cn(
              "md:col-span-4 rounded-xl border p-5 transition-all duration-500",
              activeStage === 0
                ? "border-[#ff5b3f] bg-[#1a1917] shadow-lg ring-1 ring-[#ff5b3f]"
                : "border-white/10 bg-[#161614]/80 opacity-70"
            )}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-3">
              <span>01 / INGESTION</span>
              <span className="text-[#ff5b3f]">PARSED</span>
            </div>
            <div className="space-y-2">
              <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono bg-white/10 text-white/80">
                https://paulgraham.com/taste.html
              </span>
              <h4 className="text-sm font-serif font-medium text-white leading-snug">
                Why cheaper iteration makes editorial taste more valuable
              </h4>
              <p className="text-[11px] text-white/60 line-clamp-2">
                &ldquo;When generative models can produce infinite text, the bottleneck shifts entirely to human editorial judgment.&rdquo;
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>2,450 WORDS</span>
              <span>CONFIDENCE 99.8%</span>
            </div>
          </div>

          {/* Center: Live Engine Core */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center px-2">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border border-dashed border-[#ff5b3f]/60 flex items-center justify-center animate-[spin_12s_linear_infinite]">
                <div className="w-14 h-14 rounded-full border border-white/20 bg-[#1f1e1b] flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-[#ff5b3f] animate-pulse" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 px-1.5 py-0.5 rounded bg-[#ff5b3f] text-[#11110f] font-mono text-[9px] font-bold">
                GROQ
              </div>
            </div>

            <div className="mt-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#ff5b3f] block">
                {stages[activeStage].title}
              </span>
              <p className="text-xs text-white/80 font-medium mt-0.5">{stages[activeStage].detail}</p>
            </div>

            <div className="w-full mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ff5b3f] transition-all duration-500"
                style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Right Node: Platform Native Output */}
          <div
            className={cn(
              "md:col-span-4 rounded-xl border p-5 transition-all duration-500",
              activeStage >= 3
                ? "border-[#ff5b3f] bg-[#1a1917] shadow-xl ring-1 ring-[#ff5b3f]"
                : "border-white/10 bg-[#161614]/80 opacity-70"
            )}
          >
            {/* Platform Selector Buttons */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex gap-1.5">
                {(["linkedin", "twitter", "reddit"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPlatform(p)}
                    className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-mono uppercase transition",
                      selectedPlatform === p
                        ? "bg-[#ff5b3f] text-[#11110f] font-bold"
                        : "bg-white/10 text-white/60 hover:text-white"
                    )}
                  >
                    {p === "linkedin" ? "LinkedIn" : p === "twitter" ? "𝕏" : "Reddit"}
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <Check className="h-3 w-3" /> READY
              </span>
            </div>

            {/* Platform Previews */}
            {selectedPlatform === "linkedin" && (
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#ff5b3f] text-[#11110f] font-bold text-[10px] flex items-center justify-center">
                    D
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Democrat.ai</span>
                    <span className="text-[9px] text-white/50 block">Founder POV · 2m</span>
                  </div>
                </div>
                <h5 className="text-xs font-serif font-medium text-white leading-snug">
                  When iteration gets cheaper, taste becomes the bottleneck.
                </h5>
                <p className="text-[11px] text-white/70 line-clamp-3">
                  AI doesn&apos;t replace the editorial eye—it amplifies it. The advantage isn&apos;t producing 10x more drafts, but iterating 10x faster before you publish.
                </p>
                <div className="flex gap-1.5 text-[9px] text-[#ff5b3f] font-mono">
                  <span>#Founders</span>
                  <span>#AIStrategy</span>
                  <span>#Publishing</span>
                </div>
              </div>
            )}

            {selectedPlatform === "twitter" && (
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">Democrat</span>
                  <span className="text-[10px] text-white/50 font-mono">@democrat_ai</span>
                </div>
                <p className="text-[11px] text-white/90 leading-relaxed">
                  Cheap iteration creates an explosion of noise. When anyone can generate a 1,000-word post in 3 seconds, original perspective and tight curation are the only moats left.
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span>142 REPOSTS</span>
                  <span>890 LIKES</span>
                </div>
              </div>
            )}

            {selectedPlatform === "reddit" && (
              <div className="space-y-2 text-left">
                <span className="text-[9px] font-mono text-orange-400">r/startups · Posted by u/editorial_eng</span>
                <h5 className="text-xs font-medium text-white">
                  Why our team stopped generating raw AI copy and built an editorial gate
                </h5>
                <p className="text-[10px] text-white/70 line-clamp-2">
                  Here are the 4 failure modes we observed when automating distribution directly without thesis preservation...
                </p>
                <div className="text-[10px] font-mono text-white/40">▲ 245 Upvotes · 68 Comments</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
