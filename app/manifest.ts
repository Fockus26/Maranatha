import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/siteConfig";

/**
 * Web App Manifest (fase QA — SEO). Los íconos los resuelve `app/icon.tsx`
 * / `app/apple-icon.tsx`; aquí van solo nombre, colores y display.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Maranatha",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#F5F6FA",
    theme_color: "#101B45",
    lang: "es",
  };
}
