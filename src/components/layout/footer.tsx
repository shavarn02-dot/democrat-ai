import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="hp-footer">
      <div className="hp-wrap">
        <div className="hp-footer__main">
          <div className="hp-footer__brand">
            <Link href="/" className="hp-brand" aria-label="Democrat.ai home"><span className="hp-brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M7.5 10.1c0-3.3 2.6-5.9 5.8-5.9h5.4c3.2 0 5.8 2.6 5.8 5.8s-2.6 5.8-5.8 5.8h-5.4c-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8h5.4c3.2 0 5.8-2.6 5.8-5.8" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round"/><circle cx="16" cy="16" r="2.1" fill="currentColor"/></svg></span><span className="hp-brand__word">democrat<span>.ai</span></span></Link>
            <p>Social, in context. An India-first product direction for planning posts and understanding the public conversations around them.</p>
            <span className="hp-footer__location">Built with India in mind <i /> Early product preview</span>
          </div>
          <div className="hp-footer__column"><span>Explore</span><Link href="#how-it-works">How it works</Link><Link href="#features">Features</Link><Link href="#integrations">AI integrations</Link><Link href="#pricing">Pricing direction</Link></div>
          <div className="hp-footer__column"><span>Workspace</span><Link href="/auth/login">Sign in <ArrowUpRight size={12} aria-hidden="true" /></Link><Link href="/dashboard">Current dashboard</Link></div>
        </div>
        <div className="hp-footer__bottom"><span>© {new Date().getFullYear()} Democrat.ai</span><span>Product previews are illustrative. Social connections, MCP, publishing and pricing are not live.</span></div>
      </div>
    </footer>
  );
}
