"use client";

import Link from "next/link";
import { ArrowRight, Check, Eye, Layers3, PenLine, Radar, ScanSearch, Send } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const capabilities = [
  ["01",ScanSearch,"Understand before writing","Extract the actual argument, evidence, and context—not just the page metadata."],
  ["02",PenLine,"Find the editorial angle","Translate one source into a founder take, technical breakdown, or accessible explainer."],
  ["03",Layers3,"Package the whole story","Generate the hook, body, keywords, hashtags, and visual direction as one coherent system."],
  ["04",Send,"Ship with control","Review and edit the final draft before anything leaves your workspace."],
] as const;
const platforms=["LinkedIn","X / Twitter","Reddit","Instagram","Facebook","Editorial","LinkedIn","X / Twitter","Reddit","Instagram","Facebook","Editorial"];

export function Features(){return <>
  <section className="story-section"><div className="section-shell">
    <Reveal><div className="story-head"><span className="section-index">01 / THE PROBLEM</span><div><h2>Great ideas get lost<br/><em>between tabs.</em></h2><p>Publishing should not require rebuilding the same thought five times. Democrat.ai turns a source into a controlled distribution workflow while keeping the original meaning intact.</p></div></div></Reveal>
    <div className="capability-list">{capabilities.map(([n,Icon,title,body],i)=><Reveal key={n} delay={i*55}><article className="capability-row"><span className="number">{n}</span><h3>{title}</h3><p>{body}</p><span className="capability-icon"><Icon className="h-4 w-4"/></span></article></Reveal>)}</div>
  </div></section>
  <section id="platforms" className="platform-section"><div className="platform-marquee" aria-hidden="true">{platforms.map((p,i)=><span className="platform-word" key={`${p}-${i}`}><i/>{p}</span>)}</div><div className="section-shell">
    <Reveal><div className="story-head"><span className="section-index">02 / NATIVE OUTPUTS</span><div><h2>Same signal.<br/><em>Different language.</em></h2><p>Every destination has its own social grammar. Democrat.ai changes the structure—not just the character count.</p></div></div></Reveal>
    <div className="platform-comparison"><div className="platform-tabs">{["LinkedIn","X / Twitter","Reddit","Instagram","Facebook"].map((p,i)=><div className={`platform-tab ${i===0?"active":""}`} key={p}>{p}</div>)}</div><Reveal delay={120}><div className="native-stack"><article className="native-card"><span className="native-kicker">FOUNDER POV · LINKEDIN</span><h3>When iteration gets cheaper, taste becomes the bottleneck.</h3><p>The interesting shift is not that teams can generate more. It is that they can explore more directions before deciding what deserves to ship.</p><div className="native-tags"><span>#AI</span><span>#Product</span><span>#Founders</span></div><div className="native-actions"><span>♡ 218 reactions</span><span>◌ 43 comments</span><span>↗ 18 reposts</span></div></article></div></Reveal></div>
  </div></section>
  <section id="control" className="control-section"><div className="section-shell control-grid"><Reveal><div className="control-copy"><span className="eyebrow"><i/> HUMAN IN THE LOOP</span><h2>AI does the work.<em>You hold the line.</em></h2><p>Every output stays editable, traceable to its source, and unpublished until you approve it.</p><div className="trust-line"><span><Radar className="h-4 w-4"/> Source-aware</span><span><Eye className="h-4 w-4"/> Reviewable</span><span><Check className="h-4 w-4"/> Human-approved</span></div></div></Reveal><Reveal delay={100}><div className="approval-console"><div className="approval-frame"><div className="approval-head"><span>FINAL REVIEW</span><span>03:48 PM</span></div><div className="approval-preview"><small>LinkedIn · Founder perspective</small><h3>A stronger draft is ready.</h3><p>Source grounded, structured for the platform, and optimized without losing your voice.</p></div><div className="approval-actions"><button className="edit">Edit draft</button><button className="approve">Approve</button></div></div></div></Reveal></div><div className="mt-16 border-t border-white/10 pt-8"><Link href="/auth/login" className="signal-button">Turn a source into a system <ArrowRight className="h-4 w-4"/></Link></div></section>
</>}"use client";

