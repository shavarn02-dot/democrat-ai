"use client";
import {useEffect,useMemo,useState} from "react";
import {AngleSelector} from "@/components/content/angle-selector";import {DraftPreview} from "@/components/content/draft-preview";import {PlatformSelector} from "@/components/content/platform-selector";import {UrlInput} from "@/components/content/url-input";import {Tabs,TabsContent,TabsList,TabsTrigger} from "@/components/ui/tabs";import {ContentAngle,Draft,Platform} from "@/lib/types";
import {Activity,Archive,ArrowRight,Check,Clock3,FileText,LayoutDashboard,Loader2,Menu,Plus,Settings,Sparkles,Workflow} from "lucide-react";
const stages=["Source captured","Context understood","Angle selected","Platform selected","Draft generated","Ready for review"];
export default function DashboardPage(){const[extracted,setExtracted]=useState<{url:string;title:string;content:string;summary:string}|null>(null);const[angle,setAngle]=useState<ContentAngle|null>(null);const[platform,setPlatform]=useState<Platform|null>(null);const[generating,setGenerating]=useState(false);const[processingStage,setProcessingStage]=useState(0);const[drafts,setDrafts]=useState<Draft[]>([]);const[loading,setLoading]=useState(true);const[error,setError]=useState<string|null>(null);const[tab,setTab]=useState("create");
useEffect(()=>{fetchDrafts()},[]);useEffect(()=>{if(!generating)return;const id=window.setInterval(()=>setProcessingStage(v=>Math.min(v+1,4)),1250);return()=>clearInterval(id)},[generating]);
const fetchDrafts=async()=>{try{const r=await fetch("/api/drafts");const data=await r.json();if(!r.ok)throw new Error(data.error||"Could not load drafts");setDrafts(data.drafts||[])}catch(e){setError(e instanceof Error?e.message:"Could not load drafts")}finally{setLoading(false)}};
const generate=async()=>{if(!extracted||!angle||!platform)return;setGenerating(true);setProcessingStage(1);setError(null);try{const r=await fetch("/api/process",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:extracted.url,contentAngle:angle,targetPlatform:platform,sourceContent:extracted.content,sourceTitle:extracted.title})});const data=await r.json();if(!r.ok)throw new Error(data.error||"Generation failed");setProcessingStage(5);setDrafts(v=>[data.draft,...v]);setTimeout(()=>{setExtracted(null);setAngle(null);setPlatform(null);setTab("drafts")},450)}catch(e){setError(e instanceof Error?e.message:"Generation failed")}finally{setGenerating(false)}};
const update=async(id:string,updates:Partial<Draft>)=>{setError(null);const previous=drafts;setDrafts(v=>v.map(d=>d.id===id?{...d,...updates}:d));try{const r=await fetch("/api/drafts",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,...updates})});const data=await r.json();if(!r.ok)throw new Error(data.error||"Update failed");setDrafts(v=>v.map(d=>d.id===id?data.draft:d))}catch(e){setDrafts(previous);setError(e instanceof Error?e.message:"Update failed");throw e}};
const progress=useMemo(()=>{if(generating)return processingStage;if(extracted&&angle&&platform)return 3;if(extracted&&angle)return 2;if(extracted)return 1;return 0},[generating,processingStage,extracted,angle,platform]);const approved=drafts.filter(d=>d.status==="approved").length;const pending=drafts.filter(d=>d.status==="draft").length;
return <div className="app-shell"><aside className="app-sidebar"><div className="sidebar-brand"><span className="brand-mark"><Sparkles className="relative z-10 h-4 w-4"/></span><strong className="text-sm">Democrat<span className="text-[#ff5b3f]">.ai</span></strong></div><nav className="sidebar-nav" aria-label="Workspace"><button className="active"><LayoutDashboard className="h-4 w-4"/>Workspace</button><button onClick={()=>setTab("create")}><Workflow className="h-4 w-4"/>Create content</button><button onClick={()=>setTab("drafts")}><FileText className="h-4 w-4"/>Draft library</button><button disabled title="Analytics is not available yet"><Activity className="h-4 w-4"/>Analytics</button><button disabled title="Settings are not available yet"><Settings className="h-4 w-4"/>Settings</button></nav><div className="sidebar-foot"><div className="credit-card"><small>WORKSPACE USAGE</small><strong>{drafts.length} drafts created</strong><div className="credit-meter"><i/></div></div></div></aside><main className="app-main"><div className="mobile-appbar"><div className="flex items-center gap-2"><span className="brand-mark !h-8 !w-8"><Sparkles className="relative z-10 h-3.5 w-3.5"/></span><strong className="text-sm">Democrat.ai</strong></div><button aria-label="Open navigation"><Menu className="h-5 w-5"/></button></div><header className="app-topbar"><div className="app-context"><b>Personal workspace</b><span>/</span><span>Content operations</span></div><div className="flex items-center gap-3 text-[10px] text-[#77736b]"><Clock3 className="h-3.5 w-3.5"/>AI systems operational</div></header><div className="app-content"><div className="app-heading"><div><span className="section-index">CONTENT COMMAND CENTER</span><h1 className="mt-3">Good evening.</h1><p>Turn a source into a platform-ready draft, then decide what ships.</p></div><div className="metrics"><div className="metric"><small>Total drafts</small><strong>{drafts.length}</strong></div><div className="metric"><small>Needs review</small><strong>{pending}</strong></div><div className="metric"><small>Approved</small><strong>{approved}</strong></div></div></div>{error&&<div role="alert" className="mt-6 flex items-center justify-between rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs text-red-800"><span>{error}</span><button onClick={()=>setError(null)} className="font-semibold">Dismiss</button></div>}<Tabs value={tab} onValueChange={setTab} className="mt-1"><TabsList className="workspace-tabs"><TabsTrigger value="create"><Plus className="mr-2 h-3.5 w-3.5"/>Create</TabsTrigger><TabsTrigger value="drafts"><Archive className="mr-2 h-3.5 w-3.5"/>Drafts · {drafts.length}</TabsTrigger></TabsList><TabsContent value="create"><div className="create-layout"><div className="workflow-column"><UrlInput onContentExtracted={setExtracted}/>{extracted&&<section className="workflow-panel"><div className="panel-head"><span className="panel-index"><Check className="h-3 w-3"/></span><h2>Source intelligence</h2><p>Grounding complete</p></div><div className="source-summary"><div><h3>{extracted.title}</h3><p>{extracted.summary||`${extracted.content.slice(0,260)}…`}</p></div><span className="source-ready">Ready</span></div></section>}<AngleSelector selected={angle} onSelect={setAngle}/><PlatformSelector selected={platform} onSelect={setPlatform}/></div><aside className="rail-panel"><span className="rail-kicker">LIVE WORKFLOW</span><h3>{generating?"Building your draft":"Distribution pipeline"}</h3><div className="rail-steps">{stages.map((stage,i)=><div key={stage} className={`rail-step ${i<progress?"complete":""} ${i===progress?"active":""}`}><i/><span>{stage}</span></div>)}</div><button onClick={generate} disabled={!extracted||!angle||!platform||generating} className="generate-button">{generating?<><Loader2 className="h-4 w-4 animate-spin"/>{stages[processingStage]}</>:<>Generate draft<ArrowRight className="h-4 w-4"/></>}</button><p className="processing-note">Generation uses the selected source, angle, and platform. Nothing is published automatically.</p></aside></div></TabsContent><TabsContent value="drafts"><div className="mt-5">{loading?<div className="empty-state"><div><Loader2 className="mx-auto h-7 w-7 animate-spin"/><p className="mt-4 text-xs text-[#77736b]">Loading your content library…</p></div></div>:drafts.length===0?<div className="empty-state"><div><span className="empty-icon mx-auto"><FileText className="h-5 w-5"/></span><h2 className="mt-5 text-lg font-semibold">Your first draft starts with a source.</h2><p className="mt-2 text-xs text-[#77736b]">Paste a URL and Democrat.ai will build the first platform-ready version.</p><button onClick={()=>setTab("create")} className="signal-button mt-5">Create first draft<ArrowRight className="h-4 w-4"/></button></div></div>:<div className="draft-grid">{drafts.map(d=><DraftPreview key={d.id} draft={d} onUpdate={update}/>)}</div>}</div></TabsContent></Tabs></div></main></div>}"use client";

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
