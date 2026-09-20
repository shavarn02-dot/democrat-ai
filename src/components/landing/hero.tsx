"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { WorkflowVisual } from "@/components/landing/workflow-visual";

export function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-grid" /><div className="hero-grain" /><div className="hero-orb" />
      <div className="hero-wrap">
        <div className="hero-top">
          <div>
            <span className="eyebrow"><i /> AI content distribution system</span>
            <h1 className="hero-title">One source.<em>Everywhere it matters.</em></h1>
          </div>
          <div className="hero-side">
            <p>Democrat.ai reads a source, finds the signal, and turns it into platform-native content—ready for your review, not another rewrite.</p>
            <div className="hero-actions">
              <Link href="/auth/login" className="signal-button">Build your first draft <ArrowRight className="h-4 w-4" /></Link>
              <a href="#system" className="quiet-button"><Play className="h-3.5 w-3.5 fill-current" /> Watch the system</a>
            </div>
            <div className="hero-proof"><span>Source-grounded</span><span>Platform-native</span><span>Human-approved</span></div>
          </div>
        </div>
        <div id="system"><WorkflowVisual /></div>
      </div>
    </section>
  );
}"use client";

import Link from "next/link";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import { WorkflowVisual } from "@/components/landing/workflow-visual";

export function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-grid" />
      <div className="hero-noise" />
      <div className="hero-glow hero-glow-a" />
      <div className="hero-glow hero-glow-b" />

      <div className="hero-wrap">
        <div className="hero-copy">
          <div className="eyebrow-pill"><span className="eyebrow-pulse" /> AI CONTENT OPERATING SYSTEM</div>
          <h1>See something interesting.<span>Make it worth publishing.</span></h1>
          <p>Drop in a URL. Democrat.ai understands the source, finds the angle, builds the visual, adapts the story to each platform, and gets it ready to publish.</p>

          <div className="hero-actions">
            <Link href="/auth/login" className="hero-cta group"><span>Start creating free</span><span className="cta-icon"><ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span></Link>
            <a href="#workflow" className="hero-secondary"><span className="play-icon"><Play className="h-3.5 w-3.5 fill-current" /></span> See the workflow</a>
          </div>

          <div className="hero-meta">
            <span><Sparkles className="h-3.5 w-3.5" /> Source-grounded</span><span>Platform-native</span><span>Human approval</span>
          </div>
        </div>

        <div id="workflow" className="hero-product"><WorkflowVisual /></div>
      </div>
    </section>
  );
}
