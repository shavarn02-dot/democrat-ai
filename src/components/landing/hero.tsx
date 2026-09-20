"use client";

import Link from "next/link";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import { WorkflowVisual } from "@/components/landing/workflow-visual";

export function Hero() {
  return (
    <section className="hero-section">
      <video className="hero-video" autoPlay muted loop playsInline poster="/media/studio-workspace.jpg" aria-hidden="true">
        <source src="/media/editorial-pulse.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-wash" />
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
