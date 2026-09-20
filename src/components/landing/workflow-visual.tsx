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
}
