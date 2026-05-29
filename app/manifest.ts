import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const manifest = (): MetadataRoute.Manifest => {
    return {
        name: siteConfig.name,

        short_name: siteConfig.shortName,

        description: siteConfig.description,

        start_url: "/",

        display: "standalone",

        background_color: "#ffffff",

        theme_color: "#111827",

        lang: siteConfig.lang,

        icons: [
            {
                src: "/icon.png",

                sizes: "512x512",

                type: "image/png",
            },

            {
                src: "/apple-icon.png",

                sizes: "180x180",

                type: "image/png",
            },
        ],
    };
};

export default manifest;
