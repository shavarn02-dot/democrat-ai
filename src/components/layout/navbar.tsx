"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Democrat.ai</span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          <Link
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="sm">Get Started Free</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
