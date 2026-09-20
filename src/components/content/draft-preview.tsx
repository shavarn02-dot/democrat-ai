"use client";

import { useState } from "react";
import { Check, Copy, Edit3, Loader2, Save, CheckCircle2, XCircle } from "lucide-react";
import { Draft } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  draft: Draft;
  onUpdate: (id: string, updates: Partial<Draft>) => Promise<void>;
}

export function DraftPreview({ draft, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(draft.generated_title);
  const [content, setContent] = useState(draft.generated_content);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdate(draft.id, { generated_title: title, generated_content: content });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (newStatus: "approved" | "rejected" | "published") => {
    setSaving(true);
    try {
      await onUpdate(draft.id, { status: newStatus });
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async () => {
    const textToCopy = `${title}\n\n${content}\n\n${draft.generated_hashtags?.map((t) => (t.startsWith("#") ? t : `#${t}`)).join(" ")}`;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="native-preview rounded-2xl border border-black/10 bg-[#fbfaf6] shadow-sm overflow-hidden mb-6 transition hover:shadow-md">
      {/* Top action & status banner */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3 border-b border-black/10 bg-[#f5f2ea] text-xs">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/5 text-[#11110f] font-semibold">
            {draft.target_platform.toUpperCase()}
          </span>
          <span className="text-[#8b867d]">·</span>
          <span className="font-serif italic text-[#5a574f]">{draft.content_angle.replaceAll("-", " ")}</span>
          <span className="text-[#8b867d]">·</span>
          <span
            className={cn(
              "font-mono text-[10px] px-2 py-0.5 rounded-full uppercase font-medium",
              draft.status === "approved"
                ? "bg-emerald-100 text-emerald-800"
                : draft.status === "rejected"
                ? "bg-rose-100 text-rose-800"
                : "bg-amber-100 text-amber-800"
            )}
          >
            {draft.status}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-black/10 bg-white hover:bg-black/5 text-xs text-[#11110f] transition active:scale-95"
            title="Copy draft and tags"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-black/10 bg-white hover:bg-black/5 text-xs text-[#11110f] transition"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit</span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#11110f] text-white text-xs transition"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              <span>Save</span>
            </button>
          )}

          <button
            onClick={() => handleStatusChange("approved")}
            disabled={saving || draft.status === "approved"}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-xs transition disabled:opacity-40"
            title="Mark as approved"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Approve</span>
          </button>

          <button
            onClick={() => handleStatusChange("rejected")}
            disabled={saving || draft.status === "rejected"}
            className="flex items-center gap-1 px-2 py-1 rounded-md border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs transition disabled:opacity-40"
            title="Reject draft"
          >
            <XCircle className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-mono text-[#8b867d] uppercase block mb-1">Generated Title / Hook</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-sm font-semibold p-2.5 rounded-lg border border-black/10 bg-white text-[#11110f] outline-none focus:border-[#ff5b3f]"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-[#8b867d] uppercase block mb-1">Post Body</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full text-xs leading-relaxed p-3 rounded-lg border border-black/10 bg-white text-[#11110f] outline-none focus:border-[#ff5b3f]"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Native Feed Shell Styling */}
            {draft.target_platform === "linkedin" && (
              <div className="bg-white rounded-xl border border-black/5 p-5 shadow-xs">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#11110f] text-white flex items-center justify-center font-serif text-xs font-bold">
                    D
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#11110f]">Democrat.ai Content Team</h5>
                    <p className="text-[10px] text-[#8b867d]">Published via Democrat Distribution Engine</p>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-[#11110f] mb-2">{draft.generated_title}</h4>
                <p className="text-xs text-[#2b2925] whitespace-pre-wrap leading-relaxed">{draft.generated_content}</p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-[#0a66c2]">
                  {draft.generated_hashtags?.map((t, idx) => (
                    <span key={idx}>{t.startsWith("#") ? t : `#${t}`}</span>
                  ))}
                </div>
              </div>
            )}

            {draft.target_platform === "twitter" && (
              <div className="bg-[#000000] text-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-xs">Democrat</span>
                  <span className="text-[10px] text-white/50 font-mono">@democrat_ai</span>
                </div>
                <p className="text-xs text-white/90 whitespace-pre-wrap leading-relaxed mb-3">
                  {draft.generated_content}
                </p>
                <div className="flex flex-wrap gap-1.5 text-[10px] text-[#1d9bf0] font-mono">
                  {draft.generated_hashtags?.map((t, idx) => (
                    <span key={idx}>{t.startsWith("#") ? t : `#${t}`}</span>
                  ))}
                </div>
              </div>
            )}

            {draft.target_platform !== "linkedin" && draft.target_platform !== "twitter" && (
              <div className="bg-white rounded-xl border border-black/5 p-5">
                <h4 className="text-sm font-semibold text-[#11110f] mb-2">{draft.generated_title}</h4>
                <p className="text-xs text-[#2b2925] whitespace-pre-wrap leading-relaxed">{draft.generated_content}</p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] text-[#ff5b3f] font-mono">
                  {draft.generated_hashtags?.map((t, idx) => (
                    <span key={idx}>{t.startsWith("#") ? t : `#${t}`}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Source provenance footer */}
        <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-[10px] font-mono text-[#8b867d]">
          <span className="truncate max-w-xs">Source: {draft.source_url}</span>
          <span>Created: {new Date(draft.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </article>
  );
}
