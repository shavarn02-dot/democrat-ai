"use client";

import { useEffect, useState } from "react";
import { Check, Image as ImageIcon, Search, Sparkles, WandSparkles } from "lucide-react";

const steps = ["Source","Understand","Generate","Optimize","Visualize","Distribute","Track"];

export function WorkflowVisual() {
  const [active, setActive] = useState(0);
  useEffect(() => { const id = window.setInterval(() => setActive((v) => (v + 1) % steps.length), 1500); return () => clearInterval(id); }, []);
  return (
    <div className="product-theater" aria-label="Animated source-to-distribution workflow">
      <div className="theater-topbar"><div className="theater-dots"><i/><i/><i/></div><span>DEMOCRAT / DISTRIBUTION WORKSPACE</span><span className="theater-live">SYSTEM ACTIVE</span></div>
      <div className="theater-canvas">
        <div className="pipeline-line" />
        <article className={`workflow-node node-source ${active < 2 ? "active" : ""}`}>
          <div className="node-label"><span>INPUT SIGNAL</span><b>01</b></div><div className="source-art"/><p className="source-name">Why cheaper iteration makes editorial taste more valuable</p>
        </article>
        <article className={`workflow-node node-brain ${active >= 1 && active <= 4 ? "active" : ""}`}>
          <div className="node-label"><span>AI ENGINE</span><b>LIVE</b></div><div className="brain-orbit"><div className="brain-core"><Sparkles className="h-5 w-5"/></div></div><div className="brain-status">{steps[active]} in progress…</div>
        </article>
        <article className={`workflow-node node-output ${active >= 5 ? "active" : ""}`}>
          <div className="node-label"><span>LINKEDIN / READY</span><b><Check className="h-3 w-3"/></b></div>
          <div className="post-shell"><div className="post-meta"><span className="post-avatar">D</span><span>Democrat.ai · now</span></div><h3>When iteration gets cheaper, taste becomes the bottleneck.</h3><p>The advantage is not faster generation. It is having more room to test, learn, and ship the version worth attention.</p><div className="post-footer"><span>218 reactions</span><span>43 comments</span></div></div>
        </article>
        <div className="signal-chip chip-a"><Search className="h-3 w-3"/> Extracting signal</div><div className="signal-chip chip-b"><WandSparkles className="h-3 w-3"/> Founder angle</div><div className="signal-chip chip-c"><ImageIcon className="h-3 w-3"/> Visual direction</div>
        <div className="workflow-meter">{steps.map((step,i)=><div key={step} className={`meter-step ${i===active?"active":""}`}>{String(i+1).padStart(2,"0")} {step}</div>)}</div>
      </div>
    </div>
  );
}"use client";

import { useEffect, useState } from "react";
import { Check, Image as ImageIcon, MessageSquare, Search, Sparkles } from "lucide-react";

const steps = [
  { label: "Source", value: "URL / post / article" },
  { label: "Understand", value: "Signal + context" },
  { label: "Create", value: "Angle + copy + visual" },
  { label: "Distribute", value: "Review + publish" },
];

export function WorkflowVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % steps.length), 1800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="workflow-stage" aria-label="Animated Democrat.ai content workflow">
      <div className="workflow-grid" />
      <div className="workflow-orbit orbit-one" />
      <div className="workflow-orbit orbit-two" />
      <div className="workflow-scan" />

      <div className="workflow-source">
        <div className="workflow-mini-label"><span className="status-dot" /> SOURCE</div>
        <div className="source-card">
          <div className="source-thumb"><span className="source-play">▶</span></div>
          <div className="source-copy">
            <span>New AI model changes</span>
            <strong>how teams ship software</strong>
            <small>instagram.com/reel/••••</small>
          </div>
        </div>
      </div>

      <div className="workflow-core">
        <div className="core-ring ring-a" />
        <div className="core-ring ring-b" />
        <div className="core-node">
          <Sparkles className="h-5 w-5" />
          <span>Democrat</span>
          <small>thinking</small>
        </div>
        <div className="core-signal signal-one"><Search className="h-3.5 w-3.5" /> context</div>
        <div className="core-signal signal-two"><ImageIcon className="h-3.5 w-3.5" /> visual</div>
      </div>

      <div className="workflow-output">
        <div className="output-topline"><span>READY TO PUBLISH</span><span className="output-check"><Check className="h-3 w-3" /></span></div>
        <div className="output-post">
          <div className="post-header"><div className="avatar-mark">D</div><div><strong>Democrat.ai</strong><small>AI-assisted draft</small></div></div>
          <p>The interesting part isn&apos;t the new model. It&apos;s what changes when the cost of iteration collapses.</p>
          <div className="post-tags"><span>#AI</span><span>#Product</span><span>#BuildInPublic</span></div>
          <div className="post-actions"><span><b className="platform-mark">in</b> LinkedIn</span><span><b className="platform-mark">𝕏</b> X</span><span><b className="platform-mark">◎</b> Instagram</span></div>
        </div>
      </div>

      <div className="workflow-progress">
        {steps.map((step, index) => (
          <div key={step.label} className={`workflow-step ${index === active ? "is-active" : ""}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><strong>{step.label}</strong><small>{step.value}</small></div>
          </div>
        ))}
      </div>

      <div className="workflow-float"><MessageSquare className="h-4 w-4" /><span>Angle found</span><b>↗</b></div>
    </div>
  );
}
