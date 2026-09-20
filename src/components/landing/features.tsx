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
</>}
