"use client";
import { useState } from "react";
import { ArrowRight, Link2, Loader2 } from "lucide-react";
interface Props{onContentExtracted:(data:{url:string;title:string;content:string;summary:string})=>void}
export function UrlInput({onContentExtracted}:Props){const[url,setUrl]=useState("");const[loading,setLoading]=useState(false);const[error,setError]=useState<string|null>(null);const extract=async()=>{if(!url.trim()){setError("Add a source URL to continue");return}try{new URL(url)}catch{setError("Enter a complete URL, including https://");return}setLoading(true);setError(null);try{const response=await fetch("/api/extract",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url})});const data=await response.json();if(!response.ok)throw new Error(data.error||"Could not read this source");onContentExtracted({url,title:data.data.title,content:data.data.content,summary:data.data.summary})}catch(err){setError(err instanceof Error?err.message:"Something went wrong")}finally{setLoading(false)}};return <section className="workflow-panel"><div className="panel-head"><span className="panel-index">01</span><h2>Add source</h2><p>URL → source intelligence</p></div><div className="p-[14px]"><label htmlFor="source-url" className="sr-only">Source URL</label><div className="flex flex-col gap-2 sm:flex-row"><div className="relative flex-1"><Link2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b867d]"/><input id="source-url" type="url" inputMode="url" placeholder="Paste an article, post, video, or thread URL" value={url} onChange={e=>{setUrl(e.target.value);setError(null)}} onKeyDown={e=>e.key==="Enter"&&extract()} disabled={loading} className="h-12 w-full rounded-[10px] border border-black/10 bg-[#f5f2ea] pl-11 pr-4 text-xs outline-none transition focus:border-[#ff5b3f]"/></div><button onClick={extract} disabled={loading||!url.trim()} className="signal-button h-12 disabled:cursor-not-allowed disabled:opacity-40">{loading?<><Loader2 className="h-4 w-4 animate-spin"/>Reading source</>:<>Analyze source<ArrowRight className="h-4 w-4"/></>}</button></div>{error&&<p role="alert" className="mt-3 text-xs text-red-600">{error}</p>}{loading&&<div className="mt-4 flex items-center gap-3 border-t border-black/10 pt-4 text-[10px] text-[#77736b]"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5b3f] opacity-60"/><span className="relative h-2 w-2 rounded-full bg-[#ff5b3f]"/></span>Extracting title, argument, context, and useful details…</div>}</div></section>}"use client";

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
