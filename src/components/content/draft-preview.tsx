"use client";
import {useState} from "react";
import Image from "next/image";
import {Check,CheckCircle,Copy,Edit3,ExternalLink,Image as ImageIcon,Loader2,Save,X,XCircle} from "lucide-react";
import {Draft,Platform} from "@/lib/types";import {Input} from "@/components/ui/input";import {Textarea} from "@/components/ui/textarea";
interface Props{draft:Draft;onUpdate:(id:string,updates:Partial<Draft>)=>Promise<void>}
const meta:Record<Platform,{name:string;glyph:string;className:string}>={linkedin:{name:"LinkedIn",glyph:"in",className:"linkedin"},twitter:{name:"X / Twitter",glyph:"𝕏",className:"twitter"},reddit:{name:"Reddit",glyph:"r/",className:"reddit"},facebook:{name:"Facebook",glyph:"f",className:"facebook"},blog:{name:"Editorial",glyph:"B",className:"blog"}};
export function DraftPreview({draft,onUpdate}:Props){const[editing,setEditing]=useState(false);const[title,setTitle]=useState(draft.generated_title);const[content,setContent]=useState(draft.generated_content);const[saving,setSaving]=useState(false);const[copied,setCopied]=useState(false);const save=async()=>{setSaving(true);try{await onUpdate(draft.id,{generated_title:title,generated_content:content});setEditing(false)}finally{setSaving(false)}};const status=async(value:"approved"|"rejected")=>{setSaving(true);try{await onUpdate(draft.id,{status:value})}finally{setSaving(false)}};const copy=async()=>{await navigator.clipboard.writeText(`${title}\n\n${content}`);setCopied(true);setTimeout(()=>setCopied(false),1800)};const p=meta[draft.target_platform];return <article className="native-preview"><header className="preview-bar"><div className="platform-identity"><span className="platform-badge">{p.glyph}</span><div><strong>{p.name}</strong><small>{draft.content_angle.replaceAll("-"," ")} · {draft.status}</small></div></div><div className="preview-tools"><button type="button" onClick={copy} aria-label="Copy draft">{copied?<Check className="h-4 w-4 text-emerald-700"/>:<Copy className="h-4 w-4"/>}</button><button type="button" onClick={()=>setEditing(v=>!v)} aria-label={editing?"Close editor":"Edit draft"}>{editing?<X className="h-4 w-4"/>:<Edit3 className="h-4 w-4"/>}</button></div></header><div className="preview-content">{editing?<div className="edit-panel"><div><label htmlFor={`title-${draft.id}`}>Headline</label><Input id={`title-${draft.id}`} value={title} onChange={e=>setTitle(e.target.value)} className="mt-2 bg-white"/></div><div><label htmlFor={`body-${draft.id}`}>Body</label><Textarea id={`body-${draft.id}`} value={content} onChange={e=>setContent(e.target.value)} rows={12} className="mt-2 bg-white font-mono text-xs"/></div><div className="status-actions"><button type="button" className="primary-action" onClick={save} disabled={saving}>{saving?<Loader2 className="h-3.5 w-3.5 animate-spin"/>:<Save className="h-3.5 w-3.5"/>}Save changes</button><button type="button" onClick={()=>setEditing(false)}>Cancel</button></div></div>:<><div className={`social-frame ${p.className}`}><div className="social-header"><span className="social-avatar">D</span><div><strong>Democrat.ai draft</strong><small>AI-assisted · review before publishing</small></div></div><div className="social-copy"><h3>{title}</h3><p>{content}</p>{draft.generated_hashtags?.length>0&&<div className="social-tags">{draft.generated_hashtags.map((tag,i)=><span key={`${tag}-${i}`}>{tag.startsWith("#")?tag:`#${tag}`}</span>)}</div>}</div></div><div className="visual-slot">{draft.image_url?<Image unoptimized width={1200} height={675} src={draft.image_url} alt="Generated visual for this draft"/>:<div className="visual-empty"><i><ImageIcon className="h-4 w-4"/></i><div><strong className="block text-[#33312d]">No visual attached</strong><span className="mt-1 block">Visual generation is not configured in the current backend.</span></div></div>}<div className="text-right text-[9px] text-[#918c83]"><span className="block font-operational">SEO SIGNALS</span><span className="mt-2 block max-w-[210px]">{draft.generated_keywords?.join(" · ")||"No keywords"}</span></div></div><div className="status-actions"><button type="button" className="primary-action" onClick={()=>status("approved")} disabled={saving}><CheckCircle className="h-3.5 w-3.5"/>Approve</button><button type="button" onClick={()=>status("rejected")} disabled={saving}><XCircle className="h-3.5 w-3.5"/>Reject</button><button type="button" onClick={copy}><Copy className="h-3.5 w-3.5"/>{copied?"Copied":"Copy"}</button><a href={draft.source_url} target="_blank" rel="noopener noreferrer" className="ml-auto"><ExternalLink className="h-3.5 w-3.5"/>Source</a></div></>}</div></article>}"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Draft, Platform } from "@/lib/types";
import {
  CheckCircle,
  XCircle,
  Edit3,
  Copy,
  ExternalLink,
  Loader2,
  Save,
} from "lucide-react";

interface DraftPreviewProps {
  draft: Draft;
  onUpdate: (id: string, updates: Partial<Draft>) => void;
}

const platformNames: Record<Platform, string> = {
  linkedin: "LinkedIn",
  twitter: "Twitter/X",
  reddit: "Reddit",
  facebook: "Facebook",
  blog: "Blog Post",
};

const platformColors: Record<Platform, string> = {
  linkedin: "bg-blue-600",
  twitter: "bg-black",
  reddit: "bg-orange-500",
  facebook: "bg-blue-500",
  blog: "bg-green-600",
};

export function DraftPreview({ draft, onUpdate }: DraftPreviewProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(draft.generated_title);
  const [content, setContent] = useState(draft.generated_content);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdate(draft.id, {
        generated_title: title,
        generated_content: content,
      });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (status: "approved" | "rejected") => {
    setSaving(true);
    try {
      await onUpdate(draft.id, { status });
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async () => {
    const fullContent = `${title}\n\n${content}`;
    await navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-white text-xs font-bold ${platformColors[draft.target_platform]}`}
            >
              {draft.target_platform.charAt(0).toUpperCase()}
            </div>
            <div>
              <CardTitle className="text-lg">{platformNames[draft.target_platform]}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <span className="capitalize">{draft.content_angle.replace("-", " ")}</span>
                <Badge variant="outline" className="text-xs">
                  {draft.status}
                </Badge>
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              title="Copy to clipboard"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditing(!editing)}
              title="Edit content"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="mt-1 font-mono text-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {content}
            </div>

            {draft.generated_hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {draft.generated_hashtags.map((tag, i) => (
                  <Badge key={i} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {draft.generated_keywords.length > 0 && (
              <div className="pt-2">
                <span className="text-xs text-muted-foreground">Keywords: </span>
                <span className="text-xs">
                  {draft.generated_keywords.join(", ")}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-4 border-t">
              <Button
                variant="default"
                onClick={() => handleStatusChange("approved")}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700"
              >
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="mr-2 h-4 w-4" />
                )}
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleStatusChange("rejected")}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <XCircle className="mr-2 h-4 w-4" />
                )}
                Reject
              </Button>
              <a
                href={draft.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Source
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
