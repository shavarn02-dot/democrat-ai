"use client";
import { Briefcase,Code,GraduationCap,Lightbulb,Rocket,Smile } from "lucide-react";
import { ContentAngle } from "@/lib/types";
import { cn } from "@/lib/utils";
interface Props{selected:ContentAngle|null;onSelect:(angle:ContentAngle)=>void}
const angles=[
 ["professional","Professional","Evidence-led",Briefcase],["beginner-friendly","Beginner friendly","Clear + useful",GraduationCap],["founder-perspective","Founder POV","Lessons learned",Rocket],["technical","Technical","Deep + precise",Code],["casual","Conversational","Warm + direct",Smile],["thought-leadership","Thought leadership","Bold thesis",Lightbulb],
] as const;
export function AngleSelector({selected,onSelect}:Props){return <section className="workflow-panel"><div className="panel-head"><span className="panel-index">02</span><h2>Choose an editorial angle</h2><p>Controls voice and framing</p></div><div className="selector-grid">{angles.map(([value,label,description,Icon])=><button type="button" aria-pressed={selected===value} key={value} onClick={()=>onSelect(value)} className={cn("selector-option",selected===value&&"selected")}><Icon className="h-4 w-4"/><strong>{label}</strong><small>{description}</small></button>)}</div></section>}
