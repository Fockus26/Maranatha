import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { dateNow } from "@/lib/utils/date";

const sitemap = (): MetadataRoute.Sitemap => {
    return [
        {
            url: siteConfig.url,
            lastModified: dateNow().toString(),
            changeFrequency: "weekly",
            priority: 1,
        },
    ];
};

export default sitemap;
