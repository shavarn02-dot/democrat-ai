import type { MetadataRoute } from "next";
import { publicSiteOrigin } from "@/lib/site-origin";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const origin = publicSiteOrigin();
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/dashboard", "/auth/"] },
    ...(origin ? { sitemap: new URL("/sitemap.xml", origin).href } : {}),
  };
}
