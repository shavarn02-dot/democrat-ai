import { Platform, ContentAngle } from "@/lib/types";

const platformGuidelines: Record<Platform, string> = {
  linkedin:
    "Professional tone. Use short paragraphs, line breaks for readability. Include a hook in the first 2 lines. Use 3-5 relevant hashtags. End with a question to drive engagement.",
  twitter:
    "Concise and punchy. Use thread format if needed (1/5, 2/5, etc.). Max 280 chars per tweet. Use emojis sparingly. Include 1-3 hashtags.",
  reddit:
    "Conversational and authentic. Avoid marketing language. Be helpful and add value. Use markdown formatting. No hashtags.",
  facebook:
    "Friendly and relatable. Use storytelling. Keep it under 4000 chars. Ask questions to drive comments. Use emojis naturally.",
  blog:
    "Long-form and comprehensive. Use headings (H2, H3). Include key takeaways. SEO-optimized with keywords naturally woven in. 800-1500 words.",
};

const angleInstructions: Record<ContentAngle, string> = {
  professional:
    "Write in a professional, authoritative tone. Focus on industry insights and data-driven points.",
  "beginner-friendly":
    "Explain concepts simply. Avoid jargon. Use analogies. Make it accessible to someone new to the topic.",
  "founder-perspective":
    "Write from a startup founder's POV. Share personal insights, lessons learned, and entrepreneurial journey elements.",
  technical:
    "Deep-dive into technical details. Include code snippets if relevant. Target developers and technical audiences.",
  casual:
    "Write like you're talking to a friend. Use humor, personal anecdotes, and a relaxed tone.",
  "thought-leadership":
    "Present unique perspectives and forward-thinking ideas. Challenge conventional wisdom. Inspire discussion.",
};

export function buildRepurposePrompt(
  sourceContent: string,
  sourceUrl: string,
  platform: Platform,
  angle: ContentAngle
): string {
  return `You are an expert content repurposing AI. Your task is to transform the following source content into platform-specific content.

SOURCE URL: ${sourceUrl}

SOURCE CONTENT:
${sourceContent}

TARGET PLATFORM: ${platform.toUpperCase()}
${platformGuidelines[platform]}

CONTENT ANGLE: ${angle.replace("-", " ").toUpperCase()}
${angleInstructions[angle]}

INSTRUCTIONS:
1. Create an engaging title/headline optimized for ${platform}
2. Write the repurposed content following the platform guidelines above
3. Generate 5-10 relevant hashtags (if platform supports them)
4. Extract 3-5 key SEO keywords from the content

RESPOND IN EXACTLY THIS JSON FORMAT:
{
  "title": "Your engaging title here",
  "content": "Your full repurposed content here",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3"],
  "keywords": ["keyword1", "keyword2", "keyword3"]
}`;
}

export function buildExtractionPrompt(): string {
  return `Extract the main content from this webpage. Focus on:
1. The main article/post text (not navigation, ads, or sidebar content)
2. The title of the content
3. A brief summary (2-3 sentences)

Return the result as JSON:
{
  "title": "Content title",
  "mainContent": "The full main content text...",
  "summary": "Brief 2-3 sentence summary"
}`;
}
