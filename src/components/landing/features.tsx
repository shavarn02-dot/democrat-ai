import Link from "next/link";
import { ArrowDownRight, ArrowRight, Check, CircleHelp } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SocialLinkDemo } from "@/components/landing/social-link-demo";
import { AgentDemo, AnalyticsDemo } from "@/components/landing/interactive-demos";

const workflow = [
  { number: "01", title: "Bring your channels together.", body: "An intended managed OAuth connection for Instagram, YouTube, Facebook, X and LinkedIn—without asking you to bring your own developer keys.", state: "Planned" },
  { number: "02", title: "Make one idea fit each place.", body: "Shape platform-aware captions, reuse a post thoughtfully, and keep a calendar that gives a creator or small team room to think.", state: "Product direction" },
  { number: "03", title: "Review first. Then publish.", body: "Plan cross-posts and automation with human control. Actual scheduling and publishing are not enabled in this preview.", state: "Planned" },
];

const questions = [
  { question: "Can I connect my social accounts now?", answer: "Not in this preview. Managed OAuth connections for Instagram, YouTube, Facebook, X and LinkedIn are planned. Signing in to Democrat.ai is separate from connecting a social publishing account." },
  { question: "Does this demo fetch a post when I paste a link?", answer: "No. The homepage interaction uses fictional sample data in your browser and does not send your URL to a platform or AI service. A future MCP flow will return only content the relevant platform makes available and permits the service to access." },
  { question: "What is the expected pricing?", answer: "The business model is planned around a free tier and a 30-day trial with limited credits. Early paid-plan expectations are about ₹149–₹299 per month, with metered credits on every plan and no unlimited tier. These are estimates, not an active offer." },
  { question: "Will an AI agent publish on my behalf?", answer: "MCP and REST connections are on the product roadmap. The homepage shows the intended interaction; no agent connection or social publishing action is live here." },
];

