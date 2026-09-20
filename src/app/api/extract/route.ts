import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Groq from "groq-sdk";
import { buildExtractionPrompt } from "@/lib/prompts";

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

    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let pageContent = "";
    let pageTitle = "";

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; DemocratAI/1.0; +https://democrat.ai)",
        },
        signal: AbortSignal.timeout(10000),
      });

      const html = await response.text();

      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      pageTitle = titleMatch ? titleMatch[1].trim() : "Untitled";

      const cleaned = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
        .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "")
        .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      pageContent = cleaned.substring(0, 10000);
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch content from URL" },
        { status: 400 }
      );
    }

    if (!pageContent || pageContent.length < 50) {
      return NextResponse.json(
        { error: "Could not extract meaningful content from URL" },
        { status: 400 }
      );
    }

    const extractionPrompt = buildExtractionPrompt();
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: extractionPrompt },
        { role: "user", content: `Page title: ${pageTitle}\n\nContent:\n${pageContent}` },
      ],
      temperature: 0.3,
      max_tokens: 3000,
    });

    const responseText = completion.choices[0].message.content || "{}";
    let extracted;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      extracted = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(responseText);
    } catch {
      extracted = { title: pageTitle, mainContent: pageContent, summary: "" };
    }

    return NextResponse.json({
      success: true,
      data: {
        title: extracted.title || pageTitle,
        content: extracted.mainContent || pageContent,
        summary: extracted.summary || "",
        url,
      },
    });
  } catch (error) {
    console.error("Extraction error:", error);
    return NextResponse.json(
      { error: "Failed to extract content" },
      { status: 500 }
    );
  }
}
