"use client";

import { useState } from "react";
import {
  Layers,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PipelineStage {
  id: string;
  name: string;
  category: string;
  latency: string;
  status: "live" | "complete" | "idle";
  description: string;
  metricLabel: string;
  metricValue: string;
}

const pipelineStages: PipelineStage[] = [
  {
    id: "ingest",
    name: "Zero-Noise Scraper",
    category: "INGESTION & CLEANING",
    latency: "124ms",
    status: "complete",
    description: "Extracts primary thesis, removes DOM boilerplate, ads, navigation menus, and isolates verifiable factual claims.",
    metricLabel: "Noise Removed",
    metricValue: "88.4%",
  },
  {
    id: "reason",
    name: "Groq Llama 3.3 70B",
    category: "DEEP REASONING",
    latency: "310ms",
    status: "complete",
    description: "Deconstructs the narrative arc, identifies counter-intuitive insights, key data anchors, and logical dependencies.",
    metricLabel: "Throughput",
    metricValue: "480 tokens/sec",
  },
  {
    id: "reframe",
    name: "Perspective Synthesis",
    category: "EDITORIAL ANGLES",
    latency: "86ms",
    status: "live",
    description: "Recalibrates tone between Founder Lens, Technical Breakdown, Contrarian Analysis, or Executive Memo.",
    metricLabel: "Angle Fidelity",
    metricValue: "100%",
  },
  {
    id: "grammar",
    name: "Platform Matrix",
    category: "SOCIAL GRAMMAR",
    latency: "142ms",
    status: "complete",
    description: "Translates core ideas into native platform syntax: LinkedIn hooks, 𝕏 thread pacing, Reddit conversational norms, and SEO markdown.",
    metricLabel: "Native Channels",
    metricValue: "5 Active",
  },
  {
    id: "gate",
    name: "Human-in-the-Loop Gate",
    category: "RLS AUDIT & APPROVAL",
    latency: "Realtime",
    status: "idle",
    description: "Nothing ships without manual approval. Securely saved to Supabase with Row Level Security, instant edit, and copy actions.",
    metricLabel: "Audit Trail",
    metricValue: "Enforced",
  },
];

export function WorkflowVisual() {
  const [selectedStage, setSelectedStage] = useState<string>("reason");
  const [copied, setCopied] = useState<boolean>(false);

  const activeStage = pipelineStages.find((s) => s.id === selectedStage) || pipelineStages[1];

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard?.writeText(
      "When execution gets commoditized, editorial discernment becomes the ultimate moat."
    );
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl bg-gradient-to-b from-[#0b0f19] to-[#040711]">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-5 py-3.5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider text-slate-300 font-semibold uppercase">
              LIVE PIPELINE TELEMETRY
            </span>
          </div>
          <span className="text-white/20">|</span>
          <span className="text-[11px] font-mono text-slate-400">
            Engine: <span className="text-sky-400 font-medium">Llama-3.3-70b-versatile</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Avg Latency: <strong className="text-slate-200">380ms</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase RLS: <strong className="text-slate-200">Active</strong></span>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="p-5 sm:p-8 space-y-6">
        {/* Stage Timeline Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {pipelineStages.map((stage, idx) => {
            const isSelected = selectedStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={cn(
                  "relative p-3 rounded-xl text-left transition-all duration-200 border",
                  isSelected
                    ? "bg-sky-500/10 border-sky-500/50 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    0{idx + 1}
                  </span>
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full",
                      stage.status === "complete"
                        ? "bg-emerald-400"
                        : stage.status === "live"
                        ? "bg-sky-400 animate-pulse"
                        : "bg-slate-600"
                    )}
                  />
                </div>
                <div className="text-xs font-semibold text-slate-200 truncate">
                  {stage.name}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {stage.latency}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Stage Intelligence Card */}
          <div className="lg:col-span-5 rounded-xl border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                  {activeStage.category}
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{activeStage.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {activeStage.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-500 block">EXECUTION SPEED</span>
                <span className="text-sm font-semibold text-slate-200 font-mono">{activeStage.latency}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 block uppercase">{activeStage.metricLabel}</span>
                <span className="text-sm font-semibold text-sky-400 font-mono">{activeStage.metricValue}</span>
              </div>
            </div>
          </div>

          {/* Right: Live Interactive Output Card */}
          <div className="lg:col-span-7 rounded-xl border border-white/10 bg-[#070a13] p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">
                    Channel-Synthesized Output Preview
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition border border-white/10"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy Post</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Simulated Output Content */}
              <div className="space-y-3 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p className="font-semibold text-white">
                  When execution gets commoditized, editorial discernment becomes the ultimate moat.
                </p>
                <p className="text-slate-400">
                  Most marketing teams flood feeds with 10x more AI-generated filler. It falls flat because generic prose carries zero information density.
                </p>
                <p className="text-slate-400">
                  The winning strategy: Take one authoritative founder insight or engineering breakthrough, run it through multi-angle reasoning, and distribute platform-native grammar.
                </p>
              </div>
            </div>

            {/* Micro Tags & Actions */}
            <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-[11px]">
                <span>#ProductStrategy</span>
                <span>#AIArchitecture</span>
                <span>#Distribution</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-[11px] font-mono">
                <span>Tokens: 184</span>
                <span>Audit: SHA-256 Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
