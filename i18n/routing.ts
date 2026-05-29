import { defineRouting } from "next-intl/routing";

import { siteConfig } from "@/config/site";

export const routing = defineRouting({
    locales: ["en", "es"],

    defaultLocale: siteConfig.lang,
});
