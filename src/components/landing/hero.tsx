import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CalendarDemo } from "@/components/landing/interactive-demos";

export function Hero() {
  return (
    <section className="hp-hero" aria-labelledby="hp-hero-title">
      <div className="hp-hero__inner hp-wrap">
        <div className="hp-hero__copy">
          <p className="hp-eyebrow"><span className="hp-eyebrow__mark" /> SOCIAL, WITH A LONGER MEMORY</p>
          <h1 id="hp-hero-title">Post with<br /><em>more context.</em></h1>
          <p className="hp-hero__intro">Plan, shape and schedule social content from one calm workspace. Then turn a public Reel, video or post link into context for the AI agents you already use.</p>
          <div className="hp-hero__actions">
            <Link href="#social-link-intelligence" className="hp-button hp-button--signal">See link intelligence <ArrowDownRight size={16} aria-hidden="true" /></Link>
            <Link href="#how-it-works" className="hp-text-link">Explore the workflow <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
          <p className="hp-hero__footnote">Designed for creators, studios and agent builders in India. Social channel connections are planned—not live in this preview.</p>
        </div>

        <div className="hp-hero__visual" aria-label="Illustrative content calendar preview">
          <div className="hp-orbit hp-orbit--one" aria-hidden="true" />
          <div className="hp-orbit hp-orbit--two" aria-hidden="true" />
          <div className="hp-float-note hp-float-note--top"><span className="hp-mini-spark" aria-hidden="true">✳</span><span>One idea<br /><b>many right-sized posts</b></span></div>
          <CalendarDemo />
          <div className="hp-float-note hp-float-note--bottom"><span className="hp-thread-mini" aria-hidden="true">↗</span><span>Make the next post<br /><b>smarter than the last</b></span></div>
        </div>
      </div>
      <div className="hp-hero__aside hp-wrap"><span>MADE FOR THE SOCIAL SURFACE</span><p>Instagram <i /> YouTube <i /> Facebook <i /> X <i /> LinkedIn</p><span>Channels shown are planned integrations</span></div>
    </section>
  );
}
