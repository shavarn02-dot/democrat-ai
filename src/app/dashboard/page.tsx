"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlInput } from "@/components/content/url-input";
import { AngleSelector } from "@/components/content/angle-selector";
import { PlatformSelector } from "@/components/content/platform-selector";
import { DraftPreview } from "@/components/content/draft-preview";
import { Draft, ContentAngle, Platform } from "@/lib/types";
import { Activity, ArrowUpRight, Check, FileText, FolderOpen, Image as ImageIcon, LayoutDashboard, Loader2, Plus, Settings2, Sparkles, WandSparkles } from "lucide-react";

export default function DashboardPage() {
  const [extractedContent, setExtractedContent] = useState<{ url: string; title: string; content: string; summary: string } | null>(null);
  const [selectedAngle, setSelectedAngle] = useState<ContentAngle | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [generating, setGenerating] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loadingDrafts, setLoadingDrafts] = useState(true);

  useEffect(() => { fetchDrafts(); }, []);
  const fetchDrafts = async () => { try { const response = await fetch("/api/drafts"); const data = await response.json(); if (data.drafts) setDrafts(data.drafts); } catch (error) { console.error("Failed to fetch drafts:", error); } finally { setLoadingDrafts(false); } };
  const handleGenerate = async () => {
    if (!extractedContent || !selectedAngle || !selectedPlatform) return;
    setGenerating(true);
    try {
      const response = await fetch("/api/process", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: extractedContent.url, contentAngle: selectedAngle, targetPlatform: selectedPlatform, sourceContent: extractedContent.content, sourceTitle: extractedContent.title }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Failed to generate content");
      setDrafts((prev) => [data.draft, ...prev]); setExtractedContent(null); setSelectedAngle(null); setSelectedPlatform(null);
    } catch (error) { console.error("Generation error:", error); alert("Failed to generate content. Please try again."); } finally { setGenerating(false); }
  };
  const handleDraftUpdate = async (id: string, updates: Partial<Draft>) => { try { const response = await fetch("/api/drafts", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...updates }) }); const data = await response.json(); if (data.draft) setDrafts((prev) => prev.map((d) => d.id === id ? { ...d, ...updates } : d)); } catch (error) { console.error("Update error:", error); } };
  const handleNewDraft = () => { setExtractedContent(null); setSelectedAngle(null); setSelectedPlatform(null); };
  const approvedDrafts = drafts.filter((d) => d.status === "approved");
  const pendingDrafts = drafts.filter((d) => d.status === "draft");
  const rejectedDrafts = drafts.filter((d) => d.status === "rejected");

  return <div className="min-h-screen bg-background dashboard-shell">
    <aside className="dashboard-sidebar"><a href="/" className="dashboard-brand"><span className="brand-mark"><Sparkles className="h-4 w-4" /></span><span>Democrat<span className="text-accent">.ai</span></span></a><div className="sidebar-label">Workspace</div><nav className="sidebar-nav"><a className="is-current" href="#create"><LayoutDashboard className="h-4 w-4" /> Overview</a><a href="#drafts"><FileText className="h-4 w-4" /> Drafts <span>{drafts.length}</span></a><a href="#media"><ImageIcon className="h-4 w-4" /> Visual library</a><a href="#activity"><Activity className="h-4 w-4" /> Activity</a></nav><div className="sidebar-spacer" /><div className="sidebar-card"><WandSparkles className="h-4 w-4 text-accent" /><strong>Source-grounded</strong><span>Your content stays in context.</span></div><a className="sidebar-settings" href="#settings"><Settings2 className="h-4 w-4" /> Settings</a></aside>
    <main className="dashboard-main"><div className="dashboard-topbar"><div><span className="dashboard-kicker">CONTENT OPERATING SYSTEM / OCTOBER 2026</span><h1>Good morning. Make something worth sharing.</h1></div><Button onClick={handleNewDraft} className="gap-2 rounded-full px-5 shadow-lg shadow-foreground/10"><Plus className="h-4 w-4" /> New Content</Button></div>
      <div className="dashboard-stats"><div><span>Pieces shipped</span><strong>{approvedDrafts.length + 12}</strong><small><ArrowUpRight className="h-3 w-3" /> 24% this month</small></div><div><span>In review</span><strong>{pendingDrafts.length}</strong><small>Ready for your eye</small></div><div><span>Time reclaimed</span><strong>8.4h</strong><small>Across this workspace</small></div></div>
      <div id="media" className="media-feature"><div className="media-feature-copy"><span className="dashboard-kicker">VISUAL INTELLIGENCE</span><h2>Every story deserves a point of view.</h2><p>Democrat finds the signal, shapes the story, then gives every channel a visual language that feels native.</p><div className="media-points"><span><Check className="h-3.5 w-3.5" /> Source-aware</span><span><Check className="h-3.5 w-3.5" /> Platform-native</span><span><Check className="h-3.5 w-3.5" /> Human-approved</span></div></div><div className="media-feature-image"><img src="/media/analytics-screen.jpg" alt="Visual content analytics preview" /><div className="media-overlay"><span><span className="live-dot" /> Visual selected</span><strong>3 variants ready</strong></div></div></div>
      <Tabs defaultValue="create" className="space-y-6" id="create"><TabsList className="rounded-full border border-foreground/10 bg-card/80 p-1 shadow-sm backdrop-blur"><TabsTrigger value="create" className="gap-2"><Sparkles className="h-4 w-4" /> Create</TabsTrigger><TabsTrigger value="drafts" className="gap-2"><FileText className="h-4 w-4" /> Drafts ({drafts.length})</TabsTrigger></TabsList>
        <TabsContent value="create" className="space-y-6"><UrlInput onContentExtracted={setExtractedContent} />{extractedContent && <Card><CardHeader><CardTitle>Extracted Content</CardTitle><CardDescription>{extractedContent.title}</CardDescription></CardHeader><CardContent><p className="text-sm text-muted-foreground line-clamp-3">{extractedContent.summary || extractedContent.content.substring(0, 300)}...</p></CardContent></Card>}<AngleSelector selected={selectedAngle} onSelect={setSelectedAngle} /><PlatformSelector selected={selectedPlatform} onSelect={setSelectedPlatform} /><div className="flex justify-center"><Button size="lg" onClick={handleGenerate} disabled={!extractedContent || !selectedAngle || !selectedPlatform || generating} className="gap-2 px-8">{generating ? <><Loader2 className="h-5 w-5 animate-spin" /> Generating...</> : <><Sparkles className="h-5 w-5" /> Generate Content</>}</Button></div></TabsContent>
        <TabsContent value="drafts" className="space-y-6" id="drafts">{loadingDrafts ? <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div> : drafts.length === 0 ? <Card><CardContent className="flex flex-col items-center justify-center py-12"><FolderOpen className="mb-4 h-12 w-12 text-muted-foreground" /><p className="text-muted-foreground">No drafts yet. Create your first piece of content.</p></CardContent></Card> : <div className="space-y-4">{pendingDrafts.length > 0 && <div><h3 className="mb-3 text-lg font-semibold">Pending Review ({pendingDrafts.length})</h3>{pendingDrafts.map((draft) => <DraftPreview key={draft.id} draft={draft} onUpdate={handleDraftUpdate} />)}</div>}{approvedDrafts.length > 0 && <div><Separator className="my-6" /><h3 className="mb-3 text-lg font-semibold">Approved ({approvedDrafts.length})</h3>{approvedDrafts.map((draft) => <DraftPreview key={draft.id} draft={draft} onUpdate={handleDraftUpdate} />)}</div>}{rejectedDrafts.length > 0 && <div><Separator className="my-6" /><h3 className="mb-3 text-lg font-semibold text-muted-foreground">Rejected ({rejectedDrafts.length})</h3>{rejectedDrafts.map((draft) => <DraftPreview key={draft.id} draft={draft} onUpdate={handleDraftUpdate} />)}</div>}</div>}</TabsContent>
      </Tabs>
    </main>
  </div>;
}
