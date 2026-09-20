"use client";
import { Briefcase,Code,GraduationCap,Lightbulb,Rocket,Smile } from "lucide-react";
import { ContentAngle } from "@/lib/types";
import { cn } from "@/lib/utils";
interface Props{selected:ContentAngle|null;onSelect:(angle:ContentAngle)=>void}
const angles=[
 ["professional","Professional","Evidence-led",Briefcase],["beginner-friendly","Beginner friendly","Clear + useful",GraduationCap],["founder-perspective","Founder POV","Lessons learned",Rocket],["technical","Technical","Deep + precise",Code],["casual","Conversational","Warm + direct",Smile],["thought-leadership","Thought leadership","Bold thesis",Lightbulb],
] as const;
export function AngleSelector({selected,onSelect}:Props){return <section className="workflow-panel"><div className="panel-head"><span className="panel-index">02</span><h2>Choose an editorial angle</h2><p>Controls voice and framing</p></div><div className="selector-grid">{angles.map(([value,label,description,Icon])=><button type="button" aria-pressed={selected===value} key={value} onClick={()=>onSelect(value)} className={cn("selector-option",selected===value&&"selected")}><Icon className="h-4 w-4"/><strong>{label}</strong><small>{description}</small></button>)}</div></section>}"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ContentAngle } from "@/lib/types";
import {
  Briefcase,
  GraduationCap,
  Rocket,
  Code,
  Smile,
  Lightbulb,
} from "lucide-react";

interface AngleSelectorProps {
  selected: ContentAngle | null;
  onSelect: (angle: ContentAngle) => void;
}

const angles: {
  value: ContentAngle;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    value: "professional",
    label: "Professional",
    description: "Industry insights and data-driven points",
    icon: Briefcase,
  },
  {
    value: "beginner-friendly",
    label: "Beginner-Friendly",
    description: "Simple language, easy to understand",
    icon: GraduationCap,
  },
  {
    value: "founder-perspective",
    label: "Founder Perspective",
    description: "Startup journey and entrepreneurial insights",
    icon: Rocket,
  },
  {
    value: "technical",
    label: "Technical",
    description: "Deep-dive for developers and tech audiences",
    icon: Code,
  },
  {
    value: "casual",
    label: "Casual",
    description: "Friendly, conversational, relatable",
    icon: Smile,
  },
  {
    value: "thought-leadership",
    label: "Thought Leadership",
    description: "Unique perspectives and bold ideas",
    icon: Lightbulb,
  },
];

export function AngleSelector({ selected, onSelect }: AngleSelectorProps) {
  return (
    <Card className="border-foreground/10 bg-card/85 shadow-lg shadow-foreground/5 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>Choose Content Angle</CardTitle>
        <CardDescription>
          How should your content sound?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {angles.map((angle) => (
            <button
              key={angle.value}
              onClick={() => onSelect(angle.value)}
              className={cn(
                "flex items-start gap-3 rounded-2xl border border-foreground/10 bg-background/50 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-xl hover:bg-muted/50",
                selected === angle.value &&
                  "border-primary bg-primary/5 ring-1 ring-primary"
              )}
            >
              <angle.icon
                className={cn(
                  "mt-0.5 h-5 w-5 shrink-0",
                  selected === angle.value
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{angle.label}</span>
                  {selected === angle.value && (
                    <Badge variant="secondary" className="text-xs">
                      Selected
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {angle.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
