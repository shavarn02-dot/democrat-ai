import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#02050e] text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-500 to-emerald-400 p-[1px]">
                <div className="w-full h-full bg-[#030712] rounded-[7px] flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                </div>
              </div>
              <span className="text-sm font-bold tracking-tight text-white">
                Democrat<span className="text-sky-400">.ai</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              The high-throughput AI operating system for converting authoritative source material into native platform distribution.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational · Cloudflare Workers Edge</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono tracking-wider text-slate-300 uppercase mb-4 font-semibold">
              Product
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400">
              <Link href="#pipeline" className="hover:text-white transition">Pipeline Telemetry</Link>
              <Link href="#platforms" className="hover:text-white transition">Social Grammar</Link>
              <Link href="#bento" className="hover:text-white transition">Bento Architecture</Link>
              <Link href="#governance" className="hover:text-white transition">Human Governance</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono tracking-wider text-slate-300 uppercase mb-4 font-semibold">
              Workspace
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400">
              <Link href="/auth/login" className="hover:text-white transition">Sign In</Link>
              <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
              <Link href="/auth/login" className="hover:text-white transition">Register Account</Link>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-mono">
          <span>&copy; {new Date().getFullYear()} Democrat.ai. Built for modern high-signal content operations.</span>
          <div className="flex items-center gap-6">
            <span>Powered by Groq Llama 3.3 70B &amp; Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
