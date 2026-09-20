import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Groq from "groq-sdk";
import { buildRepurposePrompt } from "@/lib/prompts";
import { Platform, ContentAngle } from "@/lib/types";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { url, contentAngle, targetPlatform, sourceContent } = body;

    if (!url || !contentAngle || !targetPlatform || !sourceContent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const prompt = buildRepurposePrompt(
      sourceContent,
      url,
      targetPlatform as Platform,
      contentAngle as ContentAngle
    );

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      return NextResponse.json(
        { error: "Failed to generate content" },
        { status: 500 }
      );
    }

    let generated;
    try {
      const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
      generated = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(responseContent);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const { data: draft, error: dbError } = await supabase
      .from("drafts")
      .insert({
        user_id: user.id,
        source_url: url,
        source_platform: detectPlatform(url),
        source_content: sourceContent.substring(0, 5000),
        content_angle: contentAngle,
        target_platform: targetPlatform,
        generated_title: generated.title,
        generated_content: generated.content,
        generated_hashtags: generated.hashtags || [],
        generated_keywords: generated.keywords || [],
        status: "draft",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save draft" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, draft });
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function detectPlatform(url: string): string {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be"))
    return "youtube";
  if (lowerUrl.includes("instagram.com")) return "instagram";
  if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com"))
    return "twitter";
  if (lowerUrl.includes("reddit.com")) return "reddit";
  if (lowerUrl.includes("linkedin.com")) return "linkedin";
  if (lowerUrl.includes("facebook.com")) return "facebook";
  if (lowerUrl.includes("medium.com")) return "medium";
  return "blog";
}
