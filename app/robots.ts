import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";

/**
 * robots.txt (fase QA — SEO). El dashboard privado y la ruta legacy
 * `/historia` (solo redirect) quedan fuera del índice.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/dashboard/", "/historia"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
