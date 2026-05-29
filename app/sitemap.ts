import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { dateNow } from "@/lib/utils/utils";

const sitemap = (): MetadataRoute.Sitemap => {
    return [
        {
            url: siteConfig.url,
            lastModified: dateNow(),
            changeFrequency: "weekly",
            priority: 1,
        },
    ];
};

export default sitemap;
