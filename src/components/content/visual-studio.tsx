"use client";

import { useState } from "react";
import { RefreshCw, Check, Copy, Eye, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

interface VisualStudioProps {
  initialTitle?: string;
  initialSummary?: string;
  platform?: string;
}

const aspectRatios = [
  { id: "16:9", label: "Landscape (16:9)", desc: "X, LinkedIn Banner", width: "w-full aspect-video" },
  { id: "1:1", label: "Square (1:1)", desc: "Instagram, Feed Post", width: "w-72 aspect-square" },
  { id: "4:5", label: "Portrait (4:5)", desc: "Instagram, LinkedIn Mobile", width: "w-64 aspect-[4/5]" },
  { id: "9:16", label: "Vertical (9:16)", desc: "Stories, Shorts, Reels", width: "w-52 aspect-[9/16]" },
];

const styles = [
  { id: "editorial", label: "Editorial Minimal", desc: "Warm typography, high contrast, clean white-space" },
  { id: "architectural", label: "Architectural 3D", desc: "Monochrome structural forms with soft ambient occlusions" },
  { id: "vector", label: "Vector Signal", desc: "Geometric network diagrams, crisp laser lines" },
  { id: "grain", label: "Photographic Grain", desc: "Film emulation, muted tones, deep editorial mood" },
];

export function VisualStudio({ initialTitle = "The Bottleneck is Taste" }: VisualStudioProps) {
  const [aspect, setAspect] = useState("16:9");
  const [style, setStyle] = useState("editorial");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [prompt, setPrompt] = useState(
    `An editorial typography composition with the headline "${initialTitle}". Minimal Swiss layout, matte ink on warm textured bone paper (#f4f1ea), signal coral (#ff5733) geometric badge.`
  );

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentRatio = aspectRatios.find((r) => r.id === aspect) || aspectRatios[0];

  return (
    <div className="visual-studio-container rounded-2xl border border-black/10 bg-[#fbfaf6] p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#ff5b3f] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8b867d]">Visual Studio · Generative Engine</span>
          </div>
          <h3 className="text-xl font-serif text-[#11110f] mt-1">Platform Visual Direction & Asset Studio</h3>
          <p className="text-xs text-[#5a574f] mt-0.5">Generate, reframe, and art-direct companion visual cards for multi-channel distribution.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#11110f] text-white text-xs font-medium hover:bg-black transition active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isGenerating && "animate-spin")} />
            {isGenerating ? "Synthesizing..." : "Regenerate Art"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* Aspect Ratio */}
          <div>
            <label className="text-xs font-medium text-[#11110f] uppercase tracking-wider block mb-2 flex items-center justify-between">
              <span>Aspect Ratio</span>
              <span className="text-[10px] font-mono text-[#8b867d]">{currentRatio.label}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {aspectRatios.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setAspect(r.id)}
                  className={cn(
                    "flex flex-col items-start p-2.5 rounded-lg border text-left transition-all text-xs",
                    aspect === r.id
                      ? "border-[#ff5b3f] bg-[#ff5b3f]/5 text-[#11110f] shadow-sm ring-1 ring-[#ff5b3f]"
                      : "border-black/10 bg-[#f5f2ea]/70 hover:border-black/20 text-[#5a574f]"
                  )}
                >
                  <span className="font-semibold text-[11px]">{r.id}</span>
                  <span className="text-[10px] text-[#8b867d] truncate w-full">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Style Presets */}
          <div>
            <label className="text-xs font-medium text-[#11110f] uppercase tracking-wider block mb-2">
              Aesthetic Direction
            </label>
            <div className="space-y-1.5">
              {styles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setStyle(s.id);
                    setPrompt(
                      `An ${s.label.toLowerCase()} composition featuring "${initialTitle}". Style: ${s.desc}. Palette: Ink black (#11110f), warm bone (#f4f1ea), and signal coral (#ff5733).`
                    );
                  }}
                  className={cn(
                    "w-full flex items-center justify-between p-2.5 rounded-lg border text-left transition text-xs",
                    style === s.id
                      ? "border-[#ff5b3f] bg-white text-[#11110f] shadow-sm"
                      : "border-black/5 bg-[#f5f2ea]/50 hover:bg-[#f5f2ea] text-[#5a574f]"
                  )}
                >
                  <div>
                    <span className="font-medium text-xs block">{s.label}</span>
                    <span className="text-[10px] text-[#8b867d] block">{s.desc}</span>
                  </div>
                  {style === s.id && <span className="h-2 w-2 rounded-full bg-[#ff5b3f]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Inspector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-[#11110f] uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="h-3 w-3 text-[#ff5b3f]" />
                Prompt Blueprint
              </label>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="text-[11px] text-[#8b867d] hover:text-[#11110f] flex items-center gap-1 transition"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full text-xs font-mono p-3 rounded-lg border border-black/10 bg-[#f5f2ea] text-[#11110f] outline-none focus:border-[#ff5b3f] transition resize-none"
            />
          </div>
        </div>

        {/* Live Canvas Stage Column */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-xl border border-black/10 bg-[#11110f] text-[#f4f1ea] relative overflow-hidden min-h-[380px]">
          {/* Subtle blueprint grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(#f4f1ea 1px, transparent 1px), linear-gradient(90deg, #f4f1ea 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Rendered Asset Stage */}
          <div
            className={cn(
              "relative rounded-xl border border-white/20 bg-gradient-to-br from-[#1a1917] to-[#252420] p-6 shadow-2xl flex flex-col justify-between transition-all duration-500 overflow-hidden",
              currentRatio.width,
              isGenerating && "opacity-40 scale-95"
            )}
          >
            {/* Corner telemetry */}
            <div className="flex items-center justify-between text-[9px] font-mono text-white/50 border-b border-white/10 pb-2 mb-4">
              <span>DEMOCRAT / VISUAL-CORE</span>
              <span>{aspect} · {style.toUpperCase()}</span>
            </div>

            {/* Visual Subject Graphic */}
            <div className="my-auto text-center space-y-3">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#ff5b3f]/20 border border-[#ff5b3f]/40 text-[#ff5b3f] text-[10px] font-mono tracking-wider">
                EDITORIAL SIGNAL
              </div>
              <h4 className="text-xl md:text-2xl font-serif text-white leading-tight font-medium px-4">
                &ldquo;{initialTitle}&rdquo;
              </h4>
              <p className="text-[11px] text-white/70 max-w-sm mx-auto font-sans line-clamp-2">
                Distribute core ideas across channels without degrading original thesis clarity.
              </p>
            </div>

            {/* Bottom Brand Ribbon */}
            <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-4 border-t border-white/10 mt-4">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5b3f]" />
                democrat.ai
              </span>
              <span>100% SOURCE GROUNDED</span>
            </div>

            {/* Shimmer overlay when regenerating */}
            {isGenerating && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            )}
          </div>

          <div className="mt-4 flex items-center gap-3 text-xs text-white/60">
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5 text-[#ff5b3f]" /> Real-time SVG Canvas Preview
            </span>
            <span>·</span>
            <span>Ready for high-res vector export</span>
          </div>
        </div>
      </div>
    </div>
  );
}