import Link from "next/link";
import { ArrowRight, Check, Globe2, Layers3, PenLine, Radar, ScanSearch, Send } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const capabilities = [
  ["01", ScanSearch, "Understand the source", "Extract the signal, context, claims, and useful details before writing anything."],
  ["02", PenLine, "Find your angle", "Turn one source into a founder take, technical breakdown, beginner explanation, or business insight."],
  ["03", Layers3, "Build the package", "Generate platform-native copy, hooks, keywords, hashtags, and a visual direction together."],
  ["04", Send, "Distribute with intent", "Review once, then publish to the channels that matter without rewriting everything by hand."],
] as const;

export function Features() {
  return (
    <>
      <section id="features" className="section-dark">
        <div className="section-shell capability-layout">
          <Reveal>
            <div className="section-intro">
              <span className="section-kicker">WHY IT FEELS DIFFERENT</span>
              <h2>Your bookmarks are full of ideas.<em>Your calendar shouldn&apos;t be.</em></h2>
              <p>Democrat.ai removes the dead time between discovering something useful and turning it into something useful for your audience.</p>
              <Link href="/auth/login" className="inline-link">Try the workflow <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
          <div className="capability-grid">
            {capabilities.map(([number, Icon, title, body], index) => (
              <Reveal key={number} delay={index * 70}>
                <article className="capability-card">
                  <div className="capability-top"><span>{number}</span><Icon className="h-5 w-5" /></div>
                  <h3>{title}</h3><p>{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="platforms" className="section-paper">
        <div className="section-shell">
          <Reveal>
            <div className="section-kicker dark">ONE SOURCE. MANY NATIVE OUTPUTS.</div>
            <div className="platform-heading"><h2>Same idea.<em>Different language.</em></h2><p>LinkedIn needs an argument. X needs compression. Reddit needs conversation. Instagram needs a visual hook. Democrat.ai treats every destination as its own medium.</p></div>
          </Reveal>

          <div className="platform-strip">
            {["LinkedIn","X","Reddit","Instagram","Facebook"].map((name, i) => <div key={name} className="platform-chip"><span>{["in","𝕏","r/","◎","f"][i]}</span>{name}<Check className="ml-auto h-4 w-4 opacity-40" /></div>)}
          </div>

          <Reveal delay={100}>
            <div className="editorial-demo">
              <div className="demo-source"><div className="demo-label">SOURCE SIGNAL</div><div className="demo-line w-4/5" /><div className="demo-line w-3/5" /><div className="demo-line w-2/3" /><div className="demo-highlight">AI changes the economics of iteration.</div></div>
              <div className="demo-arrow">→</div>
              <div className="demo-output"><div className="demo-label">DEMOCRAT OUTPUT</div><div className="demo-post"><div className="demo-post-top"><span className="demo-avatar">D</span><span>Founder POV · LinkedIn</span></div><strong>When iteration gets cheaper, taste becomes the bottleneck.</strong><p>The advantage isn&apos;t simply faster generation. It is having more room to test, learn, and ship the version that deserves attention.</p><div className="demo-tags">#AI · #Product · #Founders</div></div></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-dark section-control">
        <div className="section-shell">
          <div className="feature-banner">
            <Reveal><div><div className="section-kicker">CONTROL STAYS WITH YOU</div><h2>AI does the heavy lifting.<em>You decide what ships.</em></h2></div></Reveal>
            <Reveal delay={140}><div className="approval-stack"><div className="approval-card approval-back">Source grounded</div><div className="approval-card approval-mid">Platform ready</div><div className="approval-card approval-front"><span><Check className="h-4 w-4" /> Ready for review</span><button type="button">Approve draft</button></div></div></Reveal>
          </div>
          <div className="trust-row"><div><Globe2 className="h-4 w-4" /> Source-aware</div><div><Radar className="h-4 w-4" /> Context-aware</div><div><Check className="h-4 w-4" /> Human approved</div></div>
        </div>
      </section>
    </>
  );
}