export function Features() {
  return (
    <>
      <SocialLinkDemo />

      <section className="hp-workflow-section" id="how-it-works" aria-labelledby="hp-workflow-heading">
        <div className="hp-wrap">
          <div className="hp-section-heading hp-section-heading--split">
            <div><p className="hp-section-index">02 / ONE WORKING RHYTHM</p><h2 id="hp-workflow-heading">Less work between<br /><em>good ideas and good posts.</em></h2></div>
            <p>One connected direction for planning, writing and learning from social—not another pile of tabs. The real channel workflows are part of the roadmap.</p>
          </div>
          <div className="hp-workflow-list">
            {workflow.map((item) => (
              <Reveal key={item.number} className="hp-workflow-reveal">
                <article className="hp-workflow-row">
                  <span className="hp-workflow-row__number">{item.number}</span>
                  <div className="hp-workflow-row__copy"><h3>{item.title}</h3><p>{item.body}</p></div>
                  <span className="hp-plan-state">{item.state}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="hp-feature-section" id="features" aria-labelledby="hp-feature-heading">
        <div className="hp-wrap hp-feature-grid">
          <div className="hp-feature-copy">
            <p className="hp-section-index">03 / THE WORK AROUND THE POST</p>
            <h2 id="hp-feature-heading">Stay close to the signal.<br /><em>Let the admin get smaller.</em></h2>
            <p>Plan for the channels you use. Keep an edit for every platform. See the shape of the conversation before deciding what to say next.</p>
            <Link href="#pricing" className="hp-text-link">How the credit model works <ArrowDownRight size={15} aria-hidden="true" /></Link>
          </div>
          <AnalyticsDemo />
        </div>

        <div className="hp-wrap hp-capability-strip">
          <article><span>01</span><h3>Content calendar</h3><p>Find a cadence without losing the thread.</p><small className="hp-capability-status">Planned feature</small></article>
          <article><span>02</span><h3>AI-assisted captions</h3><p>Keep each version shaped for its destination.</p><small className="hp-capability-status">Planned feature</small></article>
          <article><span>03</span><h3>Competitor context</h3><p>Spot patterns without confusing them for your voice.</p><small className="hp-capability-status">Planned feature</small></article>
          <article><span>04</span><h3>Credit-aware automation</h3><p>Set useful limits. “Unlimited” isn’t the plan.</p><small className="hp-capability-status">Planned feature</small></article>
        </div>
      </section>

      <section className="hp-agent-section" id="integrations" aria-labelledby="hp-agent-heading">
        <div className="hp-wrap hp-agent-grid">
          <div className="hp-agent-copy">
            <p className="hp-section-index hp-section-index--light">04 / BUILT FOR YOUR AI TOOLCHAIN</p>
            <h2 id="hp-agent-heading">Your agent has a link.<br /><em>Give it the context.</em></h2>
            <p>Imagine pasting a Reel, a video or a post into ChatGPT, Claude, Codex or another agent—and asking a better question because it can see the post’s available context.</p>
            <p className="hp-agent-status"><span /> Planned MCP + REST API · Not live yet</p>
          </div>
          <AgentDemo />
        </div>
        <div className="hp-wrap hp-integrations-row"><span>DESIGNED AROUND</span><b>ChatGPT</b><b>Claude</b><b>Codex</b><b>REST</b><b>MCP</b><span>Planned integrations</span></div>
      </section>

      <section className="hp-platform-section" aria-label="Planned social media connections">
        <div className="hp-wrap hp-platform-row"><div><p className="hp-section-index">THE CHANNEL MIX</p><h2>One desk, not five tabs.</h2></div><div className="hp-platforms"><span><i>IG</i>Instagram</span><span><i>YT</i>YouTube</span><span><i>f</i>Facebook</span><span><i>𝕏</i>X</span><span><i>in</i>LinkedIn</span></div><p className="hp-platform-note">Planned OAuth connections. No social accounts are connected in this preview.</p></div>
      </section>

      <section className="hp-pricing-section" id="pricing" aria-labelledby="hp-pricing-heading">
        <div className="hp-wrap">
          <div className="hp-section-heading hp-section-heading--split">
            <div><p className="hp-section-index">05 / INDIA-FIRST BY DESIGN</p><h2 id="hp-pricing-heading">Small-team pricing.<br /><em>Clear credit limits.</em></h2></div>
            <p>The model is designed for creators and small teams—not enterprise procurement. Every tier would have a clear usage budget; there is no unlimited plan.</p>
          </div>
          <div className="hp-price-layout">
            <div className="hp-price-intro"><span className="hp-price-stamp">PLANNING RANGE · NOT FINAL PRICING</span><p>Expected paid plans around</p><strong>₹149—₹299<span> / month</span></strong><p>Freemium + a 30-day trial with limited credits are part of the plan. Checkout and trial access are not live on this page.</p><Link href="#social-link-intelligence" className="hp-text-link">Explore the product concept <ArrowRight size={15} aria-hidden="true" /></Link></div>
            <div className="hp-credit-card"><div className="hp-credit-card__ornament" aria-hidden="true"><span /><span /><span /></div><span className="hp-overline">A SIMPLE PROMISE</span><h3>Know what you spend.<br />Keep your voice.</h3><ul><li><Check size={15} aria-hidden="true" /> Credits meter every plan</li><li><Check size={15} aria-hidden="true" /> No “unlimited” usage tier</li><li><Check size={15} aria-hidden="true" /> Prices shown in Indian rupees</li></ul><span className="hp-credit-card__note">Plan details and credit quotas remain to be finalized.</span></div>
          </div>
        </div>
      </section>

      <section className="hp-faq-section" aria-labelledby="hp-faq-heading">
        <div className="hp-wrap hp-faq-grid">
          <div><p className="hp-section-index">GOOD QUESTIONS</p><h2 id="hp-faq-heading">A few things<br /><em>worth knowing.</em></h2><p className="hp-faq-side"><CircleHelp size={16} aria-hidden="true" /> What you see here is a product preview, not an integration status dashboard.</p></div>
          <div className="hp-faq-list">{questions.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="hp-final-cta"><div className="hp-wrap hp-final-cta__inner"><p className="hp-section-index hp-section-index--light">THE NEXT POST CAN START WITH BETTER CONTEXT</p><h2>Understand what resonates.<br /><em>Decide what happens next.</em></h2><Link href="#social-link-intelligence" className="hp-button hp-button--paper">Explore the sample <ArrowDownRight size={15} aria-hidden="true" /></Link><p>All product surfaces on this page are illustrative except the existing Democrat.ai sign-in.</p></div></section>
    </>
  );
}
