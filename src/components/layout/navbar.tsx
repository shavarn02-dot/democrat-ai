"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["How it works", "#how-it-works"],
  ["Features", "#features"],
  ["AI agents", "#integrations"],
  ["Pricing", "#pricing"],
] as const;

function Mark() {
  return (
    <span className="hp-brand-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M7.5 10.1c0-3.3 2.6-5.9 5.8-5.9h5.4c3.2 0 5.8 2.6 5.8 5.8s-2.6 5.8-5.8 5.8h-5.4c-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8h5.4c3.2 0 5.8-2.6 5.8-5.8" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
        <circle cx="16" cy="16" r="2.1" fill="currentColor" />
      </svg>
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="hp-header">
      <div className="hp-header__inner">
        <Link href="/" className="hp-brand" aria-label="Democrat.ai home" onClick={() => setOpen(false)}>
          <Mark />
          <span className="hp-brand__word">democrat<span>.ai</span></span>
        </Link>
        <nav className="hp-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="hp-header__actions">
          <Link href="/auth/login" className="hp-signin">Sign in</Link>
          <Link href="/auth/login" className="hp-button hp-button--dark hp-button--small">Workspace <ArrowUpRight size={14} aria-hidden="true" /></Link>
          <button className="hp-menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="hp-mobile-nav" onClick={() => setOpen(!open)}>
            {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="hp-mobile-nav" className={`hp-mobile-nav${open ? " is-open" : ""}`} aria-label="Mobile navigation" aria-hidden={!open} inert={!open}>
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowDownRight size={15} aria-hidden="true" /></Link>)}
        <Link href="/auth/login" onClick={() => setOpen(false)}>Sign in to workspace<ArrowUpRight size={15} aria-hidden="true" /></Link>
      </nav>
    </header>
  );
}
