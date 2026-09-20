"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Layers3, PenLine, ScanSearch, Send, MessageSquare, ThumbsUp, Repeat, Bookmark } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { VisualStudio } from "@/components/content/visual-studio";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    num: "01",
    icon: ScanSearch,
    title: "Understand Before Writing",
    body: "Scrapes the complete article, transcript, or thread and isolates the actual thesis, empirical evidence, and core nuances—ignoring noisy clickbait.",
  },
  {
    num: "02",
    icon: PenLine,
    title: "Frame Through Editorial Angles",
    body: "Select from Founder POV, Technical Breakdown, Thought Leadership, or Accessible Explainer to calibrate voice and audience resonance.",
  },
  {
    num: "03",
    icon: Layers3,
    title: "Channel-Native Grammar",
    body: "Generates authentic LinkedIn carousels, 𝕏 threads, Reddit community discussions, and SEO blog posts rather than uniform copy-paste text.",
  },
  {
    num: "04",
    icon: Send,
    title: "Human Governance Protocol",
    body: "Nothing is published until approved. Inline editing, status updates (Draft → Approved → Published), and complete Supabase audit logs.",
  },
];

export function Features() {
  const [activePlatformTab, setActivePlatformTab] = useState<"linkedin" | "twitter" | "reddit" | "blog">("linkedin");

  return (
    <div className="features-wrapper py-24 space-y-28 bg-[#f4f1ea]">
      {/* SECTION 1: Capabilities */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#ff5b3f] block mb-2">
                01 / CORE ARCHITECTURE
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#11110f] tracking-tight">
                Designed for signal. <br />
                <em className="italic font-normal">Engineered for distribution.</em>
              </h2>
            </div>
            <p className="text-sm text-[#5a574f] max-w-md">
              Democrat.ai replaces chaotic tabs and disjointed prompts with a single unified pipeline that respects your time and your brand.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.num} delay={i * 80}>
                <div className="group rounded-2xl border border-black/10 bg-[#fbfaf6] p-6 hover:border-[#ff5b3f] hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#8b867d]">{c.num}</span>
                      <span className="p-2 rounded-lg bg-[#f5f2ea] group-hover:bg-[#ff5b3f]/10 group-hover:text-[#ff5b3f] transition">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <h3 className="text-lg font-serif font-medium text-[#11110f] mb-2">{c.title}</h3>
                    <p className="text-xs text-[#5a574f] leading-relaxed">{c.body}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-black/5 flex items-center text-[10px] font-mono text-[#8b867d] group-hover:text-[#ff5b3f] transition">
                    <span>ZERO CONTEXT LOSS</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: Platform-Native Renders */}
      <section id="platforms" className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#ff5b3f] block mb-2">
              02 / SOCIAL GRAMMAR
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#11110f] tracking-tight">
              Native to every platform.
            </h2>
            <p className="text-sm text-[#5a574f] mt-3">
              Algorithms favor content styled for their specific ecosystem. Democrat.ai adapts tone, pacing, hook length, and formatting automatically.
            </p>
          </div>
        </Reveal>

        {/* Platform Tabs Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-xl border border-black/10 bg-[#fbfaf6] shadow-sm">
            {[
              { id: "linkedin", label: "LinkedIn Post" },
              { id: "twitter", label: "𝕏 / Twitter Thread" },
              { id: "reddit", label: "Reddit Discussion" },
              { id: "blog", label: "Editorial Article" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePlatformTab(tab.id as "linkedin" | "twitter" | "reddit" | "blog")}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-medium transition",
                  activePlatformTab === tab.id
                    ? "bg-[#11110f] text-white shadow"
                    : "text-[#5a574f] hover:text-[#11110f]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Native Preview Stage */}
        <div className="max-w-2xl mx-auto">
          <Reveal>
            {activePlatformTab === "linkedin" && (
              <div className="rounded-xl border border-black/10 bg-white p-6 shadow-md text-[#11110f]">
                <div className="flex items-center gap-3 border-b border-black/5 pb-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#11110f] text-white font-serif flex items-center justify-center font-bold">
                    D
                  </div>
                  <div>
                    <h4 className="text-sm font-bold flex items-center gap-1.5">
                      Democrat.ai <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-mono">1st</span>
                    </h4>
                    <p className="text-[11px] text-[#8b867d]">Founder & AI Systems Architect · 4h · 🌐</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm leading-relaxed">
                  <p className="font-semibold">When iteration gets cheaper, taste becomes the bottleneck.</p>
                  <p>
                    Most teams think generative AI is about creating 10x more content. They are missing the plot.
                  </p>
                  <p>
                    When anyone can write an 800-word draft in 3 seconds, generic text has zero market value. The only thing that retains leverage is human editorial discernment: deciding which thesis is actually worth saying.
                  </p>
                  <p className="text-[#0a66c2] text-xs font-medium">
                    #ContentStrategy #Founders #ArtificialIntelligence #B2BGrowth
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-[#8b867d]">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5 text-blue-600 fill-blue-600" /> 342 reactions
                  </span>
                  <span>48 comments · 19 reposts</span>
                </div>
              </div>
            )}

            {activePlatformTab === "twitter" && (
              <div className="rounded-xl border border-black/10 bg-[#000000] p-6 shadow-md text-white font-sans">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#ff5b3f] text-[#11110f] font-bold flex items-center justify-center text-sm">
                    𝕏
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-sm font-bold">
                      <span>Democrat.ai</span>
                      <span className="text-[#1d9bf0]">✓</span>
                    </div>
                    <span className="text-xs text-white/50">@democrat_ai</span>
                  </div>
                </div>

                <p className="text-sm text-white/90 leading-relaxed mb-4">
                  The bottleneck in modern publishing is no longer drafting speed. It’s curation velocity.<br /><br />
                  A single solid thesis can feed 5 platforms for 2 weeks if you respect channel grammar. Here is the framework: 🧵👇
                </p>

                <div className="flex items-center justify-between text-xs text-white/50 border-t border-white/10 pt-3">
                  <span className="flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5" /> 84</span>
                  <span className="flex items-center gap-1.5"><Repeat className="h-3.5 w-3.5 text-emerald-400" /> 192</span>
                  <span className="flex items-center gap-1.5"><ThumbsUp className="h-3.5 w-3.5 text-pink-500" /> 1,240</span>
                  <span className="flex items-center gap-1.5"><Bookmark className="h-3.5 w-3.5" /> 310</span>
                </div>
              </div>
            )}

            {activePlatformTab === "reddit" && (
              <div className="rounded-xl border border-black/10 bg-[#ffffff] p-6 shadow-md text-[#1c1c1c]">
                <div className="flex items-center gap-2 text-xs text-[#7c7c7c] mb-3">
                  <span className="font-bold text-[#1c1c1c]">r/SaaS</span>
                  <span>·</span>
                  <span>Posted by u/content_architect 6 hours ago</span>
                </div>
                <h3 className="text-base font-bold mb-3">
                  Case Study: How we 4x’d distribution without burning out our product team
                </h3>
                <p className="text-xs text-[#4a4a4a] leading-relaxed mb-4">
                  Instead of paying writers to rephrase our changelogs and founder notes, we built a source-grounded extraction pipeline with Groq and Supabase. The key learning was separating extraction from channel styling.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-[#7c7c7c] pt-3 border-t border-black/5">
                  <span className="px-2 py-1 rounded bg-[#f5f5f5] font-bold">▲ 419</span>
                  <span>💬 72 Comments</span>
                  <span>↗ Share</span>
                </div>
              </div>
            )}

            {activePlatformTab === "blog" && (
              <div className="rounded-xl border border-black/10 bg-[#fbfaf6] p-8 shadow-md text-[#11110f]">
                <span className="text-[10px] font-mono text-[#ff5b3f] uppercase tracking-wider block mb-2">
                  LONG-FORM ESSAY · 6 MIN READ
                </span>
                <h3 className="text-2xl font-serif font-medium leading-tight mb-4">
                  The Era of Source-Grounded Content Networks
                </h3>
                <p className="text-xs text-[#5a574f] leading-relaxed mb-4">
                  For the past decade, distribution meant duplicating effort: hiring social managers to summarize blog posts, or forcing founders to spend evenings formatting tweets. By establishing an authoritative source graph, every channel stays synchronized with ground truth.
                </p>
                <div className="flex items-center gap-3 text-xs text-[#8b867d] pt-4 border-t border-black/10 font-mono">
                  <span>CANONICAL URL: /essays/source-grounded-networks</span>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* SECTION 3: Visual Studio Feature Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#ff5b3f] block mb-2">
              03 / GENERATIVE VISUAL STUDIO
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#11110f] tracking-tight">
              High-Fidelity Visual Direction.
            </h2>
            <p className="text-sm text-[#5a574f] mt-3">
              Social platforms prioritize visual media. Generate matching companion graphics, banner formats, and typographic quote cards in seconds.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <VisualStudio initialTitle="The Bottleneck is Taste" />
        </Reveal>
      </section>

      {/* SECTION 4: Final Human Gate CTA */}
      <section id="control" className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <div className="rounded-3xl border border-black/15 bg-[#11110f] text-[#f4f1ea] p-10 sm:p-14 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-mono text-[#ff5b3f]">
                HUMAN-IN-THE-LOOP CONTROL
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white max-w-lg mx-auto">
                AI does the heavy lifting. <br />
                <em className="italic text-[#ff5b3f]">You control what ships.</em>
              </h2>
              <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto">
                Every generated draft is saved securely with Supabase Row Level Security. Review, edit, copy, approve, or reject before any post goes live.
              </p>
              <div className="pt-4 flex justify-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ff5b3f] text-[#11110f] font-semibold text-sm hover:bg-[#ff6e54] transition shadow-lg active:scale-95"
                >
                  <span>Build Your First Pipeline</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
