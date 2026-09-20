import Link from "next/link";
import { Sparkles } from "lucide-react";
export function Footer(){return <footer className="footer-shell"><div className="section-shell !py-14"><div className="footer-grid grid grid-cols-[1.2fr_.8fr_.8fr] gap-10"><div><Link href="/" className="flex items-center gap-3"><span className="brand-mark"><Sparkles className="relative z-10 h-4 w-4"/></span><strong>Democrat<span className="text-[#ff5b3f]">.ai</span></strong></Link><p className="mt-5 max-w-sm text-sm leading-6 text-white/45">The AI operating system for turning source material into platform-native content.</p></div><div><small className="font-operational text-[9px] tracking-[.14em] text-white/35">PRODUCT</small><div className="mt-5 flex flex-col gap-3 text-sm text-white/60"><Link href="#system">System</Link><Link href="#platforms">Platforms</Link><Link href="/dashboard">Workspace</Link></div></div><div><small className="font-operational text-[9px] tracking-[.14em] text-white/35">GET STARTED</small><div className="mt-5 flex flex-col gap-3 text-sm text-white/60"><Link href="/auth/login">Log in</Link><Link href="/auth/login">Create account</Link></div></div></div><div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-[10px] text-white/30"><span>© {new Date().getFullYear()} Democrat.ai</span><span>BUILT FOR CLEARER IDEAS, EVERYWHERE.</span></div></div></footer>}"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">Democrat.ai</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              AI-powered content repurposing for creators, founders, and
              marketers.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Status
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Democrat.ai. Built with ❤️ for
          content creators.
        </div>
      </div>
    </footer>
  );
}
