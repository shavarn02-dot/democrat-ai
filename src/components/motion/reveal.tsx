"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

export function Reveal({ children, className = "", delay = 0, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    setEnhanced(true);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        if (once) observer.unobserve(node);
      } else if (!once) {
        setVisible(false);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const state = !enhanced ? "visible" : visible ? "visible" : "pending";
  return (
    <div ref={ref} className={`reveal-shell ${className}`} data-reveal={state} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}
