"use client";

import { type FormEvent, useState } from "react";
import { ArrowUpRight, Check, ClipboardCopy, Eye, Heart, MessageCircle, Play, ScanSearch } from "lucide-react";

type ExampleKey = "instagram" | "youtube" | "x" | "facebook" | "linkedin";

type Example = { label: string; url: string; kind: string; creator: string; headline: string; caption: string; textExcerpt: string; comment: string; views: string; likes: string; replies: string };

const examples: Record<ExampleKey, Example> = {
  instagram: { label: "Instagram Reel", url: "https://www.instagram.com/reel/example-reel/", kind: "REEL · EXAMPLE CREATOR", creator: "@sample.creator", headline: "A slower Sunday, one small ritual at a time.", caption: "A made-up caption for this product preview. The moment people remember is rarely the loudest one.", textExcerpt: "“I stopped filming the whole day and just kept this one little moment.”", comment: "This is the reminder I needed today.", views: "18.2k", likes: "1,406", replies: "42" },
  youtube: { label: "YouTube video", url: "https://www.youtube.com/watch?v=example-video", kind: "VIDEO · EXAMPLE CHANNEL", creator: "Sample Studio", headline: "What a week of making in public actually looks like.", caption: "An invented description showing how the planned product might organize available metadata.", textExcerpt: "“The interesting part was not the launch. It was everything we learned before it.”", comment: "Could you share how you chose the first experiment?", views: "24.7k", likes: "1,912", replies: "86" },
  x: { label: "X post", url: "https://x.com/example/status/123456789", kind: "POST · EXAMPLE ACCOUNT", creator: "@samplebuilder", headline: "The best feature request is sometimes a better question.", caption: "A fictional post. An eventual link analysis could preserve its wording and conversation context.", textExcerpt: "“What are people trying to do right before they ask for this?”", comment: "This changes how we run roadmap review.", views: "9.6k", likes: "688", replies: "31" },
  facebook: { label: "Facebook post", url: "https://www.facebook.com/example/posts/sample-post", kind: "POST · EXAMPLE PAGE", creator: "Example Page", headline: "A small change that made the work sustainable.", caption: "A fictional Facebook post, shown to demonstrate a planned link-intelligence surface.", textExcerpt: "“We moved the team check-in to Friday. The Monday conversation feels different now.”", comment: "That little change made a big difference for us too.", views: "7.2k", likes: "514", replies: "27" },
  linkedin: { label: "LinkedIn post", url: "https://www.linkedin.com/posts/example-post", kind: "POST · EXAMPLE PROFESSIONAL", creator: "Example Founder", headline: "The most useful growth metric might be what people repeat.", caption: "An invented professional post. Nothing here represents a live profile or post.", textExcerpt: "“A sentence repeated by your users tells you more than a pageview.”", comment: "This is a helpful way to think about retention.", views: "11.8k", likes: "863", replies: "54" },
};

function detectExample(raw: string): ExampleKey | null {
  try {
    const hostname = new URL(raw).hostname.toLowerCase().replace(/^www\./, "");
    if (hostname === "instagram.com" || hostname.endsWith(".instagram.com")) return "instagram";
    if (["youtube.com", "youtu.be"].includes(hostname) || hostname.endsWith(".youtube.com")) return "youtube";
    if (["x.com", "twitter.com"].includes(hostname) || hostname.endsWith(".x.com")) return "x";
    if (["facebook.com", "fb.watch"].includes(hostname) || hostname.endsWith(".facebook.com")) return "facebook";
    if (hostname === "linkedin.com" || hostname.endsWith(".linkedin.com")) return "linkedin";
  } catch {
    return null;
  }
  return null;
}

