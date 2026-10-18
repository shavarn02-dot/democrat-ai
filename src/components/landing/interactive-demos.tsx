"use client";

import { useState } from "react";
import { CalendarDays, Check, Clock3, Sparkles } from "lucide-react";

const previewPosts = [
  { channel: "Instagram", short: "IG", time: "11:40", title: "The small ritual that stuck", status: "Review" },
  { channel: "LinkedIn", short: "in", time: "14:10", title: "Notes from building in public", status: "Draft" },
  { channel: "YouTube", short: "YT", time: "18:30", title: "A calmer way to create", status: "Preview" },
];

const chartOptions = [
  { label: "Engagement", path: "M2 117 C44 114 46 74 90 83 S145 122 187 91 S247 30 287 61 S341 106 380 78 S431 96 462 44 S514 37 538 21", point: "538 21" },
  { label: "Conversation", path: "M2 104 C44 82 58 108 92 94 S148 53 187 74 S243 91 287 68 S343 42 380 58 S430 89 462 57 S512 76 538 39", point: "538 39" },
  { label: "Saves", path: "M2 121 C40 119 55 97 91 107 S145 95 187 79 S246 88 287 71 S344 94 380 66 S431 58 462 51 S511 45 538 28", point: "538 28" },
];

const agentActions = [
  {
    label: "Takeaway",
    question: "What is this post really saying?",
    answer: "It centers on a small, repeatable habit. The fictional conversation suggests readers value the practical detail more than a polished outcome.",
  },
  {
    label: "Conversation",
    question: "Which comments add useful context?",
    answer: "In this invented sample, replies echo the same small change and add why it helped. A future integration could return only comments the platform makes available.",
  },
  {
    label: "Next post",
    question: "How could I carry this idea to another channel?",
    answer: "A platform-aware follow-up might open with the moment the habit became useful, then invite readers to share one change that stayed with them.",
  },
];

export function CalendarDemo() {
  const [channel, setChannel] = useState("All");
  const channels = ["All", "Instagram", "LinkedIn", "YouTube"];
  const filteredPosts = channel === "All" ? previewPosts : previewPosts.filter((post) => post.channel === channel);

  return (
    <article className="hp-week-card" aria-label="Interactive illustrative content calendar">
      <div className="hp-week-card__top">
        <div><span className="hp-overline">PRODUCT CONCEPT · NOT CONNECTED</span><h2>Publishing desk</h2></div>
        <span className="hp-week-icon"><CalendarDays size={18} aria-hidden="true" /></span>
      </div>
      <div className="hp-week-card__date">
        <span>This week</span>
        <div className="hp-week-card__filters" role="group" aria-label="Filter sample posts by channel">
          {channels.map((item) => (
            <button
              key={item}
              type="button"
              aria-label={item === "All" ? "Show all sample posts" : `Show ${item} sample posts`}
              aria-pressed={channel === item}
              onClick={() => setChannel(item)}
            >{item === "Instagram" ? "IG" : item === "LinkedIn" ? "in" : item === "YouTube" ? "YT" : "All"}</button>
          ))}
        </div>
        <span aria-live="polite">{filteredPosts.length} preview {filteredPosts.length === 1 ? "post" : "posts"}</span>
      </div>
      <div className="hp-post-list" aria-live="polite">
        {filteredPosts.map((post, index) => (
          <div className="hp-post-row" key={post.channel}>
            <span className={`hp-post-row__monogram hp-post-row__monogram--${index}`}>{post.short}</span>
            <div className="hp-post-row__body"><span>{post.channel} <small>· {post.time}</small></span><strong>{post.title}</strong></div>
            <span className="hp-post-row__status">{post.status}</span>
          </div>
        ))}
      </div>
      <div className="hp-week-card__bottom"><span><Clock3 size={13} aria-hidden="true" /> Local preview only</span><span>Nothing will publish</span></div>
    </article>
  );
}

export function AnalyticsDemo() {
  const [activeLabel, setActiveLabel] = useState(chartOptions[0].label);
  const active = chartOptions.find((option) => option.label === activeLabel) ?? chartOptions[0];

  return (
    <div className="hp-signal-board" aria-label="Illustrative analytics interface using fictional example data">
      <div className="hp-signal-board__top"><span className="hp-overline">SIGNAL SNAPSHOT · CONCEPT</span><span className="hp-board-tag">NO LIVE ACCOUNTS</span></div>
      <div className="hp-signal-board__title"><div><span>Example campaign</span><strong>What people came back to</strong></div><Sparkles size={18} aria-hidden="true" /></div>
      <div className="hp-chart" aria-label="Fictional analytics preview; example data only">
        <div className="hp-chart__ticks"><span>EXAMPLE {active.label.toUpperCase()}</span><span>NOT ACCOUNT DATA</span></div>
        <div className="hp-chart__controls" role="group" aria-label="Choose a sample analytics signal">
          {chartOptions.map((option) => <button key={option.label} type="button" aria-pressed={activeLabel === option.label} onClick={() => setActiveLabel(option.label)}>{option.label}</button>)}
        </div>
        <svg viewBox="0 0 540 154" preserveAspectRatio="none" role="img" aria-label={`Fictional ${active.label.toLowerCase()} trend, illustrative only`}>
          <path d="M2 128 H538 M2 90 H538 M2 52 H538 M2 14 H538" className="hp-chart__grid" />
          <path key={active.label} d={active.path} className="hp-chart__line" />
          <circle cx={active.point.split(" ")[0]} cy={active.point.split(" ")[1]} r="5" className="hp-chart__dot" />
        </svg>
        <div className="hp-chart__labels"><span>POST A</span><span>POST B</span><span>POST C</span><span>POST D</span></div>
      </div>
      <div className="hp-signal-board__legend"><span><i className="hp-legend-mark" />Example {active.label.toLowerCase()} trace</span><span>Illustrative only</span></div>
    </div>
  );
}

export function AgentDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = agentActions[activeIndex];

  return (
    <div className="hp-agent-window" aria-label="Illustrative, disconnected AI agent interaction">
      <div className="hp-agent-window__bar"><span>EXAMPLE AGENT EXCHANGE</span><span>CONCEPT · NOT CONNECTED</span></div>
      <div className="hp-agent-actions" role="group" aria-label="Try an example AI agent question">
        {agentActions.map((action, index) => <button key={action.label} type="button" aria-pressed={activeIndex === index} onClick={() => setActiveIndex(index)}>{action.label}</button>)}
      </div>
      <div className="hp-chatline hp-chatline--human"><span>YOU · EXAMPLE PROMPT</span><p aria-live="polite">{active.question}</p></div>
      <div className="hp-chatline hp-chatline--agent"><span>DEMOCRAT.AI AGENT · FICTIONAL SAMPLE</span><p aria-live="polite">{active.answer}</p></div>
      <div className="hp-agent-window__foot"><span className="hp-mini-node" /><Check size={14} aria-hidden="true" /> Changes stay in this example; no agent was called.</div>
    </div>
  );
}
