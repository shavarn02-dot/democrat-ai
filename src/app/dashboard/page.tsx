"use client";

import { useEffect, useState } from "react";
import { AngleSelector } from "@/components/content/angle-selector";
import { DraftPreview } from "@/components/content/draft-preview";
import { PlatformSelector } from "@/components/content/platform-selector";
import { UrlInput } from "@/components/content/url-input";
import { VisualStudio } from "@/components/content/visual-studio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentAngle, Draft, Platform } from "@/lib/types";
import {
  Activity,
  Archive,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Layers,
  LayoutDashboard,
  Loader2,
  Plus,
  RefreshCw,
  Sparkles,
  Workflow,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  "Source captured",
  "Context understood",
  "Angle selected",
  "Platform selected",
  "Draft generated",
  "Ready for review",
];

export default function DashboardPage() {
  const [extracted, setExtracted] = useState<{
    url: string;
    title: string;
    content: string;
    summary: string;
  } | null>(null);
  const [angle, setAngle] = useState<ContentAngle | null>("founder-perspective");
  const [platform, setPlatform] = useState<Platform | null>("linkedin");
  const [generating, setGenerating] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState("pipeline");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const r = await fetch("/api/drafts");
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Could not load drafts");
      setDrafts(data.drafts || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load drafts");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDraft = async (id: string, updates: Partial<Draft>) => {
    try {
      const r = await fetch("/api/drafts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Update failed");
      }
      setDrafts((prev) =>
        prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update draft");
    }
  };

  const handleGenerate = async () => {
    if (!extracted || !angle || !platform) return;
    setGenerating(true);
    setProcessingStage(1);
    setError(null);

    try {
      const r = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: extracted.url,
          contentAngle: angle,
          targetPlatform: platform,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Generation failed");
      if (data.draft) {
        setDrafts((prev) => [data.draft, ...prev]);
        setTab("drafts");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const filteredDrafts = drafts.filter((d) => {
    if (statusFilter === "all") return true;
    return d.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#11110f] pb-24">
      {/* Top Workspace Header */}
      <header className="border-b border-black/10 bg-[#fbfaf6] px-6 py-4 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#11110f] text-white shadow-sm">
              <Sparkles className="h-4 w-4 text-[#ff5b3f]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-serif font-bold text-[#11110f]">Democrat Workspace</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ff5b3f]/10 text-[#ff5b3f] font-semibold">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-[#8b867d]">Connected to Supabase · Groq Llama 3.3 Active</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#5a574f] bg-[#f5f2ea] px-3 py-1.5 rounded-lg border border-black/5">
              <Radio className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
              <span>EDGE RUNTIME ACTIVE</span>
            </div>
            <button
              onClick={fetchDrafts}
              className="p-2 rounded-lg border border-black/10 bg-white hover:bg-black/5 text-[#11110f] transition"
              title="Refresh drafts"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* Metric Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-black/10 bg-[#fbfaf6] p-4 shadow-xs">
            <span className="text-[10px] font-mono text-[#8b867d] uppercase tracking-wider block">Total Drafts</span>
            <span className="text-2xl font-serif font-bold text-[#11110f] mt-1 block">{drafts.length}</span>
          </div>
          <div className="rounded-xl border border-black/10 bg-[#fbfaf6] p-4 shadow-xs">
            <span className="text-[10px] font-mono text-emerald-700 uppercase tracking-wider block">Approved</span>
            <span className="text-2xl font-serif font-bold text-emerald-800 mt-1 block">
              {drafts.filter((d) => d.status === "approved").length}
            </span>
          </div>
          <div className="rounded-xl border border-black/10 bg-[#fbfaf6] p-4 shadow-xs">
            <span className="text-[10px] font-mono text-[#ff5b3f] uppercase tracking-wider block">In Pipeline</span>
            <span className="text-2xl font-serif font-bold text-[#ff5b3f] mt-1 block">
              {drafts.filter((d) => d.status === "draft").length}
            </span>
          </div>
          <div className="rounded-xl border border-black/10 bg-[#fbfaf6] p-4 shadow-xs">
            <span className="text-[10px] font-mono text-[#5a574f] uppercase tracking-wider block">Throughput</span>
            <span className="text-2xl font-serif font-bold text-[#11110f] mt-1 block">&lt; 1.2s</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-xs flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="font-bold">✕</button>
          </div>
        )}

        {/* Tab Controls */}
        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-3">
            <TabsList className="bg-[#f5f2ea] p-1 rounded-xl border border-black/10">
              <TabsTrigger value="pipeline" className="gap-1.5 text-xs font-medium">
                <Workflow className="h-3.5 w-3.5" /> Pipeline Builder
              </TabsTrigger>
              <TabsTrigger value="studio" className="gap-1.5 text-xs font-medium">
                <Layers className="h-3.5 w-3.5 text-[#ff5b3f]" /> Visual Studio
              </TabsTrigger>
              <TabsTrigger value="drafts" className="gap-1.5 text-xs font-medium">
                <FileText className="h-3.5 w-3.5" /> Drafts Archive ({drafts.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: Core Pipeline Builder */}
          <TabsContent value="pipeline" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Configuration Column */}
              <div className="lg:col-span-6 space-y-6">
                <UrlInput onContentExtracted={setExtracted} />
                <AngleSelector selected={angle} onSelect={setAngle} />
                <PlatformSelector selected={platform} onSelect={setPlatform} />

                <div className="pt-2">
                  <button
                    onClick={handleGenerate}
                    disabled={generating || !extracted || !angle || !platform}
                    className="w-full h-13 rounded-xl bg-[#11110f] text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-black transition shadow-md active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-[#ff5b3f]" />
                        <span>Synthesizing channel draft with Groq...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate Multi-Channel Draft</span>
                        <ArrowRight className="h-4 w-4 text-[#ff5b3f]" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Output & Summary Column */}
              <div className="lg:col-span-6 space-y-6">
                {extracted ? (
                  <div className="rounded-2xl border border-black/10 bg-[#fbfaf6] p-6 shadow-sm">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#8b867d] border-b border-black/5 pb-3 mb-3">
                      <span>SOURCE EXTRACTED VIA JSDOM</span>
                      <span className="text-emerald-700 font-semibold">100% PARSED</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#11110f] mb-2">{extracted.title}</h3>
                    <p className="text-xs text-[#5a574f] leading-relaxed mb-4">{extracted.summary}</p>
                    <div className="p-3 rounded-lg bg-[#f5f2ea] text-[11px] font-mono text-[#8b867d] truncate">
                      {extracted.url}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-black/15 p-12 text-center text-[#8b867d] bg-[#fbfaf6]/50">
                    <Workflow className="h-8 w-8 mx-auto mb-3 opacity-40" />
                    <h4 className="text-sm font-medium text-[#11110f]">No source URL ingested yet</h4>
                    <p className="text-xs mt-1">Paste any article, blog post, or thread link to begin the pipeline.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: Visual Studio */}
          <TabsContent value="studio">
            <VisualStudio
              initialTitle={extracted?.title || "Taste as the Distribution Moat"}
              initialSummary={extracted?.summary}
              platform={platform || "linkedin"}
            />
          </TabsContent>

          {/* TAB 3: Drafts Archive */}
          <TabsContent value="drafts" className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4">
              <div className="flex gap-2">
                {["all", "draft", "approved", "rejected"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-mono uppercase transition",
                      statusFilter === s
                        ? "bg-[#11110f] text-white"
                        : "bg-[#f5f2ea] text-[#5a574f] hover:text-[#11110f]"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="py-16 text-center text-xs text-[#8b867d]">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-[#ff5b3f]" />
                Loading drafts from Supabase...
              </div>
            ) : filteredDrafts.length === 0 ? (
              <div className="py-16 text-center rounded-2xl border border-dashed border-black/15 bg-[#fbfaf6]">
                <Archive className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <h4 className="text-sm font-medium text-[#11110f]">No drafts found</h4>
                <p className="text-xs text-[#8b867d] mt-1">Generate your first draft in the Pipeline Builder tab.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDrafts.map((d) => (
                  <DraftPreview key={d.id} draft={d} onUpdate={handleUpdateDraft} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
