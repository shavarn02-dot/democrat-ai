"use client";

import Link from "next/link";
import { ArrowRight, Play, ShieldCheck, Cpu, Layers } from "lucide-react";
import { WorkflowVisual } from "@/components/landing/workflow-visual";

export function Hero() {
  return (
    <section className="hero-section relative pt-32 pb-20 overflow-hidden">
      {/* Background ambient texture & grid */}
      <div className="absolute inset-0 bg-[#f4f1ea] -z-20" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: "radial-gradient(#11110f 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top telemetry & headline block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-[#fbfaf6] text-xs font-mono text-[#5a574f] mb-6 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#ff5b3f] animate-pulse" />
              <span>CONTENT OS · GROQ 70B ENGINE · RLS ACTIVE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#11110f] tracking-tight leading-[1.08]">
              One source. <br />
              <em className="italic font-normal text-[#ff5b3f]">Everywhere it matters.</em>
            </h1>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <p className="text-base text-[#5a574f] leading-relaxed">
              Democrat.ai reads your source, extracts the core arguments, and crafts channel-native content for LinkedIn, 𝕏, Reddit, and editorial channels—with human review at every step.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#11110f] text-white text-sm font-medium hover:bg-black transition-all shadow-md active:scale-95"
              >
                <span>Launch Workspace</span>
                <ArrowRight className="h-4 w-4 text-[#ff5b3f]" />
              </Link>
              <a
                href="#system"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-black/15 bg-white/60 hover:bg-white text-sm font-medium text-[#11110f] transition shadow-sm"
              >
                <Play className="h-3.5 w-3.5 fill-[#11110f]" />
                <span>Explore Live Pipeline</span>
              </a>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs font-mono text-[#8b867d]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Source Grounded
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-[#ff5b3f]" /> Sub-Second LLM
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-[#11110f]" /> Native Renders
              </span>
            </div>
          </div>
        </div>

        {/* Live Interactive Workflow Theater */}
        <div id="system" className="relative">
          <WorkflowVisual />
        </div>
      </div>
    </section>
  );
}
