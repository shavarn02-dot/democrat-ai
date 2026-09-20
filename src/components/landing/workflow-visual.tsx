"use client";

import { useEffect, useState } from "react";
import { Check, Image as ImageIcon, Instagram, Linkedin, MessageSquare, Search, Sparkles, Twitter } from "lucide-react";

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
          <p>The interesting part isn't the new model. It's what changes when the cost of iteration collapses.</p>
          <div className="post-tags"><span>#AI</span><span>#Product</span><span>#BuildInPublic</span></div>
          <div className="post-actions"><span><Linkedin className="h-3.5 w-3.5" /> LinkedIn</span><span><Twitter className="h-3.5 w-3.5" /> X</span><span><Instagram className="h-3.5 w-3.5" /> Instagram</span></div>
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