export function SocialLinkDemo() {
  const [active, setActive] = useState<ExampleKey>("instagram");
  const [url, setUrl] = useState(examples.instagram.url);
  const [notice, setNotice] = useState("Sample content only. No link has been fetched.");
  const [copied, setCopied] = useState(false);
  const sample = examples[active];

  function selectExample(key: ExampleKey) {
    setActive(key);
    setUrl(examples[key].url);
    setNotice("Sample content only. No link has been fetched.");
  }

  function inspect(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const kind = detectExample(url);
    if (!kind) {
      setNotice("Try a public Instagram, YouTube, Facebook, X or LinkedIn link. This preview will not make a network request.");
      return;
    }
    setActive(kind);
    setNotice(`${examples[kind].label} recognized. This is a local concept preview: your link was not opened, fetched or sent to an AI service.`);
  }

  async function copyPrompt() {
    const prompt = `Analyze this public social post for its core idea, useful context, and audience response: ${url}`;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setNotice("Clipboard access is unavailable here. Example prompt: “Analyze this post for its core idea and audience response.”");
    }
  }

  return (
    <section className="hp-link-section" id="social-link-intelligence" aria-labelledby="hp-link-heading">
      <div className="hp-link-section__intro hp-wrap">
        <div><p className="hp-section-index">01 / SOCIAL LINK INTELLIGENCE</p><h2 id="hp-link-heading">A link can carry<br /><em>the whole conversation.</em></h2></div>
        <div className="hp-link-section__copy"><p>Planned Social Link Intelligence gives an AI agent more than a URL: the content a platform makes available, its context, and the signals around it.</p><p className="hp-caveat">Availability varies by platform, post and access rules. This is a product concept—not a live scraper or MCP service.</p></div>
      </div>
      <div className="hp-link-demo hp-wrap">
        <div className="hp-link-demo__head"><div><span className="hp-overline">INTERACTIVE PRODUCT CONCEPT</span><h3>Give the agent something to work with.</h3></div><span className="hp-preview-stamp"><span /> EXAMPLE DATA · NOT LIVE</span></div>
        <div className="hp-link-demo__body">
          <div className="hp-link-demo__input-pane">
            <span className="hp-small-label">CHOOSE A SAMPLE SOURCE</span>
            <div className="hp-sample-tabs" role="group" aria-label="Choose an example platform">{(Object.keys(examples) as ExampleKey[]).map((key) => <button key={key} type="button" className={active === key ? "is-active" : ""} aria-pressed={active === key} onClick={() => selectExample(key)}>{examples[key].label}</button>)}</div>
            <form className="hp-link-form" onSubmit={inspect} noValidate>
              <label htmlFor="hp-social-url">Paste a public social link</label>
              <div className="hp-link-form__row"><input id="hp-social-url" type="url" autoComplete="url" spellCheck={false} value={url} onChange={(event) => setUrl(event.target.value)} aria-describedby="hp-link-notice" /><button className="hp-button hp-button--signal" type="submit">Preview <ArrowUpRight size={15} aria-hidden="true" /></button></div>
              <p id="hp-link-notice" className="hp-link-notice" aria-live="polite">{notice}</p>
            </form>
            <div className="hp-link-safety"><Eye size={15} aria-hidden="true" /><p>This demo does not call Instagram, YouTube, Facebook, X, LinkedIn, a model or any other third party. The content below is invented example data.</p></div>
          </div>
          <article className="hp-analysis-card" aria-label={`Illustrative analysis of a fictional ${sample.label}`}>
            <div className="hp-analysis-card__top"><span><ScanSearch size={15} aria-hidden="true" /> SIGNAL REPORT</span><span className="hp-example-label">FICTIONAL SAMPLE</span></div>
            <div className="hp-analysis-card__source"><span className={`hp-source-mark hp-source-mark--${active}`}>{active === "instagram" ? "IG" : active === "youtube" ? "YT" : active === "facebook" ? "f" : active === "linkedin" ? "in" : "X"}</span><div><strong>{sample.creator}</strong><small>{sample.kind}</small></div><button type="button" className="hp-copy-prompt" onClick={copyPrompt} aria-label="Copy example analysis prompt">{copied ? <Check size={15} aria-hidden="true" /> : <ClipboardCopy size={15} aria-hidden="true" />}{copied ? "Copied" : "Copy prompt"}</button></div>
            <h4>{sample.headline}</h4><p className="hp-analysis-card__caption">{sample.caption}</p>
            <div className="hp-extract"><span className="hp-small-label"><Play size={12} aria-hidden="true" /> TEXT, CAPTION OR TRANSCRIPT · SAMPLE</span><p>{sample.textExcerpt}</p></div>
            <div className="hp-analysis-card__metrics" aria-label="Fictional example engagement counts"><span><Eye size={13} aria-hidden="true" /> {sample.views}<small>views · example</small></span><span><Heart size={13} aria-hidden="true" /> {sample.likes}<small>likes · example</small></span><span><MessageCircle size={13} aria-hidden="true" /> {sample.replies}<small>replies · example</small></span></div>
            <div className="hp-comment"><span className="hp-small-label">CONVERSATION SIGNAL · SAMPLE</span><p>“{sample.comment}”</p></div>
          </article>
        </div>
        <p className="hp-link-demo__footnote">In the planned product, returned fields depend on what the platform makes publicly accessible and permits the integration to retrieve.</p>
      </div>
    </section>
  );
}
