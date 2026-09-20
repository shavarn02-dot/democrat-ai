"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, Loader2, CheckCircle } from "lucide-react";

interface UrlInputProps {
  onContentExtracted: (data: {
    url: string;
    title: string;
    content: string;
    summary: string;
  }) => void;
}

export function UrlInput({ onContentExtracted }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = async () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to extract content");
      }

      onContentExtracted({
        url,
        title: data.data.title,
        content: data.data.content,
        summary: data.data.summary,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border-foreground/10 bg-card/85 shadow-xl shadow-foreground/5 backdrop-blur-xl transition-all duration-500 hover:border-accent/25">
      <CardHeader className="border-b border-foreground/8 bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          Paste Your Content URL
        </CardTitle>
        <CardDescription>
          YouTube, Instagram, Twitter, Reddit, or any blog post URL
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleExtract()}
            disabled={loading}
            className="h-12 flex-1 rounded-xl border-foreground/10 bg-background/80"
          />
          <Button onClick={handleExtract} disabled={loading || !url.trim()} className="h-12 rounded-xl px-5 shadow-lg shadow-foreground/10 transition-transform duration-300 hover:-translate-y-0.5">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
          </Button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}
