"use client";

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
    <Card>
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
                "flex items-start gap-3 rounded-lg border p-4 text-left transition-all hover:bg-muted/50",
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
