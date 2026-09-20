"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Platform } from "@/lib/types";

interface PlatformSelectorProps {
  selected: Platform | null;
  onSelect: (platform: Platform) => void;
}

const platforms: {
  value: Platform;
  label: string;
  color: string;
  icon: string;
}[] = [
  {
    value: "linkedin",
    label: "LinkedIn",
    color: "bg-blue-600",
    icon: "in",
  },
  {
    value: "twitter",
    label: "Twitter/X",
    color: "bg-black",
    icon: "𝕏",
  },
  {
    value: "reddit",
    label: "Reddit",
    color: "bg-orange-500",
    icon: "r/",
  },
  {
    value: "facebook",
    label: "Facebook",
    color: "bg-blue-500",
    icon: "f",
  },
  {
    value: "blog",
    label: "Blog Post",
    color: "bg-green-600",
    icon: "B",
  },
];

export function PlatformSelector({ selected, onSelect }: PlatformSelectorProps) {
  return (
    <Card className="border-foreground/10 bg-card/85 shadow-lg shadow-foreground/5 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>Select Target Platform</CardTitle>
        <CardDescription>
          Where will you publish this content?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {platforms.map((platform) => (
            <button
              key={platform.value}
              onClick={() => onSelect(platform.value)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border p-4 transition-all hover:bg-muted/50",
                selected === platform.value &&
                  "border-primary bg-primary/5 ring-1 ring-primary"
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full text-white font-bold text-lg",
                  platform.color
                )}
              >
                {platform.icon}
              </div>
              <div className="text-center">
                <span className="text-sm font-medium">{platform.label}</span>
                {selected === platform.value && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    Selected
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
