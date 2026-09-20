export type Platform =
  | "linkedin"
  | "twitter"
  | "reddit"
  | "facebook"
  | "blog";

export type ContentAngle =
  | "professional"
  | "beginner-friendly"
  | "founder-perspective"
  | "technical"
  | "casual"
  | "thought-leadership";

export type ContentStatus = "draft" | "approved" | "rejected" | "published";

export interface Draft {
  id: string;
  user_id: string;
  source_url: string;
  source_platform: string;
  source_content: string;
  content_angle: ContentAngle;
  target_platform: Platform;
  generated_title: string;
  generated_content: string;
  generated_hashtags: string[];
  generated_keywords: string[];
  image_url: string | null;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ProcessRequest {
  url: string;
  contentAngle: ContentAngle;
  targetPlatform: Platform;
}

export interface ProcessResponse {
  success: boolean;
  draft?: Draft;
  error?: string;
}
