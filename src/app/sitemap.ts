import type { MetadataRoute } from "next";
import { publicSiteOrigin } from "@/lib/site-origin";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = publicSiteOrigin();
  if (!origin) return [];
  return [{ url: new URL("/", origin).href, changeFrequency: "weekly", priority: 1 }];
}
