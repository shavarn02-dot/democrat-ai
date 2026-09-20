"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlInput } from "@/components/content/url-input";
import { AngleSelector } from "@/components/content/angle-selector";
import { PlatformSelector } from "@/components/content/platform-selector";
import { DraftPreview } from "@/components/content/draft-preview";
import { Draft, ContentAngle, Platform } from "@/lib/types";
import { Loader2, Sparkles, FileText, Plus } from "lucide-react";

export default function DashboardPage() {
  const [extractedContent, setExtractedContent] = useState<{
    url: string;
    title: string;
    content: string;
    summary: string;
  } | null>(null);
  const [selectedAngle, setSelectedAngle] = useState<ContentAngle | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [generating, setGenerating] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loadingDrafts, setLoadingDrafts] = useState(true);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const response = await fetch("/api/drafts");
      const data = await response.json();
      if (data.drafts) {
        setDrafts(data.drafts);
      }
    } catch (error) {
      console.error("Failed to fetch drafts:", error);
    } finally {
      setLoadingDrafts(false);
    }
  };

  const handleGenerate = async () => {
    if (!extractedContent || !selectedAngle || !selectedPlatform) return;

    setGenerating(true);

    try {
      const response = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: extractedContent.url,
          contentAngle: selectedAngle,
          targetPlatform: selectedPlatform,
          sourceContent: extractedContent.content,
          sourceTitle: extractedContent.title,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate content");
      }

      setDrafts((prev) => [data.draft, ...prev]);

      setExtractedContent(null);
      setSelectedAngle(null);
      setSelectedPlatform(null);
    } catch (error) {
      console.error("Generation error:", error);
      alert("Failed to generate content. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleDraftUpdate = async (id: string, updates: Partial<Draft>) => {
    try {
      const response = await fetch("/api/drafts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });

      const data = await response.json();

      if (data.draft) {
        setDrafts((prev) =>
          prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
        );
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleNewDraft = () => {
    setExtractedContent(null);
    setSelectedAngle(null);
    setSelectedPlatform(null);
  };

  const approvedDrafts = drafts.filter((d) => d.status === "approved");
  const pendingDrafts = drafts.filter((d) => d.status === "draft");
  const rejectedDrafts = drafts.filter((d) => d.status === "rejected");

  return (
    <div className="min-h-screen bg-background grid-sheen">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between reveal-up">
          <div>
            <div><div className="mb-2 text-[10px] font-semibold uppercase tracking-[.22em] text-accent">Content operating system</div><h1 className="text-4xl font-semibold tracking-[-0.04em]">Dashboard</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Create and manage your repurposed content
            </p>
          </div>
          <Button onClick={handleNewDraft} className="group gap-2 rounded-full px-5 shadow-lg shadow-foreground/10 transition-transform duration-300 hover:-translate-y-0.5">
            <Plus className="h-4 w-4" />
            New Content
          </Button>
        </div>

        <Tabs defaultValue="create" className="space-y-6 reveal-up [animation-delay:100ms]">
          <TabsList className="rounded-full border border-foreground/10 bg-card/80 p-1 shadow-sm backdrop-blur">
            <TabsTrigger value="create" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Create
            </TabsTrigger>
            <TabsTrigger value="drafts" className="gap-2">
              <FileText className="h-4 w-4" />
              Drafts ({drafts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <UrlInput onContentExtracted={setExtractedContent} />

            {extractedContent && (
              <Card>
                <CardHeader>
                  <CardTitle>Extracted Content</CardTitle>
                  <CardDescription>{extractedContent.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {extractedContent.summary || extractedContent.content.substring(0, 300)}...
                  </p>
                </CardContent>
              </Card>
            )}

            <AngleSelector selected={selectedAngle} onSelect={setSelectedAngle} />

            <PlatformSelector selected={selectedPlatform} onSelect={setSelectedPlatform} />

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={!extractedContent || !selectedAngle || !selectedPlatform || generating}
                className="gap-2 px-8"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Content
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="drafts" className="space-y-6">
            {loadingDrafts ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : drafts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No drafts yet. Create your first piece of content!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingDrafts.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">
                      Pending Review ({pendingDrafts.length})
                    </h3>
                    <div className="space-y-4">
                      {pendingDrafts.map((draft) => (
                        <DraftPreview
                          key={draft.id}
                          draft={draft}
                          onUpdate={handleDraftUpdate}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {approvedDrafts.length > 0 && (
                  <div>
                    <Separator className="my-6" />
                    <h3 className="mb-3 text-lg font-semibold">
                      Approved ({approvedDrafts.length})
                    </h3>
                    <div className="space-y-4">
                      {approvedDrafts.map((draft) => (
                        <DraftPreview
                          key={draft.id}
                          draft={draft}
                          onUpdate={handleDraftUpdate}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {rejectedDrafts.length > 0 && (
                  <div>
                    <Separator className="my-6" />
                    <h3 className="mb-3 text-lg font-semibold text-muted-foreground">
                      Rejected ({rejectedDrafts.length})
                    </h3>
                    <div className="space-y-4 opacity-60">
                      {rejectedDrafts.map((draft) => (
                        <DraftPreview
                          key={draft.id}
                          draft={draft}
                          onUpdate={handleDraftUpdate}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
